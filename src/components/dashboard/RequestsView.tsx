"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Layers,
  ArrowRight,
  X,
  ExternalLink,
  Code2,
  Activity,
} from "lucide-react";
import { formatCurrency, formatLatency } from "@/lib/utils";
import { RequestLog } from "@/types/gateway";

export function RequestsView() {
  const { requests, selectedRequestForTrace, setSelectedRequestForTrace } = useGateway();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.promptPreview.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "cached" && r.cached) ||
      (statusFilter === "200" && r.status === 200 && !r.cached) ||
      (statusFilter === "error" && r.status >= 400);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Requests &amp; Waterfall Traces
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time request stream with millisecond-by-millisecond execution spans and payload inspector.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search request ID, prompt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#2997FF] w-60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#2997FF]"
          >
            <option value="all" className="bg-[#090A12]">All Statuses</option>
            <option value="cached" className="bg-[#090A12]">Cache Hits Only</option>
            <option value="200" className="bg-[#090A12]">Upstream 200 OK</option>
            <option value="error" className="bg-[#090A12]">Errors &amp; Retries</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden shadow-apple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">TRACE ID</th>
                <th className="pb-3 font-normal">TIMESTAMP</th>
                <th className="pb-3 font-normal">MODEL / PROVIDER</th>
                <th className="pb-3 font-normal">STATUS</th>
                <th className="pb-3 font-normal">LATENCY</th>
                <th className="pb-3 font-normal">TOKENS</th>
                <th className="pb-3 font-normal">COST</th>
                <th className="pb-3 font-normal text-right">INSPECT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-mono text-white/50 text-[11px]">{req.id}</td>
                  <td className="py-3 font-mono text-white/50">{req.timestamp.split(" ")[1]}</td>
                  <td className="py-3 font-medium text-white">
                    <div>{req.model}</div>
                    <div className="text-[10px] text-white/40 font-mono">{req.provider}</div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        req.cached
                          ? "bg-[#00F5FF]/15 text-[#00F5FF]"
                          : req.status === 200
                          ? "bg-[#10B981]/15 text-[#10B981]"
                          : "bg-[#F43F5E]/15 text-[#F43F5E]"
                      }`}
                    >
                      {req.cached ? "CACHE HIT" : `${req.status} OK`}
                    </span>
                  </td>
                  <td className="py-3 font-mono text-white/70">{formatLatency(req.latencyMs)}</td>
                  <td className="py-3 font-mono text-white/70">{req.totalTokens}</td>
                  <td className="py-3 font-mono text-[#10B981]">{formatCurrency(req.cost)}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedRequestForTrace(req)}
                      className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/15 text-white text-[11px] font-mono transition-colors border border-white/10"
                    >
                      View Waterfall
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waterfall Trace Inspector Modal */}
      {selectedRequestForTrace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-3xl w-full border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-[#2997FF]">OPEN-TELEMETRY SPAN</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white">
                    {selectedRequestForTrace.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Request Waterfall Execution Trace
                </h3>
              </div>

              <button
                onClick={() => setSelectedRequestForTrace(null)}
                className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics summary cards */}
            <div className="grid grid-cols-4 gap-3 mb-6 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-white/40 block text-[10px]">TOTAL LATENCY</span>
                <span className="text-white font-bold text-sm">
                  {formatLatency(selectedRequestForTrace.latencyMs)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-white/40 block text-[10px]">TOTAL TOKENS</span>
                <span className="text-white font-bold text-sm">
                  {selectedRequestForTrace.totalTokens}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-white/40 block text-[10px]">TOKEN COST</span>
                <span className="text-[#10B981] font-bold text-sm">
                  {formatCurrency(selectedRequestForTrace.cost)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-white/40 block text-[10px]">CACHE STATUS</span>
                <span className={selectedRequestForTrace.cached ? "text-[#00F5FF] font-bold text-sm" : "text-white/60 font-bold text-sm"}>
                  {selectedRequestForTrace.cached ? "HIT (Vector)" : "MISS"}
                </span>
              </div>
            </div>

            {/* Waterfall Gantt Steps */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 font-mono">
                EXECUTION TIMELINE SPANS
              </h4>
              <div className="space-y-2">
                {selectedRequestForTrace.trace.map((step, idx) => {
                  const widthPct = Math.max(
                    8,
                    Math.min(100, (step.durationMs / selectedRequestForTrace.latencyMs) * 100)
                  );
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white font-medium flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              step.status === "ok"
                                ? "bg-[#10B981]"
                                : step.status === "warn"
                                ? "bg-[#F59E0B]"
                                : "bg-[#F43F5E]"
                            }`}
                          />
                          {step.name}
                        </span>
                        <span className="text-white/70">{step.durationMs}ms</span>
                      </div>

                      {/* Mini bar */}
                      <div className="w-full bg-white/[0.04] rounded-full h-1 overflow-hidden mb-1.5">
                        <div
                          className={`h-full rounded-full ${
                            step.status === "fail"
                              ? "bg-[#F43F5E]"
                              : step.status === "warn"
                              ? "bg-[#F59E0B]"
                              : "bg-[#2997FF]"
                          }`}
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>

                      <div className="text-[11px] text-white/50">{step.details}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payload preview */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">PROMPT PAYLOAD</span>
                <div className="p-3 rounded-xl bg-[#030407] border border-white/10 text-xs font-mono text-white/80 whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {selectedRequestForTrace.promptPreview}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-white/40 block mb-1">NORMALIZED RESPONSE PAYLOAD</span>
                <div className="p-3 rounded-xl bg-[#030407] border border-white/10 text-xs font-mono text-[#10B981] whitespace-pre-wrap max-h-40 overflow-y-auto">
                  {selectedRequestForTrace.responsePreview}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedRequestForTrace(null)}
                className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
