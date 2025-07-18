#!/bin/bash
set -e

# Wait for PostgreSQL
./wait-for-it.sh db:5432 --timeout=30 --strict -- echo "PostgreSQL is ready"

# Run migrations
alembic upgrade head

# Start the application
uvicorn app.main:app --host 0.0.0.0 --reload
