"use client";

import React from "react";
import { useGateway } from "@/lib/store";
import {
  ShieldCheck,
  Key,
  DollarSign,
  Lock,
  EyeOff,
  AlertTriangle,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";

export function SecurityGovernance() {
  const { guardrails, toggleGuardrail, virtualKeys } = useGateway();

  return (
    <section id="security" className="py-24 border-t border-white/[0.08] relative bg-[#040508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-xs font-mono text-[#10B981] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE GOVERNANCE &amp; SECURITY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Total Control Over Keys, Budgets &amp; Data
          </h2>
          <p className="text-base text-white/60">
            Never expose root provider credentials to applications. Issue tenant-scoped Virtual Keys with automated spend caps, rate limits, and real-time DLP inspection.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Virtual Key Isolation */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="p-3 rounded-xl bg-[#2997FF]/10 text-[#2997FF] w-fit mb-4">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Virtual API Keys
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Distribute isolated virtual keys to specific teams, microservices, or external clients. Each key can be constrained to specific models and throttled by RPM.
            </p>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
              <span>Active Virtual Keys</span>
              <span className="text-white font-mono font-medium">{virtualKeys.length} issued</span>
            </div>
          </div>

          {/* Card 2: Spend & Velocity Caps */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="p-3 rounded-xl bg-[#10B981]/10 text-[#10B981] w-fit mb-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Budget Kill-Switches
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Set hard or soft spend limits per department or client. Requests are automatically clamped or rejected once the monthly budget ceiling is reached.
            </p>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
              <span>Budget Enforcement</span>
              <span className="text-[#10B981] font-mono font-medium">Zero Bill Shocks</span>
            </div>
          </div>

          {/* Card 3: PII & Injection Defense */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="p-3 rounded-xl bg-[#A855F7]/10 text-[#A855F7] w-fit mb-4">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2">
              Real-time DLP &amp; Guardrails
            </h3>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              Redact credit card numbers, social security numbers, and sensitive health records (HIPAA/GDPR) before packets ever leave your private VPC.
            </p>
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
              <span>Threats Blocked</span>
              <span className="text-[#A855F7] font-mono font-medium">1,892 incidents</span>
            </div>
          </div>
        </div>

        {/* Live Guardrails Toggle Matrix */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] mb-6 gap-2">
            <div>
              <h3 className="text-base font-semibold text-white">
                Active Guardrail Policy Enforcement
              </h3>
              <p className="text-xs text-white/50">
                Toggle policies to dynamically modify the gateway's real-time inspection pipeline.
              </p>
            </div>
            <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full border border-[#10B981]/20">
              Enterprise Shield Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guardrails.map((gr) => (
              <div
                key={gr.id}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>{gr.name}</span>
                    {gr.enabled && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    )}
                  </div>
                  <div className="text-xs text-white/50 mt-1 flex items-center gap-3 font-mono">
                    <span>Action: {gr.action.toUpperCase()}</span>
                    <span>•</span>
                    <span>Sensitivity: {gr.sensitivity}</span>
                    <span>•</span>
                    <span className="text-[#2997FF]">{gr.blockedCount} filtered</span>
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
      </div>
    </section>
  );
}
