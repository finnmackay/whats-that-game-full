from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api import users, games, auth
from backend.db.database import engine, Base

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://127.0.0.1:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(games.router, prefix="/games", tags=["games"])
app.include_router(auth.router, prefix="", tags=["auth"])


@app.get("/")
def read_root():
    return {"message": "Welcome to Games Repository API"}
