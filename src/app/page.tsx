"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProviderEcosystem } from "@/components/ProviderEcosystem";
import { RoutingSimulator } from "@/components/RoutingSimulator";
import { FailoverDemo } from "@/components/FailoverDemo";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeStudio } from "@/components/CodeStudio";
import { SecurityGovernance } from "@/components/SecurityGovernance";
import { McpAgentSection } from "@/components/McpAgentSection";
import { CostCalculator } from "@/components/CostCalculator";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  ShieldCheck,
  Zap,
  Activity,
  Github,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#030407] text-[#ededed] font-sans selection:bg-[#2997FF]/30">
      <Navbar />

      <main>
        {/* 01: Keynote Hero Section with Signature Gateway Network Canvas */}
        <HeroSection />

        {/* 02: Supported Multi-Provider Ecosystem */}
        <ProviderEcosystem />

        {/* 03: Intelligent Router Interactive Simulation */}
        <RoutingSimulator />

        {/* 04: Reliability Engine & Automatic Failover */}
        <FailoverDemo />

        {/* 05: 6-Layer Enterprise System Architecture */}
        <ArchitectureDiagram />

        {/* 06: Developer Code Studio & Instant Drop-in SDK */}
        <CodeStudio />

        {/* 07: Security & Governance (Virtual Keys, Budget Caps, PII) */}
        <SecurityGovernance />

        {/* 08: MCP & Agent Gateway */}
        <McpAgentSection />

        {/* 09: ROI & Infrastructure Cost Calculator */}
        <CostCalculator />

        {/* 10: Final Apple-Inspired Call-to-Action */}
        <section className="py-28 relative overflow-hidden border-t border-white/[0.08] bg-radial-glow text-center">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE NEXT-GENERATION AI STACK</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
              Build on One Gateway.
              <br />
              <span className="text-gradient-blue">Total Control of Your AI Future.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Start locally with a single Docker command. Scale globally across multi-region Kubernetes clusters. Protect user privacy and never face vendor lock-in again.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white font-medium text-base shadow-glow hover:shadow-[0_0_35px_rgba(41,151,255,0.7)] transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Enterprise Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/playground"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white hover:bg-white/10 transition-all font-medium text-base border border-white/15 flex items-center justify-center gap-2"
              >
                <span>Try Live API Playground</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
