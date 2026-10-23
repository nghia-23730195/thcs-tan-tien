from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routers import rag, quiz, lab, iot, formulas

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API cho Nền tảng học & thí nghiệm Vật Lý THCS (KHTN 6-9) — ký hiệu chuẩn SI / ISO 80000, RAG AI & IoT Vernier",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(rag.router, prefix=settings.API_V1_STR)
app.include_router(quiz.router, prefix=settings.API_V1_STR)
app.include_router(lab.router, prefix=settings.API_V1_STR)
app.include_router(iot.router, prefix=settings.API_V1_STR)
app.include_router(formulas.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "online",
        "docs_url": "/docs",
        "endpoints": [
            f"{settings.API_V1_STR}/rag/query",
            f"{settings.API_V1_STR}/quiz/exam-2025",
            f"{settings.API_V1_STR}/lab/buoyancy",
            f"{settings.API_V1_STR}/lab/circuit",
            f"{settings.API_V1_STR}/lab/lens",
            f"{settings.API_V1_STR}/lab/lever",
            f"{settings.API_V1_STR}/formulas",
            f"{settings.API_V1_STR}/iot/ws/vernier (WebSocket)"
        ]
    }
