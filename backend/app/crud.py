from typing import List, Optional
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate

def get_tasks(
    db: Session, 
    search: Optional[str] = None,
    status: Optional[str] = None, # 'all', 'completed', 'active'
    priority: Optional[str] = None, # 'all', 'low', 'medium', 'high'
    sort_by: str = "created_desc" # 'created_desc', 'created_asc', 'due_date', 'priority'
) -> List[Task]:
    query = db.query(Task)

    # Search filter
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            or_(
                Task.title.ilike(search_pattern),
                Task.description.ilike(search_pattern)
            )
        )

    # Status filter
    if status == "completed":
        query = query.filter(Task.completed == True)
    elif status == "active":
        query = query.filter(Task.completed == False)

    # Priority filter
    if priority and priority != "all":
        query = query.filter(Task.priority == priority)

    # Sorting
    if sort_by == "created_asc":
        query = query.order_by(asc(Task.created_at))
    elif sort_by == "due_date":
        query = query.order_by(Task.due_date.asc().nulls_last())
    elif sort_by == "priority":
        # Order by high, medium, low
        query = query.order_by(
            Task.priority == "low",
            Task.priority == "medium",
            Task.priority == "high"
        )
    else: # default created_desc
        query = query.order_by(desc(Task.created_at))

    return query.all()

def get_task_by_id(db: Session, task_id: int) -> Optional[Task]:
    return db.query(Task).filter(Task.id == task_id).first()

def create_task(db: Session, task: TaskCreate) -> Task:
    db_task = Task(
        title=task.title,
        description=task.description,
        completed=task.completed,
        priority=task.priority,
        due_date=task.due_date
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task_update: TaskUpdate) -> Optional[Task]:
    db_task = get_task_by_id(db, task_id)
    if not db_task:
        return None

    update_data = task_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_task, field, value)

    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int) -> bool:
    db_task = get_task_by_id(db, task_id)
    if not db_task:
        return False
    db.delete(db_task)
    db.commit()
    return True

def toggle_task_completion(db: Session, task_id: int) -> Optional[Task]:
    db_task = get_task_by_id(db, task_id)
    if not db_task:
        return None
    db_task.completed = not db_task.completed
    db_task.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task_stats(db: Session) -> dict:
    total = db.query(Task).count()
    completed = db.query(Task).filter(Task.completed == True).count()
    pending = db.query(Task).filter(Task.completed == False).count()
    high_priority = db.query(Task).filter(Task.priority == "high", Task.completed == False).count()

    return {
        "total": total,
        "completed": completed,
        "pending": pending,
        "high_priority": high_priority
    }
