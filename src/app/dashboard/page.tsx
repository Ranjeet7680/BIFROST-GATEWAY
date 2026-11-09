"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  LayoutDashboard,
  Cpu,
  Boxes,
  GitFork,
  Key,
  ShieldCheck,
  Activity,
  BarChart3,
  Sparkles,
  Workflow,
  Lock,
  Users,
  Settings,
  ArrowLeft,
  Zap,
  Globe2,
  Terminal,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { OverviewView } from "@/components/dashboard/OverviewView";
import { ProvidersView } from "@/components/dashboard/ProvidersView";
import { ModelsView } from "@/components/dashboard/ModelsView";
import { RoutingView } from "@/components/dashboard/RoutingView";
import { ApiKeysView } from "@/components/dashboard/ApiKeysView";
import { VirtualKeysView } from "@/components/dashboard/VirtualKeysView";
import { RequestsView } from "@/components/dashboard/RequestsView";
import { AnalyticsView } from "@/components/dashboard/AnalyticsView";
import { CacheView } from "@/components/dashboard/CacheView";
import { McpView } from "@/components/dashboard/McpView";
import { WorkflowsView } from "@/components/dashboard/WorkflowsView";
import { SecurityView } from "@/components/dashboard/SecurityView";
import { TeamsView } from "@/components/dashboard/TeamsView";
import { SettingsView } from "@/components/dashboard/SettingsView";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuSections = [
    {
      label: "CORE GATEWAY",
      items: [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "providers", label: "Providers", icon: Cpu },
        { id: "models", label: "Models Catalog", icon: Layers },
        { id: "routing", label: "Routing Rules", icon: GitFork },
      ],
    },
    {
      label: "ACCESS & SECURITY",
      items: [
        { id: "api-keys", label: "API Keys", icon: Key },
        { id: "virtual-keys", label: "Virtual Keys", icon: ShieldCheck },
        { id: "security", label: "Security & Guardrails", icon: Lock },
      ],
    },
    {
      label: "OBSERVABILITY",
      items: [
        { id: "requests", label: "Requests & Traces", icon: Activity },
        { id: "analytics", label: "Token & Spend", icon: BarChart3 },
        { id: "cache", label: "Semantic Cache", icon: Sparkles },
      ],
    },
    {
      label: "INTELLIGENCE & AGENTS",
      items: [
        { id: "mcp", label: "MCP & Tools", icon: Boxes },
        { id: "workflows", label: "Visual Workflows", icon: Workflow },
      ],
    },
    {
      label: "ENTERPRISE",
      items: [
        { id: "teams", label: "Teams & Budgets", icon: Users },
        { id: "settings", label: "Settings & Config", icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030407] text-[#ededed] flex font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-white/[0.08] bg-[#05060A] p-4 fixed top-0 bottom-0 z-30">
        <div>
          {/* Logo & Back to Site */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2997FF] to-[#0071E3] flex items-center justify-center shadow-glow">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight text-white block">
                  BIFROST
                </span>
                <span className="text-[9px] font-mono text-[#2997FF] block -mt-0.5">
                  ENTERPRISE CONSOLE
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
              title="Return to Marketing Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-170px)] pr-1 scrollbar-none">
            {menuSections.map((sec) => (
              <div key={sec.label}>
                <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider px-2 block mb-1.5">
                  {sec.label}
                </span>
                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all font-medium ${
                          isActive
                            ? "bg-[#2997FF]/15 text-white border border-[#2997FF]/30 font-semibold"
                            : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-[#2997FF]" : "text-white/40"
                          }`}
                        />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>v2.4-enterprise</span>
          <span className="text-[#10B981]">● Connected</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="h-16 border-b border-white/[0.08] bg-[#030407]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-white/60 hover:text-white"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Workspace selector */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-white font-medium">Acme Corp</span>
              <span className="text-white/40">/</span>
              <span className="text-white/70">Production VPC</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/playground"
              className="px-3.5 py-1.5 rounded-xl bg-[#2997FF]/15 hover:bg-[#2997FF]/25 border border-[#2997FF]/30 text-[#2997FF] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>API Playground</span>
            </Link>

            <Link
              href="/docs"
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 text-xs items-center gap-1.5 transition-colors"
            >
              <span>Documentation</span>
            </Link>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Mobile Sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm flex">
            <div className="w-64 bg-[#05060A] p-4 flex flex-col justify-between border-r border-white/10">
              <div className="space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-sm font-bold text-white">BIFROST GATEWAY</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-white/60">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {menuSections.map((sec) => (
                  <div key={sec.label}>
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                      {sec.label}
                    </span>
                    <div className="space-y-0.5">
                      {sec.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left ${
                            activeTab === item.id
                              ? "bg-[#2997FF] text-white"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Dashboard Main View Container */}
        <main className="p-4 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {activeTab === "overview" && <OverviewView onNavigate={setActiveTab} />}
          {activeTab === "providers" && <ProvidersView />}
          {activeTab === "models" && <ModelsView />}
          {activeTab === "routing" && <RoutingView />}
          {activeTab === "api-keys" && <ApiKeysView />}
          {activeTab === "virtual-keys" && <VirtualKeysView />}
          {activeTab === "requests" && <RequestsView />}
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "cache" && <CacheView />}
          {activeTab === "mcp" && <McpView />}
          {activeTab === "workflows" && <WorkflowsView />}
          {activeTab === "security" && <SecurityView />}
          {activeTab === "teams" && <TeamsView />}
          {activeTab === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
