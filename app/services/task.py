from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.task import StatusEnum, Task
from app.schemas.task import TaskCreate


async def get_tasks(db: AsyncSession, status: StatusEnum = None):
    stmt = select(Task)
    if status:
        stmt = stmt.where(Task.status == status)
    result = await db.execute(stmt)
    return result.scalars().all()


async def create_task(db: AsyncSession, task: TaskCreate):
    db_task = Task(**task.model_dump())
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task


async def update_task_status(
    db: AsyncSession, task_id: int, status: StatusEnum
):
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if task:
        task.status = status
        await db.commit()
        await db.refresh(task)
    return task


async def delete_task(db: AsyncSession, task_id: int):
    result = await db.execute(select(Task).where(Task.id == task_id))
    task = result.scalar_one_or_none()
    if task:
        await db.delete(task)
        await db.commit()
    return task
