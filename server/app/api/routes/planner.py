from fastapi import APIRouter

router = APIRouter(prefix="/planner", tags=["planner"])


@router.post("/run")
async def run_planner() -> dict[str, object]:
    return {
        "mission_id": "mission_mock_001",
        "status": "accepted",
        "planner": {"state": "queued", "message": "Planner runtime placeholder accepted the request."},
        "execution_graph": {"nodes": [], "edges": []},
    }

