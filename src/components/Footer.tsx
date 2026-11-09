import React from "react";
import Link from "next/link";
import { Layers, Github, Heart, ShieldCheck, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#030407] pt-16 pb-12 text-sm text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2997FF] to-[#0071E3] flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-semibold text-white tracking-tight">
                BIFROST GATEWAY
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed max-w-sm mb-4">
              The high-performance, open-source AI infrastructure platform connecting multiple AI
              providers through one unified OpenAI-compatible API. Intelligent routing, automatic
              failover, semantic vector caching, and enterprise governance.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/maximhq/bifrost"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/[0.08] transition-colors text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub (Apache 2.0)</span>
              </a>
              <div className="flex items-center gap-1.5 text-xs text-[#10B981]">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#product" className="hover:text-white transition-colors">
                  Unified AI Gateway
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-white transition-colors">
                  Intelligent Router
                </Link>
              </li>
              <li>
                <Link href="/#failover" className="hover:text-white transition-colors">
                  Automatic Failover
                </Link>
              </li>
              <li>
                <Link href="/#cache" className="hover:text-white transition-colors">
                  Semantic Cache
                </Link>
              </li>
              <li>
                <Link href="/#mcp" className="hover:text-white transition-colors">
                  MCP & Agent Gateway
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Enterprise Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Dev */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Developers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/playground" className="hover:text-white transition-colors">
                  API Playground
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-white transition-colors">
                  System Architecture
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation & SDKs
                </Link>
              </li>
              <li>
                <a
                  href="/#code"
                  className="hover:text-white transition-colors"
                >
                  Python & Node SDK
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/maximhq/bifrost"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Go Gateway Engine
                </a>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-colors">
                  Self-Hosting Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Open Source */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#providers" className="hover:text-white transition-colors">
                  Supported Providers
                </Link>
              </li>
              <li>
                <Link href="/dashboard/security" className="hover:text-white transition-colors">
                  Security & Guardrails
                </Link>
              </li>
              <li>
                <Link href="/dashboard/virtual-keys" className="hover:text-white transition-colors">
                  Virtual Keys & Budgets
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.getbifrost.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Upstream Docs
                </a>
              </li>
              <li>
                <span className="text-white/40">OpenTelemetry Ready</span>
              </li>
              <li>
                <span className="text-white/40">Kubernetes & Docker</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-white/40">
            © 2026 Bifrost Gateway Project. Released under the Apache 2.0 Open Source License.
          </p>
          <div className="flex items-center gap-6 text-white/40">
            <span>SOC2 Type II Compliant Ready</span>
            <span>Zero Provider Vendor Lock-in</span>
            <span className="flex items-center gap-1">
              Crafted for Enterprise AI Infrastructure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
