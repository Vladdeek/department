from sqlalchemy import Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True)
    user_fullname = Column(String, index=True)
    email = Column(String, index=True)
    image_path = Column(String, index=True)
    department_id = Column(Integer, ForeignKey('Department.id'), nullable=False)

    department = relationship("Department", back_populates="users") 
    executing_tasks = relationship("Task", back_populates="executing_user", foreign_keys='Task.executing')
    sent_tasks = relationship("Task", back_populates="sender_user", foreign_keys='Task.sender')


class Priority(Base):
    __tablename__ = "Priority"

    id = Column(Integer, primary_key=True, index=True)
    priority = Column(String, index=True)

    tasks = relationship("Task", back_populates="priority")

class Status(Base):
    __tablename__ = 'Status'

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, index=True)  

    tasks = relationship("Task", back_populates="status")

class Cabinet(Base):
    __tablename__ = "Cabinet"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, index=True)  

    department = relationship("Department", back_populates="cabinet", uselist=False)  


class Department(Base):
    __tablename__ = "Department"

    id = Column(Integer, primary_key=True, index=True)
    DepName = Column(String, index=True)
    cabinet_id = Column(Integer, ForeignKey("Cabinet.id"), nullable=True)  

    cabinet = relationship("Cabinet", back_populates="department", uselist=False)  

    users = relationship("User", back_populates="department")



class Task(Base):
    __tablename__ = "Task"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    priority_id = Column(Integer, ForeignKey('Priority.id'), nullable=False)
    executing = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    sender = Column(Integer, ForeignKey('User.user_id'), nullable=False)
    date = Column(DateTime, index=True)
    status_id = Column(Integer, ForeignKey('Status.id'), nullable=False)
    
    status = relationship("Status", back_populates="tasks")
    executing_user = relationship("User", back_populates="executing_tasks", foreign_keys=[executing])
    sender_user = relationship("User", back_populates="sent_tasks", foreign_keys=[sender])
    priority = relationship("Priority", back_populates="tasks")
