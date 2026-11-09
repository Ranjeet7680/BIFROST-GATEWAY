"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  TrendingUp,
  Clock,
  DollarSign,
  Cpu,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function AnalyticsView() {
  const { stats } = useGateway();
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h");

  // Sample data points for 24h request traffic
  const trafficPoints = [
    { time: "00:00", reqs: 1840 },
    { time: "04:00", reqs: 920 },
    { time: "08:00", reqs: 3400 },
    { time: "12:00", reqs: 5800 },
    { time: "16:00", reqs: 6200 },
    { time: "20:00", reqs: 4100 },
    { time: "Now", reqs: 5120 },
  ];

  const maxTraffic = Math.max(...trafficPoints.map((p) => p.reqs));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Token, Latency &amp; Spend Analytics
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Deep observability into inference throughput, cost allocations, and percentile latency performance.
          </p>
        </div>

        {/* Time range picker */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          {(["24h", "7d", "30d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg font-mono transition-all ${
                timeRange === range
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50 font-mono mb-2">
            <span>PERCENTILE LATENCY</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-2">
            P50: 112ms <span className="text-white/40 text-sm">/ P99: 340ms</span>
          </div>
          <span className="text-[11px] text-[#10B981] font-mono">
            Zero SLA breaches in past 30 days
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50 font-mono mb-2">
            <span>EFFECTIVE CACHE EFFICIENCY</span>
            <Sparkles className="w-4 h-4 text-[#00F5FF]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#00F5FF] mb-2">
            38.4% Hit Rate
          </div>
          <span className="text-[11px] text-white/60 font-mono">
            Saved {formatCurrency(stats.costSavedByCache)} in API fees
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50 font-mono mb-2">
            <span>COST PER 1,000 REQUESTS</span>
            <DollarSign className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#10B981] mb-2">
            $0.58 / 1k
          </div>
          <span className="text-[11px] text-white/60 font-mono">
            71% lower than direct OpenAI GPT-4o
          </span>
        </div>
      </div>

      {/* Main Traffic Chart */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-apple">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Request Volume Throughput Over Time
            </h3>
            <span className="text-xs text-white/40 font-mono">Requests per minute (RPM)</span>
          </div>
          <span className="text-xs font-mono text-[#2997FF] bg-[#2997FF]/10 px-2.5 py-1 rounded-full border border-[#2997FF]/20">
            Peak: 6.2k RPM
          </span>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="h-56 flex items-end gap-4 pt-4 border-b border-white/[0.08] pb-2">
          {trafficPoints.map((point, idx) => {
            const heightPct = Math.round((point.reqs / maxTraffic) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  {point.reqs}
                </span>
                <div className="w-full bg-white/[0.04] rounded-t-lg h-44 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-[#0071E3] to-[#2997FF] rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-white/50">{point.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Expense Allocation & Optimization Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cost breakdown */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-white/10">
          <h3 className="text-sm font-semibold text-white mb-4">
            Expenditure by AI Provider
          </h3>
          <div className="space-y-4">
            {[
              { name: "Anthropic Claude", spend: 384.2, pct: 45, color: "#D97706" },
              { name: "OpenAI", spend: 248.5, pct: 29, color: "#10A37F" },
              { name: "Google Gemini", spend: 112.8, pct: 13, color: "#4285F4" },
              { name: "DeepSeek (High Efficiency)", spend: 64.2, pct: 8, color: "#00F5FF" },
              { name: "Groq LPU", spend: 32.45, pct: 5, color: "#F43F5E" },
            ].map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-white/60 font-mono">
                    {formatCurrency(item.spend)} ({item.pct}%)
                  </span>
                </div>
                <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#10B981]" />
            <h3 className="text-sm font-semibold text-white">
              AI Cost-Saving Recommendations
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold">Shift Short Q&amp;A to DeepSeek V3</span>
                <span className="text-[#10B981] font-mono">Save ~$310/mo</span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                42,000 queries under 200 tokens were routed to GPT-4o. Re-routing these via 'rule-cost-optimizer' reduces token costs by 86%.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold">Increase Semantic Similarity Threshold</span>
                <span className="text-[#00F5FF] font-mono">+12% Cache Hits</span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Lowering the cosine similarity threshold from 0.94 to 0.90 will safely absorb duplicate support queries without semantic distortion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
