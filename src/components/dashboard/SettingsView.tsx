"use client";

import React, { useState } from "react";
import {
  Settings,
  Server,
  Database,
  Activity,
  Download,
  Check,
  Save,
  Globe,
  Radio,
} from "lucide-react";

export function SettingsView() {
  const [gatewayPort, setGatewayPort] = useState("8080");
  const [redisUri, setRedisUri] = useState("redis://:secret@cluster-redis.internal:6379/0");
  const [otelEndpoint, setOtelEndpoint] = useState("http://otel-collector.observability:4317");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportYaml = () => {
    const yamlConfig = `# Bifrost Gateway Production Configuration
version: "2.4"
gateway:
  port: ${gatewayPort}
  log_level: "info"
  tls:
    enabled: true
    cert_file: "/etc/ssl/bifrost.crt"
    key_file: "/etc/ssl/bifrost.key"

cache:
  backend: "redis"
  redis_url: "${redisUri}"
  semantic:
    enabled: true
    vector_dimension: 1536
    similarity_threshold: 0.92

observability:
  prometheus:
    enabled: true
    port: 9090
  opentelemetry:
    endpoint: "${otelEndpoint}"
    protocol: "grpc"
`;
    const blob = new Blob([yamlConfig], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bifrost-gateway.config.yaml";
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Gateway Cluster Configuration
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Core daemon networking, Redis state synchronization, and OpenTelemetry collector bindings.
          </p>
        </div>

        <button
          onClick={handleExportYaml}
          className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white text-xs font-mono border border-white/10 flex items-center gap-1.5 w-fit"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export YAML Config</span>
        </button>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981] flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Configuration updated &amp; hot-reloaded across gateway pods.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-[#2997FF]" />
            Data Plane Networking
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-white/60 block mb-1">HTTP / SSE Port</label>
              <input
                type="text"
                value={gatewayPort}
                onChange={(e) => setGatewayPort(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
              />
            </div>
            <div>
              <label className="text-white/60 block mb-1">Worker Goroutines Pool</label>
              <input
                type="text"
                defaultValue="4096 (Auto-tuning)"
                readOnly
                className="w-full px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5 text-white/50 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#10B981]" />
            Distributed State &amp; Cache Store
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-white/60 block mb-1">Redis Cluster URI</label>
              <input
                type="text"
                value={redisUri}
                onChange={(e) => setRedisUri(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
              />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#A855F7]" />
            Observability &amp; Metrics Export
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-white/60 block mb-1">OpenTelemetry Collector gRPC Endpoint</label>
              <input
                type="text"
                value={otelEndpoint}
                onChange={(e) => setOtelEndpoint(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white focus:outline-none focus:border-[#2997FF]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2997FF] to-[#0071E3] text-white text-xs font-semibold shadow-glow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save &amp; Hot Reload</span>
          </button>
        </div>
      </form>
    </div>
  );
}
