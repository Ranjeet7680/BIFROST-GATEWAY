"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Sparkles,
  Database,
  Trash2,
  Sliders,
  CheckCircle2,
  TrendingDown,
  Layers,
  Clock,
  RefreshCw,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function CacheView() {
  const {
    cacheThreshold,
    setCacheThreshold,
    cacheTtlHours,
    setCacheTtlHours,
    purgeCache,
    stats,
  } = useGateway();

  const [purgedMessage, setPurgedMessage] = useState(false);

  const handlePurge = () => {
    purgeCache();
    setPurgedMessage(true);
    setTimeout(() => setPurgedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Intelligent Semantic Cache
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Hybrid exact-match and pgvector cosine similarity cache that serves identical or semantically equivalent queries in &lt; 4ms with $0 token cost.
          </p>
        </div>

        <button
          onClick={handlePurge}
          className="px-4 py-2 rounded-xl bg-[#F43F5E]/15 hover:bg-[#F43F5E]/25 text-[#F43F5E] text-xs font-mono font-medium border border-[#F43F5E]/30 transition-colors flex items-center gap-1.5 w-fit"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Purge Vector Cache</span>
        </button>
      </div>

      {purgedMessage && (
        <div className="p-4 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Cache successfully purged across all Redis and pgvector nodes.</span>
        </div>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="text-xs text-white/50 font-mono mb-2">CACHE HIT RATE</div>
          <div className="text-3xl font-bold font-mono text-[#00F5FF]">
            {stats.cacheHitPercentage}%
          </div>
          <div className="text-[11px] text-white/40 mt-1">
            Exact: 12% • Semantic Vector: 26.4%
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="text-xs text-white/50 font-mono mb-2">TOTAL VALUE SAVED</div>
          <div className="text-3xl font-bold font-mono text-[#10B981]">
            {formatCurrency(stats.costSavedByCache)}
          </div>
          <div className="text-[11px] text-white/40 mt-1">Zero tokens billed upstream</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <div className="text-xs text-white/50 font-mono mb-2">AVG CACHE LATENCY</div>
          <div className="text-3xl font-bold font-mono text-[#2997FF]">
            3.8ms
          </div>
          <div className="text-[11px] text-white/40 mt-1">pgvector IVFFlat index</div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Cosine Similarity Threshold (Embedding Match)
              </h3>
              <p className="text-xs text-white/50">
                Minimum vector cosine similarity required to serve a cached response. Higher values ensure stricter accuracy; lower values increase hit rates.
              </p>
            </div>
            <span className="text-base font-bold font-mono text-[#2997FF]">
              {cacheThreshold.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min={0.80}
            max={0.99}
            step={0.01}
            value={cacheThreshold}
            onChange={(e) => setCacheThreshold(Number(e.target.value))}
            className="w-full accent-[#2997FF] bg-white/10 rounded-lg h-2 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
            <span>0.80 (Loose - High Hits)</span>
            <span>0.92 (Recommended Balanced)</span>
            <span>0.99 (Strict Near-Exact)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Cache Entry Time-to-Live (TTL)
              </h3>
              <p className="text-xs text-white/50">
                How long responses remain in cache before automatic vector eviction.
              </p>
            </div>
            <span className="text-base font-bold font-mono text-white">
              {cacheTtlHours} Hours
            </span>
          </div>

          <input
            type="range"
            min={6}
            max={168}
            step={6}
            value={cacheTtlHours}
            onChange={(e) => setCacheTtlHours(Number(e.target.value))}
            className="w-full accent-[#2997FF] bg-white/10 rounded-lg h-2 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-white/40 mt-1 font-mono">
            <span>6h</span>
            <span>72h (3 Days)</span>
            <span>168h (1 Week)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
