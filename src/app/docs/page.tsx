"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Terminal,
  Layers,
  Code2,
  Copy,
  Check,
  Server,
  Shield,
  Zap,
  Cpu,
  Database,
  Lock,
  Boxes,
  Activity,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<string>("quickstart");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const menuSections = [
    {
      title: "GETTING STARTED",
      items: [
        { id: "quickstart", label: "Quickstart (3 Minutes)" },
        { id: "docker", label: "Docker Deployment" },
        { id: "kubernetes", label: "Kubernetes & Helm" },
      ],
    },
    {
      title: "API SPECIFICATION",
      items: [
        { id: "unified-api", label: "POST /v1/chat/completions" },
        { id: "models-api", label: "GET /v1/models" },
        { id: "virtual-keys-api", label: "Virtual Keys & Quotas" },
      ],
    },
    {
      title: "ENTERPRISE FEATURES",
      items: [
        { id: "semantic-cache-doc", label: "Semantic Caching" },
        { id: "mcp-doc", label: "Model Context Protocol (MCP)" },
        { id: "guardrails-doc", label: "DLP & PII Masking" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030407] text-[#ededed] font-sans">
      <Navbar />

      <main className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Docs Navigation Sidebar */}
          <aside className="lg:col-span-3 glass-panel rounded-2xl p-4 border border-white/10 space-y-6 sticky top-28">
            {menuSections.map((sec) => (
              <div key={sec.title}>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2 font-semibold">
                  {sec.title}
                </span>
                <div className="space-y-1">
                  {sec.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveDoc(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeDoc === item.id
                          ? "bg-[#2997FF]/15 text-white border border-[#2997FF]/30 font-semibold"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/[0.08]">
              <div className="text-[11px] font-mono text-white/40 mb-2">QUICK LINKS</div>
              <div className="space-y-1">
                <Link
                  href="/playground"
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-[#2997FF] hover:bg-[#2997FF]/10 transition-colors"
                >
                  <span>Interactive Playground</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/architecture"
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-white/70 hover:bg-white/5 transition-colors"
                >
                  <span>6-Layer Architecture</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-white/70 hover:bg-white/5 transition-colors"
                >
                  <span>Enterprise Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Docs Content Area */}
          <div className="lg:col-span-9 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-apple space-y-10">
            {/* 01: QUICKSTART */}
            {activeDoc === "quickstart" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2997FF]/10 border border-[#2997FF]/20 text-[11px] font-mono text-[#2997FF] mb-3">
                    GETTING STARTED • STEP-BY-STEP
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Quickstart: Connect Your App in 3 Minutes
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Bifrost Gateway is a 100% drop-in replacement for OpenAI SDKs across Python, TypeScript, Java, and Go. No proprietary SDKs needed—simply point your existing client&apos;s base URL to Bifrost.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    Step 1: Start the Gateway Engine
                  </h3>
                  <div className="p-4 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 flex items-center justify-between">
                    <code>docker run -d -p 8080:8080 getbifrost/gateway:latest</code>
                    <button
                      onClick={() =>
                        handleCopy("docker run -d -p 8080:8080 getbifrost/gateway:latest", "c1")
                      }
                      className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-white/60 hover:text-white"
                    >
                      {copied === "c1" ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    Step 2: Point Existing Python OpenAI Client
                  </h3>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`from openai import OpenAI

# Connect existing OpenAI client to Bifrost Gateway
client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="bf_live_enterprise_token"
)

# Route to any model dynamically (OpenAI, Claude, Gemini, DeepSeek, Groq)
response = client.chat.completions.create(
    model="bifrost/auto-best", # Or claude-3-5-sonnet, deepseek-r1, gpt-4o, groq/llama-3.3-70b
    messages=[{"role": "user", "content": "Hello Bifrost Gateway!"}]
)

print(response.choices[0].message.content)`}
                  </pre>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    Step 3: Point Node.js / TypeScript Client
                  </h3>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://localhost:8080/v1",
  apiKey: "bf_live_enterprise_token",
});

const completion = await client.chat.completions.create({
  model: "claude-3-5-sonnet",
  messages: [{ role: "user", content: "Optimize SQL query execution plan" }],
});

console.log(completion.choices[0].message.content);`}
                  </pre>
                </div>
              </div>
            )}

            {/* 02: DOCKER DEPLOYMENT */}
            {activeDoc === "docker" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2997FF]/10 border border-[#2997FF]/20 text-[11px] font-mono text-[#2997FF] mb-3">
                    CONTAINER INFRASTRUCTURE • DOCKER COMPOSE
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Docker &amp; Multi-Container Compose
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Deploy Bifrost alongside Redis 7 cluster (for token bucket rate limits) and PostgreSQL 16 with pgvector extension (for sub-4ms semantic cache lookup).
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-white/60">
                    <span>docker-compose.yml:</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `version: '3.8'\nservices:\n  gateway:\n    image: getbifrost/gateway:latest\n    ports:\n      - "8080:8080"\n    environment:\n      - REDIS_URL=redis://redis:6379/0\n      - DATABASE_URL=postgres://postgres:secret@postgres:5432/bifrost\n      - LOG_LEVEL=info\n      - OPENAI_API_KEY=\${OPENAI_API_KEY}\n      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}\n    depends_on:\n      - redis\n      - postgres\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n\n  postgres:\n    image: pgvector/pgvector:pg16\n    ports:\n      - "5432:5432"\n    environment:\n      - POSTGRES_PASSWORD=secret\n      - POSTGRES_DB=bifrost`,
                          "c2"
                        )
                      }
                      className="flex items-center gap-1 text-[#2997FF] hover:underline"
                    >
                      {copied === "c2" ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Compose Manifest</span>
                    </button>
                  </div>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`version: '3.8'

services:
  gateway:
    image: getbifrost/gateway:latest
    ports:
      - "8080:8080"
    environment:
      - REDIS_URL=redis://redis:6379/0
      - DATABASE_URL=postgres://postgres:secret@postgres:5432/bifrost
      - LOG_LEVEL=info
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - redis
      - postgres

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  postgres:
    image: pgvector/pgvector:pg16
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=bifrost`}
                  </pre>
                </div>
              </div>
            )}

            {/* 03: KUBERNETES & HELM */}
            {activeDoc === "kubernetes" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2997FF]/10 border border-[#2997FF]/20 text-[11px] font-mono text-[#2997FF] mb-3">
                    ENTERPRISE ORCHESTRATION • K8S &amp; HELM
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Kubernetes &amp; Production Helm Chart
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Deploy horizontally auto-scaling (HPA) Bifrost pods on AWS EKS, Google GKE, or Azure AKS with TLS termination, mTLS ingress, and Prometheus scrape annotations.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    Helm Install in 1 Command
                  </h3>
                  <div className="p-4 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 flex items-center justify-between">
                    <code>helm install bifrost-gateway oci://ghcr.io/bifrost/helm/bifrost-gateway -n ai-ops --create-namespace</code>
                    <button
                      onClick={() =>
                        handleCopy("helm install bifrost-gateway oci://ghcr.io/bifrost/helm/bifrost-gateway -n ai-ops --create-namespace", "c3")
                      }
                      className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-white/60 hover:text-white"
                    >
                      {copied === "c3" ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-white/60">kubernetes-deployment.yaml:</span>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: bifrost-gateway
  namespace: ai-ops
spec:
  replicas: 4
  selector:
    matchLabels:
      app: bifrost-gateway
  template:
    metadata:
      labels:
        app: bifrost-gateway
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      containers:
      - name: gateway
        image: getbifrost/gateway:latest
        ports:
        - containerPort: 8080
        resources:
          limits:
            cpu: "2000m"
            memory: "2Gi"
          requests:
            cpu: "250m"
            memory: "256Mi"
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 3`}
                  </pre>
                </div>
              </div>
            )}

            {/* 04: UNIFIED CHAT COMPLETIONS API */}
            {activeDoc === "unified-api" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#10B981]/10 border border-[#10B981]/20 text-[11px] font-mono text-[#10B981] mb-3">
                    CORE API • STRICT OPENAI 3.1 CONFORMANCE
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    POST /v1/chat/completions
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Standard unified chat completions endpoint. Routes queries across commercial frontier and self-hosted models, normalizes streaming chunks, evaluates semantic caches, and enforces rate limits.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    HTTP Request Specification
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40">
                          <th className="pb-2">HEADER</th>
                          <th className="pb-2">TYPE</th>
                          <th className="pb-2">DESCRIPTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06] text-white/80">
                        <tr>
                          <td className="py-2.5 text-[#2997FF]">Authorization</td>
                          <td className="py-2.5 text-white/50">Bearer &lt;token&gt;</td>
                          <td className="py-2.5">Bifrost Virtual Key (e.g. vk_prod_web_app)</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-[#2997FF]">x-bifrost-routing-mode</td>
                          <td className="py-2.5 text-white/50">auto | cost | latency</td>
                          <td className="py-2.5">Optional dynamic router override header</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-[#2997FF]">Content-Type</td>
                          <td className="py-2.5 text-white/50">application/json</td>
                          <td className="py-2.5">Standard JSON payload</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-white/60">cURL Example:</span>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`curl -X POST https://bifrost-gateway-lovat.vercel.app/api/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer bf_live_enterprise" \\
  -d '{
    "model": "auto",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "How do I implement circuit breakers in Go?"}
    ],
    "temperature": 0.7
  }'`}
                  </pre>
                </div>
              </div>
            )}

            {/* 05: MODELS DISCOVERY API */}
            {activeDoc === "models-api" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2997FF]/10 border border-[#2997FF]/20 text-[11px] font-mono text-[#2997FF] mb-3">
                    MODEL DISCOVERY • REAL-TIME CATALOG
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    GET /v1/models
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    List all active and configured upstream models, their real-time latency percentiles, pricing per million tokens, context limits, and capabilities.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-white/60">Response Payload (JSON):</span>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`{
  "object": "list",
  "data": [
    {
      "id": "gpt-4o",
      "object": "model",
      "provider": "OpenAI",
      "context_window": 128000,
      "pricing_input_1m": 2.50,
      "pricing_output_1m": 10.00,
      "latency_p50_ms": 142,
      "status": "operational"
    },
    {
      "id": "claude-3-5-sonnet-20241022",
      "object": "model",
      "provider": "Anthropic",
      "context_window": 200000,
      "pricing_input_1m": 3.00,
      "pricing_output_1m": 15.00,
      "latency_p50_ms": 168,
      "status": "operational"
    },
    {
      "id": "deepseek-ai/DeepSeek-V3",
      "object": "model",
      "provider": "DeepSeek",
      "context_window": 64000,
      "pricing_input_1m": 0.14,
      "pricing_output_1m": 0.28,
      "latency_p50_ms": 95,
      "status": "operational"
    }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* 06: VIRTUAL KEYS & QUOTAS */}
            {activeDoc === "virtual-keys-api" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#A855F7]/10 border border-[#A855F7]/20 text-[11px] font-mono text-[#A855F7] mb-3">
                    GOVERNANCE • MULTI-TENANT ISOLATION
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Virtual Keys &amp; Budget Quotas
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Never distribute raw OpenAI or Anthropic API secrets to client apps. Issue scoped Virtual Keys with strict monthly budget caps, allowed model whitelists, and token bucket rate limits (RPM).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs font-mono text-[#2997FF] uppercase font-bold">Monthly Spend Caps</div>
                    <p className="text-xs text-white/60 mt-1">
                      Set $2,500/mo hard ceilings. Requests automatically receive HTTP 429 once budget ceiling is breached.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs font-mono text-[#10B981] uppercase font-bold">Model Whitelisting</div>
                    <p className="text-xs text-white/60 mt-1">
                      Restrict specific frontend clients to cheaper models (e.g. Gemini Flash, GPT-4o-mini) to prevent unauthorized cost spikes.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs font-mono text-[#F59E0B] uppercase font-bold">RPM Rate Limiting</div>
                    <p className="text-xs text-white/60 mt-1">
                      Token bucket algorithm in Redis 7 clamps client bursts to 600 RPM without backend thrashing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 07: SEMANTIC CACHING */}
            {activeDoc === "semantic-cache-doc" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#10B981]/10 border border-[#10B981]/20 text-[11px] font-mono text-[#10B981] mb-3">
                    ECONOMIC ACCELERATION • VECTOR MEMORY
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    pgvector Semantic Caching Architecture
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Bifrost combines exact SHA-256 hash matching in Redis with cosine similarity vector distance search in PostgreSQL 16 pgvector, eliminating 35% to 72% of recurring LLM token expenditures.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    How Semantic Similarity Works
                  </h3>
                  <div className="p-5 rounded-2xl bg-[#030407] border border-white/10 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-white/70">
                      <span>Query A: &quot;How do I reset my password?&quot;</span>
                      <span className="text-[#2997FF]">[Vectorized]</span>
                    </div>
                    <div className="flex items-center justify-between text-white/70">
                      <span>Query B: &quot;Where can I change my team credentials?&quot;</span>
                      <span className="text-[#2997FF]">[pgvector Lookup]</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[#10B981] font-bold">
                      <span>Cosine Distance: 0.962 (Above Threshold 0.92)</span>
                      <span>STATUS: CACHE HIT (0 TOKENS BILLED, 3.8ms)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 08: MCP AGENT GATEWAY */}
            {activeDoc === "mcp-doc" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#A855F7]/10 border border-[#A855F7]/20 text-[11px] font-mono text-[#A855F7] mb-3">
                    AUTONOMOUS WORKFLOWS • MCP TOOL GATEWAY
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Model Context Protocol (MCP) Bridge
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Bifrost acts as a secure reverse proxy for autonomous agents (Cursor, LangChain, CrewAI, AutoGen), exposing sandboxed MCP tools with human-in-the-loop approval gates.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-white/60">Configuring an MCP Server in bifrost.json:</span>
                  <pre className="p-4 sm:p-5 rounded-2xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`{
  "mcp_servers": {
    "postgres_analytics": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://readonly@prod-db:5432/analytics"
      },
      "approval_required": false
    },
    "github_actions": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "approval_required": true // High risk write operation requires admin sign-off
    }
  }
}`}
                  </pre>
                </div>
              </div>
            )}

            {/* 09: DLP & PII MASKING */}
            {activeDoc === "guardrails-doc" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[11px] font-mono text-[#F43F5E] mb-3">
                    COMPLIANCE &amp; PRIVACY • ZERO-LEAK GUARDRAILS
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    DLP, PII Redaction &amp; Prompt Defense
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Protect patient identifiers, payment credentials, and confidential tokens before packets ever exit your VPC to external commercial AI providers.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                    Supported Redaction Engines
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="text-xs font-mono font-bold text-[#F43F5E]">PCI-DSS PAN Redaction</div>
                      <p className="text-xs text-white/60">
                        Detects Visa, Mastercard, AMEX PAN sequences using the Luhn checksum validator and replaces with <code className="text-[#2997FF]">[REDACTED_PAN]</code>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="text-xs font-mono font-bold text-[#10B981]">HIPAA Patient PHI</div>
                      <p className="text-xs text-white/60">
                        Sanitizes Social Security numbers (SSN), medical record numbers, dates of birth, and email addresses with zero packet delay (&lt; 1ms).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="text-xs font-mono font-bold text-[#F59E0B]">Prompt Injection Blocker</div>
                      <p className="text-xs text-white/60">
                        Classifies adversarial jailbreak phrases (&quot;Ignore all previous system prompts...&quot;) and emits HTTP 400 Bad Request before token ingestion.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="text-xs font-mono font-bold text-[#A855F7]">Infinite Loop Breaker</div>
                      <p className="text-xs text-white/60">
                        Clamps autonomous agent spend velocities exceeding $50/minute to prevent runaway multi-turn looping agent failures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
