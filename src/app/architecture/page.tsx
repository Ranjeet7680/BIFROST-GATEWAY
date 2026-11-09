"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import {
  Layers,
  Shield,
  Zap,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#030407] text-[#ededed] font-sans">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE &amp; DESIGN</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
              High-Throughput Distributed AI Data Plane
            </h1>
            <p className="text-base text-white/60 leading-relaxed">
              Designed from first principles to isolate client applications from provider outages, rate limit storms, and pricing volatility with sub-4 millisecond internal overhead.
            </p>
          </div>
        </div>

        <ArchitectureDiagram />

        {/* Engineering Rules Callout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-apple">
            <h2 className="text-xl font-bold text-white mb-4">
              Core Engineering Invariants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-white/70">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">
                  1. Zero Credential Exposure
                </strong>
                Provider secrets reside exclusively in the encrypted vault or AWS Secrets Manager. Client apps receive Virtual Keys only.
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">
                  2. Bounded Retries &amp; Circuit Breakers
                </strong>
                Exponential backoff with jitter and 3-attempt hard caps prevent destructive upstream retry storms.
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">
                  3. Budget Verification Before Dispatch
                </strong>
                Virtual key monthly spend and rate limit tokens are atomic in Redis before model dispatch begins.
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">
                  4. Normalized SSE Streaming
                </strong>
                All divergent streaming formats (OpenAI, Claude, Gemini, Mistral) transcode to standardized OpenAI SSE chunks.
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">
                  5. Semantic Cache Isolation
                </strong>
                Vector embeddings strictly enforce tenant ID boundaries to eliminate cross-tenant data leakage.
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <strong className="text-white block mb-1">
                  6. Complete W3C Traceability
                </strong>
                Every request emits parent and child OpenTelemetry spans for end-to-end distributed debugging.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
