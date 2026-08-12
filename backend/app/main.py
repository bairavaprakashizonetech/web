from typing import List, Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db, init_db
from app import schemas, crud

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize DB tables on application startup
    init_db()
    yield

app = FastAPI(
    title="Task Manager API",
    description="Production-ready FastAPI backend for Task Manager application",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health Check"])
def health_check():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "service": "task-manager-api"
    }

@app.get("/api/tasks/stats", response_model=schemas.TaskStats, tags=["Tasks"])
def get_task_stats(db: Session = Depends(get_db)):
    return crud.get_task_stats(db)

@app.get("/api/tasks", response_model=List[schemas.TaskResponse], tags=["Tasks"])
def read_tasks(
    search: Optional[str] = Query(None, description="Search query for title or description"),
    status: Optional[str] = Query(None, description="Filter by status: all, active, completed"),
    priority: Optional[str] = Query(None, description="Filter by priority: all, low, medium, high"),
    sort_by: str = Query("created_desc", description="Sort by: created_desc, created_asc, due_date, priority"),
    db: Session = Depends(get_db)
):
    return crud.get_tasks(db, search=search, status=status, priority=priority, sort_by=sort_by)

@app.post("/api/tasks", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED, tags=["Tasks"])
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@app.get("/api/tasks/{task_id}", response_model=schemas.TaskResponse, tags=["Tasks"])
def read_task(task_id: int, db: Session = Depends(get_db)):
    db_task = crud.get_task_by_id(db, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail=f"Task with ID {task_id} not found")
    return db_task

@app.put("/api/tasks/{task_id}", response_model=schemas.TaskResponse, tags=["Tasks"])
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = crud.update_task(db, task_id, task)
    if not updated_task:
        raise HTTPException(status_code=404, detail=f"Task with ID {task_id} not found")
    return updated_task

@app.patch("/api/tasks/{task_id}/toggle", response_model=schemas.TaskResponse, tags=["Tasks"])
def toggle_task(task_id: int, db: Session = Depends(get_db)):
    toggled_task = crud.toggle_task_completion(db, task_id)
    if not toggled_task:
        raise HTTPException(status_code=404, detail=f"Task with ID {task_id} not found")
    return toggled_task

@app.delete("/api/tasks/{task_id}", status_code=status.HTTP_200_OK, tags=["Tasks"])
def delete_task(task_id: int, db: Session = Depends(get_db)):
    success = crud.delete_task(db, task_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Task with ID {task_id} not found")
    return {"message": f"Task {task_id} deleted successfully"}
