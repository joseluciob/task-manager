import asyncio
import os
import subprocess

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient

from app.core.database import get_db, get_sessionmaker

TestingSessionLocal = None


@pytest.fixture(scope="session")
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="session", autouse=True)
def apply_migrations():
    os.environ["ENV_FILE"] = ".env.test"

    result = subprocess.run(
        ["alembic", "upgrade", "head"], capture_output=True
    )
    if result.returncode != 0:
        print(result.stdout.decode())
        print(result.stderr.decode())
        raise RuntimeError("Alembic migration failed")

    global TestingSessionLocal
    TestingSessionLocal = get_sessionmaker()

    yield

    subprocess.run(["alembic", "downgrade", "base"], capture_output=True)


@pytest_asyncio.fixture(scope="function")
async def db_session():
    async with TestingSessionLocal() as session:
        yield session
        await session.rollback()


@pytest_asyncio.fixture()
async def client():
    from app.main import app

    async def override_get_db():
        SessionLocal = get_sessionmaker()
        async with SessionLocal() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
