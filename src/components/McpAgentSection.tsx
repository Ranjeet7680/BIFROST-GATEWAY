"use client";

import React from "react";
import { useGateway } from "@/lib/store";
import {
  Boxes,
  Cpu,
  ShieldAlert,
  CheckCircle2,
  Lock,
  ArrowRight,
  Terminal,
  Activity,
  Bot,
} from "lucide-react";

export function McpAgentSection() {
  const { mcpTools, toggleMcpApproval } = useGateway();

  return (
    <section id="mcp" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 text-xs font-mono text-[#A855F7] mb-4">
            <Boxes className="w-3.5 h-3.5" />
            <span>MODEL CONTEXT PROTOCOL (MCP)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            The Secure Gateway for Autonomous AI Agents
          </h2>
          <p className="text-base text-white/60">
            Agents shouldn't have unmonitored raw shell or database access. Bifrost acts as a managed MCP Bridge with schema validation, permission gates, human-in-the-loop approvals, and full audit playback.
          </p>
        </div>

        {/* MCP Interactive Tool Table */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-apple">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] mb-6 gap-2">
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#A855F7]" />
                Registered Enterprise MCP Servers &amp; Tools
              </h3>
              <p className="text-xs text-white/50">
                Configure execution policies for autonomous agents calling upstream tools.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/40">
                Connected Servers: 4
              </span>
              <span className="text-xs font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full border border-[#10B981]/20">
                MCP Spec 2026 Ready
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                  <th className="pb-3 font-normal">SERVER / PROVIDER</th>
                  <th className="pb-3 font-normal">TOOL FUNCTION</th>
                  <th className="pb-3 font-normal">DESCRIPTION</th>
                  <th className="pb-3 font-normal">EXECUTIONS</th>
                  <th className="pb-3 font-normal text-right">APPROVAL POLICY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {mcpTools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-medium text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                        <span>{tool.serverName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono text-[#2997FF]">
                      <code>{tool.toolName}</code>
                    </td>
                    <td className="py-3.5 text-white/60 max-w-xs truncate">
                      {tool.description}
                    </td>
                    <td className="py-3.5 font-mono text-white/80">
                      {tool.executions.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => toggleMcpApproval(tool.id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                          tool.approvalRequired
                            ? "bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/20"
                            : "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20"
                        }`}
                      >
                        {tool.approvalRequired ? "Require Human Approval" : "Auto-Approved"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
