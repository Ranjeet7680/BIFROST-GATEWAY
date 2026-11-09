"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Key,
  Plus,
  Trash2,
  Copy,
  Check,
  ShieldAlert,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { ApiKeyItem } from "@/types/gateway";

export function ApiKeysView() {
  const { apiKeys, createApiKey, revokeApiKey } = useGateway();
  const [showModal, setShowModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyRole, setNewKeyRole] = useState<ApiKeyItem["role"]>("read_write");
  const [createdSecret, setCreatedSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const secret = createApiKey(newKeyName.trim(), newKeyRole);
    setCreatedSecret(secret);
    setNewKeyName("");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Root &amp; Service API Keys
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Master cluster credentials used by internal services and CI/CD pipelines to manage the gateway.
          </p>
        </div>

        <button
          onClick={() => {
            setCreatedSecret(null);
            setShowModal(true);
          }}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Key</span>
        </button>
      </div>

      {/* Keys List */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden shadow-apple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">KEY NAME</th>
                <th className="pb-3 font-normal">TOKEN PREFIX</th>
                <th className="pb-3 font-normal">ROLE</th>
                <th className="pb-3 font-normal">CREATED</th>
                <th className="pb-3 font-normal">LAST USED</th>
                <th className="pb-3 font-normal">USAGE</th>
                <th className="pb-3 font-normal text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-semibold text-white">{key.name}</td>
                  <td className="py-3.5 font-mono text-white/70">{key.maskedKey}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        key.role === "root_admin"
                          ? "bg-[#F43F5E]/20 text-[#F43F5E]"
                          : "bg-[#2997FF]/20 text-[#2997FF]"
                      }`}
                    >
                      {key.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-white/50">{key.createdAt}</td>
                  <td className="py-3.5 font-mono text-white/50">{key.lastUsed}</td>
                  <td className="py-3.5 font-mono text-white/80">
                    {key.requestsCount.toLocaleString()}
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => revokeApiKey(key.id)}
                      className="p-1.5 rounded-lg text-white/40 hover:text-[#F43F5E] hover:bg-[#F43F5E]/10 transition-colors"
                      title="Revoke Key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Key Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl">
            {createdSecret ? (
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Save Your API Key</h3>
                <p className="text-xs text-[#F59E0B] mb-4">
                  Make sure to copy this key now. You won't be able to see it again!
                </p>

                <div className="p-3 rounded-xl bg-[#030407] border border-white/10 font-mono text-xs text-white break-all flex items-center justify-between gap-2 mb-6">
                  <span>{createdSecret}</span>
                  <button
                    onClick={() => handleCopy(createdSecret)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-2.5 rounded-xl bg-[#2997FF] text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreate}>
                <h3 className="text-lg font-bold text-white mb-2">Create Service API Key</h3>
                <p className="text-xs text-white/50 mb-5">
                  Generate a new secret token for automated cluster communication.
                </p>

                <div className="space-y-4 text-xs font-mono mb-6">
                  <div>
                    <label className="text-white/60 block mb-1">Key Description / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Staging Ingestion Runner"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                    />
                  </div>

                  <div>
                    <label className="text-white/60 block mb-1">Role &amp; Permissions</label>
                    <select
                      value={newKeyRole}
                      onChange={(e) => setNewKeyRole(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
                    >
                      <option value="read_write" className="bg-[#090A12]">Read &amp; Write Access</option>
                      <option value="read_only" className="bg-[#090A12]">Read-Only Telemetry</option>
                      <option value="root_admin" className="bg-[#090A12]">Root Administrator</option>
                    </select>
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
                    Generate Key
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
