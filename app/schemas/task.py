from enum import Enum

from pydantic import BaseModel


class StatusEnum(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"


class TaskBase(BaseModel):
    title: str
    status: StatusEnum = StatusEnum.pending


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    status: StatusEnum


class TaskOut(TaskBase):
    id: int

    class Config:
        orm_mode = True
