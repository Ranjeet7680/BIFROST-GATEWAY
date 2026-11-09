"use client";

import React, { useState } from "react";
import { useGateway } from "@/lib/store";
import {
  Code2,
  Copy,
  Check,
  Play,
  Sparkles,
  Terminal,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";
import { formatCurrency, formatLatency } from "@/lib/utils";

const SNIPPETS = {
  python: `import openai

# Drop-in replacement! Just point baseURL to Bifrost Gateway
client = openai.OpenAI(
    base_url="https://gateway.internal:8080/v1",
    api_key="bf_live_9a7x_enterprise_token"
)

response = client.chat.completions.create(
    model="bifrost/auto-best", # Intelligent auto-routing
    messages=[
        {"role": "system", "content": "You are an enterprise AI assistant."},
        {"role": "user", "content": "Summarize the Q3 cloud infrastructure security audit."}
    ],
    temperature=0.2,
    stream=False
)

print(response.choices[0].message.content)
print(f"Cost: {response.usage.total_cost}")`,

  typescript: `import OpenAI from "openai";

// Zero code refactoring: standard OpenAI Node.js SDK
const bifrost = new OpenAI({
  baseURL: "https://gateway.internal:8080/v1",
  apiKey: process.env.BIFROST_VIRTUAL_KEY,
});

async function main() {
  const completion = await bifrost.chat.completions.create({
    model: "claude-3-5-sonnet-20241022",
    messages: [
      { role: "user", content: "Optimize this SQL query for distributed Postgres." }
    ],
  });

  console.log(completion.choices[0].message.content);
}
main();`,

  curl: `curl https://gateway.internal:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer bf_live_9a7x_enterprise_token" \\
  -d '{
    "model": "bifrost/auto-best",
    "messages": [
      {"role": "user", "content": "Explain zero-downtime AI failover."}
    ],
    "temperature": 0.7
  }'`,

  go: `package main

import (
    "context"
    "fmt"
    "github.com/sashabaranov/go-openai"
)

func main() {
    config := openai.DefaultConfig("bf_live_9a7x_enterprise_token")
    config.BaseURL = "https://gateway.internal:8080/v1"

    client := openai.NewClientWithConfig(config)
    resp, err := client.CreateChatCompletion(
        context.Background(),
        openai.ChatCompletionRequest{
            Model: "bifrost/auto-best",
            Messages: []openai.ChatCompletionMessage{
                {Role: openai.ChatMessageRoleUser, Content: "Hello Bifrost!"},
            },
        },
    )
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Choices[0].Message.Content)
}`,
};

export function CodeStudio() {
  const { executeRequest } = useGateway();
  const [activeLang, setActiveLang] = useState<keyof typeof SNIPPETS>("python");
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    text: string;
    model: string;
    provider: string;
    cached: boolean;
    tokens: number;
    latencyMs: number;
    cost: number;
  } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await executeRequest({
        prompt: "Summarize the Q3 cloud infrastructure security audit.",
        model: "bifrost/auto-best",
        routingMode: "auto",
      });
      setExecutionResult(result);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section id="code" className="py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#2997FF] mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>DEVELOPER EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            One Base URL. No Code Rewrites.
          </h2>
          <p className="text-base text-white/60">
            Keep your existing SDKs and agent code. Simply update the <code className="text-[#2997FF] font-mono">base_url</code> to your Bifrost Gateway instance and gain immediate observability, intelligent routing, and fallback resilience.
          </p>
        </div>

        {/* Code Editor Container */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            {/* Language tabs */}
            <div className="flex items-center gap-2">
              {(["python", "typescript", "curl", "go"] as (keyof typeof SNIPPETS)[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeLang === lang
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {lang === "typescript" ? "TypeScript" : lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors flex items-center gap-1.5 border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={handleRun}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#2997FF] to-[#0071E3] hover:from-[#3B82F6] hover:to-[#1D4ED8] text-xs font-medium text-white shadow-glow transition-all flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? "Running..." : "Test Execute"}</span>
              </button>
            </div>
          </div>

          {/* Code Content */}
          <pre className="p-6 text-xs sm:text-sm text-white/90 font-mono overflow-x-auto leading-relaxed bg-[#030407]">
            <code>{SNIPPETS[activeLang]}</code>
          </pre>

          {/* Live Execution Output Box */}
          {executionResult && (
            <div className="p-6 border-t border-white/[0.08] bg-white/[0.02] transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#10B981] flex items-center gap-1.5 font-semibold">
                  <Check className="w-4 h-4" />
                  GATEWAY HTTP 200 OK
                </span>
                <div className="flex items-center gap-4 text-xs font-mono text-white/60">
                  <span>Latency: <strong className="text-white">{formatLatency(executionResult.latencyMs)}</strong></span>
                  <span>Tokens: <strong className="text-white">{executionResult.tokens}</strong></span>
                  <span>Cost: <strong className="text-[#10B981]">{formatCurrency(executionResult.cost)}</strong></span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090A12] border border-white/10 font-mono text-xs text-white/80 leading-relaxed whitespace-pre-wrap">
                {executionResult.text}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
