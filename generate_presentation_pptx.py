import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Colors
    BG_COLOR = RGBColor(8, 10, 18)         # #080A12 Dark Charcoal Canvas
    CARD_BG = RGBColor(16, 20, 34)         # #101422 Card background
    CARD_BORDER = RGBColor(40, 48, 72)     # #283048 Subtle border
    ACCENT_BLUE = RGBColor(41, 151, 255)   # #2997FF Electric Blue
    ACCENT_CYAN = RGBColor(0, 245, 255)    # #00F5FF Cyan
    ACCENT_EMERALD = RGBColor(16, 185, 129)# #10B981 Emerald
    ACCENT_AMBER = RGBColor(245, 158, 11)  # #F59E0B Amber
    ACCENT_PURPLE = RGBColor(168, 85, 247) # #A855F7 Purple
    ACCENT_ROSE = RGBColor(244, 63, 94)    # #F43F5E Rose Red
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(148, 163, 184)   # #94A3B8

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background() # No border
        return bg

    def add_header(slide, tag, title, subtitle):
        # Category Tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.7), Inches(0.35))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag.upper()
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = ACCENT_BLUE

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.6))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.35), Inches(11.7), Inches(0.45))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle
        p_sub.font.size = Pt(11)
        p_sub.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, title, body_bullets, border_color=CARD_BORDER, badge=None):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = border_color
        card.line.width = Pt(1.2)

        tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.18), width - Inches(0.4), height - Inches(0.35))
        tf = tb.text_frame
        tf.word_wrap = True

        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = TEXT_WHITE

        if badge:
            p_badge = tf.add_paragraph()
            p_badge.text = badge.upper()
            p_badge.font.size = Pt(9)
            p_badge.font.bold = True
            p_badge.font.color.rgb = ACCENT_BLUE

        for b in body_bullets:
            p = tf.add_paragraph()
            p.text = f"•  {b}"
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_MUTED
            p.space_before = Pt(4)

    # ==============================================================================
    # SLIDE 1: COVER SLIDE
    # ==============================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    # Title & Subtitle centered
    t_box = s1.shapes.add_textbox(Inches(1.5), Inches(2.0), Inches(10.33), Inches(3.2))
    tf1 = t_box.text_frame
    tf1.word_wrap = True

    p_badge = tf1.paragraphs[0]
    p_badge.text = "ENTERPRISE AI INFRASTRUCTURE  •  OPEN SOURCE PLATFORM"
    p_badge.font.size = Pt(12)
    p_badge.font.bold = True
    p_badge.font.color.rgb = ACCENT_BLUE
    p_badge.alignment = PP_ALIGN.CENTER

    p_main = tf1.add_paragraph()
    p_main.text = "BIFROST GATEWAY"
    p_main.font.size = Pt(50)
    p_main.font.bold = True
    p_main.font.color.rgb = TEXT_WHITE
    p_main.alignment = PP_ALIGN.CENTER
    p_main.space_before = Pt(12)

    p_tag = tf1.add_paragraph()
    p_tag.text = "One Gateway. Every AI. Infinite Possibilities."
    p_tag.font.size = Pt(22)
    p_tag.font.bold = True
    p_tag.font.color.rgb = ACCENT_CYAN
    p_tag.alignment = PP_ALIGN.CENTER
    p_tag.space_before = Pt(8)

    p_desc = tf1.add_paragraph()
    p_desc.text = "Unified Multi-Provider API  |  Intelligent Model Routing  |  pgvector Semantic Cache  |  18ms Failover  |  MCP Tool Gateway"
    p_desc.font.size = Pt(12)
    p_desc.font.color.rgb = TEXT_MUTED
    p_desc.alignment = PP_ALIGN.CENTER
    p_desc.space_before = Pt(16)

    # 4 Quick Badges at bottom
    badges = [
        ("< 4ms", "Internal Latency", ACCENT_BLUE),
        ("71%", "Cost Reduction", ACCENT_EMERALD),
        ("15+", "Providers Connected", ACCENT_PURPLE),
        ("99.99%", "Uptime SLA", ACCENT_AMBER)
    ]
    for i, (val, lbl, col) in enumerate(badges):
        x = Inches(1.8 + i * 2.5)
        box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.6), Inches(2.2), Inches(1.1))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.color.rgb = col
        box.line.width = Pt(1)

        btb = s1.shapes.add_textbox(x, Inches(5.65), Inches(2.2), Inches(1.0))
        btf = btb.text_frame
        bp0 = btf.paragraphs[0]
        bp0.text = val
        bp0.font.size = Pt(18)
        bp0.font.bold = True
        bp0.font.color.rgb = col
        bp0.alignment = PP_ALIGN.CENTER

        bp1 = btf.add_paragraph()
        bp1.text = lbl
        bp1.font.size = Pt(9.5)
        bp1.font.color.rgb = TEXT_MUTED
        bp1.alignment = PP_ALIGN.CENTER

    # ==============================================================================
    # SLIDE 2: THE PROBLEM (MULTI-PROVIDER SPRAWL)
    # ==============================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "Market Opportunity", "The Enterprise AI Infrastructure Crisis", "Why direct multi-provider API integration creates operational chaos, outages, and runaway costs.")

    add_card(s2, Inches(0.8), Inches(2.0), Inches(3.6), Inches(4.8), "Vendor Lock-in & Sprawl", [
        "Teams separately integrate OpenAI, Anthropic, Gemini, DeepSeek, and Bedrock.",
        "Inconsistent SDKs, divergent error codes, and unique streaming transcoders.",
        "Engineering time wasted rewriting client code whenever new models release.",
        "Zero single-pane-of-glass visibility across enterprise LLM traffic."
    ], ACCENT_ROSE, "Critical Friction")

    add_card(s2, Inches(4.8), Inches(2.0), Inches(3.6), Inches(4.8), "Unreliable Upstream Outages", [
        "Rate limits (HTTP 429) and provider outages (503/500) crash production apps.",
        "Developers build brittle in-app retries that cause destructive retry storms.",
        "Lack of dynamic failover between cloud regions and alternative providers.",
        "No circuit breaker protection against runaway looping agents."
    ], ACCENT_AMBER, "SLA Breaches")

    add_card(s2, Inches(8.8), Inches(2.0), Inches(3.6), Inches(4.8), "Runaway Token Spend", [
        "Identical and repetitive queries repeatedly billed at full frontier prices.",
        "Simple classification tasks routed to expensive flagship models.",
        "Absence of semantic caching and per-tenant budget kill-switches.",
        "API keys hardcoded across microservices with zero access control."
    ], ACCENT_PURPLE, "Budget Waste")

    # ==============================================================================
    # SLIDE 3: THE SOLUTION (BIFROST PLATFORM)
    # ==============================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "Product Vision", "The Bifrost Gateway Solution", "One unified high-throughput infrastructure platform connecting applications with all AI providers.")

    add_card(s3, Inches(0.8), Inches(2.0), Inches(5.6), Inches(2.3), "Unified Drop-in OpenAI API", [
        "Developers point any OpenAI client to Bifrost by updating base_url.",
        "Zero code rewrite required across Python, TypeScript, Java, and Go.",
        "Standardized REST, SSE streaming, and multimodal payload encoding."
    ], ACCENT_BLUE, "Standardized Contract")

    add_card(s3, Inches(6.8), Inches(2.0), Inches(5.6), Inches(2.3), "Intelligent Dynamic Router", [
        "Evaluates prompt intent, context window, latency SLAs, and cost ceilings.",
        "Automatically routes each request to the optimal model in < 3ms.",
        "Weighted load balancing and tag-based policy distribution."
    ], ACCENT_CYAN, "Sub-3ms Decision")

    add_card(s3, Inches(0.8), Inches(4.6), Inches(5.6), Inches(2.3), "pgvector Semantic Caching", [
        "Hybrid exact match and cosine similarity caching using PostgreSQL & Redis.",
        "Serves repeated or semantically equivalent queries in < 4ms at $0 cost.",
        "Slashes enterprise monthly token bills by 35% to 72%."
    ], ACCENT_EMERALD, "Zero-Cost Inference")

    add_card(s3, Inches(6.8), Inches(4.6), Inches(5.6), Inches(2.3), "18ms Disaster Recovery Failover", [
        "Integrated circuit breakers detect 429 rate limits or upstream 503 outages.",
        "Instantly falls back to secondary frontier models with 0 app downtime.",
        "Enterprise Virtual Keys with monthly spend caps and PII redaction."
    ], ACCENT_AMBER, "100% 200 OK Delivery")

    # ==============================================================================
    # SLIDE 4: 6-LAYER SYSTEM ARCHITECTURE
    # ==============================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "Engineering Design", "Complete 6-Layer System Architecture", "High-throughput Go data plane separated from the administrative control plane.")

    layers = [
        ("Layer 01", "Client & Ingress", "Web/Mobile Apps, Python/TS SDKs, Autonomous Agents, Cursor, LangChain", ACCENT_BLUE),
        ("Layer 02", "Gateway Edge & Security", "Go FastHTTP reverse proxy, Token-bucket rate limiting, PII/PCI redaction", ACCENT_CYAN),
        ("Layer 03", "Intelligence & Routing", "pgvector semantic distance lookup, Multi-objective router, Circuit breakers", ACCENT_PURPLE),
        ("Layer 04", "Provider Adapters", "OpenAI, Anthropic, Gemini, DeepSeek, Groq, Bedrock, Azure, Mistral, Ollama", ACCENT_EMERALD),
        ("Layer 05", "Distributed Data & Cache", "PostgreSQL 16 pgvector, Redis 7 cluster for rate limits, AES-256 key vault", ACCENT_AMBER),
        ("Layer 06", "Operations & Governance", "OpenTelemetry distributed W3C tracing, Prometheus /metrics, 14-screen Console", ACCENT_ROSE),
    ]

    for i, (l_num, l_title, l_desc, col) in enumerate(layers):
        y = Inches(2.0 + i * 0.85)
        bar = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.7), Inches(0.72))
        bar.fill.solid()
        bar.fill.fore_color.rgb = CARD_BG
        bar.line.color.rgb = col
        bar.line.width = Pt(1)

        tb = s4.shapes.add_textbox(Inches(1.0), y + Inches(0.08), Inches(11.3), Inches(0.55))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"{l_num}:  {l_title}"
        p.font.size = Pt(12.5)
        p.font.bold = True
        p.font.color.rgb = col

        p_desc = tf.add_paragraph()
        p_desc.text = l_desc
        p_desc.font.size = Pt(10)
        p_desc.font.color.rgb = TEXT_MUTED

    # ==============================================================================
    # SLIDE 5: SUPPORTED MULTI-PROVIDER ECOSYSTEM
    # ==============================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "Ecosystem Compatibility", "Universal Multi-Provider Coverage", "Seamlessly interconnect 15+ commercial frontier, open-weight, and on-premise inference engines.")

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

    for i, (name, models, lat, price, col) in enumerate(providers):
        row = i // 3
        col_idx = i % 3
        x = Inches(0.8 + col_idx * 4.0)
        y = Inches(2.0 + row * 1.6)

        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.7), Inches(1.4))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = col
        card.line.width = Pt(1)

        tb = s5.shapes.add_textbox(x + Inches(0.15), y + Inches(0.1), Inches(3.4), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        p0 = tf.paragraphs[0]
        p0.text = name
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = TEXT_WHITE

        p1 = tf.add_paragraph()
        p1.text = models
        p1.font.size = Pt(9.5)
        p1.font.color.rgb = TEXT_MUTED

        p2 = tf.add_paragraph()
        p2.text = f"Latency: {lat}  |  Pricing: {price}"
        p2.font.size = Pt(9)
        p2.font.bold = True
        p2.font.color.rgb = col

    # ==============================================================================
    # SLIDE 6: INTELLIGENT MODEL ROUTER (WITH GRAPH)
    # ==============================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "Traffic Optimization", "Intelligent Model Routing Engine", "Dynamic, multi-objective optimization routes requests to the ideal model in under 3 milliseconds.")

    add_card(s6, Inches(0.8), Inches(2.0), Inches(5.4), Inches(4.8), "Routing Policies & Strategies", [
        "Cost-Optimized Strategy: Enforces max $0.50/1M constraint, routing routine queries to DeepSeek V3 or Gemini Flash (-78% spend).",
        "Sub-50ms Latency Strategy: Routes conversational voice workloads to Groq LPU (38ms P99) for immediate speech output.",
        "High-Context Coding Strategy: Automatically sends complex AST synthesis and refactoring to Claude 3.5 Sonnet.",
        "Long-Form Document Strategy: Utilizes Gemini 1.5 Pro's native 2,000,000 token context window without brittle RAG chunking.",
        "Weighted Enterprise Balance: Splits volume across Azure OpenAI (50%), AWS Bedrock (30%), and Google Cloud (20%)."
    ], ACCENT_CYAN, "Policy Rules")

    # Add Chart 3 (Provider Distribution)
    if os.path.exists("assets/charts/provider_distribution.png"):
        s6.shapes.add_picture("assets/charts/provider_distribution.png", Inches(6.6), Inches(2.0), width=Inches(5.9))

    # ==============================================================================
    # SLIDE 7: RELIABILITY & AUTOMATIC FAILOVER (WITH GRAPH)
    # ==============================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "High Availability", "Zero-Downtime Automatic Failover (18ms)", "Circuit breakers and bounded fallback chains eliminate 99.9% of upstream AI downtime.")

    add_card(s7, Inches(0.8), Inches(2.0), Inches(5.4), Inches(4.8), "Disaster Recovery Invariants", [
        "Upstream Outage Interception: Catches HTTP 429 (Rate Limits) and 503/500 errors before applications notice.",
        "18ms Instant Fallback: Cascades to alternative provider (e.g. OpenAI -> Claude 3.5 -> Azure OpenAI) in under 20ms.",
        "Circuit Breaker State Machine: Trips to OPEN state after 3 consecutive failures with 30s cooldown timer.",
        "Bounded Retry Budget: Clamps retries to prevent catastrophic downstream retry storms.",
        "100% Client Availability: Returns HTTP 200 OK without surfacing provider downtime to users."
    ], ACCENT_ROSE, "Circuit Breakers")

    # Add Chart 4 (Waterfall Breakdown)
    if os.path.exists("assets/charts/waterfall_breakdown.png"):
        s7.shapes.add_picture("assets/charts/waterfall_breakdown.png", Inches(6.6), Inches(2.0), width=Inches(5.9))

    # ==============================================================================
    # SLIDE 8: COST INTELLIGENCE & SEMANTIC CACHING (WITH GRAPH)
    # ==============================================================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "Economic Efficiency", "Cost Intelligence & Semantic Vector Caching", "Cut enterprise AI API expenditures by 71% through intelligent memory and model tiered routing.")

    add_card(s8, Inches(0.8), Inches(2.0), Inches(5.4), Inches(4.8), "Semantic Cache Architecture", [
        "Cosine Distance Lookup: Embeds queries and queries pgvector IVFFlat index in under 4ms.",
        "Configurable Similarity Threshold: Dial between 0.80 (loose high-hit) to 0.99 (strict near-exact) precision.",
        "Zero-Cost Responses: 35% of repetitive queries answered with 0 upstream tokens billed.",
        "TTL & Invalidation: Automatic time-to-live policies and tenant-isolated namespace boundaries.",
        "Annualized ROI: Saves $120,000+ per year on high-volume 1.5M requests/month workloads."
    ], ACCENT_EMERALD, "Vector Memory")

    # Add Chart 1 (Cost Savings)
    if os.path.exists("assets/charts/cost_savings.png"):
        s8.shapes.add_picture("assets/charts/cost_savings.png", Inches(6.6), Inches(2.0), width=Inches(5.9))

    # ==============================================================================
    # SLIDE 9: LATENCY SPECTRUM & GROQ ACCELERATION (WITH GRAPH)
    # ==============================================================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "Performance Benchmarks", "Latency Spectrum & Real-Time Performance", "Sub-4ms internal gateway overhead with hardware-accelerated LPU streaming.")

    add_card(s9, Inches(0.8), Inches(2.0), Inches(5.4), Inches(4.8), "Benchmark Characteristics", [
        "Internal Overhead: < 4ms added latency for full authentication, caching, guardrails, and routing.",
        "Semantic Cache Speed: 3.8ms total roundtrip response for vector cache hits.",
        "Groq LPU Integration: 38ms time-to-first-token with 480 tokens/sec streaming throughput.",
        "P95 / P99 SLA: P50 latency 112ms, P99 guaranteed under 340ms across multi-cloud regions.",
        "SSE Streaming Transcoder: Converts divergent upstream streams to standardized SSE in < 1.2ms."
    ], ACCENT_BLUE, "Speed Metrics")

    # Add Chart 2 (Latency Distribution)
    if os.path.exists("assets/charts/latency_distribution.png"):
        s9.shapes.add_picture("assets/charts/latency_distribution.png", Inches(6.6), Inches(2.0), width=Inches(5.9))

    # ==============================================================================
    # SLIDE 10: ENTERPRISE SECURITY & GOVERNANCE
    # ==============================================================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(s10, "Data Protection", "Enterprise Security, Virtual Keys & Guardrails", "Never expose root provider secrets. Issue scoped virtual keys with automated budget kill-switches.")

    add_card(s10, Inches(0.8), Inches(2.0), Inches(5.6), Inches(2.3), "Tenant Virtual API Keys", [
        "Issue isolated virtual keys to specific teams, microservices, or frontend clients.",
        "Clamp monthly budgets (e.g. $2,500/mo) with automated reject upon ceiling.",
        "Restrict keys to specific allowed model whitelists and RPM rate limits."
    ], ACCENT_BLUE, "Token Scoping")

    add_card(s10, Inches(6.8), Inches(2.0), Inches(5.6), Inches(2.3), "Real-time DLP & PII Redaction", [
        "Sanitize credit card PANs, SSNs, and patient identifiers before packets leave VPC.",
        "Full HIPAA, GDPR, and PCI-DSS compliance conformance ready.",
        "Custom regex and embedding-based sensitive entity maskers."
    ], ACCENT_EMERALD, "Privacy Shield")

    add_card(s10, Inches(0.8), Inches(4.6), Inches(5.6), Inches(2.3), "Prompt Injection Defense", [
        "Block adversarial jailbreak attempts ('Ignore all previous instructions...').",
        "Detect toxic outputs and hate speech with real-time classification gates.",
        "Cost velocity spike breaker ($50/min cap) prevents infinite agent loops."
    ], ACCENT_ROSE, "Threat Mitigation")

    add_card(s10, Inches(6.8), Inches(4.6), Inches(5.6), Inches(2.3), "SOC2 Immutable Audit Trails", [
        "Every request, key rotation, policy change, and PII redaction event logged.",
        "Full W3C trace context propagation across every microservice hop.",
        "Export audit records to Splunk, Datadog, or AWS S3 cold storage."
    ], ACCENT_AMBER, "Audit Compliance")

    # ==============================================================================
    # SLIDE 11: MCP & AUTONOMOUS AGENT GATEWAY
    # ==============================================================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11)
    add_header(s11, "Autonomous Agents", "Model Context Protocol (MCP) Tool Bridge", "Governed tool execution and human-in-the-loop approval gates for agentic workflows.")

    add_card(s11, Inches(0.8), Inches(2.0), Inches(3.6), Inches(4.8), "Agentic Integrations", [
        "Direct bridge for LangChain, CrewAI, AutoGen, Cursor, and Claude Code.",
        "Agents connect to Bifrost via standardized OpenAI tool-calling semantics.",
        "Eliminates unmonitored raw shell or direct production database access.",
        "Detailed tool call latency, token usage, and error metrics recorded."
    ], ACCENT_PURPLE, "Agent Clients")

    add_card(s11, Inches(4.8), Inches(2.0), Inches(3.6), Inches(4.8), "Registered MCP Tools", [
        "PostgreSQL Enterprise MCP: Read-only parameterized queries with limit clamps.",
        "GitHub Org MCP: Secure PR creation and issue tracking with branch protection.",
        "Slack Alerts MCP: Incident escalation dispatch to #ai-ops channels.",
        "Brave Web Search MCP: Real-time web index search with content extraction."
    ], ACCENT_CYAN, "Enterprise Tools")

    add_card(s11, Inches(8.8), Inches(2.0), Inches(3.6), Inches(4.8), "Approval Gates & Governance", [
        "Granular Execution Policies: Toggle tools between 'Auto-Approved' vs 'Approval Required'.",
        "Human-in-the-Loop: High-risk tools (e.g. create PR, send alert) require explicit admin sign-off.",
        "Parameter Validation: JSON schema enforcement blocks SQL injection attempts.",
        "Complete Audit Playback: Replay agent execution steps for incident forensics."
    ], ACCENT_AMBER, "Human Gates")

    # ==============================================================================
    # SLIDE 12: DEPLOYMENT, CONSOLE & ROADMAP
    # ==============================================================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12)
    add_header(s12, "Production Ready", "Deployment, Administration & Open-Source Roadmap", "Enterprise self-hosting with Docker, Kubernetes, and 14-screen admin console.")

    add_card(s12, Inches(0.8), Inches(2.0), Inches(5.6), Inches(2.3), "Self-Hosted Deployment Stack", [
        "Docker Compose: Single command bootstrap with Redis and pgvector.",
        "Kubernetes & Helm: Multi-replica deployment, mTLS ingress, and HPA auto-scaling.",
        "22MB Static Go Binary: Zero external runtime dependencies for maximum security."
    ], ACCENT_BLUE, "Turnkey Deployment")

    add_card(s12, Inches(6.8), Inches(2.0), Inches(5.6), Inches(2.3), "14-Screen Admin Console", [
        "Built-in Next.js 15 dark-mode control plane at /dashboard.",
        "Live waterfall trace inspector with sub-millisecond execution spans.",
        "Configurable semantic similarity thresholds and one-click cache purges."
    ], ACCENT_CYAN, "Control Plane")

    add_card(s12, Inches(0.8), Inches(4.6), Inches(5.6), Inches(2.3), "Proven Economic ROI", [
        "71% reduction in monthly API spend ($10,080/mo saved on 1.5M requests).",
        "Zero vendor lock-in allows negotiating volume discounts across providers.",
        "SLA protection prevents catastrophic customer churn during provider outages."
    ], ACCENT_EMERALD, "Executive ROI")

    add_card(s12, Inches(6.8), Inches(4.6), Inches(5.6), Inches(2.3), "Open Source & Next Steps", [
        "Released under Apache 2.0 open-source license on GitHub.",
        "Explore live interactive playground at http://localhost:3000/playground.",
        "GitHub Repository: https://github.com/Ranjeet7680/BIFROST-GATEWAY."
    ], ACCENT_AMBER, "Get Started Today")

    output_path = "Bifrost_Gateway_Enterprise_Pitch.pptx"
    prs.save(output_path)
    print(f"PowerPoint Presentation successfully saved to {output_path}")

if __name__ == "__main__":
    create_deck()
