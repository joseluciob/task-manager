.PHONY: format lint test run clean migrate upgrade revision

format:
	black --line-length 79 .
	isort .

lint:
	flake8 app

test:
	pytest -v --disable-warnings

run:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

clean:
	find . -type d -name '__pycache__' -exec rm -r {} +
	find . -type f -name '*.pyc' -delete

migrate:
	alembic upgrade head

upgrade:
	alembic upgrade head

revision:
	alembic revision --autogenerate -m "auto revision"

install:
	python -m venv .venv && . .venv/bin/activate && pip install -r requirements.txt
