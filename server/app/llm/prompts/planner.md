Agent: {{agent}}

Convert the mission, strategy, ICP, mission intelligence, and available agent registry into an executable DAG.

Mission:
{{mission}}

Planning Inputs:
{{memory}}

Expected JSON schema:
{{schema}}

Rules:
- Choose only necessary registered agents.
- Prefer parallel groups when dependencies allow it.
- Include RecommendationAgent/recommendation last.
- Use React Flow compatible nodes and edges when emitting nodes and edges.
- Mark every initial node status as PENDING.
