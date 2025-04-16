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

class CabinetBase(BaseModel):
    number: str

class CabinetCreate(CabinetBase):
    pass

class Cabinet(CabinetBase):
    id: int

    class Config:
        orm_mode = True

class StatusBase(BaseModel):
    status: str

class StatusCreate(StatusBase):
    pass

class Status(StatusBase):
    id: int

    class Config:
        orm_mode = True

class DepartmentBase(BaseModel):
    DepName: str

class DepartmentCreate(DepartmentBase):
    pass

class Department(DepartmentBase):
    id: int
    cabinet: Optional[Cabinet]  

    class Config:
        orm_mode = True
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
    status_id: int

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    executing_user: User 
    sender_user: User  
    priority: Priority 
    status: Status

    class Config:
        orm_mode = True
        exclude = {'executing_user__department', 'sender_user__department'}




