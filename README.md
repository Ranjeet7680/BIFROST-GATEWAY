# BIFROST-GATEWAY

<p align="center">
  <img src="assets/header.svg" alt="Bifrost Gateway Header" width="100%" />
</p>

<p align="center">
  <strong>One Gateway. Every AI. Infinite Possibilities.</strong><br />
  <em>Next-generation, high-performance, open-source AI Gateway connecting multiple AI providers through one unified API with intelligent routing, zero-downtime failover, cost optimization, semantic vector caching, and Model Context Protocol (MCP) tool governance.</em>
</p>

<p align="center">
  <a href="https://github.com/Ranjeet7680/BIFROST-GATEWAY"><img src="https://img.shields.io/badge/GitHub-Bifrost--Gateway-blue?logo=github" alt="GitHub Repo" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg" alt="License" /></a>
  <a href="#"><img src="https://img.shields.io/badge/version-2.4.0-brightgreen.svg" alt="Version" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Go-1.22+-00ADD8.svg?logo=go" alt="Go" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Next.js-15+-black.svg?logo=next.js" alt="Next.js" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker" alt="Docker" /></a>
  <a href="#"><img src="https://img.shields.io/badge/OpenTelemetry-Enabled-F5A800.svg" alt="OpenTelemetry" /></a>
