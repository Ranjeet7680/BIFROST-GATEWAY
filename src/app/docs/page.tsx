"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Terminal,
  Layers,
  Code2,
  Copy,
  Check,
  Server,
  Shield,
  Zap,
} from "lucide-react";

export default function DocsPage() {
  const [activeDoc, setActiveDoc] = useState<string>("quickstart");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030407] text-[#ededed] font-sans">
      <Navbar />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Docs Navigation Sidebar */}
          <aside className="lg:col-span-3 glass-panel rounded-2xl p-4 border border-white/10 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">
                GETTING STARTED
              </span>
              <div className="space-y-1">
                {[
                  { id: "quickstart", label: "Quickstart (3 Minutes)" },
                  { id: "docker", label: "Docker Deployment" },
                  { id: "kubernetes", label: "Kubernetes & Helm" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveDoc(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeDoc === item.id
                        ? "bg-[#2997FF]/15 text-white font-semibold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">
                API SPECIFICATION
              </span>
              <div className="space-y-1">
                {[
                  { id: "unified-api", label: "POST /v1/chat/completions" },
                  { id: "models-api", label: "GET /v1/models" },
                  { id: "virtual-keys-api", label: "Virtual Keys & Quotas" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveDoc(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeDoc === item.id
                        ? "bg-[#2997FF]/15 text-white font-semibold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block mb-2">
                ENTERPRISE FEATURES
              </span>
              <div className="space-y-1">
                {[
                  { id: "semantic-cache-doc", label: "Semantic Caching" },
                  { id: "mcp-doc", label: "Model Context Protocol (MCP)" },
                  { id: "guardrails-doc", label: "DLP & PII Masking" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveDoc(item.id)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      activeDoc === item.id
                        ? "bg-[#2997FF]/15 text-white font-semibold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Docs Content Area */}
          <div className="lg:col-span-9 glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-apple space-y-8">
            {activeDoc === "quickstart" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#2997FF] block mb-1">
                    GETTING STARTED
                  </span>
                  <h1 className="text-3xl font-bold text-white tracking-tight">
                    Quickstart: Connect Your App in 3 Minutes
                  </h1>
                  <p className="text-sm text-white/60 mt-2 leading-relaxed">
                    Bifrost Gateway is a drop-in replacement for any OpenAI-compatible client. You do not need to install specialized SDKs unless you want advanced tenant headers.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-white">
                    Step 1: Run Bifrost Gateway Container
                  </h3>
                  <div className="p-4 rounded-xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 flex items-center justify-between">
                    <code>docker run -d -p 8080:8080 getbifrost/gateway:latest</code>
                    <button
                      onClick={() =>
                        handleCopy("docker run -d -p 8080:8080 getbifrost/gateway:latest", "c1")
                      }
                      className="p-1.5 text-white/40 hover:text-white"
                    >
                      {copied === "c1" ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-white">
                    Step 2: Point Existing Python / Node OpenAI Client
                  </h3>
                  <pre className="p-4 rounded-xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`from openai import OpenAI

# Connect to your local or VPC Bifrost instance
client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="bf_live_enterprise_token"
)

# Call any model across OpenAI, Anthropic, Gemini, DeepSeek, or Groq
response = client.chat.completions.create(
    model="bifrost/auto-best", # Or claude-3-5-sonnet, deepseek-r1, gpt-4o
    messages=[{"role": "user", "content": "Hello Bifrost!"}]
)

print(response.choices[0].message.content)`}
                  </pre>
                </div>
              </div>
            )}

            {activeDoc === "docker" && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Docker &amp; Docker Compose
                </h1>
                <p className="text-sm text-white/60 leading-relaxed">
                  Bifrost is distributed as a lightweight 22MB static Go container with Redis and PostgreSQL support for distributed semantic caching.
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-mono text-white/50">docker-compose.yml:</span>
                  <pre className="p-4 rounded-xl bg-[#030407] border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed">
{`version: '3.8'

services:
  gateway:
    image: getbifrost/gateway:latest
    ports:
      - "8080:8080"
    environment:
      - REDIS_URL=redis://redis:6379/0
      - LOG_LEVEL=info
      - OPENAI_API_KEY=\${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"`}
                  </pre>
                </div>
              </div>
            )}

            {activeDoc !== "quickstart" && activeDoc !== "docker" && (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-white tracking-tight uppercase font-mono">
                  {activeDoc.replace("-", " ")}
                </h1>
                <p className="text-sm text-white/60 leading-relaxed">
                  Full reference documentation and API schemas for {activeDoc}. Bifrost supports strict OpenAPI 3.1 conformance with automated SDK generation for Go, Rust, Java, and Swift.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs text-white/70">
                  Detailed schemas and specifications are available in the repository at <code className="text-[#2997FF]">/docs/spec</code>.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
