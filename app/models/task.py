from sqlalchemy import Column, Integer, String, Enum
from app.core.database import Base
import enum


class StatusEnum(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
