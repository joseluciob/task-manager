from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.task import StatusEnum, TaskCreate, TaskOut, TaskUpdate
from app.services import task as task_service

router = APIRouter()


@router.get("/tasks", response_model=List[TaskOut])
async def list_tasks(
    status: StatusEnum = None, db: AsyncSession = Depends(get_db)
):
    return await task_service.get_tasks(db, status)


@router.post("/tasks", response_model=TaskOut)
async def create_task(task: TaskCreate, db: AsyncSession = Depends(get_db)):
    return await task_service.create_task(db, task)


@router.patch("/tasks/{task_id}", response_model=TaskOut)
async def update_status(
    task_id: int, update: TaskUpdate, db: AsyncSession = Depends(get_db)
):
    return await task_service.update_task_status(db, task_id, update.status)


@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db)):
    await task_service.delete_task(db, task_id)
    return {"message": "Task deleted"}
