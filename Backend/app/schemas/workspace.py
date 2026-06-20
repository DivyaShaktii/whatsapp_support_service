from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class WorkspaceCreate(BaseModel):
    name: str
    business_name: str
    industry: str
    website_url: Optional[str] = None
    country: Optional[str] = None
    time_zone: Optional[str] = None

class WorkspaceResponse(WorkspaceCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
