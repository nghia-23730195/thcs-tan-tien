from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.services.rag_service import rag_service

router = APIRouter(prefix="/rag", tags=["Physics RAG"])

class QueryRequest(BaseModel):
    query: str
    grade: Optional[int] = 11

class QueryResponse(BaseModel):
    query: str
    answer: str
    sources: List[Dict[str, Any]]
    provider: str

@router.post("/query", response_model=QueryResponse)
async def query_physics_knowledge(req: QueryRequest):
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    result = await rag_service.answer_physics_query(req.query)
    return result

@router.get("/docs")
async def list_knowledge_documents():
    return {"documents": rag_service.docs}
