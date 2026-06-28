from __future__ import annotations

import asyncio
import re
from datetime import UTC, datetime
from typing import Any

from app.core.exceptions import ResourceNotFoundError
from app.core.logger import app_logger
from app.schemas.strategy import MissionIntelligence, MissionStatus
from app.supabase.client import SupabaseClient


class MissionRepository:
    """Repository for persistence against the Supabase missions table."""

    def __init__(self, client: Any | None = None) -> None:
        self.client = client or SupabaseClient.get_client()
        self.table_name = "missions"

    async def create_mission(self, *, title: str, objective: str) -> dict[str, Any]:
        payload = {
            "title": title,
            "objective": objective,
            "status": MissionStatus.CREATED.value,
            "updated_at": datetime.now(UTC).isoformat(),
        }
        return await asyncio.to_thread(self._insert, payload)

    async def get_mission(self, mission_id: str) -> dict[str, Any]:
        result = await asyncio.to_thread(
            lambda: self.client.table(self.table_name).select("*").eq("id", mission_id).single().execute()
        )
        data = self._response_data(result)
        if not data:
            raise ResourceNotFoundError("Mission not found", {"mission_id": mission_id})
        return data

    async def update_strategy(self, mission_id: str, intelligence: MissionIntelligence) -> dict[str, Any]:
        payload = {
            "strategy": intelligence.model_dump(mode="json"),
            "icp": intelligence.icp.model_dump(mode="json"),
            "blueprint": {
                "target_personas": [persona.model_dump(mode="json") for persona in intelligence.target_personas],
                "qualification_rules": [
                    rule.model_dump(mode="json") for rule in intelligence.qualification_rules
                ],
                "business_triggers": [
                    trigger.model_dump(mode="json") for trigger in intelligence.business_triggers
                ],
                "technology_preferences": [
                    preference.model_dump(mode="json") for preference in intelligence.technology_preferences
                ],
                "recommended_agents": [
                    agent.model_dump(mode="json") for agent in intelligence.recommended_agents
                ],
            },
            "confidence": intelligence.confidence,
            "status": MissionStatus.STRATEGY_COMPLETED.value,
            "updated_at": datetime.now(UTC).isoformat(),
        }
        return await self._update(mission_id, payload)

    async def update_status(self, mission_id: str, status: MissionStatus) -> dict[str, Any]:
        return await self._update(
            mission_id,
            {
                "status": status.value,
                "updated_at": datetime.now(UTC).isoformat(),
            },
        )

    async def list_missions(self) -> list[dict[str, Any]]:
        result = await asyncio.to_thread(
            lambda: self.client.table(self.table_name).select("*").order("updated_at", desc=True).execute()
        )
        data = self._response_data(result)
        return data if isinstance(data, list) else []

    def _insert(self, payload: dict[str, Any]) -> dict[str, Any]:
        result = self._execute_with_schema_fallback(
            lambda candidate: self.client.table(self.table_name).insert(candidate),
            payload,
        )
        data = self._response_data(result)
        if isinstance(data, list) and data:
            return data[0]
        if isinstance(data, dict):
            return data
        app_logger.warning("Supabase mission insert returned no data")
        return payload

    async def _update(self, mission_id: str, payload: dict[str, Any]) -> dict[str, Any]:
        result = await asyncio.to_thread(
            lambda: self._execute_with_schema_fallback(
                lambda candidate: self.client.table(self.table_name).update(candidate).eq("id", mission_id),
                payload,
            )
        )
        data = self._response_data(result)
        if isinstance(data, list) and data:
            return data[0]
        if isinstance(data, dict):
            return data
        return payload | {"id": mission_id}

    def _response_data(self, response: Any) -> Any:
        return getattr(response, "data", response)

    def _execute_with_schema_fallback(self, builder_factory: Any, payload: dict[str, Any]) -> Any:
        candidate = payload.copy()
        removed_columns: list[str] = []
        while True:
            try:
                return builder_factory(candidate).execute()
            except Exception as exc:
                missing_column = self._missing_schema_column(exc)
                if missing_column is None or missing_column not in candidate:
                    raise
                removed_columns.append(missing_column)
                candidate.pop(missing_column)
                app_logger.warning(
                    "Retrying Supabase write without missing column",
                    table=self.table_name,
                    column=missing_column,
                    removed_columns=removed_columns,
                )

    def _missing_schema_column(self, exc: Exception) -> str | None:
        message = str(exc)
        match = re.search(r"Could not find the '([^']+)' column", message)
        if match:
            return match.group(1)
        return None
