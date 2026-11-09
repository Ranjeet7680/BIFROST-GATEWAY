"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Key,
  Plus,
  Shield,
  DollarSign,
  AlertOctagon,
  CheckCircle2,
  Lock,
  Layers,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function VirtualKeysView() {
  const { virtualKeys, createVirtualKey, revokeVirtualKey, models } = useGateway();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [rateLimitRPM, setRateLimitRPM] = useState(600);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tenantId) return;

    createVirtualKey({
      name,
      keyPrefix: `bf_live_${Math.random().toString(36).substring(2, 6)}...`,
      tenantId,
      monthlyBudget,
      rateLimitRPM,
      allowedModels: ["bifrost/auto-best", "claude-3-5-sonnet-20241022", "deepseek-v3"],
      status: "active",
    });

    setShowModal(false);
    setName("");
    setTenantId("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Tenant Virtual API Keys
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Scoped virtual keys allowing fine-grained model access, rate limiting, and hard budget caps per customer or microservice.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Issue Virtual Key</span>
        </button>
      </div>

      {/* Grid of Virtual Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {virtualKeys.map((vk) => {
          const budgetPct = Math.min(100, Math.round((vk.currentSpend / vk.monthlyBudget) * 100));
          const isWarning = budgetPct > 80;

          return (
            <div
              key={vk.id}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{vk.name}</h3>
                    <span className="text-[10px] font-mono text-white/40">
                      Tenant: {vk.tenantId} • Prefix: {vk.keyPrefix}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      vk.status === "active"
                        ? "bg-[#10B981]/20 text-[#10B981]"
                        : "bg-[#F43F5E]/20 text-[#F43F5E]"
                    }`}
                  >
                    {vk.status}
                  </span>
                </div>

                {/* Budget Meter */}
                <div className="my-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/60">Monthly Spend / Cap:</span>
                    <span className={isWarning ? "text-[#F43F5E] font-bold" : "text-white"}>
                      {formatCurrency(vk.currentSpend)} / {formatCurrency(vk.monthlyBudget)}
                    </span>
                  </div>

                  <div className="w-full bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isWarning ? "bg-[#F43F5E]" : "bg-[#10B981]"
                      }`}
                      style={{ width: `${budgetPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-white/40">
                    <span>{budgetPct}% consumed</span>
                    <span>Rate Limit: {vk.rateLimitRPM} RPM</span>
                  </div>
                </div>

                {/* Allowed Models */}
                <div className="text-xs mb-4">
                  <span className="text-[10px] font-mono text-white/40 block mb-1.5">
                    ALLOWED MODELS:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {vk.allowedModels.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-white/70"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40">
                <span>Last active: {vk.lastUsedAt}</span>
                {vk.status === "active" && (
                  <button
                    onClick={() => revokeVirtualKey(vk.id)}
                    className="text-[#F43F5E] hover:underline text-[11px]"
                  >
                    Revoke Access
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <form
            onSubmit={handleCreate}
            className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl"
          >
            <h3 className="text-lg font-bold text-white mb-2">Issue New Virtual Key</h3>
            <p className="text-xs text-white/50 mb-5">
              Create a tenant-scoped key with isolated rate limits and budget caps.
            </p>

            <div className="space-y-4 text-xs font-mono mb-6">
              <div>
                <label className="text-white/60 block mb-1">Key Name</label>
                <input
                  type="text"
                  placeholder="e.g. Mobile Consumer API Key"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1">Tenant ID</label>
                <input
                  type="text"
                  placeholder="e.g. tenant_mobile_v2"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 block mb-1">Monthly Budget ($)</label>
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Rate Limit (RPM)</label>
                  <input
                    type="number"
                    value={rateLimitRPM}
                    onChange={(e) => setRateLimitRPM(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] text-white text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#2997FF] text-white text-xs font-semibold shadow-glow"
              >
                Issue Key
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
