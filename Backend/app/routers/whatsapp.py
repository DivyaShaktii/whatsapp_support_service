import requests
import re
import os
from fastapi import APIRouter, Depends, HTTPException, Request, Query, Response
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from ..database import get_db
from ..models.whatsapp import WhatsAppConnection
from ..models.workspace import Workspace
from ..schemas.whatsapp import WhatsAppConnect, WhatsAppResponse

router = APIRouter()

def normalize_phone_number(phone: str) -> str:
    """Removes any non-digit characters from the phone number."""
    if not phone:
        return ""
    return re.sub(r'\D', '', phone)

@router.post("/connect", response_model=WhatsAppResponse)
def connect_whatsapp_meta(data: WhatsAppConnect, db: Session = Depends(get_db)):
    # Verify workspace exists
    workspace = db.query(Workspace).filter(Workspace.id == data.workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
        
    # Check if this phone number is already connected to another workspace
    existing = db.query(WhatsAppConnection).filter(WhatsAppConnection.phone_number == data.phone_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="This phone number is already linked to a business.")

    # Call Meta Graph API to verify the number
    # Use v19.0 of Graph API
    url = f"https://graph.facebook.com/v19.0/{data.phone_number_id}"
    params = {
        "access_token": data.access_token
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        meta_data = response.json()
        
        display_phone_number = meta_data.get("display_phone_number")
        if not display_phone_number:
            raise HTTPException(status_code=400, detail="Could not retrieve phone number details from Meta.")
            
        # Normalize and compare
        normalized_entered = normalize_phone_number(data.phone_number)
        normalized_meta = normalize_phone_number(display_phone_number)
        
        if normalized_entered != normalized_meta:
            raise HTTPException(
                status_code=400, 
                detail="The phone number selected in Meta does not match the entered number. Please try again."
            )
            
    except requests.exceptions.RequestException as e:
        # If response has a json body, try to extract error message
        error_msg = str(e)
        if hasattr(e, 'response') and e.response is not None:
            try:
                error_data = e.response.json()
                if "error" in error_data and "message" in error_data["error"]:
                    error_msg = error_data["error"]["message"]
            except Exception:
                pass
        raise HTTPException(status_code=400, detail=f"Failed to verify with Meta API: {error_msg}")

    # Subscribe to webhooks for this WABA
    webhook_url = f"https://graph.facebook.com/v19.0/{data.waba_id}/subscribed_apps"
    webhook_status = "pending"
    try:
        webhook_response = requests.post(webhook_url, params=params)
        webhook_response.raise_for_status()
        webhook_data = webhook_response.json()
        if webhook_data.get("success"):
            webhook_status = "active"
    except requests.exceptions.RequestException as e:
        # Log error in real app, but don't fail the whole connection
        # We can retry webhook subscription later
        webhook_status = "failed"

    connection = WhatsAppConnection(
        workspace_id=data.workspace_id,
        phone_number=data.phone_number,
        phone_number_id=data.phone_number_id,
        waba_id=data.waba_id,
        meta_business_id=data.meta_business_id,
        display_name=data.display_name or meta_data.get("verified_name"),
        access_token=data.access_token,
        onboarding_type="meta_embedded_signup",
        verification_status="verified", 
        webhook_subscription_status=webhook_status,
        connected_at=datetime.now(timezone.utc)
    )
    db.add(connection)
    db.commit()
    db.refresh(connection)
    return connection

# Normally you'd want this in your settings/config management
WEBHOOK_VERIFY_TOKEN = os.getenv("WEBHOOK_VERIFY_TOKEN", "my_secure_verify_token")

@router.get("/webhook")
def verify_webhook(
    hub_mode: str = Query(None, alias="hub.mode"),
    hub_challenge: str = Query(None, alias="hub.challenge"),
    hub_verify_token: str = Query(None, alias="hub.verify_token")
):
    """
    Endpoint for Meta to verify the webhook URL.
    When you configure the Webhook in the App Dashboard, Meta sends a GET request here.
    """
    if hub_mode == "subscribe" and hub_verify_token == WEBHOOK_VERIFY_TOKEN:
        # Meta expects the raw hub.challenge value back as a plain text response
        return Response(content=hub_challenge, media_type="text/plain")
    
    raise HTTPException(status_code=403, detail="Verification failed")

@router.post("/webhook")
async def handle_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Endpoint for receiving incoming WhatsApp messages and status updates from Meta.
    """
    body = await request.json()
    
    # Verify that this is a WhatsApp API webhook event
    if body.get("object") == "whatsapp_business_account":
        for entry in body.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                
                # We can identify the WABA and phone number receiving the message
                phone_number_id = value.get("metadata", {}).get("phone_number_id")
                
                # TODO: Retrieve tenant/workspace configuration using phone_number_id
                # connection = db.query(WhatsAppConnection).filter_by(phone_number_id=phone_number_id).first()
                
                # Check if it contains new messages
                if "messages" in value:
                    for message in value["messages"]:
                        # Extract message details
                        sender_phone = message.get("from")
                        msg_type = message.get("type")
                        
                        # Example log
                        print(f"Received {msg_type} message from {sender_phone} on number {phone_number_id}")
                        
                        # TODO: Trigger your AI agent or save to database here
                        
                # Check if it contains message status updates (sent, delivered, read, failed)
                elif "statuses" in value:
                    for status in value["statuses"]:
                        status_type = status.get("status")
                        print(f"Message {status.get('id')} status updated to {status_type}")
                        
        # Meta requires a 200 OK response within 20 seconds, otherwise they will retry
        return Response(content="EVENT_RECEIVED", status_code=200, media_type="text/plain")
        
    raise HTTPException(status_code=404, detail="Not a WhatsApp API event")
