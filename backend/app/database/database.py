import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config.settings import settings

# Determine database URL with canonical path for SQLite
db_url = settings.DATABASE_URL
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
default_sqlite_file = os.path.join(backend_dir, "academic_recovery.db")

if db_url.startswith("sqlite"):
    # Ensure canonical absolute file path to avoid directory-drift between root and backend
    if ":memory:" not in db_url:
        db_url = f"sqlite:///{default_sqlite_file.replace(os.sep, '/')}"

connect_args = {"check_same_thread": False} if db_url.startswith("sqlite") else {}

try:
    engine = create_engine(db_url, connect_args=connect_args)
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
except Exception as err:
    print(f"Database connection note: primary database URL failed ({err}). Falling back to local SQLite at {default_sqlite_file}")
    db_url = f"sqlite:///{default_sqlite_file.replace(os.sep, '/')}"
    engine = create_engine(db_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
