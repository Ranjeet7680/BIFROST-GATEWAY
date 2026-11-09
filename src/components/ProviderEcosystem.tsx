"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Cpu,
  Zap,
  Shield,
  Activity,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Server,
  Cloud,
} from "lucide-react";

export function ProviderEcosystem() {
  const { providers, toggleProvider } = useGateway();
  const [filter, setFilter] = useState<"all" | "frontier" | "fast" | "local">("all");

  const filtered = providers.filter((p) => {
    if (filter === "frontier") return ["openai", "anthropic", "gemini", "azure_ai", "aws_bedrock"].includes(p.id);
    if (filter === "fast") return ["groq", "deepseek", "mistral"].includes(p.id);
    if (filter === "local") return ["ollama"].includes(p.id);
    return true;
  });

  return (
    <section id="providers" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-4">
            MULTI-PROVIDER ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Unified API for Every Frontier &amp; Open Model
          </h2>
          <p className="text-base text-white/60">
            Switch models dynamically with zero client code rewrite. Bifrost normalizes request and streaming SSE formats across cloud, edge, and on-premises clusters.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "all" ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              All Providers ({providers.length})
            </button>
            <button
              onClick={() => setFilter("frontier")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "frontier" ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Frontier Cloud
            </button>
            <button
              onClick={() => setFilter("fast")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "fast" ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Open-Weights &amp; LPU
            </button>
            <button
              onClick={() => setFilter("local")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === "local" ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
              }`}
            >
              Self-Hosted (Air-Gapped)
            </button>
          </div>
        </div>

        {/* Grid of Providers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <div
              key={provider.id}
              className={`glass-panel rounded-2xl p-6 transition-all duration-300 relative group ${
                provider.enabled
                  ? "hover:border-white/25 hover:shadow-glow"
                  : "opacity-60 border-dashed"
              }`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center font-bold text-lg text-white">
                    {provider.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                      {provider.name}
                      {provider.enabled && (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                      )}
                    </h3>
                    <span className="text-[11px] font-mono text-white/40">
                      {provider.authType.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Status indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      provider.status === "operational"
                        ? "bg-[#10B981]"
                        : "bg-[#F43F5E]"
                    }`}
                  />
                  <span className="text-[11px] font-mono text-white/70">
                    {provider.latencyMs}ms
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-white/60 mb-5 leading-relaxed min-h-[36px]">
                {provider.description}
              </p>

              {/* Specs & Regions */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-white/40 block text-[10px]">MODELS</span>
                    <span className="text-white font-mono font-medium">
                      {provider.modelsCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">UPTIME (24H)</span>
                    <span className="text-[#10B981] font-mono font-medium">
                      {provider.uptime24h}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleProvider(provider.id)}
                  className={`text-[11px] px-3 py-1 rounded-lg border transition-colors ${
                    provider.enabled
                      ? "bg-white/[0.06] border-white/10 text-white/80 hover:bg-white/10"
                      : "bg-[#10B981]/20 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/30"
                  }`}
                >
                  {provider.enabled ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Adapter Note */}
        <div className="mt-12 glass-panel rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#2997FF]/10 text-[#2997FF]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                Custom Enterprise In-House Inference Adapters
              </h4>
              <p className="text-xs text-white/60">
                Host vLLM, TGI, TensorRT-LLM, or Triton? Bifrost includes native Go adapters with dynamic health polling and queue load balancing.
              </p>
            </div>
          </div>
          <a
            href="https://github.com/maximhq/bifrost"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white border border-white/10 transition-colors flex items-center gap-2"
          >
            <span>Read Adapter Spec</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
