"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Cpu,
  Layers,
} from "lucide-react";
import { GatewayNetworkCanvas } from "./GatewayNetworkCanvas";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCmd = "docker run -d -p 8080:8080 getbifrost/gateway:latest";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-radial-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Keynote Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-white/10 shadow-glow text-xs sm:text-sm text-white/90">
            <span className="flex h-2 w-2 rounded-full bg-[#2997FF] animate-pulse" />
            <span className="font-medium tracking-wide">
              BIFROST GATEWAY v2.4 RELEASED
            </span>
            <span className="text-white/40">|</span>
            <span className="text-[#2997FF] flex items-center gap-1 font-mono text-xs">
              OPEN SOURCE <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-sans">
            One Gateway. <span className="text-gradient-blue">Every AI.</span>
            <br />
            Infinite Possibilities.
          </h1>
          <p className="text-base sm:text-xl text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
            Route intelligence, eliminate vendor lock-in, slash latency by 43%, and cut AI API costs up to 72% with an enterprise-grade, high-throughput unified gateway.
          </p>
        </div>

        {/* Action Buttons & Terminal Snippet */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white font-medium text-sm sm:text-base shadow-glow hover:shadow-[0_0_35px_rgba(41,151,255,0.7)] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Open Administration Console</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/playground"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel text-white hover:text-white hover:bg-white/10 transition-all font-medium text-sm sm:text-base border border-white/15 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#2997FF]" />
            <span>Interactive API Playground</span>
          </Link>

          <a
            href="https://github.com/maximhq/bifrost"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all font-medium text-sm flex items-center justify-center gap-2 border border-white/10"
          >
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* Quick Docker terminal copy snippet */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#090A12] border border-white/10 shadow-lg font-mono text-xs text-white/80">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
              <span className="text-[#2997FF] select-none font-bold">$</span>
              <span className="truncate">{installCmd}</span>
            </div>
            <button
              onClick={handleCopy}
              className="ml-3 p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-white/60 hover:text-white transition-colors flex-shrink-0"
              title="Copy Docker command"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#10B981]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Signature Gateway Live Network Visualizer */}
        <div className="relative">
          <GatewayNetworkCanvas />
        </div>
      </div>
    </section>
  );
}
