from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class WhatsAppConnection(Base):
    __tablename__ = "whatsapp_connections"

    id = Column(Integer, primary_key=True, index=True)
    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    business_id = Column(String, nullable=True)
    meta_business_id = Column(String, nullable=True)
    waba_id = Column(String, nullable=True)
    phone_number_id = Column(String, nullable=True)
    phone_number = Column(String, index=True)
    display_name = Column(String, nullable=True)
    access_token = Column(String, nullable=True)
    onboarding_type = Column(String) # 'existing' or 'new'
    verification_status = Column(String, default="pending") # 'pending', 'verified', 'failed'
    webhook_subscription_status = Column(String, default="pending")
    connected_at = Column(DateTime(timezone=True), nullable=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    workspace = relationship("Workspace", back_populates="whatsapp_connections")
