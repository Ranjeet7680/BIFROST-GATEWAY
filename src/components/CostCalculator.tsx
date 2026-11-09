"use client";

import React, { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { DollarSign, TrendingDown, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CostCalculator() {
  const [monthlyRequests, setMonthlyRequests] = useState<number>(1_500_000);
  const [avgTokens, setAvgTokens] = useState<number>(1200);

  // Total tokens per month
  const totalTokens = monthlyRequests * avgTokens;

  // Typical unmanaged OpenAI GPT-4o price average: ~$4.50 per 1M tokens
  const unmanagedCost = (totalTokens / 1_000_000) * 4.5;

  // With Bifrost:
  // 1. Semantic Cache absorbs 35% of queries with $0 token cost
  // 2. Intelligent router shifts 45% of traffic to DeepSeek V3 / Groq ($0.45/1M)
  // 3. Remaining 20% to frontier models ($3.00/1M)
  // Effective cost is approx ~68% lower
  const cacheSavingsRatio = 0.35;
  const uncachedTokens = totalTokens * (1 - cacheSavingsRatio);
  const managedCost =
    uncachedTokens * 0.45 * (0.45 / 1_000_000) +
    uncachedTokens * 0.55 * (2.8 / 1_000_000);

  const monthlySavings = unmanagedCost - managedCost;
  const savingsPct = Math.round((monthlySavings / unmanagedCost) * 100);

  return (
    <section id="pricing" className="py-24 border-t border-white/[0.08] relative bg-[#040509]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-xs font-mono text-[#10B981] mb-4">
            <DollarSign className="w-3.5 h-3.5" />
            <span>ROI &amp; SAVINGS CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Calculate Your Infrastructure Savings
          </h2>
          <p className="text-base text-white/60">
            See how much your organization saves each month through semantic vector caching and multi-tier intelligent routing.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-apple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-6">
              {/* Monthly Requests */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-white/60 font-medium">MONTHLY AI REQUESTS</span>
                  <span className="text-white font-mono font-bold text-sm">
                    {formatNumber(monthlyRequests)}
                  </span>
                </div>
                <input
                  type="range"
                  min={100_000}
                  max={20_000_000}
                  step={100_000}
                  value={monthlyRequests}
                  onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                  className="w-full accent-[#2997FF] bg-white/10 rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                  <span>100K</span>
                  <span>10M</span>
                  <span>20M</span>
                </div>
              </div>

              {/* Avg Tokens Per Request */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-white/60 font-medium">AVG TOKENS / REQUEST</span>
                  <span className="text-white font-mono font-bold text-sm">
                    {avgTokens.toLocaleString()} tokens
                  </span>
                </div>
                <input
                  type="range"
                  min={300}
                  max={8000}
                  step={100}
                  value={avgTokens}
                  onChange={(e) => setAvgTokens(Number(e.target.value))}
                  className="w-full accent-[#2997FF] bg-white/10 rounded-lg h-2 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
                  <span>300 (Short)</span>
                  <span>2,500 (Chat)</span>
                  <span>8,000 (Long Code)</span>
                </div>
              </div>

              {/* How it saves */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-2">
                <div className="text-white/70 font-semibold">Active Optimizations:</div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>35% queries served from zero-cost Semantic Vector Cache</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Routine tasks auto-routed to DeepSeek V3 / Groq LPU</span>
                </div>
              </div>
            </div>

            {/* Results card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10B981]/15 via-transparent to-[#2997FF]/10 border border-[#10B981]/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-[#10B981] uppercase tracking-wider block mb-1">
                  ESTIMATED MONTHLY SAVINGS
                </span>
                <div className="text-4xl sm:text-5xl font-bold font-mono text-white mb-2">
                  {formatCurrency(monthlySavings)}
                  <span className="text-xs font-normal text-white/50 block mt-1">
                    per month ({savingsPct}% reduced expenditure)
                  </span>
                </div>
              </div>

              <div className="space-y-3 my-6 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Direct Provider API Spend:</span>
                  <span className="line-through text-white/40">{formatCurrency(unmanagedCost)}</span>
                </div>
                <div className="flex justify-between text-white font-semibold">
                  <span>Spend with Bifrost Gateway:</span>
                  <span className="text-[#10B981]">{formatCurrency(managedCost)}</span>
                </div>
                <div className="flex justify-between text-[#00F5FF]">
                  <span>Annualized Cost Avoidance:</span>
                  <span>{formatCurrency(monthlySavings * 12)} / year</span>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-xs font-semibold text-center shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <span>Deploy Self-Hosted &amp; Start Saving</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
