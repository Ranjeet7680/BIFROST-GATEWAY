"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Cpu,
  Plus,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Key,
  Globe,
  Lock,
  ExternalLink,
} from "lucide-react";
import { AIProvider } from "@/types/gateway";

export function ProvidersView() {
  const { providers, toggleProvider, updateProviderLatency } = useGateway();
  const [testingId, setTestingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleTestLatency = (id: string) => {
    setTestingId(id);
    setTimeout(() => {
      const simulatedNewLatency = Math.round(30 + Math.random() * 140);
      updateProviderLatency(id, simulatedNewLatency);
      setTestingId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Upstream AI Providers
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Configure provider API keys, test edge health latency, and manage routing eligibility.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Connect Custom Provider</span>
        </button>
      </div>

      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {providers.map((p) => (
          <div
            key={p.id}
            className={`glass-panel rounded-2xl p-5 border transition-all ${
              p.enabled ? "border-white/10 hover:border-white/20" : "opacity-50 border-dashed"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center font-bold text-lg text-white">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    {p.name}
                    {p.enabled && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
                  </h3>
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    {p.authType}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono">
                <span
                  className={`w-2 h-2 rounded-full ${
                    p.status === "operational" ? "bg-[#10B981]" : "bg-[#F43F5E]"
                  }`}
                />
                <span className="text-white/80">{p.latencyMs}ms</span>
              </div>
            </div>

            <p className="text-xs text-white/60 mb-4 line-clamp-2 min-h-[32px]">
              {p.description}
            </p>

            {/* Regions & Models */}
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-mono space-y-1 mb-4">
              <div className="flex justify-between text-white/60">
                <span>Regions:</span>
                <span className="text-white truncate max-w-[140px]">{p.regions.join(", ")}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Active Models:</span>
                <span className="text-white">{p.modelsCount} cataloged</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Key Vault:</span>
                <span className={p.hasKey ? "text-[#10B981]" : "text-white/40"}>
                  {p.hasKey ? "AES-256 Encrypted" : "Local / None"}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <button
                onClick={() => handleTestLatency(p.id)}
                disabled={testingId === p.id}
                className="text-xs text-white/60 hover:text-white flex items-center gap-1 font-mono"
              >
                <RefreshCw className={`w-3 h-3 ${testingId === p.id ? "animate-spin text-[#2997FF]" : ""}`} />
                <span>{testingId === p.id ? "Pinging..." : "Test Latency"}</span>
              </button>

              <button
                onClick={() => toggleProvider(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors border ${
                  p.enabled
                    ? "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10"
                    : "bg-[#10B981]/15 border-[#10B981]/30 text-[#10B981]"
                }`}
              >
                {p.enabled ? "Disable" : "Enable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Provider Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Connect New Provider Adapter</h3>
            <p className="text-xs text-white/50 mb-5">
              Add custom OpenAI-compatible endpoints such as vLLM, TensorRT-LLM, or self-hosted Ollama.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-white/60 block mb-1">Provider Name</label>
                <input
                  type="text"
                  placeholder="e.g. My Private vLLM Cluster"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                />
              </div>
              <div>
                <label className="text-white/60 block mb-1">Base URL Endpoint</label>
                <input
                  type="text"
                  placeholder="https://vllm-node-01.internal:8000/v1"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                />
              </div>
              <div>
                <label className="text-white/60 block mb-1">API Key / Bearer Secret</label>
                <input
                  type="password"
                  placeholder="••••••••••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl bg-[#2997FF] text-white text-xs font-semibold shadow-glow"
              >
                Save &amp; Verify Adapter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
