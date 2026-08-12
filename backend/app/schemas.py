from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Title of the task")
    description: Optional[str] = Field(None, description="Detailed description of the task")
    completed: bool = Field(False, description="Completion status")
    priority: str = Field("medium", pattern="^(low|medium|high)$", description="Priority level: low, medium, high")
    due_date: Optional[datetime] = Field(None, description="Due date for task completion")

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = Field(None, pattern="^(low|medium|high)$")
    due_date: Optional[datetime] = None

class TaskResponse(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class TaskStats(BaseModel):
    total: int
    completed: int
    pending: int
    high_priority: int
