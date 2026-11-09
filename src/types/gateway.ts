export type ProviderStatus = "operational" | "degraded" | "down" | "disabled";

export interface AIProvider {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ProviderStatus;
  latencyMs: number;
  uptime24h: number;
  modelsCount: number;
  authType: "api_key" | "oauth2" | "aws_iam" | "azure_ad";
  hasKey: boolean;
  enabled: boolean;
  icon: string;
  regions: string[];
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  contextWindow: number;
  inputCostPer1M: number;
  outputCostPer1M: number;
  latencyScore: "ultra-fast" | "fast" | "standard" | "deliberate";
  capabilities: ("text" | "vision" | "function-calling" | "json-mode" | "code")[];
  tier: "flagship" | "balanced" | "economy" | "specialized";
  description: string;
}

export interface RoutingRule {
  id: string;
  name: string;
  strategy: "weighted" | "latency" | "cost" | "fallback_chain" | "tag_based";
  priority: number;
  targetModels: string[];
  weights?: Record<string, number>;
  fallbackModel: string;
  maxLatencyMs?: number;
  maxCostPer1M?: number;
  active: boolean;
  description: string;
}

export interface VirtualKey {
  id: string;
  name: string;
  keyPrefix: string;
  tenantId: string;
  monthlyBudget: number;
  currentSpend: number;
  rateLimitRPM: number;
  allowedModels: string[];
  status: "active" | "suspended" | "expired";
  createdAt: string;
  lastUsedAt: string;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  maskedKey: string;
  role: "root_admin" | "read_write" | "read_only";
  createdAt: string;
  lastUsed: string;
  requestsCount: number;
}

export interface TraceStep {
  name: string;
  durationMs: number;
  status: "ok" | "warn" | "fail";
  details: string;
}

export interface RequestLog {
  id: string;
  timestamp: string;
  model: string;
  provider: string;
  status: number;
  cached: boolean;
  cacheSimilarity?: number;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  virtualKey: string;
  trace: TraceStep[];
  promptPreview: string;
  responsePreview: string;
}

export interface McpServerTool {
  id: string;
  serverName: string;
  toolName: string;
  description: string;
  parametersCount: number;
  approvalRequired: boolean;
  status: "connected" | "pending" | "error";
  executions: number;
}

export interface GuardrailRule {
  id: string;
  name: string;
  category: "pii_masking" | "prompt_injection" | "toxic_content" | "cost_circuit_breaker";
  enabled: boolean;
  action: "block" | "mask" | "alert";
  sensitivity: "low" | "medium" | "high";
  blockedCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Developer" | "Auditor";
  avatar: string;
  spendThisMonth: number;
  lastActive: string;
}

export interface GatewayOverviewStats {
  totalRequests: number;
  successfulRequests: number;
  successRate: number;
  avgLatencyMs: number;
  p95LatencyMs: number;
  totalTokens: number;
  totalExpenditure: number;
  costSavedByCache: number;
  cacheHitPercentage: number;
  activeProvidersCount: number;
}
