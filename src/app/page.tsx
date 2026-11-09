"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AppleFeatureShowcase } from "@/components/AppleFeatureShowcase";
import { ProviderEcosystem } from "@/components/ProviderEcosystem";
import { RoutingSimulator } from "@/components/RoutingSimulator";
import { FailoverDemo } from "@/components/FailoverDemo";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeStudio } from "@/components/CodeStudio";
import { SecurityGovernance } from "@/components/SecurityGovernance";
import { McpAgentSection } from "@/components/McpAgentSection";
import { CostCalculator } from "@/components/CostCalculator";
import { Footer } from "@/components/Footer";
import { AppleReveal } from "@/components/AppleReveal";
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

        {/* 02: Signature Apple-Style Cinematic Feature Showcase */}
        <AppleFeatureShowcase />

        {/* 03: Supported Multi-Provider Ecosystem */}
        <AppleReveal direction="up">
          <ProviderEcosystem />
        </AppleReveal>

        {/* 04: Intelligent Router Interactive Simulation */}
        <AppleReveal direction="up">
          <RoutingSimulator />
        </AppleReveal>

        {/* 05: Reliability Engine & Automatic Failover */}
        <AppleReveal direction="up">
          <FailoverDemo />
        </AppleReveal>

        {/* 06: 6-Layer Enterprise System Architecture */}
        <AppleReveal direction="up">
          <ArchitectureDiagram />
        </AppleReveal>

        {/* 07: Developer Code Studio & Instant Drop-in SDK */}
        <AppleReveal direction="up">
          <CodeStudio />
        </AppleReveal>

        {/* 08: Security & Governance (Virtual Keys, Budget Caps, PII) */}
        <AppleReveal direction="up">
          <SecurityGovernance />
        </AppleReveal>

        {/* 09: MCP & Agent Gateway */}
        <AppleReveal direction="up">
          <McpAgentSection />
        </AppleReveal>

        {/* 10: ROI & Infrastructure Cost Calculator */}
        <AppleReveal direction="up">
          <CostCalculator />
        </AppleReveal>

        {/* 11: Final Apple-Inspired Call-to-Action */}
        <section className="py-32 relative overflow-hidden border-t border-white/[0.08] bg-radial-glow text-center">
          {/* Subtle ambient light orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#2997FF]/15 via-[#A855F7]/12 to-transparent rounded-full blur-[140px] pointer-events-none" />

          <AppleReveal direction="scale" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE NEXT-GENERATION AI STACK</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
              Build on One Gateway.
              <br />
              <span className="apple-text-shimmer">Total Control of Your AI Future.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Start locally with a single Docker command. Scale globally across multi-region Kubernetes clusters. Protect user privacy and never face vendor lock-in again.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white font-medium text-base shadow-glow hover:shadow-[0_0_40px_rgba(41,151,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Launch Enterprise Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/playground"
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 font-medium text-base border border-white/15 flex items-center justify-center gap-2"
              >
                <span>Try Live API Playground</span>
              </Link>
            </div>
          </AppleReveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
