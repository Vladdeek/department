from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# --- USER ---

class UserBase(BaseModel):
    user_id: int
    user_fullname: str
    email: str
    department_id: int
    image_path: Optional[str] = None

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    department_id: int  # Только ID департамента, чтобы избежать рекурсии

    class Config:
        orm_mode = True
        # Исключаем из сериализации поле department, чтобы избежать циклической зависимости
        exclude = {'department'}

# --- DEPARTMENT ---

class DepartmentBase(BaseModel):
    DepName: str

class DepartmentCreate(DepartmentBase):
    pass

class Department(DepartmentBase):
    id: int

    class Config:
        orm_mode = True
        # Исключаем поле users из сериализации, чтобы избежать рекурсии
        exclude = {'users'}

# --- PRIORITY ---

class PriorityBase(BaseModel):
    priority: str

class PriorityCreate(PriorityBase):
    pass

class Priority(PriorityBase):
    id: int

    class Config:
        orm_mode = True

# --- TASK ---

class TaskBase(BaseModel):
    title: str
    description: str
    priority_id: int
    executing: int
    sender: int
    date: Optional[datetime] = None

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    executing_user: User  # Связь с executing_user
    sender_user: User  # Связь с sender_user
    priority: Priority  # Связь с Priority

    class Config:
        orm_mode = True
        # Исключаем поле department из сериализованных данных executing_user и sender_user
        exclude = {'executing_user__department', 'sender_user__department'}

