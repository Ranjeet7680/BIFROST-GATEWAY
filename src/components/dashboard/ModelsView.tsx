"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Zap,
  DollarSign,
  Tag,
  Eye,
  FileCode,
  Brain,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function ModelsView() {
  const { models } = useGateway();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  const filtered = models.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === "all" || m.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Universal Model Catalog
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Standardized catalog of all available frontier and open-weight models across all connected providers.
          </p>
        </div>

        {/* Search & Tier Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model or provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#2997FF] w-56"
            />
          </div>

          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#2997FF]"
          >
            <option value="all" className="bg-[#090A12]">All Tiers</option>
            <option value="flagship" className="bg-[#090A12]">Flagship</option>
            <option value="balanced" className="bg-[#090A12]">Balanced</option>
            <option value="economy" className="bg-[#090A12]">Economy</option>
            <option value="specialized" className="bg-[#090A12]">Specialized (Reasoning)</option>
          </select>
        </div>
      </div>

      {/* Models Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden shadow-apple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">MODEL IDENTIFIER</th>
                <th className="pb-3 font-normal">PROVIDER</th>
                <th className="pb-3 font-normal">CONTEXT</th>
                <th className="pb-3 font-normal">INPUT / OUTPUT (1M)</th>
                <th className="pb-3 font-normal">LATENCY TIER</th>
                <th className="pb-3 font-normal">CAPABILITIES</th>
                <th className="pb-3 font-normal text-right">TIER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-medium text-white">
                    <div className="font-semibold text-white">{m.name}</div>
                    <div className="font-mono text-[10px] text-white/40">{m.id}</div>
                  </td>
                  <td className="py-3.5 text-white/80">{m.provider}</td>
                  <td className="py-3.5 font-mono text-white/70">
                    {m.contextWindow.toLocaleString()}
                  </td>
                  <td className="py-3.5 font-mono">
                    <span className="text-[#10B981]">${m.inputCostPer1M}</span>
                    <span className="text-white/40"> / </span>
                    <span className="text-white/80">${m.outputCostPer1M}</span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                        m.latencyScore === "ultra-fast"
                          ? "bg-[#10B981]/15 text-[#10B981]"
                          : m.latencyScore === "fast"
                          ? "bg-[#2997FF]/15 text-[#2997FF]"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {m.latencyScore}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {m.capabilities.map((c) => (
                        <span
                          key={c}
                          className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-white/60"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 text-right">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/80 uppercase">
                      {m.tier}
                    </span>
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
