# Makefile for managing backend and frontend tasks via Docker Compose

# Backend container name (from docker-compose)
BACKEND_SERVICE=backend

# Frontend container name (from docker-compose)
FRONTEND_SERVICE=frontend

## ---------- Frontend Commands ----------

frontend-test:
	docker-compose exec $(FRONTEND_SERVICE) npm run test

frontend-lint:
	docker-compose exec $(FRONTEND_SERVICE) npm run lint

## ---------- Backend Commands ----------

backend-format:
	docker-compose exec $(BACKEND_SERVICE) black --line-length 79 .
	docker-compose exec $(BACKEND_SERVICE) isort .

backend-lint:
	docker-compose exec $(BACKEND_SERVICE) flake8 app

backend-test:
	docker-compose exec $(BACKEND_SERVICE) bash -c "PYTHONPATH=. ENV_FILE=.env.test pytest -v --disable-warnings"

## ---------- Combined Commands ----------

check-backend: backend-format backend-lint backend-test

check-frontend: frontend-lint frontend-test

check-all: check-backend check-frontend
