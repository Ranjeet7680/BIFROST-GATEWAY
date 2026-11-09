"use client";

import React, { useState } from "react";
import {
  Workflow,
  ArrowRight,
  Shield,
  Key,
  Database,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface PipelineNode {
  id: string;
  name: string;
  type: "entry" | "auth" | "guardrail" | "cache" | "router" | "provider" | "fallback" | "exit";
  description: string;
  latencyAvg: string;
  enabled: boolean;
}

export function WorkflowsView() {
  const [nodes, setNodes] = useState<PipelineNode[]>([
    {
      id: "node-1",
      name: "Request Ingress & TLS 1.3",
      type: "entry",
      description: "Termination of HTTPS / gRPC request, mTLS client certificate verification.",
      latencyAvg: "0.4ms",
      enabled: true,
    },
    {
      id: "node-2",
      name: "Virtual Key & Quota Validator",
      type: "auth",
      description: "Lookup tenant budget in Redis. Reject if spend ceiling exceeded.",
      latencyAvg: "0.8ms",
      enabled: true,
    },
    {
      id: "node-3",
      name: "Guardrail & PII Sanitizer",
      type: "guardrail",
      description: "Inspect prompt tokens against regex / embeddings for credit cards, SSNs, API secrets.",
      latencyAvg: "1.8ms",
      enabled: true,
    },
    {
      id: "node-4",
      name: "Semantic Vector Cache Lookup",
      type: "cache",
      description: "Compute prompt embedding via fast mini-LM and query pgvector cosine distance.",
      latencyAvg: "3.2ms",
      enabled: true,
    },
    {
      id: "node-5",
      name: "Multi-Objective Router",
      type: "router",
      description: "Evaluate constraints (Max Cost, Latency SLA, Capabilities). Select winning provider.",
      latencyAvg: "2.1ms",
      enabled: true,
    },
    {
      id: "node-6",
      name: "Primary Upstream Dispatch",
      type: "provider",
      description: "HTTP POST / Streaming SSE chunk pipeline to designated model endpoint.",
      latencyAvg: "140ms",
      enabled: true,
    },
    {
      id: "node-7",
      name: "Zero-Downtime Circuit Fallback",
      type: "fallback",
      description: "On HTTP 429 / 5xx, transparently re-route payload to secondary provider within 20ms.",
      latencyAvg: "18ms",
      enabled: true,
    },
    {
      id: "node-8",
      name: "Telemetry & Response Return",
      type: "exit",
      description: "Record OpenTelemetry trace, increment billing meter, and stream normalized tokens.",
      latencyAvg: "0.6ms",
      enabled: true,
    },
  ]);

  const toggleNode = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Visual Gateway Request Lifecycle
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Visual pipeline builder of the end-to-end request lifecycle from edge ingress to provider execution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#2997FF] bg-[#2997FF]/10 px-3 py-1.5 rounded-xl border border-[#2997FF]/20">
            Pipeline: Standard Enterprise v2.4
          </span>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="space-y-3">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative">
            {/* Step Card */}
            <div
              className={`glass-panel rounded-2xl p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                node.enabled ? "border-white/10 hover:border-white/20" : "opacity-40 border-dashed"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-xl bg-white/[0.06] text-white/70 font-mono text-xs flex items-center justify-center font-bold">
                  {index + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{node.name}</h3>
                    {node.enabled && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
                  </div>
                  <p className="text-xs text-white/60 mt-0.5">{node.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/50 bg-white/[0.04] px-2.5 py-1 rounded-lg">
                  Avg: {node.latencyAvg}
                </span>

                <button
                  onClick={() => toggleNode(node.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors border ${
                    node.enabled
                      ? "bg-white/[0.04] border-white/10 text-white/70 hover:bg-white/10"
                      : "bg-[#10B981]/20 border-[#10B981]/30 text-[#10B981]"
                  }`}
                >
                  {node.enabled ? "Bypass" : "Enable"}
                </button>
              </div>
            </div>

            {/* Connecting line */}
            {index < nodes.length - 1 && (
              <div className="w-0.5 h-3 bg-white/10 mx-auto my-0.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
