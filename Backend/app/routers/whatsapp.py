"""
app/routers/whatsapp.py

WhatsApp connect via Zernio. This is an APIRouter — main.py already mounts it:
    app.include_router(whatsapp.router, prefix="/api/channels/whatsapp", ...)

So every route below is relative to /api/channels/whatsapp:
    POST /api/channels/whatsapp/connect/new
    GET  /api/channels/whatsapp/callback
    GET  /api/channels/whatsapp/accounts
    GET  /api/channels/whatsapp/accounts/{profile_id}

In-memory store for now (one Zernio profile == one WhatsApp account).
When you're ready, swap the `store` calls for your SQLAlchemy models/schemas.
"""

import os
import threading
from datetime import datetime, timezone
from typing import Optional

import httpx
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

router = APIRouter()

ZERNIO_BASE = "https://zernio.com/api/v1"
# Full path (incl. the router prefix) because Zernio redirects the browser here.
CALLBACK_PATH = "/api/channels/whatsapp/callback"


# ---- config read at call-time, so .env load order never bites you ----------
def _api_key() -> str:
    key = os.environ.get("ZERNIO_API_KEY")
    if not key:
        raise HTTPException(500, "ZERNIO_API_KEY is not set on the backend")
    return key


def _auth_headers() -> dict:
    return {"Authorization": f"Bearer {_api_key()}"}


def _public_base() -> str:
    return os.environ.get("PUBLIC_BASE_URL", "http://localhost:8000")


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---- in-memory store -------------------------------------------------------
class Connection(BaseModel):
    profile_id: str
    label: Optional[str] = None
    status: str = "pending"           # pending | connected | failed
    account_id: Optional[str] = None  # Zernio WhatsApp account id (send with this)
    phone: Optional[str] = None
    details: Optional[dict] = None     # full account record fetched from Zernio
    created_at: str
    updated_at: str


class _Store:
    def __init__(self):
        self._data: dict[str, Connection] = {}
        self._lock = threading.Lock()

    def upsert_pending(self, profile_id: str, label: Optional[str]) -> Connection:
        now = _now()
        with self._lock:
            c = self._data.get(profile_id)
            if c:
                c.status, c.label, c.updated_at = "pending", label or c.label, now
                return c
            c = Connection(profile_id=profile_id, label=label, status="pending",
                           created_at=now, updated_at=now)
            self._data[profile_id] = c
            return c

    def mark_connected(self, profile_id: str, account_id: str, phone: Optional[str]):
        now = _now()
        with self._lock:
            c = self._data.get(profile_id) or Connection(
                profile_id=profile_id, created_at=now, updated_at=now)
            c.status, c.account_id, c.phone, c.updated_at = "connected", account_id, phone, now
            self._data[profile_id] = c

    def mark_failed(self, profile_id: str):
        with self._lock:
            c = self._data.get(profile_id)
            if c:
                c.status, c.updated_at = "failed", _now()

    def get(self, profile_id: str) -> Optional[Connection]:
        return self._data.get(profile_id)

    def list(self) -> list[Connection]:
        return list(self._data.values())


store = _Store()


# ---- Zernio helpers --------------------------------------------------------
async def create_zernio_profile(name: str) -> str:
    async with httpx.AsyncClient(timeout=20) as client:
        resp = await client.post(
            f"{ZERNIO_BASE}/profiles",
            headers={**_auth_headers(), "Content-Type": "application/json"},
            json={"name": name},
        )
    if resp.status_code not in (200, 201):
        raise HTTPException(resp.status_code, f"Profile create failed: {resp.text}")
    return resp.json()["profile"]["_id"]


def _close_page(title: str, message: str) -> HTMLResponse:
    html = f"""<!doctype html>
<html><head><meta charset="utf-8"><title>{title}</title></head>
<body style="font-family:system-ui,sans-serif;text-align:center;padding:48px;color:#111">
  <h2>{title}</h2>
  <p style="color:#555">{message}</p>
  <script>setTimeout(function(){{ window.close(); }}, 1200);</script>
</body></html>"""
    return HTMLResponse(content=html)


# ---- routes ----------------------------------------------------------------
@router.post("/connect/new")
async def start_connect_new(label: str = Query(..., description="Display name for this account")):
    profile_id = await create_zernio_profile(name=label)
    store.upsert_pending(profile_id, label)

    redirect_url = f"{_public_base()}{CALLBACK_PATH}"
    async with httpx.AsyncClient(timeout=20) as client:
        resp = await client.get(
            f"{ZERNIO_BASE}/connect/whatsapp",
            headers=_auth_headers(),
            params={"profileId": profile_id, "redirect_url": redirect_url},
        )
    if resp.status_code != 200:
        # Surfaces Zernio errors (e.g. PAYMENT_REQUIRED past the free 2-account limit)
        raise HTTPException(resp.status_code, f"Zernio connect failed: {resp.text}")

    auth_url = resp.json().get("authUrl")
    if not auth_url:
        raise HTTPException(502, "No authUrl returned by Zernio")
    return {"authUrl": auth_url, "profileId": profile_id}


@router.get("/callback")
async def callback(
    connected: Optional[str] = None,
    profileId: Optional[str] = None,
    accountId: Optional[str] = None,
    username: Optional[str] = None,
):
    if connected == "whatsapp" and profileId and accountId:
        store.mark_connected(profileId, accountId, username)
        return _close_page("WhatsApp connected \u2705", "You can close this window.")
    if profileId:
        store.mark_failed(profileId)
    return _close_page("Connection failed", "Please close this window and try again.")


@router.get("/accounts")
async def list_accounts():
    return {"accounts": [c.model_dump() for c in store.list()]}


@router.get("/accounts/{profile_id}")
async def get_account(profile_id: str):
    c = store.get(profile_id)
    if not c:
        raise HTTPException(404, "No connection for that profileId")
    return c.model_dump()
