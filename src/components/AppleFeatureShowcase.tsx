"use client";

import React, { useState, useEffect } from "react";
import {
  Zap,
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Terminal,
  Activity,
  DollarSign,
  Lock,
} from "lucide-react";
import { AppleReveal } from "./AppleReveal";

export function AppleFeatureShowcase() {
  const [activeTab, setActiveTab] = useState<"routing" | "cache" | "failover" | "mcp">("routing");

  // Tab 1 state: Live stream simulation
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedTokens, setStreamedTokens] = useState("");
  const [streamMetrics, setStreamMetrics] = useState({
    model: "gpt-4o",
    provider: "OpenAI",
    overhead: "1.8ms",
    tokensSec: "185",
    cost: "$0.0012",
    cacheHit: false,
  });

  // Tab 2 state: Semantic Cache Similarity Slider
  const [similarityThreshold, setSimilarityThreshold] = useState(0.92);

  // Tab 3 state: Simulated Outage
  const [outageSimulated, setOutageSimulated] = useState(false);
  const [failoverState, setFailoverState] = useState<"healthy" | "tripped" | "recovered">("healthy");

  const prompts = [
    {
      title: "Real-time Customer Support Voice Agent",
      prompt: "Synthesize instant audio transcript response with sub-50ms latency.",
      model: "Groq Llama 3.3 70B",
      provider: "Groq LPU",
      overhead: "1.4ms",
      tokensSec: "480",
      cost: "$0.0002",
      cacheHit: false,
      response:
        "Hello! I am your real-time support assistant powered by Groq LPU streaming through Bifrost Gateway. Your request was authenticated and routed in 1.4ms.",
    },
    {
      title: "Repeated FAQ Query (Semantic Cache)",
      prompt: "What is your enterprise SLA and disaster recovery policy?",
      model: "pgvector Vector Cache",
      provider: "Memory Cache",
      overhead: "0.9ms",
      tokensSec: "1,200",
      cost: "$0.0000",
      cacheHit: true,
      response:
        "Bifrost Gateway guarantees a 99.99% uptime SLA with automated 18ms failover between cloud regions and alternative LLM providers. (Served from pgvector IVFFlat index).",
    },
    {
      title: "Complex AST Code Refactoring",
      prompt: "Refactor Rust async executor with lock-free channel queues.",
      model: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      overhead: "2.1ms",
      tokensSec: "120",
      cost: "$0.0045",
      cacheHit: false,
      response:
        "Here is the lock-free async channel queue implementation utilizing atomic CAS primitives and bounded circular ring buffers for zero-allocation crossbeam communication.",
    },
  ];

  // Streaming effect
  useEffect(() => {
    const cur = prompts[selectedPrompt];
    setIsStreaming(true);
    setStreamedTokens("");

    let idx = 0;
    const text = cur.response;
    const interval = setInterval(() => {
      idx += 3;
      if (idx >= text.length) {
        setStreamedTokens(text);
        setIsStreaming(false);
        clearInterval(interval);
      } else {
        setStreamedTokens(text.slice(0, idx));
      }
    }, 25);

    setStreamMetrics({
      model: cur.model,
      provider: cur.provider,
      overhead: cur.overhead,
      tokensSec: cur.tokensSec,
      cost: cur.cost,
      cacheHit: cur.cacheHit,
    });

    return () => clearInterval(interval);
  }, [selectedPrompt]);

  const handleSimulateOutage = () => {
    setOutageSimulated(true);
    setFailoverState("tripped");
    setTimeout(() => {
      setFailoverState("recovered");
    }, 600);
  };

  const handleResetOutage = () => {
    setOutageSimulated(false);
    setFailoverState("healthy");
  };

  return (
    <section id="cache" className="py-28 relative overflow-hidden bg-[#030407] border-t border-white/[0.08]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#2997FF]/15 via-[#A855F7]/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AppleReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CINEMATIC ARCHITECTURE SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered with Precision.
            <br />
            <span className="text-gradient-blue">Every Millisecond Accounted For.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed">
            Experience the internal mechanics of the Bifrost data plane. Test multi-objective routing, semantic caching, disaster recovery failover, and agent tool governance live.
          </p>
        </AppleReveal>

        {/* Apple Segmented Controller */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full glass-panel border border-white/15 max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("routing")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "routing"
                  ? "bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white shadow-glow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Intelligent Router</span>
            </button>

            <button
              onClick={() => setActiveTab("cache")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "cache"
                  ? "bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-glowEmerald"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>pgvector Semantic Cache</span>
            </button>

            <button
              onClick={() => setActiveTab("failover")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "failover"
                  ? "bg-gradient-to-r from-[#F43F5E] to-[#E11D48] text-white shadow-[0_0_25px_rgba(244,63,94,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>18ms Failover Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab("mcp")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === "mcp"
                  ? "bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white shadow-[0_0_25px_rgba(168,85,247,0.4)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>MCP Agent Governance</span>
            </button>
          </div>
        </div>

        {/* Showcase Container */}
        <div className="apple-card p-6 sm:p-10 border border-white/10 shadow-apple relative">
          {/* TAB 1: Intelligent Router Live Simulation */}
          {activeTab === "routing" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-[#2997FF] tracking-wider mb-2">
                    Multi-Objective Decision Engine
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Sub-3ms Model Selection
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Bifrost analyzes incoming prompt context window, latency SLAs, cost ceilings, and token complexity to route packets to the ideal provider automatically.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-white/40 uppercase">
                    Select Test Workload:
                  </span>
                  {prompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPrompt(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-medium flex items-center justify-between ${
                        selectedPrompt === idx
                          ? "bg-white/[0.08] border-[#2997FF] text-white"
                          : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="truncate">{p.title}</span>
                      <span className="text-[10px] font-mono text-[#2997FF] shrink-0 ml-2">
                        {p.model}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[10px] text-white/40 uppercase font-mono">Overhead</div>
                    <div className="text-base font-bold text-[#00F5FF] font-mono mt-0.5">
                      {streamMetrics.overhead}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[10px] text-white/40 uppercase font-mono">Speed</div>
                    <div className="text-base font-bold text-[#10B981] font-mono mt-0.5">
                      {streamMetrics.tokensSec} tok/s
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <div className="text-[10px] text-white/40 uppercase font-mono">Request Cost</div>
                    <div className="text-base font-bold text-[#F59E0B] font-mono mt-0.5">
                      {streamMetrics.cost}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal View on the right */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#070912] border border-white/15 p-5 shadow-2xl font-mono text-xs">
                  {/* Terminal Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#F43F5E]" />
                      <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                      <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                      <span className="ml-2 text-white/50 text-[11px]">
                        POST /v1/chat/completions (OpenAI Compatible)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          streamMetrics.cacheHit
                            ? "bg-[#10B981]/20 text-[#10B981]"
                            : "bg-[#2997FF]/20 text-[#2997FF]"
                        }`}
                      >
                        {streamMetrics.cacheHit ? "VECTOR CACHE HIT" : "ROUTED: " + streamMetrics.model}
                      </span>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/40 text-[10px] mb-1">// User Prompt Ingress:</div>
                      <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[#E2E8F0]">
                        &quot;{prompts[selectedPrompt].prompt}&quot;
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-white/40 text-[10px] mb-1">
                        <span>// Gateway Live Stream Output:</span>
                        {isStreaming && (
                          <span className="text-[#2997FF] animate-pulse">● STREAMING ACTIVE...</span>
                        )}
                      </div>
                      <div className="p-3.5 rounded-lg bg-[#030407] border border-white/10 text-white leading-relaxed min-h-[90px]">
                        {streamedTokens}
                        {isStreaming && (
                          <span className="inline-block w-2 h-4 bg-[#2997FF] ml-1 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/50 border-t border-white/[0.06]">
                      <span>Authorization: Virtual Key [bf_prod_tenant_14]</span>
                      <span className="text-[#10B981]">HTTP 200 OK</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: pgvector Semantic Cache */}
          {activeTab === "cache" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-[#10B981] tracking-wider mb-2">
                    Zero-Cost Vector Memory
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    pgvector Cosine Similarity
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Instead of billing identical questions to expensive frontier models, Bifrost embeds prompts into PostgreSQL pgvector, returning instant responses in &lt; 4ms at $0 cost.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70 font-medium">Similarity Threshold:</span>
                    <span className="font-mono text-[#10B981] font-bold text-sm">
                      {similarityThreshold.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.75"
                    max="0.99"
                    step="0.01"
                    value={similarityThreshold}
                    onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                    className="w-full accent-[#10B981] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>0.75 (Broad Match)</span>
                    <span>0.92 (Recommended)</span>
                    <span>0.99 (Strict Exact)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                    <div className="text-[10px] text-[#10B981] uppercase font-mono font-bold">
                      Estimated Hit Rate
                    </div>
                    <div className="text-xl font-bold text-white mt-1">
                      {Math.round((1 - similarityThreshold + 0.25) * 80)}%
                    </div>
                    <div className="text-[10px] text-white/50 mt-1">Queries answered from cache</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#2997FF]/10 border border-[#2997FF]/20">
                    <div className="text-[10px] text-[#2997FF] uppercase font-mono font-bold">
                      Latency Reduction
                    </div>
                    <div className="text-xl font-bold text-white mt-1">&lt; 3.8ms</div>
                    <div className="text-[10px] text-white/50 mt-1">vs 850ms upstream roundtrip</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#070912] border border-white/15 p-6 shadow-2xl space-y-5">
                  <div className="text-xs font-mono text-white/50 border-b border-white/10 pb-3">
                    VECTOR EMBEDDING COSINE DISTANCE VISUALIZER
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-white/40 mb-1">Incoming Query (Vector A):</div>
                      <div className="text-white">&quot;How do I cancel my team subscription?&quot;</div>
                    </div>

                    <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="text-[10px] text-white/40 mb-1">Cached Query in pgvector (Vector B):</div>
                      <div className="text-white">&quot;Where can I cancel my company plan?&quot;</div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30">
                      <div>
                        <div className="text-[10px] uppercase text-[#10B981] font-bold">Cosine Similarity Score</div>
                        <div className="text-lg font-bold text-white">0.963 // MATCH EXCEEDS THRESHOLD</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#10B981] text-black font-bold text-xs">
                        HIT (0 Tokens Billed)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 18ms Failover Matrix */}
          {activeTab === "failover" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-[#F43F5E] tracking-wider mb-2">
                    Zero-Downtime Resilience
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    18ms Disaster Recovery Failover
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    When an upstream LLM returns HTTP 429 (Rate Limit) or 503 (Service Unavailable), Bifrost trips its circuit breaker and cascades traffic to the secondary fallback in 18ms.
                  </p>
                </div>

                <div className="flex gap-3">
                  {!outageSimulated ? (
                    <button
                      onClick={handleSimulateOutage}
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#F43F5E] to-[#E11D48] text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:brightness-110 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Simulate Upstream 429 Outage</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleResetOutage}
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm flex items-center gap-2 border border-white/15 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset Provider Health</span>
                    </button>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Primary Provider:</span>
                    <span
                      className={`font-mono font-bold ${
                        outageSimulated ? "text-[#F43F5E]" : "text-[#10B981]"
                      }`}
                    >
                      {outageSimulated ? "OpenAI (TRIPPED / 429)" : "OpenAI (Operational)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Fallback Target:</span>
                    <span className="font-mono text-[#00F5FF] font-bold">
                      Anthropic Claude 3.5 Sonnet
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Failover Latency:</span>
                    <span className="font-mono text-white font-bold">18.4ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Application Impact:</span>
                    <span className="font-mono text-[#10B981] font-bold">0 Drop / 100% 200 OK</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#070912] border border-white/15 p-6 shadow-2xl space-y-4">
                  <div className="text-xs font-mono text-white/50 border-b border-white/10 pb-3 flex items-center justify-between">
                    <span>CIRCUIT BREAKER STATE MACHINE</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        failoverState === "tripped"
                          ? "bg-[#F43F5E]/20 text-[#F43F5E]"
                          : "bg-[#10B981]/20 text-[#10B981]"
                      }`}
                    >
                      {failoverState === "tripped" ? "TRIPPED → FALLBACK ENGAGED" : "HEALTHY (CLOSED)"}
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {/* Node 1 */}
                    <div
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        outageSimulated
                          ? "bg-[#F43F5E]/10 border-[#F43F5E]/30 text-[#F43F5E]"
                          : "bg-white/[0.03] border-white/10 text-white"
                      }`}
                    >
                      <div>
                        <div className="font-bold">1. Primary Target: OpenAI gpt-4o</div>
                        <div className="text-[10px] opacity-70">
                          {outageSimulated ? "HTTP 429 RateLimitBreached -> Circuit Tripped" : "Endpoint responding in 142ms"}
                        </div>
                      </div>
                      <span className="font-bold">{outageSimulated ? "FAIL" : "ONLINE"}</span>
                    </div>

                    <div className="flex justify-center text-white/30">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>

                    {/* Node 2 */}
                    <div
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        outageSimulated
                          ? "bg-[#10B981]/15 border-[#10B981]/40 text-white shadow-glowEmerald"
                          : "bg-white/[0.03] border-white/10 text-white/50"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-white">2. Automatic Fallback: Claude 3.5 Sonnet</div>
                        <div className="text-[10px] opacity-70">
                          {outageSimulated
                            ? "Engaged in 18ms. Standardized streaming response transcoded."
                            : "Standby in fallback chain"}
                        </div>
                      </div>
                      <span className="font-bold text-[#10B981]">
                        {outageSimulated ? "ACTIVE" : "STANDBY"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MCP Agent Governance */}
          {activeTab === "mcp" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-mono uppercase text-[#A855F7] tracking-wider mb-2">
                    Autonomous Agent Infrastructure
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Model Context Protocol (MCP) Bridge
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Provide AI agents (LangChain, CrewAI, AutoGen, Cursor) with governed access to enterprise databases, GitHub, and Slack through sandboxed MCP tool execution.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/80">Human-in-the-Loop Sign-off</span>
                    <span className="text-[#10B981] font-mono font-bold">ENFORCED</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/80">PII &amp; PCI Scrubbing Filter</span>
                    <span className="text-[#2997FF] font-mono font-bold">ACTIVE</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-white/80">SQL Injection Sanitizer</span>
                    <span className="text-[#A855F7] font-mono font-bold">BLOCKING</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#070912] border border-white/15 p-6 shadow-2xl space-y-4">
                  <div className="text-xs font-mono text-white/50 border-b border-white/10 pb-3 flex items-center justify-between">
                    <span>AGENT TOOL CALL AUDIT &amp; APPROVAL GATE</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#A855F7]/20 text-[#A855F7]">
                      PENDING ADMIN CONFIRMATION
                    </span>
                  </div>

                  <div className="font-mono text-xs space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="text-white/40 text-[10px] mb-1">Agent Request:</div>
                      <div className="text-[#E2E8F0]">
                        call_tool(&quot;github_create_pull_request&quot;, &#123; branch: &quot;prod-hotfix&quot; &#125;)
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-white text-xs">
                          Policy: High-risk git write operations require explicit operator approval.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
