import enum

from sqlalchemy import Column, Enum, Integer, String

from app.core.database import Base


class StatusEnum(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


class Task(Base):
    __tablename__ = "tasks"
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    status = Column(Enum(StatusEnum), default=StatusEnum.pending)
