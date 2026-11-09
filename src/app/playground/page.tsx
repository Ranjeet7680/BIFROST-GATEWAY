"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGateway } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  Play,
  ArrowRight,
  Layers,
  Zap,
  Clock,
  DollarSign,
  Cpu,
  CheckCircle2,
  RefreshCw,
  Terminal,
} from "lucide-react";
import { formatCurrency, formatLatency } from "@/lib/utils";

export default function PlaygroundPage() {
  const { models, executeRequest } = useGateway();
  const [selectedModel, setSelectedModel] = useState("bifrost/auto-best");
  const [routingMode, setRoutingMode] = useState<"auto" | "cost" | "latency" | "failover">("auto");
  const [systemPrompt, setSystemPrompt] = useState("You are an enterprise AI assistant running via Bifrost Gateway.");
  const [userPrompt, setUserPrompt] = useState("Explain how Bifrost Gateway achieves sub-4ms overhead while executing multi-provider dynamic routing.");
  const [temperature, setTemperature] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    model: string;
    provider: string;
    cached: boolean;
    tokens: number;
    latencyMs: number;
    cost: number;
  } | null>(null);

  const handleExecute = async () => {
    if (!userPrompt.trim()) return;
    setLoading(true);
    try {
      const res = await executeRequest({
        prompt: userPrompt,
        model: selectedModel,
        routingMode,
      });
      setResult(res);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030407] text-[#ededed] font-sans">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#2997FF] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>DEVELOPER STUDIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive API Playground
          </h1>
          <p className="text-sm text-white/60 mt-1 max-w-2xl">
            Test prompt execution across any model or routing strategy. All playground runs record real telemetry in your administration console.
          </p>
        </div>

        {/* Playground Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls */}
          <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
            <div>
              <label className="text-xs font-mono text-white/50 block mb-2 uppercase">
                TARGET MODEL
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-[#2997FF]"
              >
                {models.map((m) => (
                  <option key={m.id} value={m.id} className="bg-[#090A12]">
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-white/50 block mb-2 uppercase">
                ROUTING STRATEGY
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setRoutingMode("auto")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    routingMode === "auto"
                      ? "bg-[#2997FF]/20 border-[#2997FF] text-white"
                      : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  Auto Best
                </button>
                <button
                  type="button"
                  onClick={() => setRoutingMode("cost")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    routingMode === "cost"
                      ? "bg-[#00F5FF]/20 border-[#00F5FF] text-white"
                      : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  Cost Opt (-72%)
                </button>
                <button
                  type="button"
                  onClick={() => setRoutingMode("latency")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    routingMode === "latency"
                      ? "bg-[#F43F5E]/20 border-[#F43F5E] text-white"
                      : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  Sub-50ms
                </button>
                <button
                  type="button"
                  onClick={() => setRoutingMode("failover")}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    routingMode === "failover"
                      ? "bg-[#F59E0B]/20 border-[#F59E0B] text-white"
                      : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  429 Failover
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-white/50 mb-2">
                <span>TEMPERATURE</span>
                <span className="text-white">{temperature}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-[#2997FF] bg-white/10 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-white/50 block mb-2 uppercase">
                SYSTEM INSTRUCTIONS
              </label>
              <textarea
                rows={3}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#2997FF] resize-none"
              />
            </div>

            <button
              onClick={handleExecute}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] hover:from-[#3B82F6] hover:to-[#1D4ED8] text-white text-xs font-semibold shadow-glow flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Routing via Gateway...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Send Request to Gateway</span>
                </>
              )}
            </button>
          </div>

          {/* Right Column: Prompt & Response */}
          <div className="lg:col-span-8 space-y-6">
            {/* User Prompt Box */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10">
              <label className="text-xs font-mono text-white/50 block mb-2 uppercase">
                USER PROMPT
              </label>
              <textarea
                rows={4}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Enter prompt or query..."
                className="w-full p-4 rounded-xl bg-[#030407] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#2997FF] resize-none"
              />
            </div>

            {/* Response Output Box */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-apple min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                  <span className="text-xs font-mono text-white/50 uppercase">
                    GATEWAY RESPONSE STREAM
                  </span>

                  {result && (
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-white/60">
                        Provider: <strong className="text-white">{result.provider}</strong>
                      </span>
                      <span className="text-white/60">
                        Latency: <strong className="text-white">{formatLatency(result.latencyMs)}</strong>
                      </span>
                      <span className="text-white/60">
                        Tokens: <strong className="text-white">{result.tokens}</strong>
                      </span>
                      <span className="text-[#10B981]">
                        {formatCurrency(result.cost)}
                      </span>
                    </div>
                  )}
                </div>

                {result ? (
                  <div className="p-4 rounded-xl bg-[#030407] border border-white/10 font-mono text-xs text-white/90 leading-relaxed whitespace-pre-wrap">
                    {result.text}
                  </div>
                ) : (
                  <div className="h-44 flex flex-col items-center justify-center text-white/30 text-xs font-mono">
                    <Terminal className="w-8 h-8 mb-2 opacity-50" />
                    <span>Click "Send Request to Gateway" to run live inference</span>
                  </div>
                )}
              </div>

              {result && (
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="text-[#10B981] font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Recorded in Administration Console Requests Log
                  </span>
                  <Link
                    href="/dashboard"
                    className="text-[#2997FF] hover:underline flex items-center gap-1"
                  >
                    <span>View in Dashboard Trace Explorer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
