"use client";

import React, { useRef, useEffect, useState } from "react";
import { Cpu, ShieldCheck, Zap, DollarSign, RefreshCw, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

interface NodePoint {
  id: string;
  name: string;
  category: "client" | "core" | "provider";
  x: number;
  y: number;
  color: string;
  icon?: string;
  active: boolean;
  failed?: boolean;
}

interface Particle {
  id: number;
  startX: number;
  startY: number;
  coreX: number;
  coreY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  color: string;
  stage: "to_core" | "to_provider" | "return_client";
  failedFirstAttempt?: boolean;
}

export function GatewayNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<"auto" | "cost" | "latency" | "failover">("auto");
  const [activeProviderId, setActiveProviderId] = useState<string>("anthropic");
  const [statsCounter, setStatsCounter] = useState({ requests: 14209, savedPct: 68, latency: 42 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = 480);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.max(420, Math.min(520, window.innerHeight * 0.55));
    };
    window.addEventListener("resize", handleResize);

    // Initialize Nodes
    const getNodes = (): NodePoint[] => {
      const centerY = height / 2;
      const coreX = width * 0.48;

      const clients: NodePoint[] = [
        { id: "c-web", name: "Web / Mobile App", category: "client", x: width * 0.1, y: centerY - 90, color: "#2997FF", active: true },
        { id: "c-agent", name: "Autonomous Agents", category: "client", x: width * 0.08, y: centerY, color: "#60A5FA", active: true },
        { id: "c-sdk", name: "Python / Node SDK", category: "client", x: width * 0.1, y: centerY + 90, color: "#93C5FD", active: true },
      ];

      const core: NodePoint = {
        id: "bifrost-core",
        name: "BIFROST CORE",
        category: "core",
        x: coreX,
        y: centerY,
        color: "#2997FF",
        active: true,
      };

      const providerX = width * 0.88;
      const spacing = height / 8;

      const providersList: NodePoint[] = [
        { id: "openai", name: "OpenAI GPT-4o", category: "provider", x: providerX, y: spacing * 1.2, color: "#10A37F", active: activeMode !== "failover" && (activeMode === "auto" || activeProviderId === "openai"), failed: activeMode === "failover" },
        { id: "anthropic", name: "Anthropic Claude 3.5", category: "provider", x: providerX, y: spacing * 2.3, color: "#D97706", active: activeMode === "failover" || activeProviderId === "anthropic" },
        { id: "gemini", name: "Google Gemini 1.5", category: "provider", x: providerX, y: spacing * 3.4, color: "#4285F4", active: activeProviderId === "gemini" },
        { id: "deepseek", name: "DeepSeek V3 / R1", category: "provider", x: providerX, y: spacing * 4.5, color: "#00F5FF", active: activeMode === "cost" || activeProviderId === "deepseek" },
        { id: "groq", name: "Groq LPU (38ms)", category: "provider", x: providerX, y: spacing * 5.6, color: "#F43F5E", active: activeMode === "latency" || activeProviderId === "groq" },
        { id: "bedrock", name: "AWS Bedrock", category: "provider", x: providerX, y: spacing * 6.7, color: "#FF9900", active: activeProviderId === "bedrock" },
      ];

      return [...clients, core, ...providersList];
    };

    let particles: Particle[] = [];
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const nodes = getNodes();
      const coreNode = nodes.find((n) => n.id === "bifrost-core")!;
      const clientNodes = nodes.filter((n) => n.category === "client");
      const providerNodes = nodes.filter((n) => n.category === "provider");

      // Spawn particles periodically
      if (frame % 28 === 0) {
        const randomClient = clientNodes[Math.floor(Math.random() * clientNodes.length)];
        let targetProvider: NodePoint;

        if (activeMode === "failover") {
          targetProvider = providerNodes.find((p) => p.id === "anthropic")!;
        } else if (activeMode === "cost") {
          targetProvider = providerNodes.find((p) => p.id === "deepseek")!;
        } else if (activeMode === "latency") {
          targetProvider = providerNodes.find((p) => p.id === "groq")!;
        } else {
          const activeOnes = providerNodes.filter((p) => p.active);
          targetProvider = activeOnes[Math.floor(Math.random() * activeOnes.length)] || providerNodes[0];
        }

        particles.push({
          id: Math.random(),
          startX: randomClient.x,
          startY: randomClient.y,
          coreX: coreNode.x,
          coreY: coreNode.y,
          endX: targetProvider.x,
          endY: targetProvider.y,
          progress: 0,
          speed: 0.018 + Math.random() * 0.006,
          color: activeMode === "cost" ? "#00F5FF" : activeMode === "latency" ? "#F43F5E" : "#2997FF",
          stage: "to_core",
          failedFirstAttempt: activeMode === "failover",
        });
      }

      // Draw faint connection curves
      ctx.lineWidth = 1;
      clientNodes.forEach((c) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(41, 151, 255, 0.12)";
        ctx.moveTo(c.x, c.y);
        ctx.bezierCurveTo((c.x + coreNode.x) / 2, c.y, (c.x + coreNode.x) / 2, coreNode.y, coreNode.x, coreNode.y);
        ctx.stroke();
      });

      providerNodes.forEach((p) => {
        ctx.beginPath();
        if (p.failed) {
          ctx.strokeStyle = "rgba(244, 63, 94, 0.2)";
          ctx.setLineDash([4, 4]);
        } else if (p.active) {
          ctx.strokeStyle = "rgba(41, 151, 255, 0.28)";
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.setLineDash([]);
        }
        ctx.moveTo(coreNode.x, coreNode.y);
        ctx.bezierCurveTo((coreNode.x + p.x) / 2, coreNode.y, (coreNode.x + p.x) / 2, p.y, p.x, p.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Update & Draw particles
      particles.forEach((p, idx) => {
        p.progress += p.speed;

        let curX = 0;
        let curY = 0;

        if (p.stage === "to_core") {
          const t = Math.min(1, p.progress * 2);
          const cpX = (p.startX + p.coreX) / 2;
          curX = (1 - t) * (1 - t) * p.startX + 2 * (1 - t) * t * cpX + t * t * p.coreX;
          curY = (1 - t) * (1 - t) * p.startY + 2 * (1 - t) * t * p.startY + t * t * p.coreY;

          if (t >= 1) {
            p.stage = "to_provider";
          }
        } else if (p.stage === "to_provider") {
          const t = Math.min(1, (p.progress - 0.5) * 2);
          const cpX = (p.coreX + p.endX) / 2;
          curX = (1 - t) * (1 - t) * p.coreX + 2 * (1 - t) * t * cpX + t * t * p.endX;
          curY = (1 - t) * (1 - t) * p.coreY + 2 * (1 - t) * t * p.endY + t * t * p.endY;

          if (t >= 1) {
            p.stage = "return_client";
          }
        } else {
          // Returning
          curX = p.endX - (p.endX - p.startX) * ((p.progress - 1) * 2);
          curY = p.endY - (p.endY - p.startY) * ((p.progress - 1) * 2);
        }

        // Draw particle head and glowing tail
        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = p.failedFirstAttempt && p.stage === "to_provider" ? "#F43F5E" : p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Filter out completed particles
      particles = particles.filter((p) => p.progress < 1.5);

      // Draw Core Gateway Hologram
      const pulse = Math.sin(frame * 0.04) * 6;
      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, 44 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(41, 151, 255, 0.08)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(coreNode.x, coreNode.y, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#090A12";
      ctx.strokeStyle = activeMode === "failover" ? "#F43F5E" : "#2997FF";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#2997FF";
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner rotating rings on Core
      ctx.save();
      ctx.translate(coreNode.x, coreNode.y);
      ctx.rotate(frame * 0.015);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 1.5);
      ctx.strokeStyle = "rgba(0, 245, 255, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Core text
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 11px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("BIFROST", coreNode.x, coreNode.y - 4);
      ctx.font = "9px monospace";
      ctx.fillStyle = activeMode === "failover" ? "#F43F5E" : "#00F5FF";
      ctx.fillText(activeMode === "failover" ? "CIRCUIT TRIP" : "GATEWAY", coreNode.x, coreNode.y + 10);

      // Draw Client Nodes
      clientNodes.forEach((c) => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = "#0C0E17";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#ededed";
        ctx.font = "11px -apple-system, sans-serif";
        ctx.textAlign = "right";
        ctx.fillText(c.name, c.x - 20, c.y + 4);
      });

      // Draw Provider Nodes
      providerNodes.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = p.failed ? "#2A0E14" : p.active ? "#0D1A2D" : "#0A0B10";
        ctx.strokeStyle = p.failed ? "#F43F5E" : p.active ? p.color : "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = p.active ? 2 : 1;
        if (p.active && !p.failed) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = p.failed ? "#F43F5E" : p.active ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)";
        ctx.font = p.active ? "bold 12px -apple-system, sans-serif" : "11px -apple-system, sans-serif";
        ctx.textAlign = "left";
        ctx.fillText(p.name, p.x + 24, p.y + 4);

        if (p.failed) {
          ctx.font = "9px monospace";
          ctx.fillStyle = "#F43F5E";
          ctx.fillText("503 OUTAGE -> BYPASSED", p.x + 24, p.y + 16);
        } else if (p.active) {
          ctx.font = "9px monospace";
          ctx.fillStyle = "#10B981";
          ctx.fillText("● ROUTED (200 OK)", p.x + 24, p.y + 16);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMode, activeProviderId]);

  return (
    <div className="relative w-full rounded-3xl glass-panel p-6 sm:p-8 overflow-hidden shadow-2xl border border-white/10">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      {/* Top Header & Strategy Switcher */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
            <h3 className="text-lg font-semibold text-white tracking-tight">
              Live Gateway Packet Architecture
            </h3>
          </div>
          <p className="text-xs text-white/50">
            Click a routing policy below to observe real-time packet evaluation, cache lookups, and failover circuits.
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => {
              setActiveMode("auto");
              setActiveProviderId("anthropic");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === "auto"
                ? "bg-[#2997FF] text-white shadow-glow"
                : "text-white/60 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Auto Best Model
          </button>
          <button
            onClick={() => {
              setActiveMode("cost");
              setActiveProviderId("deepseek");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === "cost"
                ? "bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/30"
                : "text-white/60 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Cost Optimizer (-72%)
          </button>
          <button
            onClick={() => {
              setActiveMode("latency");
              setActiveProviderId("groq");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === "latency"
                ? "bg-[#F43F5E]/20 text-[#F43F5E] border border-[#F43F5E]/30"
                : "text-white/60 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Sub-50ms Latency
          </button>
          <button
            onClick={() => {
              setActiveMode("failover");
              setActiveProviderId("anthropic");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeMode === "failover"
                ? "bg-[#F43F5E] text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                : "text-white/60 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            Simulate 429 Failover
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative w-full h-[440px] sm:h-[480px]">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Live Diagnostics Card Overlay in bottom left */}
        <div className="absolute bottom-4 left-4 z-10 glass-panel rounded-2xl p-4 max-w-xs border border-white/10 hidden sm:block">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono text-white/50">ROUTER TELEMETRY</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981]">
              P99 &lt; 4ms
            </span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-white/60">Policy Enforced:</span>
              <span className="text-white font-mono uppercase">{activeMode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Semantic Cache:</span>
              <span className="text-[#00F5FF] font-mono">pgvector HIT (96%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Circuit State:</span>
              <span className={activeMode === "failover" ? "text-[#F43F5E] font-mono font-bold" : "text-[#10B981] font-mono"}>
                {activeMode === "failover" ? "FAILOVER TRIGGERED" : "CLOSED (HEALTHY)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer ticker */}
      <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-lg font-bold text-white font-mono">&lt; 4ms</div>
          <div className="text-[11px] text-white/40">Gateway Overhead</div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#00F5FF] font-mono">72.4%</div>
          <div className="text-[11px] text-white/40">Average Cost Reduced</div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#10B981] font-mono">99.99%</div>
          <div className="text-[11px] text-white/40">Uptime SLA Guaranteed</div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#A855F7] font-mono">15+</div>
          <div className="text-[11px] text-white/40">AI Providers Connected</div>
        </div>
      </div>
    </div>
  );
}
