import pytest

TASK_URL = "/tasks"


@pytest.mark.asyncio
async def test_create_task(client):
    payload = {"title": "Test Task"}
    response = await client.post(TASK_URL, json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["status"] == "pending"
    assert "id" in data


@pytest.mark.asyncio
async def test_list_tasks(client):
    await client.post(TASK_URL, json={"title": "Another Task"})
    response = await client.get(TASK_URL)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any("Another Task" in t["title"] for t in data)


@pytest.mark.asyncio
async def test_filter_tasks(client):
    await client.post(
        TASK_URL, json={"title": "To Complete", "status": "completed"}
    )
    await client.post(
        TASK_URL, json={"title": "In Progress", "status": "in_progress"}
    )

    response = await client.get(f"{TASK_URL}?status=completed")
    assert response.status_code == 200
    data = response.json()
    assert all(task["status"] == "completed" for task in data)


@pytest.mark.asyncio
async def test_update_task_status(client):
    res = await client.post(TASK_URL, json={"title": "Task to Update"})
    task_id = res.json()["id"]

    update = await client.patch(
        f"{TASK_URL}/{task_id}", json={"status": "in_progress"}
    )
    assert update.status_code == 200
    assert update.json()["status"] == "in_progress"


@pytest.mark.asyncio
async def test_delete_task(client):
    res = await client.post(TASK_URL, json={"title": "Task to Delete"})
    task_id = res.json()["id"]

    delete = await client.delete(f"{TASK_URL}/{task_id}")
    assert delete.status_code == 200
    assert delete.json()["message"] == "Task deleted"

    # Check it no longer exists
    res = await client.get(TASK_URL)
    assert all(task["id"] != task_id for task in res.json())
