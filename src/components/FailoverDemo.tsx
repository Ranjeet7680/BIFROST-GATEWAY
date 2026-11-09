"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  RefreshCw,
  Zap,
  Activity,
  ServerCrash,
} from "lucide-react";

export function FailoverDemo() {
  const [isSimulatingOutage, setIsSimulatingOutage] = useState(false);
  const [failoverStep, setFailoverStep] = useState<number>(0);

  const triggerSimulation = () => {
    setIsSimulatingOutage(true);
    setFailoverStep(1);

    setTimeout(() => setFailoverStep(2), 500);
    setTimeout(() => setFailoverStep(3), 1100);
    setTimeout(() => setFailoverStep(4), 1700);
  };

  const resetSimulation = () => {
    setIsSimulatingOutage(false);
    setFailoverStep(0);
  };

  return (
    <section id="failover" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-xs font-mono text-[#F43F5E] mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>RELIABILITY &amp; CIRCUIT BREAKERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Zero Downtime AI Infrastructure
          </h2>
          <p className="text-base text-white/60">
            Provider outages, rate limits (HTTP 429), and transient network errors shouldn't crash your application. Bifrost recovers in under 20ms through automated fallback chains.
          </p>
        </div>

        {/* Live Simulation Card */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Action trigger button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-white/[0.08] mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Live Disaster Recovery Simulation
              </h3>
              <p className="text-xs text-white/50">
                Trigger an artificial upstream HTTP 503 error on OpenAI and watch Bifrost circuit breakers re-route traffic seamlessly.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {failoverStep > 0 && (
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-xs font-medium text-white transition-colors"
                >
                  Reset
                </button>
              )}
              <button
                onClick={triggerSimulation}
                disabled={isSimulatingOutage && failoverStep < 4}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F43F5E] to-[#E11D48] text-white text-xs font-medium shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] transition-all flex items-center gap-2"
              >
                <ServerCrash className="w-4 h-4" />
                <span>{isSimulatingOutage && failoverStep < 4 ? "Failing Over..." : "Simulate Outage"}</span>
              </button>
            </div>
          </div>

          {/* Architecture Visualization of Failover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Box 1: Client Application */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-white/50">CLIENT APPLICATION</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
                    Connected
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  Customer Checkout Service
                </h4>
                <p className="text-xs text-white/60">
                  Sends request to <code className="text-[#2997FF] font-mono">/v1/chat/completions</code>.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs">
                <span className="text-white/40 block text-[10px]">CLIENT EXPERIENCE</span>
                <span className="text-[#10B981] font-medium flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  No errors, 100% 200 OK
                </span>
              </div>
            </div>

            {/* Box 2: Primary Provider (Fails) */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                failoverStep >= 1
                  ? "bg-[#F43F5E]/10 border-[#F43F5E]/40 shadow-[0_0_25px_rgba(244,63,94,0.2)]"
                  : "bg-white/[0.02] border-white/[0.08]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-white/50">PRIMARY CLUSTER</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      failoverStep >= 1
                        ? "bg-[#F43F5E]/20 text-[#F43F5E]"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {failoverStep >= 1 ? "HTTP 503 ERROR" : "Primary"}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  OpenAI GPT-4o Cluster
                </h4>
                <p className="text-xs text-white/60">
                  {failoverStep >= 1
                    ? "Upstream gateway connection refused or rate limit quota exceeded."
                    : "Standard designated primary upstream endpoint."}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs">
                <span className="text-white/40 block text-[10px]">CIRCUIT BREAKER</span>
                <span
                  className={`font-medium flex items-center gap-1 mt-1 ${
                    failoverStep >= 1 ? "text-[#F43F5E]" : "text-white/60"
                  }`}
                >
                  {failoverStep >= 2 ? (
                    <>
                      <AlertOctagon className="w-3.5 h-3.5" />
                      Tripped Open (30s cooldown)
                    </>
                  ) : (
                    "Armed & Monitoring"
                  )}
                </span>
              </div>
            </div>

            {/* Box 3: Backup Provider (Activates) */}
            <div
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                failoverStep >= 3
                  ? "bg-[#10B981]/10 border-[#10B981]/40 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                  : "bg-white/[0.02] border-white/[0.08]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-white/50">BACKUP CLUSTER</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      failoverStep >= 3
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : "bg-white/10 text-white/40"
                    }`}
                  >
                    {failoverStep >= 3 ? "ACTIVATED (200 OK)" : "Standby"}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  Anthropic Claude 3.5 Sonnet
                </h4>
                <p className="text-xs text-white/60">
                  Automatic zero-code failover receiver with identical capability parameters.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs">
                <span className="text-white/40 block text-[10px]">SWITCH LATENCY</span>
                <span
                  className={`font-medium flex items-center gap-1 mt-1 font-mono ${
                    failoverStep >= 4 ? "text-[#10B981]" : "text-white/40"
                  }`}
                >
                  {failoverStep >= 4 ? "18ms Failover Execution" : "Ready for burst"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Timeline details */}
          {failoverStep > 0 && (
            <div className="mt-8 pt-6 border-t border-white/[0.08] font-mono text-xs text-white/70 space-y-1.5">
              <div className="text-white/40 text-[10px]">RECOVERY EXECUTION LOG:</div>
              {failoverStep >= 1 && (
                <div className="text-[#F43F5E]">[13:28:01.042] Primary upstream (OpenAI) returned HTTP 503. Bounded retry budget evaluated.</div>
              )}
              {failoverStep >= 2 && (
                <div className="text-[#F59E0B]">[13:28:01.048] Circuit breaker tripped. Marking provider 'openai' degraded. Cooldown timer: 30000ms.</div>
              )}
              {failoverStep >= 3 && (
                <div className="text-[#2997FF]">[13:28:01.054] Routing rule 'rule-prod-code' invoked fallback chain #1: anthropic (Claude 3.5 Sonnet).</div>
              )}
              {failoverStep >= 4 && (
                <div className="text-[#10B981]">[13:28:01.066] Success HTTP 200 OK returned to client. Total failover overhead: 18ms.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