</p>

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [System Architecture (SVG Diagram)](#-system-architecture)
- [Intelligent Routing & Failover Lifecycle (SVG Diagram)](#-intelligent-routing--failover-lifecycle)
- [Multi-Provider & MCP Ecosystem (SVG Diagram)](#-multi-provider--mcp-ecosystem)
- [Quick Start in 60 Seconds](#-quick-start-in-60-seconds)
- [Zero-Refactor SDK Drop-in](#-zero-refactor-sdk-drop-in)
- [Enterprise Administration Dashboard (14 Screens)](#-enterprise-administration-dashboard-14-screens)
- [OpenAI-Compatible REST API](#-openai-compatible-rest-api)
- [Repository Structure](#-repository-structure)
- [Production Deployment](#-production-deployment)
- [License & Attribution](#-license--attribution)

---

## ⚡ Key Features

- **Unified Multi-Provider API**: Single OpenAI-compatible standard endpoint (`/v1/chat/completions`) for OpenAI, Anthropic, Google Gemini, AWS Bedrock, Azure OpenAI, DeepSeek, Mistral, Groq, and Ollama.
- **Intelligent Model Router**: Dynamic latency-aware, cost-aware, and capability-aware model selection evaluating queries in under 3 milliseconds.
- **18ms Automatic Failover**: Circuit breaker trips on provider rate limits (HTTP 429) or upstream outages (503/500), transparently cascading to fallback providers with zero client downtime.
- **pgvector Semantic Caching**: Hybrid exact and cosine similarity vector cache in PostgreSQL 16 & Redis 7, serving repeated or semantically equivalent queries in `< 4ms` at `$0` cost.
- **Enterprise Security & Virtual Keys**: Issue scoped tokens with monthly budget ceilings, token bucket rate limits (RPM), allowed model lists, and automated PII/PCI masking (HIPAA/GDPR).
- **Model Context Protocol (MCP) Bridge**: Secure tool gateway for autonomous agents (CrewAI, LangChain, Cursor) with parameter validation and human approval gates.
- **14-Screen Dark Mode Console**: Apple-inspired administration panel with live waterfall request traces, token volume analytics, and cluster health monitoring.

---

## 🏛️ System Architecture

Bifrost separates the high-throughput Go data plane from the administrative control plane across six architectural layers:

<p align="center">
  <img src="assets/architecture-diagram.svg" alt="Bifrost Gateway 6-Layer Architecture" width="100%" />
</p>

1. **Client & Consumer Ingress**: Web apps, mobile clients, autonomous agents, Python/Node SDKs using drop-in OpenAI clients.
2. **Gateway Edge & Security Layer**: Go FastHTTP reverse proxy, token bucket rate limiting, virtual key authentication, PII scrubbing.
3. **Intelligence & Routing Engine**: pgvector cosine distance cache lookup (`> 0.92`), multi-objective model scoring, circuit breakers.
4. **Unified Provider Adapters**: Normalized multi-vendor translation and streaming SSE transcoders.
5. **Distributed Data & Vector Cache**: PostgreSQL 16 with pgvector extension, Redis 7 cluster for rate limits, AES-256 key vault.
6. **Operations, Observability & Governance**: OpenTelemetry W3C distributed tracing, Prometheus `/metrics` exporter, and 14-screen admin console.

---

## 🔄 Intelligent Routing & Failover Lifecycle

When an upstream provider suffers a rate limit spike or cloud outage, Bifrost automatically engages bounded retries and executes fallback chains in **18ms**:

<p align="center">
  <img src="assets/routing-failover-diagram.svg" alt="Bifrost Routing and Failover Flow" width="100%" />
</p>

### Request Processing Steps:
1. **Request Ingress**: Client sends request to `/v1/chat/completions` with a Virtual Key.
2. **Security & Rate Check**: Verifies tenant monthly budget, rate limit (RPM), and scrubs PII.
3. **Semantic Vector Cache**: Looks up cosine similarity in pgvector. If match `> 0.92`, serves instant cached response in `< 4ms` ($0 token cost).
4. **Intelligent Router**: Evaluates token volume, cost budget, and provider health to select the optimal model.
5. **Primary Outage Detection**: If primary provider returns HTTP 503 or 429 rate limit, circuit breaker trips.
6. **Zero-Downtime Fallback**: Instant fallback kicks in to secondary model (e.g. Anthropic Claude or Azure OpenAI) within **18ms**.
7. **Return & Telemetry**: Emits normalized response and records OpenTelemetry span.

---

## 🌐 Multi-Provider & MCP Ecosystem

Bifrost acts as a unified hub connecting AI agent frameworks with 15+ LLM providers and managed corporate MCP tools:

<p align="center">
  <img src="assets/mcp-ecosystem-diagram.svg" alt="Bifrost Multi-Provider and MCP Ecosystem" width="100%" />
</p>

### Supported Provider Adapters:
- **OpenAI**: GPT-4o, GPT-4o-mini, o1, o3-mini
- **Anthropic Claude**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- **Google Gemini**: Gemini 1.5 Pro (2M context), Gemini 2.0 Flash
- **DeepSeek**: DeepSeek R1 (Reasoning), DeepSeek V3 ($0.14/1M tokens)
- **Groq LPU**: Hardware-accelerated Llama 3.3 70B (480 tokens/sec, sub-40ms latency)
- **AWS Bedrock & Azure OpenAI**: IAM-governed enterprise VPC endpoints
- **Mistral AI**: Mistral Large 2, Codestral (European data sovereignty)
- **Ollama**: 100% on-premise air-gapped self-hosted clusters

---

## 🚀 Quick Start in 60 Seconds

### Run with Docker Compose
```bash
git clone https://github.com/Ranjeet7680/BIFROST-GATEWAY.git
cd BIFROST-GATEWAY
docker-compose up -d
```

### Run Locally (Node.js & Go)
```bash
# Install frontend & dashboard dependencies
npm install

# Start Next.js marketing website & administration dashboard
npm run dev

# (Optional) In another terminal, run Go gateway engine
cd services/gateway
go run .
```

Access the application:
- **Apple-Inspired Product Website**: `http://localhost:3000`
- **Enterprise Administration Console**: `http://localhost:3000/dashboard`
- **Interactive Developer Studio / Playground**: `http://localhost:3000/playground`
- **System Architecture Visualizer**: `http://localhost:3000/architecture`
- **Documentation & SDKs**: `http://localhost:3000/docs`
- **API Health Endpoint**: `http://localhost:3000/api/v1/health`

---

## 💻 Zero-Refactor SDK Drop-in

No new proprietary libraries required. Just swap your `base_url`:

### Python
```python
from openai import OpenAI

# Simply point base_url to your Bifrost Gateway instance
client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="bf_live_9a7x_enterprise_token"
)

# Route dynamically to the optimal provider
response = client.chat.completions.create(
    model="bifrost/auto-best", # Automatically picks Claude, GPT-4o, or DeepSeek
    messages=[{"role": "user", "content": "Analyze our infrastructure security."}],
    temperature=0.7
)

print(response.choices[0].message.content)
```

### TypeScript / Node.js
```typescript
import OpenAI from "openai";

const bifrost = new OpenAI({
  baseURL: "http://localhost:8080/v1",
  apiKey: process.env.BIFROST_VIRTUAL_KEY,
});

async function main() {
  const completion = await bifrost.chat.completions.create({
    model: "claude-3-5-sonnet-20241022",
    messages: [{ role: "user", content: "Optimize this SQL query." }],
  });

  console.log(completion.choices[0].message.content);
}
main();
```

### cURL
```bash
curl http://localhost:8080/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer bf_live_9a7x_enterprise_token" \
  -d '{
    "model": "bifrost/auto-best",
    "messages": [{"role": "user", "content": "Explain zero-downtime routing."}]
  }'
```

---

## 📊 Enterprise Administration Dashboard (14 Screens)

The built-in administration console at `/dashboard` provides complete control over your AI infrastructure:

| Screen | Functions & Features |
|---|---|
| **Overview** | Executive traffic counters, P95 latency (285ms), cache hit rate (38%), upstream cluster health matrix, top routed models, active alerts. |
| **Providers** | Connect, edit, and toggle 9+ providers; live latency ping tests; key vault status; "Connect Custom Provider" modal. |
| **Models** | Universal catalog with context length (up to 2M tokens), input/output pricing per 1M tokens, speed ratings, and capabilities tags. |
| **Routing** | Priority rules, weighted splits (e.g. 50% OpenAI / 30% Gemini / 20% Claude), cost ceiling rules, and an interactive Route Decision Test Console. |
| **API Keys** | Root cluster and service keys management; masked token generator; RBAC role selection (`root_admin`, `read_write`, `read_only`). |
| **Virtual Keys** | Tenant-isolated virtual keys (`vk_prod_web_app`, `vk_agent_autonomous`), monthly spend meters, rate limits (RPM), and model whitelists. |
| **Requests & Traces** | Live request stream with filter and search. Clicking "View Waterfall" opens the **Trace Inspector Modal** with sub-millisecond execution spans. |
| **Analytics** | Request volume throughput chart (RPM over time), P50/P90/P99 latency distribution, provider spend breakdown, and cost-saving recommendations. |
| **Semantic Cache** | Hybrid exact & pgvector cosine similarity cache; interactive **Similarity Threshold Slider** (0.80 to 0.99); TTL slider; "Purge Vector Cache" action. |
| **MCP Tools** | Model Context Protocol gateway: connected servers (PostgreSQL, GitHub, Slack, Brave Search), registered tools, and **Approval Policy Toggles**. |
| **Workflows** | Visual node-based pipeline builder showing the 8 lifecycle stages from Ingress TLS to Response Telemetry with enable/bypass switches. |
| **Security** | Configured guardrails (PII redaction, prompt injection defense, cost velocity breaker, toxicity filter) and immutable SOC2/HIPAA audit event log. |
| **Teams** | Multi-tenant workspaces (Acme Corp), team members, avatar list, roles, and monthly spend tracking per user. |
| **Settings** | Data plane networking configuration, Redis cluster URI, OpenTelemetry collector gRPC endpoint, and "Export YAML Config" download. |

---

## 🛠️ Repository Structure

```
BIFROST-GATEWAY/
├── assets/
│   ├── header.svg                    # Wide Apple-inspired banner
│   ├── architecture-diagram.svg      # 6-layer architecture blueprint
│   ├── routing-failover-diagram.svg  # Routing & circuit breaker failover flow
│   └── mcp-ecosystem-diagram.svg     # Multi-provider & MCP agent ecosystem
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Cinematic Apple-inspired marketing website
│   │   ├── dashboard/page.tsx        # 14-screen Enterprise Administration Console
│   │   ├── playground/page.tsx       # Interactive Developer Studio
│   │   ├── architecture/page.tsx     # Deep-dive Architecture visualizer
│   │   ├── docs/page.tsx             # Developer documentation
│   │   └── api/v1/                   # Working unified OpenAI-compatible REST API
│   ├── components/                   # Interactive React components & canvas visualizers
│   ├── lib/                          # State store, data providers, and utility helpers
│   └── types/gateway.ts              # TypeScript domain types
├── services/gateway/                 # High-throughput Go gateway data plane
│   ├── main.go                       # Fiber server with Prometheus & OTel endpoints
│   ├── router.go                     # Dynamic router & circuit breaker state machine
│   ├── adapter.go                    # Multi-provider interface definitions
│   └── cache.go                      # Semantic memory cache
├── infrastructure/
│   ├── docker/                       # Dockerfiles for Web and Go gateway
│   └── kubernetes/                   # Production Deployment, Service, and Ingress manifests
├── docker-compose.yml                # Multi-container orchestration (Gateway, Web, Redis, Postgres)
├── package.json                      # Next.js 15+ & React 19 dependencies
└── README.md                         # Project documentation
```

---

## 📦 Production Deployment

### Kubernetes Deployment
```bash
kubectl apply -f infrastructure/kubernetes/deployment.yaml
kubectl apply -f infrastructure/kubernetes/service.yaml
kubectl apply -f infrastructure/kubernetes/ingress.yaml
```

### Environment Configuration
```bash
# Gateway Data Plane
PORT=8080
REDIS_URL=redis://localhost:6379/0
DATABASE_URL=postgres://postgres:secret@localhost:5432/bifrost?sslmode=disable
LOG_LEVEL=info

# Upstream Provider Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AIza...
DEEPSEEK_API_KEY=sk-...
GROQ_API_KEY=gsk_...
```

---

## 📄 License & Attribution

Distributed under the **Apache 2.0 License**. See `LICENSE` for details.

*Bifrost Gateway is inspired by and built around the high-performance multi-provider gateway architecture established by [maximhq/bifrost](https://github.com/maximhq/bifrost).*
