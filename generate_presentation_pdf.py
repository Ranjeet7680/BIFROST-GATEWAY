import os
from reportlab.pdfgen import canvas
from reportlab.lib import colors

# 16:9 Landscape Dimensions: 13.333 x 7.5 inches in points
PAGE_WIDTH = 13.333 * 72
PAGE_HEIGHT = 7.5 * 72

def create_pdf_presentation():
    pdf_filename = "Bifrost_Gateway_Enterprise_Pitch.pdf"
    c = canvas.Canvas(pdf_filename, pagesize=(PAGE_WIDTH, PAGE_HEIGHT))

    # Theme Colors
    BG_IMAGE = "assets/presentation_bg.png"
    BG_COLOR = colors.HexColor("#070910")
    CARD_BG = colors.HexColor("#0F1424")
    ACCENT_BLUE = colors.HexColor("#2997FF")
    ACCENT_CYAN = colors.HexColor("#00F5FF")
    ACCENT_EMERALD = colors.HexColor("#10B981")
    ACCENT_AMBER = colors.HexColor("#F59E0B")
    ACCENT_PURPLE = colors.HexColor("#A855F7")
    ACCENT_ROSE = colors.HexColor("#F43F5E")
    TEXT_WHITE = colors.HexColor("#FFFFFF")
    TEXT_SILVER = colors.HexColor("#E2E8F0")
    TEXT_MUTED = colors.HexColor("#94A3B8")
    FOOTER_TEXT = colors.HexColor("#64748B")

    def draw_background(slide_num):
        if os.path.exists(BG_IMAGE):
            c.drawImage(BG_IMAGE, 0, 0, width=PAGE_WIDTH, height=PAGE_HEIGHT)
        else:
            c.setFillColor(BG_COLOR)
            c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)

        # Footer on slides 2-12 (No harsh divider line)
        if slide_num > 1:
            c.setFillColor(FOOTER_TEXT)
            c.setFont("Helvetica", 8.5)
            c.drawString(50, 22, "BIFROST GATEWAY  •  ENTERPRISE AI INFRASTRUCTURE PLATFORM")
            c.drawRightString(PAGE_WIDTH - 50, 22, f"SLIDE {slide_num:02d} / 12")

    def draw_header(tag, title, subtitle):
        # Category tag
        c.setFillColor(ACCENT_CYAN)
        c.setFont("Helvetica-Bold", 9.5)
        c.drawString(50, PAGE_HEIGHT - 42, tag.upper())

        # Main Title
        c.setFillColor(TEXT_WHITE)
        c.setFont("Helvetica-Bold", 22)
        c.drawString(50, PAGE_HEIGHT - 70, title)

        # Subtitle
        c.setFillColor(TEXT_MUTED)
        c.setFont("Helvetica", 11)
        c.drawString(50, PAGE_HEIGHT - 90, subtitle)

    def draw_borderless_card(x, y, w, h, title, items, tag=None, tag_color=ACCENT_BLUE):
        # Card Background surface with zero borders/lines
        c.setFillColor(CARD_BG)
        c.roundRect(x, y, w, h, 10, fill=1, stroke=0)

        current_y = y + h - 24

        if tag:
            c.setFillColor(tag_color)
            c.setFont("Helvetica-Bold", 8.5)
            c.drawString(x + 18, current_y, tag.upper())
            current_y -= 16

        # Card Title
        c.setFillColor(TEXT_WHITE)
        c.setFont("Helvetica-Bold", 13)
        c.drawString(x + 18, current_y, title)
        current_y -= 22

        # Card Items (no bullet dots, clean line spacing)
        c.setFillColor(TEXT_SILVER)
        c.setFont("Helvetica", 9.5)
        for item in items:
            words = item.split(" ")
            line = ""
            for word in words:
                if c.stringWidth(line + word + " ", "Helvetica", 9.5) < w - 36:
                    line += word + " "
                else:
                    c.drawString(x + 18, current_y, line.strip())
                    current_y -= 13
                    line = word + " "
            if line:
                c.drawString(x + 18, current_y, line.strip())
                current_y -= 16

    # ==============================================================================
    # SLIDE 1: COVER
    # ==============================================================================
    draw_background(1)

    c.setFillColor(ACCENT_BLUE)
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 175, "ENTERPRISE AI INFRASTRUCTURE  •  OPEN SOURCE PLATFORM")

    c.setFillColor(TEXT_WHITE)
    c.setFont("Helvetica-Bold", 46)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 238, "BIFROST GATEWAY")

    c.setFillColor(ACCENT_CYAN)
    c.setFont("Helvetica-Bold", 21)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 276, "One Gateway. Every AI. Infinite Possibilities.")

    c.setFillColor(TEXT_MUTED)
    c.setFont("Helvetica", 11.5)
    c.drawCentredString(PAGE_WIDTH / 2, PAGE_HEIGHT - 312, "Unified Multi-Provider API  •  Intelligent Model Routing  •  pgvector Semantic Cache  •  18ms Failover  •  MCP Tool Gateway")

    # 4 Sleek borderless metric pills
    badges = [
        ("< 4ms", "Internal Latency", ACCENT_BLUE),
        ("71%", "Cost Reduction", ACCENT_EMERALD),
        ("15+", "Providers Connected", ACCENT_PURPLE),
        ("99.99%", "Uptime SLA", ACCENT_AMBER)
    ]
    for i, (val, lbl, col) in enumerate(badges):
        bx = 135 + i * 185
        by = 95
        c.setFillColor(CARD_BG)
        c.roundRect(bx, by, 160, 80, 8, fill=1, stroke=0) # No stroke

        c.setFillColor(col)
        c.setFont("Helvetica-Bold", 21)
        c.drawCentredString(bx + 80, by + 44, val)

        c.setFillColor(TEXT_MUTED)
        c.setFont("Helvetica", 9.5)
        c.drawCentredString(bx + 80, by + 20, lbl)

    c.showPage()

    # ==============================================================================
    # SLIDE 2: THE PROBLEM (MULTI-PROVIDER SPRAWL)
    # ==============================================================================
    draw_background(2)
    draw_header("Market Opportunity", "The Enterprise AI Infrastructure Crisis", "Why direct multi-provider API integration creates operational chaos, outages, and runaway costs.")

    card_w = (PAGE_WIDTH - 160) / 3
    card_h = PAGE_HEIGHT - 170

    draw_borderless_card(50, 60, card_w, card_h, "Vendor Lock-in & Sprawl", [
        "Teams separately integrate OpenAI, Anthropic, Gemini, DeepSeek, and Bedrock.",
        "Inconsistent SDKs, divergent error codes, and unique streaming transcoders.",
        "Engineering time wasted rewriting client code whenever new models release.",
        "Zero single-pane-of-glass visibility across enterprise LLM traffic."
    ], tag="Critical Friction", tag_color=ACCENT_ROSE)

    draw_borderless_card(50 + card_w + 30, 60, card_w, card_h, "Unreliable Upstream Outages", [
        "Rate limits (HTTP 429) and provider outages (503/500) crash production apps.",
        "Developers build brittle in-app retries that cause destructive retry storms.",
        "Lack of dynamic failover between cloud regions and alternative providers.",
        "No circuit breaker protection against runaway looping agents."
    ], tag="SLA Breaches", tag_color=ACCENT_AMBER)

    draw_borderless_card(50 + (card_w + 30) * 2, 60, card_w, card_h, "Runaway Token Spend", [
        "Identical and repetitive queries repeatedly billed at full frontier prices.",
        "Simple classification tasks routed to expensive flagship models.",
        "Absence of semantic caching and per-tenant budget kill-switches.",
        "API keys hardcoded across microservices with zero access control."
    ], tag="Budget Waste", tag_color=ACCENT_PURPLE)

    c.showPage()

    # ==============================================================================
    # SLIDE 3: THE SOLUTION (BIFROST PLATFORM)
    # ==============================================================================
    draw_background(3)
    draw_header("Product Vision", "The Bifrost Gateway Solution", "One unified high-throughput infrastructure platform connecting applications with all AI providers.")

    half_w = (PAGE_WIDTH - 130) / 2
    half_h = (PAGE_HEIGHT - 210) / 2

    draw_borderless_card(50, 60 + half_h + 20, half_w, half_h, "Unified Drop-in OpenAI API", [
        "Developers point any OpenAI client to Bifrost by updating base_url.",
        "Zero code rewrite required across Python, TypeScript, Java, and Go.",
        "Standardized REST, SSE streaming, and multimodal payload encoding."
    ], tag="Standardized Contract", tag_color=ACCENT_BLUE)

    draw_borderless_card(50 + half_w + 30, 60 + half_h + 20, half_w, half_h, "Intelligent Dynamic Router", [
        "Evaluates prompt intent, context window, latency SLAs, and cost ceilings.",
        "Automatically routes each request to the optimal model in < 3ms.",
        "Weighted load balancing and tag-based policy distribution."
    ], tag="Sub-3ms Decision", tag_color=ACCENT_CYAN)

    draw_borderless_card(50, 60, half_w, half_h, "pgvector Semantic Caching", [
        "Hybrid exact match and cosine similarity caching using PostgreSQL & Redis.",
        "Serves repeated or semantically equivalent queries in < 4ms at $0 cost.",
        "Slashes enterprise monthly token bills by 35% to 72%."
    ], tag="Zero-Cost Inference", tag_color=ACCENT_EMERALD)

    draw_borderless_card(50 + half_w + 30, 60, half_w, half_h, "18ms Disaster Recovery Failover", [
        "Integrated circuit breakers detect 429 rate limits or upstream 503 outages.",
        "Instantly falls back to secondary frontier models with 0 app downtime.",
        "Enterprise Virtual Keys with monthly spend caps and PII redaction."
    ], tag="100% 200 OK Delivery", tag_color=ACCENT_AMBER)

    c.showPage()

    # ==============================================================================
    # SLIDE 4: 6-LAYER SYSTEM ARCHITECTURE
    # ==============================================================================
    draw_background(4)
    draw_header("Engineering Design", "Complete 6-Layer System Architecture", "High-throughput Go data plane separated from the administrative control plane.")

    layers = [
        ("LAYER 01", "Client & Ingress Layer", "Web/Mobile Apps, Python/TS SDKs, Autonomous Agents, Cursor, LangChain", ACCENT_BLUE),
        ("LAYER 02", "Gateway Edge & Security", "Go FastHTTP reverse proxy, Token-bucket rate limiting, PII/PCI redaction", ACCENT_CYAN),
        ("LAYER 03", "Intelligence & Routing Engine", "pgvector semantic distance lookup, Multi-objective router, Circuit breakers", ACCENT_PURPLE),
        ("LAYER 04", "Provider Adapter Matrix", "OpenAI, Anthropic, Gemini, DeepSeek, Groq, Bedrock, Azure, Mistral, Ollama", ACCENT_EMERALD),
        ("LAYER 05", "Distributed Data & Cache", "PostgreSQL 16 pgvector, Redis 7 cluster for rate limits, AES-256 key vault", ACCENT_AMBER),
        ("LAYER 06", "Operations & Governance", "OpenTelemetry distributed W3C tracing, Prometheus /metrics, 14-screen Console", ACCENT_ROSE),
    ]

    for i, (l_tag, l_title, l_desc, col) in enumerate(layers):
        y = PAGE_HEIGHT - 165 - i * 62
        c.setFillColor(CARD_BG)
        c.roundRect(50, y, PAGE_WIDTH - 100, 52, 8, fill=1, stroke=0) # No stroke line

        c.setFillColor(col)
        c.setFont("Helvetica-Bold", 10.5)
        c.drawString(68, y + 28, f"{l_tag}   {l_title}")

        c.setFillColor(TEXT_SILVER)
        c.setFont("Helvetica", 9)
        c.drawString(68, y + 12, l_desc)

    c.showPage()

    # ==============================================================================
    # SLIDE 5: SUPPORTED MULTI-PROVIDER ECOSYSTEM
    # ==============================================================================
    draw_background(5)
    draw_header("Ecosystem Compatibility", "Universal Multi-Provider Coverage", "Seamlessly interconnect 15+ commercial frontier, open-weight, and on-premise inference engines.")

    providers = [
        ("OpenAI", "GPT-4o, GPT-4o-mini, o1, o3-mini", "142ms", "$2.50 / $10.00", ACCENT_EMERALD),
        ("Anthropic Claude", "Claude 3.5 Sonnet, 3.5 Haiku, Opus", "168ms", "$3.00 / $15.00", ACCENT_AMBER),
        ("Google Gemini", "Gemini 1.5 Pro (2M Context), 2.0 Flash", "118ms", "$1.25 / $5.00", ACCENT_BLUE),
        ("DeepSeek", "DeepSeek R1 (Reasoning), DeepSeek V3", "95ms", "$0.14 / $0.28", ACCENT_CYAN),
        ("Groq LPU", "Llama 3.3 70B (480 tokens/sec)", "38ms", "$0.59 / $0.79", ACCENT_ROSE),
        ("AWS Bedrock", "Claude 3.5, Titan, Command R+", "185ms", "Enterprise IAM", ACCENT_PURPLE),
        ("Azure OpenAI", "GPT-4o Enterprise Private Endpoint", "154ms", "HIPAA BAA", ACCENT_BLUE),
        ("Mistral AI", "Mistral Large 2, Codestral 2501", "122ms", "EU Sovereign", ACCENT_AMBER),
        ("Ollama Local", "Llama 3.2, Qwen 2.5 (Air-Gapped)", "62ms", "$0.00 (Self-Hosted)", ACCENT_EMERALD),
    ]

    p_card_w = (PAGE_WIDTH - 140) / 3
    p_card_h = 105

    for i, (name, models_str, lat, price, col) in enumerate(providers):
        row = i // 3
        col_idx = i % 3
        px = 50 + col_idx * (p_card_w + 20)
        py = PAGE_HEIGHT - 215 - row * (p_card_h + 15)

        c.setFillColor(CARD_BG)
        c.roundRect(px, py, p_card_w, p_card_h, 8, fill=1, stroke=0) # No stroke line

        c.setFillColor(TEXT_WHITE)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(px + 16, py + p_card_h - 24, name)

        c.setFillColor(TEXT_SILVER)
        c.setFont("Helvetica", 9)
        c.drawString(px + 16, py + p_card_h - 44, models_str)

        c.setFillColor(col)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawString(px + 16, py + 16, f"Latency: {lat}   •   Pricing: {price}")

    c.showPage()

    # ==============================================================================
    # SLIDE 6: INTELLIGENT ROUTER (WITH GRAPH)
    # ==============================================================================
    draw_background(6)
    draw_header("Traffic Optimization", "Intelligent Model Routing Engine", "Dynamic, multi-objective optimization routes requests to the ideal model in under 3 milliseconds.")

    draw_borderless_card(50, 60, 420, PAGE_HEIGHT - 170, "Routing Policies & Strategies", [
        "Cost-Optimized Strategy: Enforces max $0.50/1M constraint, routing routine queries to DeepSeek V3 or Gemini Flash (-78% spend).",
        "Sub-50ms Latency Strategy: Routes conversational voice workloads to Groq LPU (38ms P99) for immediate speech output.",
        "High-Context Coding Strategy: Automatically sends complex AST synthesis and refactoring to Claude 3.5 Sonnet.",
        "Long-Form Document Strategy: Utilizes Gemini 1.5 Pro's native 2M token context window without brittle chunking.",
        "Weighted Enterprise Balance: Splits volume across Azure OpenAI (50%), Bedrock (30%), and Google Cloud (20%)."
    ], tag="Dynamic Multi-Objective", tag_color=ACCENT_CYAN)

    if os.path.exists("assets/charts/provider_distribution.png"):
        c.drawImage("assets/charts/provider_distribution.png", 500, 60, width=410, height=PAGE_HEIGHT - 170)

    c.showPage()

    # ==============================================================================
    # SLIDE 7: RELIABILITY & AUTOMATIC FAILOVER (WITH GRAPH)
    # ==============================================================================
    draw_background(7)
    draw_header("High Availability", "Zero-Downtime Automatic Failover (18ms)", "Circuit breakers and bounded fallback chains eliminate 99.9% of upstream AI downtime.")

    draw_borderless_card(50, 60, 420, PAGE_HEIGHT - 170, "Disaster Recovery Invariants", [
        "Upstream Outage Interception: Catches HTTP 429 (Rate Limits) and 503/500 errors before applications notice.",
        "18ms Instant Fallback: Cascades to alternative provider (e.g. OpenAI -> Claude 3.5 -> Azure OpenAI) in under 20ms.",
        "Circuit Breaker State Machine: Trips to OPEN state after 3 consecutive failures with 30s cooldown timer.",
        "Bounded Retry Budget: Clamps retries to prevent catastrophic downstream retry storms.",
        "100% Client Availability: Returns HTTP 200 OK without surfacing provider downtime to users."
    ], tag="Circuit Breaker Protection", tag_color=ACCENT_ROSE)

    if os.path.exists("assets/charts/waterfall_breakdown.png"):
        c.drawImage("assets/charts/waterfall_breakdown.png", 500, 60, width=410, height=PAGE_HEIGHT - 170)

    c.showPage()

    # ==============================================================================
    # SLIDE 8: COST INTELLIGENCE & SEMANTIC CACHING (WITH GRAPH)
    # ==============================================================================
    draw_background(8)
    draw_header("Economic Efficiency", "Cost Intelligence & Semantic Vector Caching", "Cut enterprise AI API expenditures by 71% through intelligent memory and model tiered routing.")

    draw_borderless_card(50, 60, 420, PAGE_HEIGHT - 170, "Semantic Cache Architecture", [
        "Cosine Distance Lookup: Embeds queries and queries pgvector IVFFlat index in under 4ms.",
        "Configurable Similarity Threshold: Dial between 0.80 (loose high-hit) to 0.99 (strict near-exact) precision.",
        "Zero-Cost Responses: 35% of repetitive queries answered with 0 upstream tokens billed.",
        "TTL & Invalidation: Automatic time-to-live policies and tenant-isolated namespace boundaries.",
        "Annualized ROI: Saves $120,000+ per year on high-volume 1.5M requests/month workloads."
    ], tag="Vector Memory Layer", tag_color=ACCENT_EMERALD)

    if os.path.exists("assets/charts/cost_savings.png"):
        c.drawImage("assets/charts/cost_savings.png", 500, 60, width=410, height=PAGE_HEIGHT - 170)

    c.showPage()

    # ==============================================================================
    # SLIDE 9: LATENCY BENCHMARKS & REAL-TIME SPEED (WITH GRAPH)
    # ==============================================================================
    draw_background(9)
    draw_header("Performance Benchmarks", "Latency Spectrum & Real-Time Performance", "Sub-4ms internal gateway overhead with hardware-accelerated LPU streaming.")

    draw_borderless_card(50, 60, 420, PAGE_HEIGHT - 170, "Benchmark Characteristics", [
        "Internal Overhead: < 4ms added latency for full authentication, caching, guardrails, and routing.",
        "Semantic Cache Speed: 3.8ms total roundtrip response for vector cache hits.",
        "Groq LPU Integration: 38ms time-to-first-token with 480 tokens/sec streaming throughput.",
        "P95 / P99 SLA: P50 latency 112ms, P99 guaranteed under 340ms across multi-cloud regions.",
        "SSE Streaming Transcoder: Converts divergent upstream streams to standardized SSE in < 1.2ms."
    ], tag="Sub-4ms Architecture", tag_color=ACCENT_BLUE)

    if os.path.exists("assets/charts/latency_distribution.png"):
        c.drawImage("assets/charts/latency_distribution.png", 500, 60, width=410, height=PAGE_HEIGHT - 170)

    c.showPage()

    # ==============================================================================
    # SLIDE 10: ENTERPRISE SECURITY & GOVERNANCE
    # ==============================================================================
    draw_background(10)
    draw_header("Data Protection", "Enterprise Security, Virtual Keys & Guardrails", "Never expose root provider secrets. Issue scoped virtual keys with automated budget kill-switches.")

    draw_borderless_card(50, 60 + half_h + 20, half_w, half_h, "Tenant Virtual API Keys", [
        "Issue isolated virtual keys to specific teams, microservices, or frontend clients.",
        "Clamp monthly budgets (e.g. $2,500/mo) with automated reject upon ceiling.",
        "Restrict keys to specific allowed model whitelists and RPM rate limits."
    ], tag="Token Scoping", tag_color=ACCENT_BLUE)

    draw_borderless_card(50 + half_w + 30, 60 + half_h + 20, half_w, half_h, "Real-time DLP & PII Redaction", [
        "Sanitize credit card PANs, SSNs, and patient identifiers before packets leave VPC.",
        "Full HIPAA, GDPR, and PCI-DSS compliance conformance ready.",
        "Custom regex and embedding-based sensitive entity maskers."
    ], tag="Privacy Shield", tag_color=ACCENT_EMERALD)

    draw_borderless_card(50, 60, half_w, half_h, "Prompt Injection Defense", [
        "Block adversarial jailbreak attempts ('Ignore all previous instructions...').",
        "Detect toxic outputs and hate speech with real-time classification gates.",
        "Cost velocity spike breaker ($50/min cap) prevents infinite agent loops."
    ], tag="Threat Mitigation", tag_color=ACCENT_ROSE)

    draw_borderless_card(50 + half_w + 30, 60, half_w, half_h, "SOC2 Immutable Audit Trails", [
        "Every request, key rotation, policy change, and PII redaction event logged.",
        "Full W3C trace context propagation across every microservice hop.",
        "Export audit records to Splunk, Datadog, or AWS S3 cold storage."
    ], tag="Audit Compliance", tag_color=ACCENT_AMBER)

    c.showPage()

    # ==============================================================================
    # SLIDE 11: MCP & AUTONOMOUS AGENT GATEWAY
    # ==============================================================================
    draw_background(11)
    draw_header("Autonomous Agents", "Model Context Protocol (MCP) Tool Bridge", "Governed tool execution and human-in-the-loop approval gates for agentic workflows.")

    draw_borderless_card(50, 60, card_w, card_h, "Agentic Integrations", [
        "Direct bridge for LangChain, CrewAI, AutoGen, Cursor, and Claude Code.",
        "Agents connect to Bifrost via standardized OpenAI tool-calling semantics.",
        "Eliminates unmonitored raw shell or direct production database access.",
        "Detailed tool call latency, token usage, and error metrics recorded."
    ], tag="Agent Clients", tag_color=ACCENT_PURPLE)

    draw_borderless_card(50 + card_w + 30, 60, card_w, card_h, "Registered MCP Tools", [
        "PostgreSQL Enterprise MCP: Read-only parameterized queries with limit clamps.",
        "GitHub Org MCP: Secure PR creation and issue tracking with branch protection.",
        "Slack Alerts MCP: Incident escalation dispatch to #ai-ops channels.",
        "Brave Web Search MCP: Real-time web index search with content extraction."
    ], tag="Enterprise Tools", tag_color=ACCENT_CYAN)

    draw_borderless_card(50 + (card_w + 30) * 2, 60, card_w, card_h, "Approval Gates & Governance", [
        "Granular Execution Policies: Toggle tools between 'Auto-Approved' vs 'Approval Required'.",
        "Human-in-the-Loop: High-risk tools (e.g. create PR, send alert) require explicit admin sign-off.",
        "Parameter Validation: JSON schema enforcement blocks SQL injection attempts.",
        "Complete Audit Playback: Replay agent execution steps for incident forensics."
    ], tag="Human Gates", tag_color=ACCENT_AMBER)

    c.showPage()

    # ==============================================================================
    # SLIDE 12: DEPLOYMENT, ROADMAP & CONCLUSION
    # ==============================================================================
    draw_background(12)
    draw_header("Production Ready", "Deployment, Administration & Open-Source Roadmap", "Enterprise self-hosting with Docker, Kubernetes, and 14-screen admin console.")

    draw_borderless_card(50, 60 + half_h + 20, half_w, half_h, "Self-Hosted Deployment Stack", [
        "Docker Compose: Single command bootstrap with Redis and pgvector.",
        "Kubernetes & Helm: Multi-replica deployment, mTLS ingress, and HPA auto-scaling.",
        "22MB Static Go Binary: Zero external runtime dependencies for maximum security."
    ], tag="Turnkey Deployment", tag_color=ACCENT_BLUE)

    draw_borderless_card(50 + half_w + 30, 60 + half_h + 20, half_w, half_h, "14-Screen Admin Console", [
        "Built-in Next.js 15 dark-mode control plane at /dashboard.",
        "Live waterfall trace inspector with sub-millisecond execution spans.",
        "Configurable semantic similarity thresholds and one-click cache purges."
    ], tag="Control Plane", tag_color=ACCENT_CYAN)

    draw_borderless_card(50, 60, half_w, half_h, "Proven Economic ROI", [
        "71% reduction in monthly API spend ($10,080/mo saved on 1.5M requests).",
        "Zero vendor lock-in allows negotiating volume discounts across providers.",
        "SLA protection prevents catastrophic customer churn during provider outages."
    ], tag="Executive ROI", tag_color=ACCENT_EMERALD)

    draw_borderless_card(50 + half_w + 30, 60, half_w, half_h, "Open Source & Next Steps", [
        "Released under Apache 2.0 open-source license on GitHub.",
        "Explore live interactive playground at http://localhost:3000/playground.",
        "GitHub Repository: https://github.com/Ranjeet7680/BIFROST-GATEWAY."
    ], tag="Get Started Today", tag_color=ACCENT_AMBER)

    c.showPage()

    c.save()
    print(f"PDF Presentation successfully generated and saved to {pdf_filename}")

if __name__ == "__main__":
    create_pdf_presentation()
