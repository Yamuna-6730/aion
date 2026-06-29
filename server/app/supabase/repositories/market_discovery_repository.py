from __future__ import annotations

import asyncio
import re
from typing import Any

from app.core.exceptions import AionError
from app.core.logger import app_logger
from app.schemas.market_discovery import DiscoveredCompany
from app.supabase.client import SupabaseClient


class MarketDiscoveryPersistenceError(AionError):
    error_code = "MARKET_DISCOVERY_PERSISTENCE_ERROR"


class MarketDiscoveryRepository:
    """Persistence for market discovery company evidence."""

    def __init__(self, client: Any | None = None) -> None:
        self.client = client or SupabaseClient.get_client()
        self.table_name = "market_discovery_results"

    async def save_results(self, mission_id: str, companies: list[DiscoveredCompany]) -> list[dict[str, Any]]:
        if not companies:
            return []
        payload = [self._row(mission_id, company) for company in companies]
        # Use upsert on mission_id + website to avoid duplicates
        result = await asyncio.to_thread(lambda: self._upsert_with_schema_fallback(mission_id, payload))
        data = getattr(result, "data", result)
        if not isinstance(data, list):
            raise MarketDiscoveryPersistenceError("Market discovery upsert returned an unexpected response.")

        # Verify rows exist via SELECT COUNT(*) / select(*)
        verified = await self.list_by_mission(mission_id)
        app_logger.info(
            "Supabase Insert Count",
            mission_id=mission_id,
            inserted=len(data),
            table=self.table_name,
        )
        app_logger.info(
            "Supabase Verification Count",
            mission_id=mission_id,
            verified=len(verified),
            table=self.table_name,
        )
        if len(verified) < len(companies):
            raise MarketDiscoveryPersistenceError(
                "Market discovery upsert verification failed.",
                {"mission_id": mission_id, "inserted": len(data), "verified": len(verified), "table": self.table_name},
            )
        return verified

    async def list_by_mission(self, mission_id: str) -> list[dict[str, Any]]:
        result = await asyncio.to_thread(
            lambda: self.client.table(self.table_name).select("*").eq("mission_id", mission_id).execute()
        )
        data = getattr(result, "data", result)
        return data if isinstance(data, list) else []

    def _upsert_with_schema_fallback(self, mission_id: str, payload: list[dict[str, Any]]) -> Any:
        candidate_payload = [dict(row) for row in payload]
        removed_columns: list[str] = []
        while True:
            try:
                return self.client.table(self.table_name).upsert(candidate_payload, on_conflict="mission_id,website").execute()
            except Exception as exc:
                missing_column = self._missing_schema_column(exc)
                if missing_column is None:
                    raise
                removed_columns.append(missing_column)
                for row in candidate_payload:
                    row.pop(missing_column, None)
                app_logger.warning(
                    "Retrying market discovery Supabase write without missing column",
                    mission_id=mission_id,
                    table=self.table_name,
                    column=missing_column,
                    removed_columns=removed_columns,
                    payload=candidate_payload,
                    error=str(exc),
                )

    def _missing_schema_column(self, exc: Exception) -> str | None:
        message = str(exc)
        match = re.search(r"Could not find the '([^']+)' column", message)
        if match:
            return match.group(1)
        return None

    def _row(self, mission_id: str, company: DiscoveredCompany) -> dict[str, Any]:
        return {
            "mission_id": mission_id,
            "company_name": company.company_name,
            "website": company.website,
            "summary": company.summary,
            "industry": company.industry,
            "country": company.country,
            "headquarters": company.headquarters,
            "products": company.products,
            "services": company.services,
            "technologies": company.technologies,
            "customer_logos": company.customer_logos,
            "use_cases": company.use_cases,
            "careers_page": company.careers_page,
            "about_page": company.about_page,
            "evidence": [item.model_dump(mode="json") for item in company.evidence],
            "metadata": company.metadata,
        }

