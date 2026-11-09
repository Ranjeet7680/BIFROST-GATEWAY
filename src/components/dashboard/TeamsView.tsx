"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Users,
  Plus,
  Mail,
  Shield,
  DollarSign,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function TeamsView() {
  const { teamMembers } = useGateway();
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Workspaces &amp; Team Access
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Manage organization members, assign RBAC privileges, and track spend allocation by user.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Team Members Table */}
      <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden shadow-apple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-white/40 font-mono">
                <th className="pb-3 font-normal">MEMBER</th>
                <th className="pb-3 font-normal">EMAIL</th>
                <th className="pb-3 font-normal">ROLE</th>
                <th className="pb-3 font-normal">SPEND (MONTH)</th>
                <th className="pb-3 font-normal">LAST ACTIVE</th>
                <th className="pb-3 font-normal text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 font-semibold text-white flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <span>{member.name}</span>
                  </td>
                  <td className="py-3.5 font-mono text-white/60">{member.email}</td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        member.role === "Owner"
                          ? "bg-[#A855F7]/20 text-[#A855F7]"
                          : member.role === "Admin"
                          ? "bg-[#2997FF]/20 text-[#2997FF]"
                          : "bg-white/10 text-white/70"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[#10B981]">
                    {formatCurrency(member.spendThisMonth)}
                  </td>
                  <td className="py-3.5 font-mono text-white/40">{member.lastActive}</td>
                  <td className="py-3.5 text-right">
                    <button className="text-white/40 hover:text-white p-1">
                      <MoreVertical className="w-4 h-4" />
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
