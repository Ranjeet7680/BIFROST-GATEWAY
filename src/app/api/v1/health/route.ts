import { NextResponse } from "next/server";
import { INITIAL_PROVIDERS } from "@/lib/data/initialProviders";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    version: "2.4.0",
    gateway: "Bifrost Gateway",
    uptime_percentage: 99.99,
    timestamp: new Date().toISOString(),
    providers_connected: INITIAL_PROVIDERS.length,
    active_circuit_breakers: 0,
    memory_heap_alloc_mb: 28.4,
  });
}
