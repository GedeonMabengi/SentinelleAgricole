"""
Sentinelle Agricole - ML Service
FastAPI service for yield prediction and disease detection
"""

import os
import pickle
import tempfile
from contextlib import asynccontextmanager
from typing import List, Optional

import httpx
import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.ensemble import RandomForestRegressor

# Import custom modules
from app.services.yield_predictor import YieldPredictor
from app.services.disease_detector import DiseaseDetector
from app.services.llm_service import LlmService

# Global model instances
yield_predictor: Optional[YieldPredictor] = None
disease_detector: Optional[DiseaseDetector] = None
llm_service: Optional[LlmService] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global yield_predictor, disease_detector, llm_service
    yield_predictor = YieldPredictor()
    disease_detector = DiseaseDetector()
    llm_service = LlmService()
    yield
    # Cleanup
    pass


app = FastAPI(
    title="Sentinelle Agricole ML API",
    description="Machine Learning services for Smart Agriculture",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# === Request/Response Models ===

class YieldPredictionRequest(BaseModel):
    crop_name: str
    area_hectares: float
    region: str
    rainfall_mm: Optional[float] = None
    soil_type: Optional[str] = None
    fertilizer_used: Optional[bool] = False
    fertilizer_type: Optional[str] = None
    avg_temperature: Optional[float] = None
    humidity_percent: Optional[float] = None


class YieldPredictionResponse(BaseModel):
    predicted_yield_tons: float
    confidence_percent: float
    feature_importance: dict
    message: str = "Prediction successful"


class DiseaseDetectionResponse(BaseModel):
    detected_disease: str
    confidence_percent: float
    recommendations: str
    top_predictions: List[dict]


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    model: str = "llama3.2"
    messages: List[ChatMessage]
    temperature: float = 0.7
    max_tokens: int = 1024


class ChatResponse(BaseModel):
    model: str
    message: ChatMessage
    usage: dict


# === Endpoints ===

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ml-service"}


@app.post("/api/predict/yield", response_model=YieldPredictionResponse)
async def predict_yield(request: YieldPredictionRequest):
    try:
        if yield_predictor is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        result = yield_predictor.predict(request.model_dump())
        return YieldPredictionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/detect/disease", response_model=DiseaseDetectionResponse)
async def detect_disease(data: dict):
    try:
        if disease_detector is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        image_url = data.get("image_url")
        if not image_url:
            raise HTTPException(status_code=400, detail="image_url is required")

        result = disease_detector.predict_from_url(image_url)
        return DiseaseDetectionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/detect/disease/upload", response_model=DiseaseDetectionResponse)
async def detect_disease_upload(file: UploadFile = File(...)):
    try:
        if disease_detector is None:
            raise HTTPException(status_code=503, detail="Model not loaded")

        contents = await file.read()
        result = disease_detector.predict_from_bytes(contents)
        return DiseaseDetectionResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        if llm_service is None:
            raise HTTPException(status_code=503, detail="LLM service not loaded")

        messages = [msg.model_dump() for msg in request.messages]
        result = llm_service.chat(messages, request.model, request.temperature, request.max_tokens)

        return ChatResponse(
            model=result.get("model", request.model),
            message=ChatMessage(role="assistant", content=result["content"]),
            usage=result.get("usage", {}),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__:
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
