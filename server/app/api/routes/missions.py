from fastapi import APIRouter, status

router = APIRouter(prefix="/missions", tags=["missions"])


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

