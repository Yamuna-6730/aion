from __future__ import annotations

from fastapi import APIRouter, Depends, status

from app.schemas.missions import MissionOrchestratorResponse, MissionRunRequest
from app.services.mission_orchestrator import MissionOrchestratorService

router = APIRouter(prefix="/missions", tags=["missions"])


def get_mission_orchestrator_service() -> MissionOrchestratorService:
    return MissionOrchestratorService()


@router.post("/run", response_model=MissionOrchestratorResponse, status_code=status.HTTP_200_OK)
async def run_mission(
    request: MissionRunRequest,
    service: MissionOrchestratorService = Depends(get_mission_orchestrator_service),
) -> MissionOrchestratorResponse:
    return await service.run(request.mission_id)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_mission() -> dict[str, object]:
    return {
        "id": "mission_mock_001",
        "mission_id": "mission_mock_001",
        "name": "Enterprise account discovery",
        "objective": "Identify high-fit B2B opportunities.",
        "status": "created",
    }


@router.get("")
async def list_missions() -> dict[str, object]:
    return {
        "items": [
            {
                "id": "mission_mock_001",
                "mission_id": "mission_mock_001",
                "name": "Enterprise account discovery",
                "status": "created",
            }
        ],
        "total": 1,
    }


@router.get("/{mission_id}")
async def get_mission(mission_id: str) -> dict[str, object]:
    return {
        "id": mission_id,
        "mission_id": mission_id,
        "name": "Enterprise account discovery",
        "objective": "Identify high-fit B2B opportunities.",
        "status": "created",
        "timeline": [],
        "agent_executions": [],
        "signals": [],
        "companies": [],
        "recommendations": [],
    }
