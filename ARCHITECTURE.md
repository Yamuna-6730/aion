# AION Backend Architecture

## Autonomous Intelligence Operating Network

> *"AION is not an application. It is an operating system for autonomous business intelligence."*

---

## Table of Contents

1. [Vision & Core Philosophy](#vision--core-philosophy)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Phased Implementation Roadmap](#phased-implementation-roadmap)
5. [Component Details](#component-details)
6. [Data Models](#data-models)
7. [API Specifications](#api-specifications)
8. [Deployment Strategy](#deployment-strategy)

---

## Vision & Core Philosophy

### Problem Statement
Traditional business intelligence platforms answer questions.

AION executes missions.

Instead of asking users to manually search websites, compare companies, collect signals, and generate recommendations, AION decomposes a business objective into a directed graph of autonomous AI agents that collaborate toward a common goal.

### Core Architectural Principles

#### 1. Mission First
Everything begins with a **Mission**—not a prompt, but an executable objective.

Every component operates on the mission rather than isolated requests.

#### 2. Agent-Oriented Execution
Each agent has one responsibility. Agents never contain business logic belonging to another agent.

Agent Examples:
- Company Discovery: Discovers candidate companies
- Website Agent: Extracts website intelligence
- LinkedIn Agent: Gathers organizational insights
- Tech Stack Agent: Analyzes technologies
- Business DNA Agent: Understands business models
- Signal Aggregation: Combines evidence
- Confidence Agent: Evaluates certainty
- Recommendation Agent: Produces final decision

#### 3. Planner Before Execution
No agent executes directly. Every mission passes through the **Planner**, which transforms natural language into an executable Directed Acyclic Graph (DAG).

#### 4. Shared Mission Memory
Agents never communicate directly. They publish structured outputs into **Shared Mission Memory**. Every downstream agent consumes previous intelligence from this shared memory.

#### 5. Explainable AI
Every decision is traceable. Every agent returns:
- Reasoning
- Confidence
- Evidence
- Metadata
- Structured output

Nothing is treated as a black box.

---

## System Architecture

### High-Level Data Flow

```
User
 │
 ▼
Next.js Frontend
 │
 ▼
FastAPI REST Gateway
 │
 ▼
Authentication Layer
 │
 ▼
Mission Service
 │
 ▼
Planner Service
 │
 ▼
LLM Planning Engine (Gemini)
 │
 ▼
Execution Blueprint (DAG)
 │
 ├─────────────────────┐
 ▼                     ▼
Parallel Agents    Dependency Resolution
 │                     │
 └─────────────────────┘
 │
 ▼
Shared Mission Memory
 │
 ▼
Knowledge Graph (Neo4j)
 │
 ▼
Multi-Agent Reasoning Layer
 │
 ▼
Recommendation Generation
 │
 ▼
Mission Result API
 │
 ▼
Frontend UI
```

### Backend Layered Architecture

```
API Layer
├── REST Routes
├── WebSocket Handlers
│
├── Services Layer
├── Mission Service
├── Planner Service
├── Memory Service
├── Recommendation Service
│
├── Agent Framework
├── BaseAgent (Interface)
├── Agent Registry
├── Specific Agents
│
├── Intelligence Layer
├── LLM Manager
├── Prompt Engine
├── Evidence Scoring
│
├── Data Layer
├── Repositories
├── Database Models
├── Graph Database
│
└── Infrastructure
├── Configuration
├── Logging
├── Error Handling
```

### Agent Execution Pipeline

```
Planner
  ↓
Company Discovery
  ↓
┌─────────┬──────────┬────────────┬────────────┐
│ Website │ LinkedIn │ Tech Stack │ Business   │
│ Agent   │ Agent    │ Agent      │ DNA Agent  │
└─────────┴──────────┴────────────┴────────────┘
  ↓ (Parallel Execution)
Signal Aggregation Agent
  ↓
Confidence Agent
  ↓
Recommendation Agent
  ↓
Mission Complete
```

### Planner Architecture

```
Mission
  ↓
Prompt Engine
  ↓
Gemini LLM
  ↓
Execution Blueprint
  ├── Selected Agents
  ├── Execution Order
  ├── Dependency Graph
  ├── Parallel Groups
  ├── Execution Estimates
  └── Confidence Score
  ↓
Graph Builder
  ↓
Graph Validator
  ↓
Planner Service
  ↓
Agent Executor
```

### Shared Mission Memory Structure

```
Mission ID
├── Metadata
│   ├── Created At
│   ├── Status
│   └── Owner
├── Input
│   ├── User Query
│   ├── ICP (Ideal Customer Profile)
│   └── Strategy
├── Execution Log
│   ├── Agent Runs
│   ├── Timestamps
│   └── Status Updates
├── Results
│   ├── Company Discovery Output
│   ├── Website Intelligence
│   ├── LinkedIn Intelligence
│   ├── Tech Stack Analysis
│   ├── Business DNA
│   ├── Aggregated Signals
│   ├── Confidence Scores
│   └── Final Recommendation
└── Evidence Store
    ├── Data Points
    ├── Sources
    ├── Confidence Levels
    └── Timestamps
```

---

## Technology Stack

### Backend Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **API Framework** | FastAPI + Uvicorn | High-performance async REST API |
| **Authentication** | python-jose + passlib | JWT auth, password hashing |
| **Relational DB** | PostgreSQL + SQLAlchemy | Transactional data (missions, companies, users) |
| **Cache & Pub/Sub** | Redis | Caching, background job coordination |
| **Background Jobs** | Celery | Asynchronous agent execution |
| **Knowledge Graph** | Neo4j | Company relationships, decision makers, ecosystems |
| **Semantic Memory** | ChromaDB | Vector embeddings for semantic search |
| **Data Validation** | Pydantic | Strict schema validation |
| **HTTP Client** | HTTPX | Async API calls to external services |
| **Real-time Updates** | WebSockets | Live mission status to frontend |
| **LLM Integration** | Google Gemini API | Planning, reasoning, analysis |
| **File Handling** | python-multipart | Upload/download documents |
| **Environment Config** | python-dotenv | Secret management |
| **Testing** | pytest | Unit and integration tests |
| **Logging** | Python logging + structlog | Structured, auditable logs |

### Required Python Dependencies

```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
redis==5.0.1
celery==5.3.4
neo4j==5.14.0
chromadb==0.4.15
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose==3.3.0
passlib==1.7.4
bcrypt==4.1.1
httpx==0.25.2
google-generativeai==0.3.0
python-dotenv==1.0.0
websockets==12.0
pytest==7.4.3
pytest-asyncio==0.21.1
structlog==23.2.0
```

---

## Phased Implementation Roadmap

### Phase 1: Foundation (Week 1)

**Goal**: Build the scaffold that everything else depends on.

#### Step 1: Project Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── companies.py
│   │   │   ├── missions.py
│   │   │   ├── recommendations.py
│   │   │   └── dashboard.py
│   │   ├── websocket/
│   │   │   └── mission_updates.py
│   │   └── dependencies.py
│   │
│   ├── agents/
│   │   ├── base.py
│   │   ├── registry.py
│   │   └── enrichment/
│   │       └── company_discovery_agent.py
│   │
│   ├── planner/
│   │   ├── planner_service.py
│   │   ├── planner_agent.py
│   │   ├── prompt_engine.py
│   │   └── graph_builder.py
│   │
│   ├── memory/
│   │   ├── mission_memory.py
│   │   ├── evidence_store.py
│   │   └── memory_repository.py
│   │
│   ├── database/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── repositories.py
│   │   └── connection.py
│   │
│   ├── llm/
│   │   ├── llm_manager.py
│   │   └── providers/
│   │       └── gemini_provider.py
│   │
│   ├── services/
│   │   ├── mission_service.py
│   │   ├── company_service.py
│   │   ├── recommendation_service.py
│   │   └── auth_service.py
│   │
│   ├── config/
│   │   └── settings.py
│   │
│   ├── utils/
│   │   ├── logger.py
│   │   ├── exceptions.py
│   │   └── validators.py
│   │
│   └── main.py
│
├── migrations/
├── tests/
├── logs/
├── requirements.txt
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── README.md
```

#### Step 2: Database Setup

**PostgreSQL Tables**:

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Companies
CREATE TABLE companies (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    country VARCHAR,
    industry VARCHAR,
    employee_count INT,
    website VARCHAR,
    founded_year INT,
    funding_total DECIMAL,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- People
CREATE TABLE people (
    id UUID PRIMARY KEY,
    name VARCHAR NOT NULL,
    company_id UUID REFERENCES companies(id),
    title VARCHAR,
    linkedin_url VARCHAR,
    email VARCHAR,
    influence_score FLOAT,
    last_updated TIMESTAMP DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    lead_score FLOAT,
    status VARCHAR (prospect, qualified, contacted, converted, rejected),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Events (hiring, funding, patents, etc.)
CREATE TABLE events (
    id UUID PRIMARY KEY,
    company_id UUID REFERENCES companies(id),
    event_type VARCHAR (hiring, funding, patent, expansion, conference),
    description TEXT,
    event_date DATE,
    confidence FLOAT,
    source VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Missions
CREATE TABLE missions (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    title VARCHAR NOT NULL,
    objective TEXT NOT NULL,
    status VARCHAR (created, planning, executing, completed, failed),
    result_summary TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Mission Memory (stores agent outputs)
CREATE TABLE mission_memory (
    id UUID PRIMARY KEY,
    mission_id UUID REFERENCES missions(id),
    agent_name VARCHAR NOT NULL,
    output JSONB NOT NULL,
    execution_time FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Evidence
CREATE TABLE evidence (
    id UUID PRIMARY KEY,
    lead_id UUID REFERENCES leads(id),
    evidence_type VARCHAR,
    description TEXT,
    source VARCHAR,
    confidence FLOAT,
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Recommendations
CREATE TABLE recommendations (
    id UUID PRIMARY KEY,
    mission_id UUID REFERENCES missions(id),
    company_id UUID REFERENCES companies(id),
    recommendation_text TEXT NOT NULL,
    confidence_score FLOAT,
    reasoning JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Step 3: Authentication Layer

**Implements**:
- JWT token generation and validation
- User registration
- Login with password hashing (bcrypt)
- Token refresh mechanism

**Files**:
- `app/services/auth_service.py`
- `app/api/routes/auth.py`

#### Step 4: REST API Scaffold

**Basic Endpoints**:

```
POST   /auth/register              # User registration
POST   /auth/login                 # User login
POST   /auth/refresh               # Refresh JWT token
GET    /users/me                   # Current user info

POST   /companies                  # Create company
GET    /companies                  # List companies
GET    /companies/{id}             # Get company details
PUT    /companies/{id}             # Update company
DELETE /companies/{id}             # Delete company

POST   /missions                   # Create mission
GET    /missions                   # List user missions
GET    /missions/{id}              # Get mission details
GET    /missions/{id}/memory       # Get mission memory
DELETE /missions/{id}              # Delete mission

GET    /dashboard                  # Dashboard summary
```

---

### Phase 2: AI Foundation (Week 2)

**Goal**: Build the intelligent reasoning layer.

#### Step 5: Memory System

**Components**:
- `MissionMemory`: Stores all agent outputs for a mission
- `EvidenceStore`: Tracks data points, sources, confidence
- `MemoryRepository`: CRUD operations

**Features**:
- Structured storage of research findings
- Evidence linking and confidence tracking
- Timeline reconstruction
- Query-able memory interface

#### Step 6: Planner Service

**The Brain of AION**

The Planner converts user missions into executable agent pipelines.

**Components**:
- `PlannerService`: Orchestrates planning
- `PlannerAgent`: LLM-powered planner
- `PromptEngine`: Generates planning prompts
- `GraphBuilder`: Constructs DAG from LLM output
- `GraphValidator`: Validates DAG integrity

**Input Example**:
```
Mission: "Find German manufacturing companies likely to purchase AI solutions"
```

**Output Example**:
```json
{
  "agents": [
    "CompanyDiscoveryAgent",
    "WebsiteAgent",
    "LinkedInAgent",
    "TechStackAgent",
    "BusinessDNAAgent"
  ],
  "execution_order": [
    {
      "stage": 1,
      "agents": ["CompanyDiscoveryAgent"]
    },
    {
      "stage": 2,
      "agents": ["WebsiteAgent", "LinkedInAgent", "TechStackAgent", "BusinessDNAAgent"]
    },
    {
      "stage": 3,
      "agents": ["SignalAggregationAgent"]
    },
    {
      "stage": 4,
      "agents": ["ConfidenceAgent"]
    },
    {
      "stage": 5,
      "agents": ["RecommendationAgent"]
    }
  ],
  "dependencies": {
    "WebsiteAgent": ["CompanyDiscoveryAgent"],
    "LinkedInAgent": ["CompanyDiscoveryAgent"],
    "TechStackAgent": ["CompanyDiscoveryAgent"],
    "BusinessDNAAgent": ["CompanyDiscoveryAgent"],
    "SignalAggregationAgent": ["WebsiteAgent", "LinkedInAgent", "TechStackAgent", "BusinessDNAAgent"],
    "ConfidenceAgent": ["SignalAggregationAgent"],
    "RecommendationAgent": ["ConfidenceAgent"]
  },
  "confidence_score": 0.92
}
```

#### Step 7: Agent Framework

**Base Agent Interface**:

Every agent implements the same contract:

```python
class BaseAgent(ABC):
    @abstractmethod
    async def initialize(self, task: AgentTask) -> None:
        """Initialize agent with task context"""
        pass
    
    @abstractmethod
    async def validate(self, task: AgentTask) -> bool:
        """Validate inputs and prerequisites"""
        pass
    
    @abstractmethod
    async def run(self, task: AgentTask) -> AgentResponse:
        """Execute agent logic"""
        pass
    
    @abstractmethod
    async def summarize(self, output: Any) -> str:
        """Generate human-readable summary"""
        pass
    
    @abstractmethod
    async def calculate_confidence(self, output: Any) -> float:
        """Return confidence score 0-1"""
        pass
    
    @abstractmethod
    async def cleanup(self) -> None:
        """Clean up resources"""
        pass
```

**Agent Registry**:

Enables dynamic agent discovery and registration:

```python
class AgentRegistry:
    def register(self, agent_name: str, agent_class: Type[BaseAgent]) -> None
    def get(self, agent_name: str) -> BaseAgent
    def list_agents(self) -> List[str]
    def get_agent_capabilities(self, agent_name: str) -> Dict
```

#### Step 8: Create Mock Agents

**For now, create stub implementations**:
- `CompanyDiscoveryAgent` (returns structured discovery plan)
- `WebsiteAgent` (returns mock data)
- `LinkedInAgent` (returns mock data)
- `TechStackAgent` (returns mock data)
- `BusinessDNAAgent` (returns mock data)
- `SignalAggregationAgent` (merges results)
- `ConfidenceAgent` (scores output)
- `RecommendationAgent` (generates recommendation)

These serve as placeholders. Real implementations come in Phase 3+.

---

### Phase 3: Data Collection (Week 3)

**Goal**: Make agents actually gather intelligence.

#### Step 9: Research Pipeline

Replace mock agents with real implementations:

**CompanyDiscoveryAgent** (First Production Agent):

```python
class CompanyDiscoveryAgent(BaseAgent):
    """
    Transforms mission into actionable discovery strategy.
    Does NOT scrape websites.
    Plans the discovery approach.
    """
    
    async def run(self, task: AgentTask) -> AgentResponse:
        # Extract mission context
        mission = task.mission
        icp = task.icp
        strategy = task.strategy
        
        # Analyze requirements
        countries = self._extract_countries(mission)
        industries = self._extract_industries(mission)
        company_sizes = self._extract_company_sizes(mission)
        keywords = self._extract_keywords(mission)
        
        # Build search strategy
        search_queries = self._build_search_queries(
            countries, industries, keywords
        )
        
        # Identify data sources
        sources = self._identify_sources(mission)
        
        # Return structured plan
        return AgentResponse(
            agent="CompanyDiscoveryAgent",
            output={
                "countries": countries,
                "industries": industries,
                "company_sizes": company_sizes,
                "keywords": keywords,
                "search_queries": search_queries,
                "sources": sources,
                "reasoning": "..."
            },
            confidence=0.85,
            evidence=[...],
            metadata={...}
        )
```

#### Step 10: Event Timeline

Every finding becomes an `Event`:

```
Company hired 30 AI engineers → Event
└─ timestamp: May 2024
└─ type: hiring
└─ confidence: 0.9
└─ source: LinkedIn

Company raised Series B → Event
└─ timestamp: April 2024
└─ type: funding
└─ confidence: 0.95
└─ source: Crunchbase

CEO spoke at AI conference → Event
└─ timestamp: June 2024
└─ type: conference
└─ confidence: 0.98
└─ source: Conference registry
```

Timeline automatically builds itself from events.

#### Step 11: Evidence Store

Instead of opaque scores, store evidence:

```python
class Evidence:
    id: UUID
    lead_id: UUID
    evidence_type: str              # "hiring", "funding", "patent", etc.
    description: str
    source: str                     # "linkedin", "crunchbase", "patent_office"
    confidence: float               # 0-1
    timestamp: datetime
    created_at: datetime
```

Every recommendation cites evidence:

```
Lead Score: 92

Evidence:
✓ Funding received (confidence: 0.95, source: Crunchbase)
✓ Hiring doubled (confidence: 0.87, source: LinkedIn)
✓ Cloud migration pattern (confidence: 0.82, source: Website)
✓ CEO keynote on AI (confidence: 0.98, source: Conference)
✓ Technology stack match (confidence: 0.91, source: Website)
```

---

### Phase 4: Knowledge Graph (Week 4)

**Goal**: Build interconnected intelligence instead of isolated data points.

#### Step 12: Neo4j Graph Database

**Node Types**:

```
Company
├── Properties: name, country, industry, revenue, etc.
├── Relationships: has_employee, uses_technology, raised_funding

Person
├── Properties: name, title, email, influence_score
├── Relationships: works_at, speaks_at, contributes_to

Conference
├── Properties: name, date, location
├── Relationships: hosted_speaker

Patent
├── Properties: title, filing_date, categories
├── Relationships: filed_by

Technology
├── Properties: name, category
├── Relationships: used_by

Funding
├── Properties: amount, round, date
├── Relationships: raised_by
```

**Relationships**:

```
Company → [USES_TECHNOLOGY] → Technology
Company → [RAISED_FUNDING] → Funding
Company → [HAS_EMPLOYEE] → Person
Company → [PARTNER_WITH] → Company
Company → [SUPPLIES_TO] → Company
Company → [ACQUIRED_BY] → Company
Person → [REPORTS_TO] → Person
Person → [SPEAKS_AT] → Conference
Person → [AUTHORS] → Patent
```

#### Step 13: Relationship Graph Queries

Neo4j enables powerful queries:

```cypher
# Find all companies using Azure and hiring AI engineers
MATCH (c:Company)-[:USES_TECHNOLOGY]->(tech:Technology {name: "Azure"})
MATCH (c:Company)-[:HAS_EMPLOYEE]->(p:Person {specialization: "AI"})
RETURN c.name, count(p) as ai_engineers
```

```cypher
# Find decision makers at target companies
MATCH (c:Company {name: "Acme Corp"})-[:HAS_EMPLOYEE]->(p:Person)
WHERE p.influence_score > 0.7
RETURN p.name, p.title, p.influence_score
ORDER BY p.influence_score DESC
```

#### Step 14: Graph Service

Create `GraphService` for Neo4j operations:

```python
class GraphService:
    async def add_company(self, company: Company) -> None
    async def add_person(self, person: Person) -> None
    async def create_relationship(
        self,
        from_node: str,
        relationship_type: str,
        to_node: str,
        properties: Dict
    ) -> None
    async def query(self, cypher: str, params: Dict) -> List[Dict]
    async def find_similar_companies(
        self,
        company_id: UUID,
        threshold: float = 0.7
    ) -> List[Company]
    async def get_influence_network(
        self,
        company_id: UUID
    ) -> Dict[str, List[Person]]
```

---

### Phase 5: Intelligence Layer (Week 5)

**Goal**: Agents start making intelligent inferences.

#### Step 15: Opportunity Prediction Engine

Analyzes signals to predict what companies will need:

```python
class OpportunityPredictionEngine:
    """
    Input: Company profile + events + tech stack
    Output: Probability of needing each solution
    """
    
    async def predict_opportunity(
        self,
        company_id: UUID
    ) -> OpportunityPrediction:
        
        # Gather signals
        events = await self.get_recent_events(company_id)
        hiring = self.analyze_hiring_trends(events)
        funding = self.has_recent_funding(events)
        expansion = self.detect_expansion_signals(events)
        tech_stack = await self.get_tech_stack(company_id)
        
        # Predict needs
        predictions = {
            "needs_cloud": self._predict_cloud_need(hiring, expansion, tech_stack),
            "needs_ai_platform": self._predict_ai_need(hiring, expansion),
            "needs_security": self._predict_security_need(expansion, tech_stack),
            "needs_analytics": self._predict_analytics_need(funding, expansion),
        }
        
        return OpportunityPrediction(
            company_id=company_id,
            predictions=predictions,
            confidence_scores={...},
            reasoning={...}
        )
```

**Example Output**:
```json
{
  "company_id": "acme-corp-id",
  "predictions": {
    "needs_cloud_platform": 0.94,
    "needs_ai_infrastructure": 0.82,
    "needs_security_tools": 0.91,
    "needs_data_platform": 0.78
  },
  "reasoning": {
    "needs_cloud_platform": [
      "Hired 30 AI engineers (confidence: 0.9)",
      "Expanding to 3 new countries (confidence: 0.87)",
      "Currently using on-premises infrastructure (confidence: 0.95)"
    ]
  }
}
```

#### Step 16: Company DNA Generator

Every company gets a unique fingerprint:

```python
class CompanyDNAGenerator:
    """
    Generates multi-dimensional profile of company.
    Used for matching, prediction, and segmentation.
    """
    
    async def generate_dna(self, company_id: UUID) -> CompanyDNA:
        # Analyze multiple dimensions
        innovation = self._score_innovation(company_id)
        growth = self._score_growth(company_id)
        hiring_velocity = self._score_hiring_velocity(company_id)
        ai_adoption = self._score_ai_adoption(company_id)
        risk_profile = self._score_risk(company_id)
        security_maturity = self._score_security(company_id)
        
        return CompanyDNA(
            company_id=company_id,
            dimensions={
                "innovation": innovation,
                "growth": growth,
                "hiring_velocity": hiring_velocity,
                "ai_adoption": ai_adoption,
                "risk_profile": risk_profile,
                "security_maturity": security_maturity,
            },
            timestamp=datetime.now(),
            confidence=0.85
        )
```

**DNA Structure** (visualized as bars):
```
Innovation      ██████████ 9.2
Growth          ████████░░ 8.1
Hiring Velocity ███████░░░ 7.5
AI Adoption     ██████████ 9.8
Risk Profile    ████░░░░░░ 3.9
Security        ██████░░░░ 5.7
```

#### Step 17: Digital Twin

Instead of re-researching each company, load a pre-computed model:

```python
class DigitalTwin:
    """
    AI-powered model of a company.
    Loaded from database, updated periodically.
    Answers questions without new research.
    """
    
    company_id: UUID
    industry: str
    revenue: float
    growth_rate: float
    hiring_pattern: List[int]
    tech_stack: List[str]
    funding_history: List[Funding]
    leadership_team: List[Person]
    dna: CompanyDNA
    recent_events: List[Event]
    decision_makers: List[Person]
    supplier_relationships: List[Company]
    customer_base: List[Company]
    competitive_landscape: List[Company]
    
    async def update(self) -> None:
        """Refresh model with latest data"""
        pass
    
    async def predict_need(self, solution: str) -> float:
        """Return probability company needs solution"""
        pass
    
    async def get_best_contact(self) -> Person:
        """Return most influential decision maker"""
        pass
```

---

### Phase 6: Multi-Agent Intelligence (Week 6)

**Goal**: Agents debate and reason together.

#### Step 18: Debate Engine

Instead of single recommendations, create multiple expert perspectives:

```python
class DebateEngine:
    """
    Multiple agents argue different perspectives.
    Planner synthesizes debate into final recommendation.
    """
    
    async def run_debate(
        self,
        mission: Mission,
        candidates: List[Company]
    ) -> DebateResult:
        
        # Launch concurrent debates
        debates = await asyncio.gather(
            self._sales_perspective(candidates),
            self._risk_perspective(candidates),
            self._technical_perspective(candidates),
            self._financial_perspective(candidates),
            self._market_perspective(candidates),
        )
        
        # Synthesize perspectives
        final_ranking = await self._synthesize_debate(debates)
        
        return DebateResult(
            candidates=candidates,
            perspectives=debates,
            final_ranking=final_ranking,
            reasoning=f"Based on debate: {debates}"
        )
```

**Example Output**:

```
Company: Acme Manufacturing

Sales Agent: "Contact immediately. High need signals."
Risk Agent: "Caution. Budget uncertainty. Competitor present."
Tech Agent: "Perfect tech fit. Using our exact stack."
Finance Agent: "Excellent LTV. Strong margins."
Market Agent: "Market trending up. Good timing."

Final Score: 8.7/10
Recommended Action: Qualify leads through Tech CTO
```

#### Step 19: Explainability Canvas

Every recommendation is fully traceable:

```python
class ExplainabilityCanvas:
    """
    Renders decision-making evidence in structured format.
    Every claim is linked to sources and confidence scores.
    """
    
    recommendation: str              # "Contact CTO"
    confidence: float                # 0.92
    
    evidence: List[Evidence]
    # [
    #   {
    #     "claim": "Needs cloud migration",
    #     "confidence": 0.94,
    #     "sources": ["LinkedIn", "Job postings", "Website"],
    #     "reasoning": "Hired 30 DevOps engineers in 3 months"
    #   },
    #   ...
    # ]
    
    reasoning_chain: List[str]
    # [
    #   "Company is manufacturing (matches ICP)",
    #   "Recent hiring spike detected",
    #   "Technology stack analysis shows gaps",
    #   "Market conditions favor expansion",
    #   "Decision maker alignment likely"
    # ]
```

---

### Phase 7: Advanced AI (Week 7)

**Goal**: Build premium intelligence features.

#### Step 20: AI Detective Agent

Connects non-obvious signals:

```python
class AIDetectiveAgent(BaseAgent):
    """
    Synthesizes multiple weak signals into strong inferences.
    Example: CEO blog post + hiring + permits + suppliers
    → Conclusion: Expansion planned
    """
    
    async def run(self, task: AgentTask) -> AgentResponse:
        company = task.company
        
        # Gather all signals
        signals = {
            "blog_posts": await self._analyze_blog_posts(company),
            "hiring": await self._analyze_hiring(company),
            "permits": await self._check_permits(company),
            "supplier_changes": await self._analyze_suppliers(company),
            "patent_activity": await self._analyze_patents(company),
            "social_activity": await self._analyze_social_media(company),
        }
        
        # Infer meaning from combinations
        inferences = []
        
        if signals["hiring"]["ai_engineers"] > 20 and \
           signals["blog_posts"]["ai_topics"] > 3 and \
           signals["patent_activity"]["ai_patents"] > 0:
            inferences.append(
                Inference(
                    conclusion="Company planning AI transformation",
                    confidence=0.94,
                    evidence=["hiring", "blog_posts", "patent_activity"]
                )
            )
        
        return AgentResponse(
            agent="AIDetectiveAgent",
            output={"inferences": inferences},
            confidence=0.88
        )
```

#### Step 21: Hidden Decision Maker Discovery

Identifies who actually drives purchases:

```python
class DecisionMakerDiscoveryAgent(BaseAgent):
    """
    Analyzes technical content, speaking engagements, 
    publications to find hidden influencers.
    """
    
    async def run(self, task: AgentTask) -> AgentResponse:
        company = task.company
        
        # Analyze decision maker signals
        decision_makers = []
        
        # Score each employee
        for person in company.employees:
            score = 0
            evidence = []
            
            # Technical credibility
            github_activity = await self._check_github(person)
            if github_activity > 50:
                score += 0.3
                evidence.append(f"Active GitHub contributor ({github_activity} commits)")
            
            # Thought leadership
            blog_posts = await self._check_blog(person)
            if blog_posts > 5:
                score += 0.25
                evidence.append(f"Technical blog author ({blog_posts} posts)")
            
            # Conference presence
            talks = await self._check_conference_talks(person)
            if talks > 2:
                score += 0.25
                evidence.append(f"Conference speaker ({talks} talks)")
            
            # Publications
            papers = await self._check_publications(person)
            if papers > 0:
                score += 0.2
                evidence.append(f"Published research")
            
            decision_makers.append({
                "name": person.name,
                "title": person.title,
                "influence_score": score,
                "evidence": evidence
            })
        
        # Rank by influence
        ranked = sorted(
            decision_makers,
            key=lambda x: x["influence_score"],
            reverse=True
        )
        
        return AgentResponse(
            agent="DecisionMakerDiscoveryAgent",
            output={"decision_makers": ranked[:5]},
            confidence=0.82
        )
```

#### Step 22: Competitive Intelligence Agent

Detects competitors and predicts next purchases:

```python
class CompetitiveIntelligenceAgent(BaseAgent):
    """
    Analyzes competitor presence and predicts acquisition patterns.
    """
    
    async def run(self, task: AgentTask) -> AgentResponse:
        company = task.company
        
        # Identify current solutions
        current_tools = await self._analyze_tech_stack(company)
        
        # Pattern matching
        patterns = self._detect_buying_patterns(company.industry, current_tools)
        
        # Predict next solutions
        predictions = []
        for solution in patterns["likely_next_purchases"]:
            predictions.append({
                "solution": solution,
                "probability": patterns[solution],
                "reasoning": f"Companies with {current_tools} typically adopt {solution}",
                "competitors": patterns.get(f"{solution}_competitors", [])
            })
        
        return AgentResponse(
            agent="CompetitiveIntelligenceAgent",
            output={"predictions": predictions},
            confidence=0.76
        )
```

#### Step 23: Strategy Simulator

Simulates different outreach timings:

```python
class StrategySimulatorAgent(BaseAgent):
    """
    Simulates conversion probability under different strategies.
    """
    
    async def run(self, task: AgentTask) -> AgentResponse:
        company = task.company
        
        # Simulate different scenarios
        scenarios = {
            "contact_now": await self._simulate_scenario(
                company, 
                timing="now",
                approach="technical_fit"
            ),
            "wait_30_days": await self._simulate_scenario(
                company,
                timing="30_days",
                approach="technical_fit"
            ),
            "wait_90_days": await self._simulate_scenario(
                company,
                timing="90_days",
                approach="technical_fit"
            ),
            "contact_cto": await self._simulate_scenario(
                company,
                timing="now",
                approach="cto"
            ),
            "contact_ceo": await self._simulate_scenario(
                company,
                timing="now",
                approach="ceo"
            ),
        }
        
        return AgentResponse(
            agent="StrategySimulatorAgent",
            output=scenarios,
            confidence=0.71
        )
```

**Simulation Output**:
```json
{
  "contact_now": {
    "success_probability": 0.72,
    "reasoning": "High momentum, hiring signals strong"
  },
  "wait_30_days": {
    "success_probability": 0.68,
    "reasoning": "Momentum may fade"
  },
  "wait_90_days": {
    "success_probability": 0.45,
    "reasoning": "Competitors will have engaged"
  },
  "contact_cto": {
    "success_probability": 0.81,
    "reasoning": "Technical decision maker, highest influence"
  },
  "contact_ceo": {
    "success_probability": 0.22,
    "reasoning": "Not technical influencer, low leverage"
  }
}
```

---

### Phase 8: Autonomous Platform (Week 8)

**Goal**: Platform becomes self-improving and self-healing.

#### Step 24: Autonomous Research Loop

When confidence is low, planner automatically gathers more evidence:

```python
class AutonomousResearchLoop:
    """
    If confidence < threshold, launch additional agents.
    No human intervention needed.
    """
    
    async def evaluate_and_extend(
        self,
        recommendation: Recommendation
    ) -> Recommendation:
        
        if recommendation.confidence < 0.70:
            # Need more evidence
            additional_agents = [
                "PatentAnalysisAgent",
                "FinancialHealthAgent",
                "HiringTrendAgent",
                "NewsMonitoringAgent",
                "SupplyChainAgent",
            ]
            
            # Run additional research
            additional_results = await asyncio.gather(*[
                self.planner.run_agent(agent, recommendation)
                for agent in additional_agents
            ])
            
            # Merge results
            recommendation.additional_evidence = additional_results
            recommendation.confidence = self._recalculate_confidence(
                recommendation,
                additional_results
            )
        
        return recommendation
```

#### Step 25: Self-Healing Workflow

If one data source fails, automatically try alternatives:

```python
class SelfHealingWorkflow:
    """
    If an agent fails, automatically try fallback strategies.
    """
    
    fallback_strategies = {
        "linkedin": ["Company website", "GitHub", "Conference data", "News"],
        "company_website": ["LinkedIn", "Crunchbase", "Domain WHOIS"],
        "hiring_data": ["LinkedIn", "GitHub", "Job boards"],
        "patents": ["Google Patents", "USPTO", "Company filings"],
    }
    
    async def run_with_fallback(
        self,
        agent_name: str,
        task: AgentTask
    ) -> AgentResponse:
        try:
            return await self.planner.run_agent(agent_name, task)
        except Exception as e:
            logger.warning(f"{agent_name} failed: {e}")
            
            # Try fallbacks
            for fallback_agent in self.fallback_strategies.get(agent_name, []):
                try:
                    return await self.planner.run_agent(fallback_agent, task)
                except:
                    continue
            
            # All fallbacks failed
            raise Exception(f"No successful execution path for {agent_name}")
```

#### Step 26: Learning Engine

Platform improves over time:

```python
class LearningEngine:
    """
    Records outcomes of recommendations.
    Improves future predictions based on results.
    """
    
    async def record_outcome(
        self,
        recommendation_id: UUID,
        outcome: str,  # "converted", "failed", "in_progress"
        feedback: Optional[str] = None
    ) -> None:
        
        # Retrieve recommendation
        rec = await self.db.get_recommendation(recommendation_id)
        
        # Find similar past recommendations
        similar = await self.db.find_similar_recommendations(
            rec.company_dna,
            rec.industry,
            rec.icp
        )
        
        # Update prediction model
        await self._update_prediction_weights(
            similar,
            outcome,
            feedback
        )
        
        # Next time, those agents weight their scores differently
```

---

### Phase 9: Production (Week 9)

**Goal**: Prepare for scale and reliability.

#### Step 27: Caching Layer (Redis)

```python
class CacheService:
    """
    Cache expensive computations.
    """
    
    async def get_company_digital_twin(
        self,
        company_id: UUID
    ) -> Optional[DigitalTwin]:
        
        # Try cache first
        cached = await self.redis.get(f"twin:{company_id}")
        if cached:
            return DigitalTwin.parse_obj(json.loads(cached))
        
        # Compute if not cached
        twin = await self._build_digital_twin(company_id)
        
        # Cache for 24 hours
        await self.redis.setex(
            f"twin:{company_id}",
            86400,
            twin.json()
        )
        
        return twin
```

#### Step 28: Background Job Queue (Celery)

```python
class MissionExecutor:
    """
    Execute missions asynchronously.
    Frontend polls for updates via WebSocket.
    """
    
    @celery.task
    async def execute_mission(mission_id: UUID):
        mission = await db.get_mission(mission_id)
        
        # Notify frontend: mission started
        await websocket.broadcast(f"mission:{mission_id}", {
            "status": "started",
            "timestamp": now()
        })
        
        try:
            # Run planner
            dag = await planner.plan(mission)
            
            # Execute agents
            for stage in dag.stages:
                results = await asyncio.gather(*[
                    executor.run_agent(agent, mission)
                    for agent in stage.agents
                ])
                
                # Save results to memory
                for agent, result in zip(stage.agents, results):
                    await mission_memory.save(mission_id, agent, result)
                
                # Notify frontend
                await websocket.broadcast(f"mission:{mission_id}", {
                    "status": "agent_completed",
                    "agent": agent,
                    "progress": f"{stage.index}/{len(dag.stages)}"
                })
            
            # Finalize mission
            mission.status = "completed"
            mission.completed_at = now()
            await db.update_mission(mission)
            
            await websocket.broadcast(f"mission:{mission_id}", {
                "status": "completed",
                "results": mission.result_summary
            })
        
        except Exception as e:
            mission.status = "failed"
            await db.update_mission(mission)
            
            await websocket.broadcast(f"mission:{mission_id}", {
                "status": "failed",
                "error": str(e)
            })
```

#### Step 29: WebSocket Real-time Updates

Frontend gets live status updates:

```python
class MissionWebSocket:
    """
    WebSocket handler for real-time mission updates.
    """
    
    @websocket.route("/ws/missions/{mission_id}")
    async def mission_updates(websocket: WebSocket, mission_id: UUID):
        await websocket.accept()
        
        try:
            # Subscribe to mission events
            pubsub = redis.pubsub()
            pubsub.subscribe(f"mission:{mission_id}")
            
            async for message in pubsub.listen():
                if message["type"] == "message":
                    # Send to frontend
                    await websocket.send_json(
                        json.loads(message["data"])
                    )
        
        finally:
            await websocket.close()
```

#### Step 30: Monitoring & Observability

```python
class ObservabilityService:
    """
    Structured logging, metrics, traces.
    """
    
    async def log_agent_execution(
        self,
        mission_id: UUID,
        agent_name: str,
        start_time: datetime,
        end_time: datetime,
        status: str,
        result: AgentResponse
    ):
        await logger.info(
            "agent_execution",
            mission_id=mission_id,
            agent_name=agent_name,
            duration_ms=(end_time - start_time).total_seconds() * 1000,
            status=status,
            confidence=result.confidence,
            evidence_count=len(result.evidence)
        )
        
        # Track metrics
        await metrics.record(
            "agent_execution_time",
            (end_time - start_time).total_seconds(),
            tags={"agent": agent_name, "status": status}
        )
```

---

## Component Details

### API Layer Structure

```python
# app/api/routes/missions.py

@router.post("/missions")
async def create_mission(
    request: CreateMissionRequest,
    current_user: User = Depends(get_current_user)
) -> MissionResponse:
    """Create a new mission"""
    mission = await mission_service.create(
        user_id=current_user.id,
        objective=request.objective,
        icp=request.icp,
        strategy=request.strategy
    )
    
    # Queue execution
    execute_mission.delay(mission.id)
    
    return MissionResponse.from_orm(mission)


@router.get("/missions/{mission_id}")
async def get_mission(
    mission_id: UUID,
    current_user: User = Depends(get_current_user)
) -> MissionDetailResponse:
    """Get mission details + all collected data"""
    mission = await mission_service.get(mission_id, current_user.id)
    memory = await memory_service.get_mission_memory(mission_id)
    
    return MissionDetailResponse(
        mission=mission,
        execution_log=memory.execution_log,
        results=memory.results,
        evidence=memory.evidence
    )


@router.get("/missions/{mission_id}/memory")
async def get_mission_memory(
    mission_id: UUID,
    current_user: User = Depends(get_current_user)
) -> Dict:
    """Get raw mission memory"""
    memory = await memory_service.get_mission_memory(mission_id)
    return memory.to_dict()
```

---

## Data Models

### Core Pydantic Models

```python
# Mission
class Mission(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    objective: str
    icp: Dict  # Ideal Customer Profile
    strategy: Optional[Dict]
    status: str  # created, planning, executing, completed, failed
    result_summary: Optional[str]
    created_at: datetime
    completed_at: Optional[datetime]

# Agent Task
class AgentTask(BaseModel):
    mission: Mission
    icp: Dict
    strategy: Optional[Dict]
    shared_memory: Dict  # All previous agent outputs
    planner_metadata: Dict

# Agent Response
class AgentResponse(BaseModel):
    agent: str
    output: Dict
    confidence: float
    evidence: List[Dict]
    reasoning: str
    metadata: Dict
    execution_time_ms: float

# Company
class Company(BaseModel):
    id: UUID
    name: str
    country: str
    industry: str
    employee_count: Optional[int]
    website: Optional[str]
    founded_year: Optional[int]
    funding_total: Optional[Decimal]
    tech_stack: List[str] = []
    dna: Optional[CompanyDNA]

# Event
class Event(BaseModel):
    id: UUID
    company_id: UUID
    event_type: str  # hiring, funding, patent, expansion, conference
    description: str
    event_date: date
    confidence: float
    source: str
    created_at: datetime

# Lead
class Lead(BaseModel):
    id: UUID
    user_id: UUID
    company_id: UUID
    lead_score: float
    status: str  # prospect, qualified, contacted, converted, rejected
    created_at: datetime
    updated_at: datetime
    evidence: List[Evidence] = []

# Recommendation
class Recommendation(BaseModel):
    id: UUID
    mission_id: UUID
    company_id: UUID
    recommendation_text: str
    confidence_score: float
    reasoning: Dict
    evidence: List[Dict]
    created_at: datetime
```

---

## API Specifications

### Authentication Endpoints

```
POST /auth/register
    Request: { email, password, name }
    Response: { user_id, token, refresh_token }

POST /auth/login
    Request: { email, password }
    Response: { user_id, token, refresh_token }

POST /auth/refresh
    Request: { refresh_token }
    Response: { token, refresh_token }
```

### Mission Endpoints

```
POST /missions
    Request: { objective, icp, strategy? }
    Response: { mission_id, status }

GET /missions
    Query: page, per_page, status?
    Response: List[Mission]

GET /missions/{mission_id}
    Response: Mission + all results

GET /missions/{mission_id}/memory
    Response: Raw mission memory

DELETE /missions/{mission_id}
    Response: { deleted: true }
```

### Company Endpoints

```
GET /companies
    Query: page, per_page, search?, industry?
    Response: List[Company]

GET /companies/{company_id}
    Response: Company + DNA + events + people

POST /companies/{company_id}/events
    Request: { event_type, description, date, source }
    Response: Event

GET /companies/{company_id}/recommendations
    Response: List[Recommendation]
```

### Recommendation Endpoints

```
GET /recommendations
    Query: page, per_page, mission_id?
    Response: List[Recommendation]

GET /recommendations/{recommendation_id}
    Response: Recommendation + full evidence

POST /recommendations/{recommendation_id}/outcome
    Request: { outcome, feedback? }
    Response: { recorded: true }
```

### Dashboard Endpoints

```
GET /dashboard
    Response: {
        total_missions: int,
        completed_missions: int,
        total_companies: int,
        top_leads: List[Lead],
        recent_events: List[Event],
        conversion_rate: float
    }
```

---

## Deployment Strategy

### Docker Setup

```dockerfile
# Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: aion
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  neo4j:
    image: neo4j:latest
    environment:
      NEO4J_AUTH: neo4j/password
    ports:
      - "7687:7687"

  backend:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
      - neo4j
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres/aion
      REDIS_URL: redis://redis:6379
      NEO4J_URL: bolt://neo4j:7687

volumes:
  postgres_data:
```

### Environment Variables

```env
# .env

# Database
DATABASE_URL=postgresql://user:password@localhost/aion

# Redis
REDIS_URL=redis://localhost:6379

# Neo4j
NEO4J_URL=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password

# LLM
GEMINI_API_KEY=your_key_here

# JWT
JWT_SECRET=your_secret_key
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24

# Cors
FRONTEND_URL=http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

---

## Success Metrics

### Phase Completion Criteria

| Phase | Success Criteria |
|-------|------------------|
| 1 | Database, auth, REST API working. Frontend can login and create missions. |
| 2 | Planner generates valid DAGs. Mock agents execute without errors. |
| 3 | Company Discovery returns structured discovery plans. Data stored in memory. |
| 4 | Neo4j populated. Graph queries working. Relationships queryable. |
| 5 | Opportunity predictions 80%+ accurate. Company DNA unique per company. Digital Twin loads in <100ms. |
| 6 | Multi-agent debate working. Explainability canvas renders all evidence. |
| 7 | Detective agent finds non-obvious connections. Decision makers ranked by influence. Simulator shows different scenarios. |
| 8 | Autonomous research loop activates <70% confidence. Self-healing tries fallbacks. Learning engine records outcomes. |
| 9 | Redis cache reduces response time by 50%. Celery executes missions in background. WebSocket delivers live updates. |

---

## Next Steps

1. **Week 1**: Set up project structure, PostgreSQL, authentication, basic REST APIs
2. **Week 2**: Build planner, memory system, agent framework
3. **Week 3**: Implement Company Discovery Agent, event timeline
4. **Week 4**: Set up Neo4j, build relationship graph
5. **Week 5**: Opportunity prediction, Company DNA, Digital Twin
6. **Week 6**: Debate engine, explainability
7. **Week 7**: Detective, decision maker discovery, competitive intelligence
8. **Week 8**: Autonomous research loop, self-healing, learning engine
9. **Week 9**: Production setup, monitoring, caching

---

## Architecture Decision Log

| Decision | Rationale |
|----------|-----------|
| FastAPI | Async performance, auto OpenAPI docs, Pydantic integration |
| PostgreSQL | ACID compliance, JSON support, reliable |
| Neo4j | Relationship queries, graph traversal, ACID |
| ChromaDB | Vector embeddings, semantic search, lightweight |
| Celery | Distributed task queue, reliable execution |
| Redis | Fast cache, pub/sub for WebSocket |
| Gemini | Frontier reasoning, cost-effective, proven for planning |
| DAG Execution | Parallel execution, dependency resolution, replayability |
| Shared Memory | Loose coupling, auditability, testability |
| Agent Registry | Dynamic discovery, extensibility, no hardcoding |

---

## Conclusion

AION is designed as an extensible autonomous intelligence operating system. This architecture separates planning, execution, memory, reasoning, and orchestration into independent, testable components.

By following this phased approach, you build a strong foundation first, then add intelligence incrementally. Each phase enables the next.

Start with Phase 1. Don't rush. Build one solid layer at a time.

The 20 advanced features become trivial once you have the foundation right.
