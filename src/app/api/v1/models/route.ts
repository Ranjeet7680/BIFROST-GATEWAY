import { NextResponse } from "next/server";
import { INITIAL_MODELS } from "@/lib/data/initialModels";

export async function GET() {
  const modelsData = INITIAL_MODELS.map((m) => ({
    id: m.id,
    object: "model",
    created: 1700000000,
    owned_by: m.provider,
    permission: [],
    root: m.id,
    parent: null,
    context_window: m.contextWindow,
    pricing: {
      input_cost_per_1m: m.inputCostPer1M,
      output_cost_per_1m: m.outputCostPer1M,
    },
    tier: m.tier,
    capabilities: m.capabilities,
  }));

  return NextResponse.json({
    object: "list",
    data: modelsData,
  });
}
