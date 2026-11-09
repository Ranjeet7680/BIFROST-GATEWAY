"use client";

import React, { useState } from "react";
import {
  Layers,
  Shield,
  Cpu,
  Database,
  Activity,
  Smartphone,
  Server,
  Code2,
  Lock,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface ArchLayer {
  id: string;
  number: string;
  name: string;
  tagline: string;
  responsibilities: string[];
  techStack: string[];
  codePreview: string;
  stats: { label: string; value: string }[];
}

const LAYERS: ArchLayer[] = [
  {
    id: "client",
    number: "01",
    name: "Client & Consumer Layer",
    tagline: "Web applications, mobile clients, Python/TypeScript SDKs, and autonomous agents.",
    responsibilities: [
      "Drop-in OpenAI SDK compatibility (zero client refactoring required)",
      "Standardized SSE streaming for real-time token rendering",
      "Model Context Protocol (MCP) tool and agent interactions",
      "Granular Virtual Key attachment in Authorization headers",
    ],
    techStack: ["OpenAI SDK", "LangChain", "LlamaIndex", "CrewAI", "TypeScript", "Python"],
    codePreview: `import OpenAI from "openai";

// Just swap the base_url to point to your Bifrost Gateway!
const client = new OpenAI({
  baseURL: "https://api.bifrost.internal:8080/v1",
  apiKey: "bf_live_9a7x_enterprise_key",
});

const response = await client.chat.completions.create({
  model: "bifrost/auto-best", // Intelligent dynamic routing
  messages: [{ role: "user", content: "Analyze quarterly earnings." }],
});`,
    stats: [
      { label: "Client SDK Overhead", value: "0ms" },
      { label: "Supported Formats", value: "REST / SSE / gRPC" },
    ],
  },
  {
    id: "gateway",
    number: "02",
    name: "Gateway & Security Layer",
    tagline: "High-throughput Go reverse proxy with token-bucket rate limiting and virtual keys.",
    responsibilities: [
      "Virtual API Key authentication and tenant budget verification",
      "Token bucket rate limiter (per tenant, per key, and global RPM/TPM)",
      "PII redaction and prompt injection guardrail enforcement",
      "OpenAPI 3.1 strict schema validation before upstream dispatch",
    ],
    techStack: ["Go (Golang)", "FastHTTP", "JWT / OIDC", "mTLS", "Token Bucket"],
    codePreview: `func (g *Gateway) HandleChatCompletions(c *fiber.Ctx) error {
    // 1. Authenticate Virtual Key & Tenant Budget
    vKey, err := g.auth.ValidateVirtualKey(c.Get("Authorization"))
    if err != nil || vKey.IsBudgetExceeded() {
        return c.Status(402).JSON(fiber.Map{"error": "Tenant budget exceeded"})
    }

    // 2. Enforce Rate Limits
    if !g.rateLimiter.Allow(vKey.ID, vKey.RateLimitRPM) {
        return c.Status(429).JSON(fiber.Map{"error": "Rate limit exceeded"})
    }
    return g.router.ProcessRequest(c, vKey)
}`,
    stats: [
      { label: "Throughput Capacity", value: "120,000 req/s" },
      { label: "Edge Auth Latency", value: "< 0.8ms" },
    ],
  },
  {
    id: "intelligence",
    number: "03",
    name: "Intelligence & Routing Layer",
    tagline: "Semantic caching, multi-provider model routing, and automatic circuit breakers.",
    responsibilities: [
      "Exact and cosine-similarity semantic vector cache inspection",
      "Cost-aware and latency-aware dynamic provider selection",
      "Automatic failover chains with bounded retry policies",
      "Load balancing across weighted provider clusters",
    ],
    techStack: ["pgvector", "Embedding Engine", "Circuit Breakers", "Dynamic Weights"],
    codePreview: `// Intelligent Router Decision Matrix
func (r *Router) SelectBestProvider(req *UnifiedRequest) (*Provider, error) {
    // Check semantic cache in Redis/pgvector
    if cached, sim := r.cache.Lookup(req.PromptEmbedding); sim > 0.92 {
        return nil, ErrCacheHit{Payload: cached}
    }

    // Evaluate active routing policy (Cost, Latency, Fallback)
    candidates := r.registry.GetHealthyProvidersForModel(req.Model)
    return r.optimizer.Select(candidates, req.Constraints)
}`,
    stats: [
      { label: "Routing Latency", value: "< 2.5ms" },
      { label: "Cache Hit Cost Savings", value: "Up to 84%" },
    ],
  },
  {
    id: "provider",
    number: "04",
    name: "Provider Adapter Layer",
    tagline: "Normalized multi-provider translation and streaming SSE transcoders.",
    responsibilities: [
      "OpenAI format translation to Claude, Gemini, Bedrock, and Groq formats",
      "Unified multimodal request encoding (images, audio, PDFs, videos)",
      "Standardized error normalization across divergent upstream HTTP codes",
      "Direct hardware acceleration integration with Groq and local Ollama",
    ],
    techStack: ["OpenAI", "Anthropic", "Google Gemini", "AWS Bedrock", "Groq", "Ollama"],
    codePreview: `// Normalized Multi-Provider Interface
type ProviderAdapter interface {
    SendChat(ctx context.Context, req *UnifiedRequest) (*UnifiedResponse, error)
    StreamChat(ctx context.Context, req *UnifiedRequest, out chan<- StreamChunk) error
    HealthCheck(ctx context.Context) HealthStatus
}`,
    stats: [
      { label: "Supported Adapters", value: "15+ Providers" },
      { label: "SSE Transcoding Overhead", value: "< 1.2ms" },
    ],
  },
  {
    id: "data",
    number: "05",
    name: "Data & Caching Layer",
    tagline: "PostgreSQL with pgvector for semantic memory and Redis for distributed state.",
    responsibilities: [
      "High-speed exact match and semantic embedding caching",
      "Virtual key budget balances and real-time usage meters",
      "Encrypted API key vault with envelope encryption",
      "Distributed lock management and rate limit counters",
    ],
    techStack: ["PostgreSQL 16", "pgvector", "Redis Cluster", "AES-256-GCM"],
    codePreview: `-- Semantic Cache Vector Similarity Table
CREATE TABLE semantic_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id VARCHAR(64) NOT NULL,
    prompt_hash VARCHAR(64) NOT NULL,
    embedding vector(1536),
    response_payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX ON semantic_cache USING ivfflat (embedding vector_cosine_ops);`,
    stats: [
      { label: "Cache Lookup Time", value: "< 4ms" },
      { label: "Vector Index Size", value: "Millions of entries" },
    ],
  },
  {
    id: "operations",
    number: "06",
    name: "Operations & Observability Layer",
    tagline: "OpenTelemetry distributed tracing, Prometheus metrics, and audit governance.",
    responsibilities: [
      "W3C Trace Context propagation across every microservice hop",
      "Prometheus metric exporters (P50/P90/P99 latency, token throughput, spend)",
      "Immutable audit log records for enterprise compliance (SOC2/HIPAA)",
      "Grafana and Datadog dashboard templates included out of the box",
    ],
    techStack: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger", "Docker", "Kubernetes"],
    codePreview: `# Prometheus Metric Export Sample
# HELP bifrost_requests_total Total number of AI gateway requests
# TYPE bifrost_requests_total counter
bifrost_requests_total{provider="anthropic",model="claude-3-5-sonnet",status="200"} 481920
# HELP bifrost_request_duration_seconds Latency percentiles
bifrost_request_duration_seconds{quantile="0.95"} 0.168`,
    stats: [
      { label: "OTel Tracing", value: "100% Request Coverage" },
      { label: "Audit Compliance", value: "SOC2 & HIPAA Ready" },
    ],
  },
];

export function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<ArchLayer>(LAYERS[0]);

  return (
    <section id="architecture" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Built for Extreme Throughput &amp; Zero Downtime
          </h2>
          <p className="text-base text-white/60">
            A battle-tested 6-tier architecture separating the high-speed data plane from the administrative control plane.
          </p>
        </div>

        {/* Layer tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {LAYERS.map((layer) => {
            const isSelected = activeLayer.id === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#2997FF]/15 border-[#2997FF]/50 shadow-glow"
                    : "glass-panel hover:bg-white/[0.04] border-white/[0.08]"
                }`}
              >
                <span className="text-[10px] font-mono text-[#2997FF] block mb-1">
                  LAYER {layer.number}
                </span>
                <span className="text-xs font-semibold text-white block truncate">
                  {layer.name.split(" ")[0]} {layer.name.split(" ")[1] || ""}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Detailed View */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-apple">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Responsibilities and Tech Stack */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#2997FF] mb-2">
                  <span>LAYER {activeLayer.number}</span>
                  <span>•</span>
                  <span>DATA PLANE COMPONENT</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {activeLayer.name}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {activeLayer.tagline}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 font-mono">
                  KEY RESPONSIBILITIES
                </h4>
                <ul className="space-y-2.5">
                  {activeLayer.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2997FF] mt-1.5 flex-shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack pills */}
              <div>
                <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 font-mono">
                  TECHNOLOGY &amp; STANDARDS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeLayer.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-4">
                {activeLayer.stats.map((s, idx) => (
                  <div key={idx}>
                    <div className="text-lg font-bold text-white font-mono">{s.value}</div>
                    <div className="text-[11px] text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Code Specification Snippet */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#030407] border border-white/10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                    <span className="text-xs font-mono text-white/40 ml-2">
                      {activeLayer.id}.spec
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white/60">
                    READ-ONLY
                  </span>
                </div>
                <pre className="p-4 sm:p-5 text-xs text-white/80 font-mono overflow-x-auto leading-relaxed">
                  <code>{activeLayer.codePreview}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
