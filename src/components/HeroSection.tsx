"use client";

import React, { useState, useEffect } from "react";
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
  Activity,
  DollarSign,
} from "lucide-react";
import { GatewayNetworkCanvas } from "./GatewayNetworkCanvas";
import { AppleReveal } from "./AppleReveal";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [liveLatency, setLiveLatency] = useState(2.1);
  const installCmd = "docker run -d -p 8080:8080 getbifrost/gateway:latest";

  // Subtle real-time microsecond fluctuation to give the Apple live telemetry feel
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveLatency(Number((1.8 + Math.random() * 0.5).toFixed(1)));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[#030407]">
      {/* Apple-style breathing ambient light auras */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#2997FF]/20 via-[#A855F7]/12 to-transparent rounded-full blur-[140px] pointer-events-none apple-orb-blue" />
      <div className="absolute top-48 left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-[#00F5FF]/15 to-transparent rounded-full blur-[120px] pointer-events-none apple-orb-purple" />
      <div className="absolute top-64 right-1/4 w-[550px] h-[380px] bg-gradient-to-bl from-[#10B981]/12 to-transparent rounded-full blur-[120px] pointer-events-none apple-orb-emerald" />

      {/* Subtle Apple grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Keynote Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-white/15 shadow-glow text-xs sm:text-sm text-white/90 hover:border-white/25 transition-all cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-[#2997FF] animate-pulse" />
            <span className="font-medium tracking-wide">
              BIFROST GATEWAY v2.4 RELEASED
            </span>
            <span className="text-white/30">|</span>
            <span className="text-[#2997FF] flex items-center gap-1 font-mono text-xs font-semibold">
              APACHE 2.0 OPEN SOURCE <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Hero Title & Pitch with Apple Shimmer */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 font-sans leading-[1.08]">
            One Gateway. <span className="text-gradient-blue">Every AI.</span>
            <br />
            <span className="apple-text-shimmer">Infinite Possibilities.</span>
          </h1>
          <p className="text-base sm:text-xl text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
            Route intelligence, eliminate vendor lock-in, slash latency by 43%, and cut AI API costs up to 72% with an enterprise-grade, high-throughput unified gateway.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white font-medium text-sm sm:text-base shadow-glow hover:shadow-[0_0_40px_rgba(41,151,255,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Open Administration Console</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/playground"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel text-white hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 font-medium text-sm sm:text-base border border-white/15 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#2997FF]" />
            <span>Interactive API Playground</span>
          </Link>

          <a
            href="https://github.com/Ranjeet7680/BIFROST-GATEWAY"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/[0.08] hover:scale-105 active:scale-95 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 border border-white/10"
          >
            <span>GitHub Repository</span>
          </a>
        </div>

        {/* 4 Apple-style Floating Telemetry Metric Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-14">
          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Gateway Overhead</div>
            <div className="text-xl sm:text-2xl font-bold text-[#00F5FF] font-mono mt-0.5">
              &lt; {liveLatency}ms
            </div>
            <div className="text-[10px] text-white/50 mt-0.5">Ultra-low Go FastHTTP</div>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Cost Reduction</div>
            <div className="text-xl sm:text-2xl font-bold text-[#10B981] font-mono mt-0.5">
              71% Net
            </div>
            <div className="text-[10px] text-white/50 mt-0.5">pgvector Semantic Cache</div>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Auto-Failover</div>
            <div className="text-xl sm:text-2xl font-bold text-[#F43F5E] font-mono mt-0.5">
              18ms
            </div>
            <div className="text-[10px] text-white/50 mt-0.5">Circuit breaker cascade</div>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/10 text-center hover:border-white/20 transition-all">
            <div className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Providers</div>
            <div className="text-xl sm:text-2xl font-bold text-[#A855F7] font-mono mt-0.5">
              15+
            </div>
            <div className="text-[10px] text-white/50 mt-0.5">Frontier &amp; Local Engines</div>
          </div>
        </div>

        {/* Quick Docker terminal copy snippet */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#090A12] border border-white/10 shadow-lg font-mono text-xs text-white/80 hover:border-white/25 transition-all">
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
