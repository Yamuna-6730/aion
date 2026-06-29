from __future__ import annotations

from typing import Any
from pydantic import BaseModel
from app.schemas.strategy import MissionStatus


class MissionRunRequest(BaseModel):
    mission_id: str


class MissionOrchestratorResponse(BaseModel):
    mission_id: str
    status: str
    strategy: dict[str, Any] | None = None
    planner: dict[str, Any] | None = None
    shared_memory: dict[str, Any] = {}
    database: dict[str, bool] = {}
    execution_time: float
    confidence: float
