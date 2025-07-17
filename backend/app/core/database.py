from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

Base = declarative_base()


def get_engine():
    return create_async_engine(settings.DATABASE_URL, echo=True, future=True)


def get_sessionmaker():
    engine = get_engine()
    return sessionmaker(
        bind=engine, class_=AsyncSession, expire_on_commit=False
    )


async def get_db():
    SessionLocal = get_sessionmaker()
    async with SessionLocal() as session:
        yield session
