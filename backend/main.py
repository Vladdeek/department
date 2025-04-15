import random
import ast
import requests
from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, desc
from passlib.context import CryptContext # библиотека для ХЕША паролей 

#импорт наших классов
from database import engine, session_local
from models import Base, User, Task
from schemas import UserCreate, User as UserSchema, TaskCreate, Task as TaskSchema


app = FastAPI()

# Импортируем CORSMiddleware для разрешения кросс-доменных запросов
# CORS (Cross-Origin Resource Sharing) нужно, чтобы фронтенд с другого домена/порта мог отправлять запросы на наш сервер
from fastapi.middleware.cors import CORSMiddleware

# Разрешаем все источники для теста
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #Настройка контекста для bcrypt


# функция создает сессию для подключения к ДБ
def get_db():
    db = session_local()
    try:
        yield db 
    finally:
        db.close()

@app.post("/reg_user/", response_model=UserSchema)  
async def create_user(user: UserCreate, db: Session = Depends(get_db)) -> UserSchema:
    db_user = User(
        user_id=user.user_id,
        user_fullname=user.user_fullname,
        email=user.email,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user  

@app.get("/user/{userId}")
async def check_user(userId: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == userId).first()
    if user:
        return user
    raise HTTPException(status_code=404, detail="Пользователь не найден")

@app.get("/auth/{userId}")
async def check_user(userId: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == userId).first()
    if user:
        return {"exists": True}
    raise HTTPException(status_code=404, detail="Пользователь не найден")


@app.post("/task", response_model=TaskSchema)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(
        title=task.title,
        description=task.description,
        priority_id=task.priority_id,
        executing=task.executing,
        sender=task.sender,
        date=task.date
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@app.get("/TaskToMe/{user_id}", response_model=List[TaskSchema])
def get_tasks_by_executing_user(user_id: int, db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.executing == user_id).all()

    if not tasks:
        raise HTTPException(status_code=404, detail="Задачи для пользователя не найдены")

    return tasks

@app.get("/TaskFromMe/{user_id}", response_model=List[TaskSchema])
def get_tasks_by_executing_user(user_id: int, db: Session = Depends(get_db)):
    tasks = db.query(Task).filter(Task.sender == user_id).all()

    if not tasks:
        raise HTTPException(status_code=404, detail="Задачи для пользователя не найдены")

    return tasks

@app.get("/task-counts/{user_id}")
async def get_task_counts(user_id: int, db: Session = Depends(get_db)):
    to_me_count = db.query(Task).filter(Task.executing == user_id).count()
    from_me_count = db.query(Task).filter(Task.sender == user_id).count()
    return {"to_me": to_me_count, "from_me": from_me_count}
