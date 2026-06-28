from __future__ import annotations

import json
import re
from typing import TypeVar

from pydantic import BaseModel, ValidationError

from app.llm.exceptions import ParsingError

ModelT = TypeVar("ModelT", bound=BaseModel)


class LLMParser:
    """Extract and validate structured JSON from raw model output."""

    _code_fence_pattern = re.compile(r"```(?:json)?\s*(.*?)```", re.IGNORECASE | re.DOTALL)

    def parse_json(self, raw_output: str, response_model: type[ModelT]) -> ModelT:
        payload = self.extract_json(raw_output)
        try:
            return response_model.model_validate_json(payload)
        except ValidationError as exc:
            raise ParsingError(f"LLM JSON did not match schema: {exc}") from exc
        except ValueError as exc:
            raise ParsingError(f"LLM output was not valid JSON: {exc}") from exc

    def extract_json(self, raw_output: str) -> str:
        cleaned = self._strip_markdown(raw_output).strip()
        if self._is_json(cleaned):
            return cleaned

        start = self._find_json_start(cleaned)
        end = self._find_json_end(cleaned)
        if start == -1 or end == -1 or end <= start:
            raise ParsingError("LLM response did not contain a JSON object or array.")

        candidate = cleaned[start : end + 1]
        if not self._is_json(candidate):
            raise ParsingError("Extracted LLM JSON fragment is invalid.")
        return candidate

    def _strip_markdown(self, raw_output: str) -> str:
        match = self._code_fence_pattern.search(raw_output)
        if match:
            return match.group(1)
        return raw_output.replace("```json", "").replace("```", "")

    def _is_json(self, value: str) -> bool:
        try:
            json.loads(value)
        except json.JSONDecodeError:
            return False
        return True

    def _find_json_start(self, value: str) -> int:
        object_start = value.find("{")
        array_start = value.find("[")
        candidates = [index for index in (object_start, array_start) if index != -1]
        return min(candidates) if candidates else -1

    def _find_json_end(self, value: str) -> int:
        object_end = value.rfind("}")
        array_end = value.rfind("]")
        return max(object_end, array_end)
