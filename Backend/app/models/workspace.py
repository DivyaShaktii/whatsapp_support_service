from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    business_name = Column(String)
    industry = Column(String)
    website_url = Column(String, nullable=True)
    country = Column(String, nullable=True)
    time_zone = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    whatsapp_connections = relationship("WhatsAppConnection", back_populates="workspace")
