"use client";

import React from "react";
import { useGateway } from "@/lib/store";
import {
  Activity,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Cpu,
  Zap,
  DollarSign,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Database,
  Layers,
  ArrowRight,
} from "lucide-react";
import { formatCurrency, formatNumber, formatLatency } from "@/lib/utils";

export function OverviewView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { stats, providers, requests, models, setSelectedRequestForTrace } = useGateway();

  const activeProviders = providers.filter((p) => p.enabled);
  const recentRequests = requests.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Top Banner / Cluster Status */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-radial-glow">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider font-semibold">
              GATEWAY CLUSTER OPERATIONAL • 99.99% HEALTH
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Enterprise Traffic &amp; Health Overview
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl">
            Unified routing active across {activeProviders.length} connected upstream providers. Semantic caching absorbing {stats.cacheHitPercentage}% of repetitive inference workloads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("playground")}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow hover:shadow-[0_0_25px_rgba(41,151,255,0.6)] transition-all flex items-center gap-1.5"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Test in Playground</span>
          </button>
          <button
            onClick={() => onNavigate("requests")}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition-colors"
          >
            Live Logs
          </button>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Requests */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-white/50 text-xs mb-3 font-mono">
            <span>TOTAL ROUTED REQUESTS</span>
            <Activity className="w-4 h-4 text-[#2997FF]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1.5">
            {formatNumber(stats.totalRequests)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>99.98% Success Rate</span>
          </div>
        </div>

        {/* Latency Average & P95 */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-white/50 text-xs mb-3 font-mono">
            <span>AVG / P95 LATENCY</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1.5">
            {stats.avgLatencyMs}ms{" "}
            <span className="text-xs text-white/40 font-normal">/ {stats.p95LatencyMs}ms</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Overhead &lt; 4ms</span>
          </div>
        </div>

        {/* Tokens Processed */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-white/50 text-xs mb-3 font-mono">
            <span>TOKEN VOLUME (MONTH)</span>
            <Cpu className="w-4 h-4 text-[#A855F7]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1.5">
            {formatNumber(stats.totalTokens)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <span>Cache Absorbed: {formatNumber(stats.totalTokens * 0.35)}</span>
          </div>
        </div>

        {/* AI Spend & Savings */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-white/50 text-xs mb-3 font-mono">
            <span>COST SAVED BY CACHE</span>
            <DollarSign className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#10B981] mb-1.5">
            {formatCurrency(stats.costSavedByCache)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <span>Spend: {formatCurrency(stats.totalExpenditure)}</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Provider Health Matrix + Top Models */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Providers Health Table */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#2997FF]" />
              Upstream Provider Cluster Health
            </h3>
            <button
              onClick={() => onNavigate("providers")}
              className="text-xs text-[#2997FF] hover:underline flex items-center gap-1"
            >
              <span>Manage Providers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {providers.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center font-bold text-xs text-white">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{p.name}</div>
                    <div className="text-[10px] text-white/40 font-mono">
                      {p.regions[0]} • {p.modelsCount} models
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-white/70">{p.latencyMs}ms</span>
                  <span className="text-[#10B981]">{p.uptime24h}%</span>
                  <span className="flex items-center gap-1 text-[#10B981]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    Healthy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Routed Models */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A855F7]" />
              Top Models by Volume
            </h3>
            <button
              onClick={() => onNavigate("models")}
              className="text-xs text-[#2997FF] hover:underline"
            >
              View Catalog
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: "Claude 3.5 Sonnet", share: 38, cost: "$3.00/1M", color: "#D97706" },
              { name: "DeepSeek V3 (Cost-Opt)", share: 29, cost: "$0.14/1M", color: "#00F5FF" },
              { name: "Groq Llama 3.3 (Fast)", share: 18, cost: "$0.59/1M", color: "#F43F5E" },
              { name: "GPT-4o", share: 15, cost: "$2.50/1M", color: "#10A37F" },
            ].map((m) => (
              <div key={m.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{m.name}</span>
                  <span className="text-white/60 font-mono">{m.share}%</span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.share}%`, backgroundColor: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Recent Live Traced Requests */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2997FF] animate-pulse" />
            <h3 className="text-sm font-semibold text-white">
              Recent Traced API Requests
            </h3>
          </div>
          <button
            onClick={() => onNavigate("requests")}
            className="text-xs text-[#2997FF] hover:underline flex items-center gap-1"
          >
            <span>Open Trace Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">TIMESTAMP</th>
                <th className="pb-3 font-normal">MODEL / PROVIDER</th>
                <th className="pb-3 font-normal">STATUS</th>
                <th className="pb-3 font-normal">LATENCY</th>
                <th className="pb-3 font-normal">TOKENS</th>
                <th className="pb-3 font-normal">COST</th>
                <th className="pb-3 font-normal text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {recentRequests.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-mono text-white/50">{req.timestamp.split(" ")[1]}</td>
                  <td className="py-3 font-medium text-white">
                    <div>{req.model}</div>
                    <div className="text-[10px] text-white/40">{req.provider}</div>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#10B981]/20 text-[#10B981]">
                      {req.cached ? "200 (CACHE HIT)" : `${req.status} OK`}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-white/70">{formatLatency(req.latencyMs)}</td>
                  <td className="py-3 font-mono text-white/70">{req.totalTokens}</td>
                  <td className="py-3 font-mono text-[#10B981]">{formatCurrency(req.cost)}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedRequestForTrace(req);
                        onNavigate("requests");
                      }}
                      className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/10 text-white/80 text-[11px] font-mono transition-colors"
                    >
                      Inspect Trace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
