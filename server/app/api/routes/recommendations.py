from fastapi import APIRouter

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("")
async def list_recommendations() -> dict[str, object]:
    return {
        "items": [
            {
                "id": "recommendation_mock_001",
                "mission_id": "mission_mock_001",
                "company_id": "company_mock_001",
                "summary": "Placeholder recommendation.",
                "score": 0.0,
                "rationale": {},
            }
        ],
        "total": 1,
    }

