"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Boxes,
  Plus,
  CheckCircle2,
  Lock,
  Bot,
  Play,
  Terminal,
  RefreshCw,
  Search,
} from "lucide-react";

export function McpView() {
  const { mcpTools, toggleMcpApproval } = useGateway();
  const [searchTerm, setSearchTerm] = useState("");
  const [simulatingToolId, setSimulatingToolId] = useState<string | null>(null);

  const filtered = mcpTools.filter(
    (t) =>
      t.toolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.serverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTestExecution = (id: string) => {
    setSimulatingToolId(id);
    setTimeout(() => {
      setSimulatingToolId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            MCP &amp; Agent Tool Gateway
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Bridge autonomous agents with corporate databases, GitHub, Slack, and internal APIs under strict enterprise approval gates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#2997FF] w-48"
            />
          </div>
        </div>
      </div>

      {/* Tools Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden shadow-apple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">SERVER CONNECTION</th>
                <th className="pb-3 font-normal">TOOL FUNCTION</th>
                <th className="pb-3 font-normal">DESCRIPTION</th>
                <th className="pb-3 font-normal">TOTAL RUNS</th>
                <th className="pb-3 font-normal">GATE POLICY</th>
                <th className="pb-3 font-normal text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((tool) => (
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
                  <td className="py-3.5 text-white/60 max-w-sm truncate">
                    {tool.description}
                  </td>
                  <td className="py-3.5 font-mono text-white/80">
                    {tool.executions.toLocaleString()}
                  </td>
                  <td className="py-3.5">
                    <button
                      onClick={() => toggleMcpApproval(tool.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                        tool.approvalRequired
                          ? "bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B]"
                          : "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]"
                      }`}
                    >
                      {tool.approvalRequired ? "Approval Required" : "Auto-Approved"}
                    </button>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => handleTestExecution(tool.id)}
                      disabled={simulatingToolId === tool.id}
                      className="px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/10 text-white/80 text-[11px] font-mono transition-colors"
                    >
                      {simulatingToolId === tool.id ? "Calling..." : "Test Call"}
                    </button>
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
