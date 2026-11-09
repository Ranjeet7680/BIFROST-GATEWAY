import type { Metadata } from "next";
import "./globals.css";
import { GatewayProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Bifrost Gateway — Next-Gen Open Source AI Gateway Platform",
  description:
    "One unified API for OpenAI, Anthropic, Gemini, Bedrock, DeepSeek, Groq, and Ollama. Featuring intelligent routing, automatic failover, semantic caching, and enterprise governance.",
  keywords: [
    "AI Gateway",
    "LLM Router",
    "Open Source",
    "Multi-Provider AI",
    "Semantic Cache",
    "MCP Gateway",
    "Model Context Protocol",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#030407] text-[#ededed] antialiased selection:bg-[#2997FF]/30 selection:text-white">
        <GatewayProvider>{children}</GatewayProvider>
      </body>
    </html>
  );
}
