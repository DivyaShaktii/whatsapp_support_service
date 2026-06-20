from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WhatsAppConnect(BaseModel):
    workspace_id: int
    waba_id: str
    phone_number_id: str
    meta_business_id: str
    phone_number: str
    display_name: Optional[str] = None
    access_token: str

class WhatsAppResponse(BaseModel):
    id: int
    workspace_id: int
    business_id: Optional[str]
    meta_business_id: Optional[str]
    waba_id: Optional[str]
    phone_number_id: Optional[str]
    phone_number: str
    display_name: Optional[str]
    access_token: Optional[str]
    onboarding_type: str
    verification_status: str
    webhook_subscription_status: str
    connected_at: Optional[datetime]
    updated_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True
