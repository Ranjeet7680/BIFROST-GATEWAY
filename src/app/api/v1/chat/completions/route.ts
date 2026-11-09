import { NextRequest, NextResponse } from "next/server";
import { INITIAL_MODELS } from "@/lib/data/initialModels";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";

    let body: any = {};
    try {
      const rawText = await req.text();
      if (rawText && rawText.trim()) {
        body = JSON.parse(rawText);
      }
    } catch {
      body = {};
    }

    const { model = "bifrost/auto-best", messages = [], stream = false, temperature = 0.7 } = body;

    // Extract prompt content
    let lastUserMessage = "Hello Bifrost Gateway";
    if (Array.isArray(messages) && messages.length > 0) {
      const found = [...messages].reverse().find((m: any) => m.role === "user");
      if (found && typeof found.content === "string") {
        lastUserMessage = found.content;
      }
    }

    // Simulate intelligent router decision
    let routedModel = typeof model === "string" ? model : "bifrost/auto-best";
    let selectedProvider = "OpenAI";

    if (routedModel === "bifrost/auto-best") {
      const lower = lastUserMessage.toLowerCase();
      if (lower.includes("code") || lower.includes("function") || lower.includes("architect")) {
        routedModel = "claude-3-5-sonnet-20241022";
        selectedProvider = "Anthropic Claude";
      } else if (lastUserMessage.length > 500) {
        routedModel = "gemini-1.5-pro";
        selectedProvider = "Google Gemini";
      } else {
        routedModel = "gpt-4o";
        selectedProvider = "OpenAI";
      }
    } else {
      const found = INITIAL_MODELS.find((m) => m.id === routedModel);
      if (found) {
        selectedProvider = found.provider;
      }
    }

    const promptTokens = Math.max(12, Math.round(lastUserMessage.length / 4));
    const completionText = `[Bifrost Gateway 2.4 - Unified Response]\n\nRequest successfully routed to ${selectedProvider} (${routedModel}).\n\nExecution metadata:\n• Unified Endpoint: /v1/chat/completions\n• Tenant Authorization: Validated\n• Guardrails Inspection: 0 PII / 0 Injections detected\n• OpenTelemetry Trace: Emitted`;
    const completionTokens = Math.round(completionText.length / 4);
    const totalTokens = promptTokens + completionTokens;

    // Return standard OpenAI response
    const responsePayload = {
      id: `chatcmpl-${Date.now().toString(36)}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: routedModel,
      provider: selectedProvider,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: completionText,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        estimated_cost_usd: (promptTokens * 0.000003 + completionTokens * 0.000015).toFixed(6),
      },
      bifrost_metadata: {
        gateway_version: "2.4.0",
        routing_mode: "auto-best",
        cache_hit: false,
        latency_overhead_ms: 2.1,
      },
    };

    return NextResponse.json(responsePayload);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: {
          message: err?.message || "Internal Gateway Error",
          type: "gateway_error",
          code: 500,
        },
      },
      { status: 500 }
    );
  }
}
