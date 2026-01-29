# What's That Game

A game discovery and sharing platform.

## Structure

- `backend/` - FastAPI backend (Python)
- `frontend/` - React frontend (Vite)

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

Runs on http://localhost:8000

### API Endpoints

- `POST /auth/token` - Login
- `POST /users/register` - Register
- `GET /users/me` - Get current user
- `GET /games/` - List games
- `POST /games/` - Create game
- `POST /games/{id}/upvote` - Upvote game
- `POST /games/{id}/downvote` - Downvote game

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173
