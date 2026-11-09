"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  ShieldCheck,
  EyeOff,
  AlertTriangle,
  Lock,
  CheckCircle2,
  ListFilter,
  FileText,
  Key,
} from "lucide-react";

export function SecurityView() {
  const { guardrails, toggleGuardrail } = useGateway();

  const auditEvents = [
    {
      id: "ev-1",
      timestamp: "13:24:10",
      type: "PII_REDACTED",
      actor: "vk_mobile_client",
      details: "Redacted 1 Mastercard PAN number in incoming prompt",
      severity: "medium",
    },
    {
      id: "ev-2",
      timestamp: "13:19:42",
      type: "PROMPT_INJECTION_BLOCKED",
      actor: "vk_internal_qa",
      details: "Blocked jailbreak string attempt 'Ignore all previous system instructions...'",
      severity: "high",
    },
    {
      id: "ev-3",
      timestamp: "13:02:15",
      type: "RATE_LIMIT_THROTTLED",
      actor: "vk_agent_autonomous",
      details: "Client exceeded 600 RPM threshold. Bounded backoff HTTP 429 emitted.",
      severity: "low",
    },
    {
      id: "ev-4",
      timestamp: "12:45:00",
      type: "KEY_ROTATION",
      actor: "elena@enterprise.io",
      details: "Rotated master cluster key 'key-root-primary'",
      severity: "info",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Security &amp; Enterprise Governance
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Real-time prompt sanitization, jailbreak protection, and immutable SOC2/HIPAA audit trails.
          </p>
        </div>

        <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-3 py-1.5 rounded-xl border border-[#10B981]/20">
          SOC2 Type II Policy Active
        </span>
      </div>

      {/* Guardrails Configuration */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10">
        <h3 className="text-sm font-semibold text-white mb-4">
          Configured Guardrail Filters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guardrails.map((gr) => (
            <div
              key={gr.id}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>{gr.name}</span>
                  {gr.enabled && <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />}
                </div>
                <div className="text-xs text-white/50 mt-1 font-mono">
                  Action: {gr.action.toUpperCase()} • Sensitivity: {gr.sensitivity} •{" "}
                  <span className="text-[#2997FF]">{gr.blockedCount} blocked</span>
                </div>
              </div>

              <button
                onClick={() => toggleGuardrail(gr.id)}
                className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${
                  gr.enabled ? "bg-[#10B981]" : "bg-white/20"
                }`}
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-white transition-transform ${
                    gr.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 shadow-apple">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#2997FF]" />
          Immutable Security Audit Events
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">TIME</th>
                <th className="pb-3 font-normal">EVENT TYPE</th>
                <th className="pb-3 font-normal">ACTOR / KEY</th>
                <th className="pb-3 font-normal">DETAILS</th>
                <th className="pb-3 font-normal text-right">SEVERITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {auditEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 font-mono text-white/50">{ev.timestamp}</td>
                  <td className="py-3 font-mono text-white font-medium">{ev.type}</td>
                  <td className="py-3 font-mono text-[#2997FF]">{ev.actor}</td>
                  <td className="py-3 text-white/70 max-w-md">{ev.details}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        ev.severity === "high"
                          ? "bg-[#F43F5E]/20 text-[#F43F5E]"
                          : ev.severity === "medium"
                          ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {ev.severity}
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
