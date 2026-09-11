"""
AI Academic Recovery & Course Progress Agent - FastAPI Backend
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.database.seed import seed_database

# Routers
from app.api.auth import router as auth_router
from app.api.courses import router as courses_router
from app.api.attendance import router as attendance_router
from app.api.progress import router as progress_router
from app.api.timetable import router as timetable_router
from app.api.recovery import router as recovery_router
from app.api.reports import router as reports_router
from app.api.ai_assistant import router as ai_assistant_router
from app.api.rag import router as rag_router, seed_initial_rag_documents
from app.api.integrations import router as integrations_router
from app.api.notifications import router as notifications_router
from app.integrations.scheduler import start_scheduler, stop_scheduler
from app.services.notification_service import manager as notification_manager
import asyncio

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Register active event loop for async WebSocket broadcasts
    try:
        notification_manager.set_loop(asyncio.get_running_loop())
    except Exception:
        pass

    # Startup sequence
    try:
        seed_database()
    except Exception as e:
        print(f"Startup database seeding note: {e}")
    try:
        seed_initial_rag_documents()
    except Exception as e:
        print(f"Startup RAG seeding note: {e}")
    try:
        start_scheduler()
    except Exception as e:
        print(f"Startup scheduler note: {e}")
    
    yield

    # Shutdown sequence
    try:
        stop_scheduler()
    except Exception as e:
        print(f"Shutdown scheduler note: {e}")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    lifespan=lifespan
)

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router)
app.include_router(courses_router)
app.include_router(attendance_router)
app.include_router(progress_router)
app.include_router(timetable_router)
app.include_router(recovery_router)
app.include_router(reports_router)
app.include_router(ai_assistant_router)
app.include_router(rag_router)
app.include_router(integrations_router)
app.include_router(notifications_router)

@app.get("/")
def read_root():
    return {
        "message": "AI Academic Recovery & Course Progress Agent API is operational",
        "version": settings.VERSION,
        "docs": "/docs"
    }
