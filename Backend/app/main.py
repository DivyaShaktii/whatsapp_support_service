from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import whatsapp, workspace

# Create the database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="WhatsApp Support Service API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(workspace.router, prefix="/api/workspaces", tags=["workspaces"])
app.include_router(whatsapp.router, prefix="/api/channels/whatsapp", tags=["whatsapp"])

@app.get("/")
def read_root():
    return {"message": "WhatsApp Support Service API is running"}
