from fastapi import APIRouter

from app.agents.catalog import INITIAL_AGENT_CLASSES

router = APIRouter(prefix="/agents", tags=["agents"])


@router.get("")
async def list_agents() -> dict[str, object]:
    return {
        "items": [
            {
                "name": agent_class.name,
                "category": agent_class.category,
                "version": agent_class.version,
                "description": agent_class.description,
            }
            for agent_class in INITIAL_AGENT_CLASSES
        ],
        "total": len(INITIAL_AGENT_CLASSES),
    }

