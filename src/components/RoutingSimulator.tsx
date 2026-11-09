"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Compass,
  ArrowRight,
  Zap,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingDown,
  Layers,
} from "lucide-react";
import { formatCurrency, formatLatency } from "@/lib/utils";

const PRESET_QUERIES = [
  {
    id: "code",
    label: "Complex Code & Architecture",
    prompt: "Write a high-throughput lock-free concurrency queue in Go with memory-mapped rings.",
    recommendedModel: "claude-3-5-sonnet-20241022",
    reason: "Benchmark leader for complex systems programming and AST logic.",
    expectedLatency: 145,
    costSavings: "28%",
  },
  {
    id: "bulk",
    label: "Bulk Classification (-78% Cost)",
    prompt: "Classify 20,000 user reviews into positive, neutral, or negative categories with JSON output.",
    recommendedModel: "deepseek-v3",
    reason: "Ultra-low cost at $0.14/1M input tokens. Perfect for high-volume offline classification.",
    expectedLatency: 95,
    costSavings: "78%",
  },
  {
    id: "voice",
    label: "Sub-50ms Conversational Voice",
    prompt: "Generate an instantaneous natural spoken confirmation for the user's flight booking.",
    recommendedModel: "groq/llama-3.3-70b",
    reason: "Groq LPU chip delivers 450 tokens/sec with sub-40ms time-to-first-token.",
    expectedLatency: 38,
    costSavings: "64%",
  },
  {
    id: "context",
    label: "2M Token Long-Form Audit",
    prompt: "Ingest a 400-page SEC 10-K filing and trace all undisclosed supply chain liabilities.",
    recommendedModel: "gemini-1.5-pro",
    reason: "Native 2,000,000 token context window avoids brittle RAG chunking artifacts.",
    expectedLatency: 180,
    costSavings: "45%",
  },
];

export function RoutingSimulator() {
  const { models } = useGateway();
  const [selectedPreset, setSelectedPreset] = useState(PRESET_QUERIES[0]);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationDone, setEvaluationDone] = useState(true);

  const handleSelectPreset = (preset: (typeof PRESET_QUERIES)[0]) => {
    setSelectedPreset(preset);
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluationDone(true);
    }, 400);
  };

  const matchedModel = models.find((m) => m.id === selectedPreset.recommendedModel) || models[0];

  return (
    <section id="features" className="py-24 border-t border-white/[0.08] relative bg-[#05060A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2997FF]/10 border border-[#2997FF]/20 text-xs font-mono text-[#2997FF] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>INTELLIGENT ROUTING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Dynamic Model Selection on Every Request
          </h2>
          <p className="text-base text-white/60">
            Never overpay for simple prompts or compromise on complex tasks. Bifrost analyzes prompt intent, context length, provider health, and budgets in under 3 milliseconds.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Preset Selector */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-2">
              Select Incoming Workload
            </span>
            {PRESET_QUERIES.map((preset) => {
              const active = selectedPreset.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 ${
                    active
                      ? "bg-white/[0.08] border-[#2997FF]/50 shadow-glow"
                      : "glass-panel hover:bg-white/[0.04] border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-white">
                      {preset.label}
                    </span>
                    <span className="text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/20">
                      Save {preset.costSavings}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-2 font-mono">
                    "{preset.prompt}"
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Real-Time Decision Matrix */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-apple relative">
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2997FF] animate-pulse" />
                <h3 className="text-base font-semibold text-white">
                  Router Decision Pipeline
                </h3>
              </div>
              <span className="text-xs font-mono text-white/40">
                Decision Latency: 2.1ms
              </span>
            </div>

            {/* Step-by-step evaluation */}
            <div className="space-y-6">
              {/* Step 1: Query analysis */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                  <span>STEP 1: INTENT &amp; TOKEN ESTIMATION</span>
                  <span className="text-[#10B981] font-mono">✓ Verified</span>
                </div>
                <div className="text-xs text-white font-mono bg-[#030407] p-3 rounded-lg border border-white/5 overflow-x-auto">
                  {selectedPreset.prompt}
                </div>
              </div>

              {/* Step 2: Scoring matrix */}
              <div>
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider block mb-3">
                  STEP 2: MULTI-OBJECTIVE OPTIMIZATION
                </span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs text-white/50 mb-1">Target Latency</div>
                    <div className="text-lg font-bold font-mono text-[#2997FF]">
                      {selectedPreset.expectedLatency}ms
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs text-white/50 mb-1">Cost Savings</div>
                    <div className="text-lg font-bold font-mono text-[#10B981]">
                      {selectedPreset.costSavings}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs text-white/50 mb-1">Circuit Health</div>
                    <div className="text-lg font-bold font-mono text-[#00F5FF]">
                      100%
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Winning Route */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2997FF]/10 via-[#0071E3]/5 to-transparent border border-[#2997FF]/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#2997FF] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    WINNING ROUTE SELECTED
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                    {matchedModel?.provider}
                  </span>
                </div>

                <div className="text-xl font-bold text-white mb-1.5">
                  {matchedModel?.name}
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  {selectedPreset.reason}
                </p>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/60">
                  <span>Context: {(matchedModel?.contextWindow || 0).toLocaleString()} tokens</span>
                  <span>Input: ${matchedModel?.inputCostPer1M} / 1M</span>
                  <span>Output: ${matchedModel?.outputCostPer1M} / 1M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
