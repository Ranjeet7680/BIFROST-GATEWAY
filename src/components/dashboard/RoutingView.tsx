"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  GitFork,
  Plus,
  Play,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { RoutingRule } from "@/types/gateway";

export function RoutingView() {
  const { routingRules, toggleRule, addRule, models } = useGateway();
  const [testPrompt, setTestPrompt] = useState("Summarize this financial statement and highlight liabilities.");
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<{
    matchedRule: string;
    modelSelected: string;
    reason: string;
  } | null>(null);

  const handleTestSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setSimulationResult({
        matchedRule: "Coding & Architecture Tasks (Priority 1)",
        modelSelected: "claude-3-5-sonnet-20241022",
        reason: "Matched high-context reasoning heuristics with health score 100%.",
      });
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Routing &amp; Fallback Rules
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Build dynamic policies for model selection, weighted traffic splits, and automated failover chains.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-3 py-1.5 rounded-xl border border-[#10B981]/20">
            {routingRules.filter((r) => r.active).length} Active Policies
          </span>
        </div>
      </div>

      {/* Rules List */}
      <div className="grid grid-cols-1 gap-4">
        {routingRules.map((rule) => (
          <div
            key={rule.id}
            className={`glass-panel rounded-2xl p-5 border transition-all ${
              rule.active ? "border-white/10" : "opacity-50 border-dashed"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#2997FF]/15 text-[#2997FF] font-mono text-xs flex items-center justify-center font-bold">
                  #{rule.priority}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    {rule.name}
                    {rule.active && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
                  </h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    Strategy: {rule.strategy}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors border ${
                    rule.active
                      ? "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10"
                      : "bg-[#10B981]/20 border-[#10B981]/30 text-[#10B981]"
                  }`}
                >
                  {rule.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>

            <p className="text-xs text-white/60 mb-4 leading-relaxed">
              {rule.description}
            </p>

            {/* Target Models & Fallbacks */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-white/40">Primary Targets:</span>
                <div className="flex flex-wrap gap-1.5">
                  {rule.targetModels.map((m) => (
                    <span
                      key={m}
                      className="px-2 py-0.5 rounded bg-[#2997FF]/10 text-[#2997FF] border border-[#2997FF]/20 text-[11px]"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-white/40">Circuit Fallback:</span>
                <span className="px-2 py-0.5 rounded bg-[#F43F5E]/10 text-[#F43F5E] border border-[#F43F5E]/20 text-[11px]">
                  {rule.fallbackModel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Routing Test Console */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-apple">
        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
          <Play className="w-4 h-4 text-[#2997FF] fill-current" />
          Test Routing Decision on Sample Payload
        </h3>
        <p className="text-xs text-white/50 mb-4">
          Type or select a prompt to preview which routing rule and upstream model Bifrost will designate.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={testPrompt}
            onChange={(e) => setTestPrompt(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#2997FF]"
          />
          <button
            onClick={handleTestSimulation}
            disabled={simulating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow flex items-center justify-center gap-2"
          >
            <span>{simulating ? "Evaluating..." : "Run Test"}</span>
          </button>
        </div>

        {simulationResult && (
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono space-y-1.5">
            <div className="text-[#10B981] font-semibold">✓ ROUTE DECISION RESOLVED (1.8ms)</div>
            <div className="text-white/70">
              Matched Rule: <strong className="text-white">{simulationResult.matchedRule}</strong>
            </div>
            <div className="text-white/70">
              Target Model: <strong className="text-[#2997FF]">{simulationResult.modelSelected}</strong>
            </div>
            <div className="text-white/50">{simulationResult.reason}</div>
          </div>
        )}
      </div>
    </div>
  );
}
