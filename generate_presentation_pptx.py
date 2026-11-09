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

    # Theme Colors - Apple Keynote Dark Palette
    CARD_BG = RGBColor(15, 20, 36)          # Sleek deep obsidian card fill
    CARD_BG_HOVER = RGBColor(19, 26, 46)    # Elevated card fill
    ACCENT_BLUE = RGBColor(41, 151, 255)    # #2997FF Electric Blue
    ACCENT_CYAN = RGBColor(0, 245, 255)     # #00F5FF Cyan
    ACCENT_EMERALD = RGBColor(16, 185, 129) # #10B981 Emerald
    ACCENT_AMBER = RGBColor(245, 158, 11)   # #F59E0B Amber
    ACCENT_PURPLE = RGBColor(168, 85, 247)  # #A855F7 Purple
    ACCENT_ROSE = RGBColor(244, 63, 94)     # #F43F5E Rose Red
    TEXT_WHITE = RGBColor(255, 255, 255)    # Primary Title / Heading
    TEXT_SILVER = RGBColor(226, 232, 240)   # Body Text
    TEXT_MUTED = RGBColor(148, 163, 184)    # Secondary / Captions

    BG_IMAGE = "assets/presentation_bg.png"

    def apply_slide_background(slide, slide_num=None):
        if os.path.exists(BG_IMAGE):
            slide.shapes.add_picture(BG_IMAGE, 0, 0, prs.slide_width, prs.slide_height)
        else:
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
            bg.fill.solid()
            bg.fill.fore_color.rgb = RGBColor(7, 9, 16)
            bg.line.fill.background()

        # Add subtle footer on slides 2-12 (no harsh lines)
        if slide_num and slide_num > 1:
            ft = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.7), Inches(0.35))
            tf_ft = ft.text_frame
            tf_ft.word_wrap = True
            p_ft = tf_ft.paragraphs[0]
            p_ft.text = f"BIFROST GATEWAY  •  ENTERPRISE AI PLATFORM                      SLIDE {slide_num:02d} / 12"
            p_ft.font.size = Pt(8.5)
            p_ft.font.color.rgb = RGBColor(100, 116, 139)

    def add_header(slide, tag, title, subtitle):
        # Category Tag
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.42), Inches(11.7), Inches(0.35))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag.upper()
        p_tag.font.size = Pt(9.5)
        p_tag.font.bold = True
        p_tag.font.color.rgb = ACCENT_CYAN

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.7), Inches(0.55))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

        # Subtitle
        sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.30), Inches(11.7), Inches(0.45))
        tf_sub = sub_box.text_frame
        tf_sub.word_wrap = True
        p_sub = tf_sub.paragraphs[0]
        p_sub.text = subtitle
        p_sub.font.size = Pt(11)
        p_sub.font.color.rgb = TEXT_MUTED

    def add_borderless_card(slide, left, top, width, height, title, items, tag=None, tag_color=ACCENT_BLUE):
        # Borderless rounded card surface
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.fill.background() # Completely remove border line

        tb = slide.shapes.add_textbox(left + Inches(0.25), top + Inches(0.20), width - Inches(0.5), height - Inches(0.4))
        tf = tb.text_frame
        tf.word_wrap = True

        if tag:
            p_tag = tf.paragraphs[0]
            p_tag.text = tag.upper()
            p_tag.font.size = Pt(8.5)
            p_tag.font.bold = True
            p_tag.font.color.rgb = tag_color
            p_title = tf.add_paragraph()
        else:
            p_title = tf.paragraphs[0]

        p_title.text = title
        p_title.font.size = Pt(13.5)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE
        p_title.space_before = Pt(2) if tag else Pt(0)

        for item in items:
            p = tf.add_paragraph()
            p.text = item
            p.font.size = Pt(10)
            p.font.color.rgb = TEXT_SILVER
            p.space_before = Pt(6)

    # ==============================================================================
    # SLIDE 1: COVER SLIDE
    # ==============================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s1, 1)

    t_box = s1.shapes.add_textbox(Inches(1.2), Inches(1.8), Inches(10.9), Inches(3.4))
    tf1 = t_box.text_frame
    tf1.word_wrap = True

    p_badge = tf1.paragraphs[0]
    p_badge.text = "ENTERPRISE AI INFRASTRUCTURE  •  OPEN SOURCE PLATFORM"
    p_badge.font.size = Pt(11)
    p_badge.font.bold = True
    p_badge.font.color.rgb = ACCENT_BLUE
    p_badge.alignment = PP_ALIGN.CENTER

    p_main = tf1.add_paragraph()
    p_main.text = "BIFROST GATEWAY"
    p_main.font.size = Pt(52)
    p_main.font.bold = True
    p_main.font.color.rgb = TEXT_WHITE
    p_main.alignment = PP_ALIGN.CENTER
    p_main.space_before = Pt(10)

    p_tag = tf1.add_paragraph()
    p_tag.text = "One Gateway. Every AI. Infinite Possibilities."
    p_tag.font.size = Pt(22)
    p_tag.font.bold = True
    p_tag.font.color.rgb = ACCENT_CYAN
    p_tag.alignment = PP_ALIGN.CENTER
    p_tag.space_before = Pt(8)

    p_desc = tf1.add_paragraph()
    p_desc.text = "Unified Multi-Provider API  •  Intelligent Model Routing  •  pgvector Semantic Cache  •  18ms Failover  •  MCP Tool Gateway"
    p_desc.font.size = Pt(11.5)
    p_desc.font.color.rgb = TEXT_MUTED
    p_desc.alignment = PP_ALIGN.CENTER
    p_desc.space_before = Pt(14)

    # 4 Sleek borderless metric pills at bottom
    badges = [
        ("< 4ms", "Internal Latency", ACCENT_BLUE),
        ("71%", "Cost Reduction", ACCENT_EMERALD),
        ("15+", "Providers Connected", ACCENT_PURPLE),
        ("99.99%", "Uptime SLA", ACCENT_AMBER)
    ]
    for i, (val, lbl, col) in enumerate(badges):
        x = Inches(1.7 + i * 2.55)
        box = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(5.4), Inches(2.35), Inches(1.2))
        box.fill.solid()
        box.fill.fore_color.rgb = CARD_BG
        box.line.fill.background() # No border line

        btb = s1.shapes.add_textbox(x, Inches(5.5), Inches(2.35), Inches(1.0))
        btf = btb.text_frame
        bp0 = btf.paragraphs[0]
        bp0.text = val
        bp0.font.size = Pt(22)
        bp0.font.bold = True
        bp0.font.color.rgb = col
        bp0.alignment = PP_ALIGN.CENTER

        bp1 = btf.add_paragraph()
        bp1.text = lbl
        bp1.font.size = Pt(10)
        bp1.font.color.rgb = TEXT_MUTED
        bp1.alignment = PP_ALIGN.CENTER
        bp1.space_before = Pt(2)

    # ==============================================================================
    # SLIDE 2: THE PROBLEM (MULTI-PROVIDER SPRAWL)
    # ==============================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s2, 2)
    add_header(s2, "Market Opportunity", "The Enterprise AI Infrastructure Crisis", "Why direct multi-provider API integration creates operational chaos, outages, and runaway costs.")

    add_borderless_card(s2, Inches(0.8), Inches(1.9), Inches(3.64), Inches(4.9), "Vendor Lock-in & Sprawl", [
        "Teams separately integrate OpenAI, Anthropic, Gemini, DeepSeek, and Bedrock.",
        "Inconsistent SDKs, divergent error codes, and unique streaming transcoders.",
        "Engineering time wasted rewriting client code whenever new models release.",
        "Zero single-pane-of-glass visibility across enterprise LLM traffic."
    ], tag="Critical Friction", tag_color=ACCENT_ROSE)

    add_borderless_card(s2, Inches(4.84), Inches(1.9), Inches(3.64), Inches(4.9), "Unreliable Upstream Outages", [
        "Rate limits (HTTP 429) and provider outages (503/500) crash production apps.",
        "Developers build brittle in-app retries that cause destructive retry storms.",
        "Lack of dynamic failover between cloud regions and alternative providers.",
        "No circuit breaker protection against runaway looping agents."
    ], tag="SLA Breaches", tag_color=ACCENT_AMBER)

    add_borderless_card(s2, Inches(8.88), Inches(1.9), Inches(3.64), Inches(4.9), "Runaway Token Spend", [
        "Identical and repetitive queries repeatedly billed at full frontier prices.",
        "Simple classification tasks routed to expensive flagship models.",
        "Absence of semantic caching and per-tenant budget kill-switches.",
        "API keys hardcoded across microservices with zero access control."
    ], tag="Budget Waste", tag_color=ACCENT_PURPLE)

    # ==============================================================================
    # SLIDE 3: THE SOLUTION (BIFROST PLATFORM)
    # ==============================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s3, 3)
    add_header(s3, "Product Vision", "The Bifrost Gateway Solution", "One unified high-throughput infrastructure platform connecting applications with all AI providers.")

    add_borderless_card(s3, Inches(0.8), Inches(1.9), Inches(5.65), Inches(2.35), "Unified Drop-in OpenAI API", [
        "Developers point any OpenAI client to Bifrost by updating base_url.",
        "Zero code rewrite required across Python, TypeScript, Java, and Go.",
        "Standardized REST, SSE streaming, and multimodal payload encoding."
    ], tag="Standardized Contract", tag_color=ACCENT_BLUE)

    add_borderless_card(s3, Inches(6.85), Inches(1.9), Inches(5.65), Inches(2.35), "Intelligent Dynamic Router", [
        "Evaluates prompt intent, context window, latency SLAs, and cost ceilings.",
        "Automatically routes each request to the optimal model in < 3ms.",
        "Weighted load balancing and tag-based policy distribution."
    ], tag="Sub-3ms Decision", tag_color=ACCENT_CYAN)

    add_borderless_card(s3, Inches(0.8), Inches(4.45), Inches(5.65), Inches(2.35), "pgvector Semantic Caching", [
        "Hybrid exact match and cosine similarity caching using PostgreSQL & Redis.",
        "Serves repeated or semantically equivalent queries in < 4ms at $0 cost.",
        "Slashes enterprise monthly token bills by 35% to 72%."
    ], tag="Zero-Cost Inference", tag_color=ACCENT_EMERALD)

    add_borderless_card(s3, Inches(6.85), Inches(4.45), Inches(5.65), Inches(2.35), "18ms Disaster Recovery Failover", [
        "Integrated circuit breakers detect 429 rate limits or upstream 503 outages.",
        "Instantly falls back to secondary frontier models with 0 app downtime.",
        "Enterprise Virtual Keys with monthly spend caps and PII redaction."
    ], tag="100% 200 OK Delivery", tag_color=ACCENT_AMBER)

    # ==============================================================================
    # SLIDE 4: 6-LAYER SYSTEM ARCHITECTURE
    # ==============================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s4, 4)
    add_header(s4, "Engineering Design", "Complete 6-Layer System Architecture", "High-throughput Go data plane separated from the administrative control plane.")

    layers = [
        ("LAYER 01", "Client & Ingress Layer", "Web/Mobile Apps, Python/TS SDKs, Autonomous Agents, Cursor, LangChain", ACCENT_BLUE),
        ("LAYER 02", "Gateway Edge & Security", "Go FastHTTP reverse proxy, Token-bucket rate limiting, PII/PCI redaction", ACCENT_CYAN),
        ("LAYER 03", "Intelligence & Routing Engine", "pgvector semantic distance lookup, Multi-objective router, Circuit breakers", ACCENT_PURPLE),
        ("LAYER 04", "Provider Adapter Matrix", "OpenAI, Anthropic, Gemini, DeepSeek, Groq, Bedrock, Azure, Mistral, Ollama", ACCENT_EMERALD),
        ("LAYER 05", "Distributed Data & Cache", "PostgreSQL 16 pgvector, Redis 7 cluster for rate limits, AES-256 key vault", ACCENT_AMBER),
        ("LAYER 06", "Operations & Governance", "OpenTelemetry distributed W3C tracing, Prometheus /metrics, 14-screen Console", ACCENT_ROSE),
    ]

    for i, (l_tag, l_title, l_desc, col) in enumerate(layers):
        y = Inches(1.9 + i * 0.82)
        bar = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.7), Inches(0.70))
        bar.fill.solid()
        bar.fill.fore_color.rgb = CARD_BG
        bar.line.fill.background() # No border line

        tb = s4.shapes.add_textbox(Inches(1.05), y + Inches(0.08), Inches(11.2), Inches(0.54))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"{l_tag}   {l_title}"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = col

        p_desc = tf.add_paragraph()
        p_desc.text = l_desc
        p_desc.font.size = Pt(9.5)
        p_desc.font.color.rgb = TEXT_SILVER
        p_desc.space_before = Pt(2)

    # ==============================================================================
    # SLIDE 5: SUPPORTED MULTI-PROVIDER ECOSYSTEM
    # ==============================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s5, 5)
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
        x = Inches(0.8 + col_idx * 4.02)
        y = Inches(1.9 + row * 1.62)

        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.75), Inches(1.45))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.fill.background() # No border line

        tb = s5.shapes.add_textbox(x + Inches(0.2), y + Inches(0.12), Inches(3.35), Inches(1.2))
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
        p1.font.color.rgb = TEXT_SILVER
        p1.space_before = Pt(3)

        p2 = tf.add_paragraph()
        p2.text = f"Latency: {lat}   •   Pricing: {price}"
        p2.font.size = Pt(9)
        p2.font.bold = True
        p2.font.color.rgb = col
        p2.space_before = Pt(4)

    # ==============================================================================
    # SLIDE 6: INTELLIGENT MODEL ROUTER (WITH GRAPH)
    # ==============================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s6, 6)
    add_header(s6, "Traffic Optimization", "Intelligent Model Routing Engine", "Dynamic, multi-objective optimization routes requests to the ideal model in under 3 milliseconds.")

    add_borderless_card(s6, Inches(0.8), Inches(1.9), Inches(5.4), Inches(4.9), "Routing Policies & Strategies", [
        "Cost-Optimized Strategy: Enforces max $0.50/1M constraint, routing routine queries to DeepSeek V3 or Gemini Flash (-78% spend).",
        "Sub-50ms Latency Strategy: Routes conversational voice workloads to Groq LPU (38ms P99) for immediate speech output.",
        "High-Context Coding Strategy: Automatically sends complex AST synthesis and refactoring to Claude 3.5 Sonnet.",
        "Long-Form Document Strategy: Utilizes Gemini 1.5 Pro's native 2,000,000 token context window without brittle RAG chunking.",
        "Weighted Enterprise Balance: Splits volume across Azure OpenAI (50%), AWS Bedrock (30%), and Google Cloud (20%)."
    ], tag="Dynamic Multi-Objective", tag_color=ACCENT_CYAN)

    if os.path.exists("assets/charts/provider_distribution.png"):
        s6.shapes.add_picture("assets/charts/provider_distribution.png", Inches(6.5), Inches(1.9), width=Inches(6.0))

    # ==============================================================================
    # SLIDE 7: RELIABILITY & AUTOMATIC FAILOVER (WITH GRAPH)
    # ==============================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s7, 7)
    add_header(s7, "High Availability", "Zero-Downtime Automatic Failover (18ms)", "Circuit breakers and bounded fallback chains eliminate 99.9% of upstream AI downtime.")

    add_borderless_card(s7, Inches(0.8), Inches(1.9), Inches(5.4), Inches(4.9), "Disaster Recovery Invariants", [
        "Upstream Outage Interception: Catches HTTP 429 (Rate Limits) and 503/500 errors before applications notice.",
        "18ms Instant Fallback: Cascades to alternative provider (e.g. OpenAI -> Claude 3.5 -> Azure OpenAI) in under 20ms.",
        "Circuit Breaker State Machine: Trips to OPEN state after 3 consecutive failures with 30s cooldown timer.",
        "Bounded Retry Budget: Clamps retries to prevent catastrophic downstream retry storms.",
        "100% Client Availability: Returns HTTP 200 OK without surfacing provider downtime to users."
    ], tag="Circuit Breaker Protection", tag_color=ACCENT_ROSE)

    if os.path.exists("assets/charts/waterfall_breakdown.png"):
        s7.shapes.add_picture("assets/charts/waterfall_breakdown.png", Inches(6.5), Inches(1.9), width=Inches(6.0))

    # ==============================================================================
    # SLIDE 8: COST INTELLIGENCE & SEMANTIC CACHING (WITH GRAPH)
    # ==============================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s8, 8)
    add_header(s8, "Economic Efficiency", "Cost Intelligence & Semantic Vector Caching", "Cut enterprise AI API expenditures by 71% through intelligent memory and model tiered routing.")

    add_borderless_card(s8, Inches(0.8), Inches(1.9), Inches(5.4), Inches(4.9), "Semantic Cache Architecture", [
        "Cosine Distance Lookup: Embeds queries and queries pgvector IVFFlat index in under 4ms.",
        "Configurable Similarity Threshold: Dial between 0.80 (loose high-hit) to 0.99 (strict near-exact) precision.",
        "Zero-Cost Responses: 35% of repetitive queries answered with 0 upstream tokens billed.",
        "TTL & Invalidation: Automatic time-to-live policies and tenant-isolated namespace boundaries.",
        "Annualized ROI: Saves $120,000+ per year on high-volume 1.5M requests/month workloads."
    ], tag="Vector Memory Layer", tag_color=ACCENT_EMERALD)

    if os.path.exists("assets/charts/cost_savings.png"):
        s8.shapes.add_picture("assets/charts/cost_savings.png", Inches(6.5), Inches(1.9), width=Inches(6.0))

    # ==============================================================================
    # SLIDE 9: LATENCY SPECTRUM & GROQ ACCELERATION (WITH GRAPH)
    # ==============================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s9, 9)
    add_header(s9, "Performance Benchmarks", "Latency Spectrum & Real-Time Performance", "Sub-4ms internal gateway overhead with hardware-accelerated LPU streaming.")

    add_borderless_card(s9, Inches(0.8), Inches(1.9), Inches(5.4), Inches(4.9), "Benchmark Characteristics", [
        "Internal Overhead: < 4ms added latency for full authentication, caching, guardrails, and routing.",
        "Semantic Cache Speed: 3.8ms total roundtrip response for vector cache hits.",
        "Groq LPU Integration: 38ms time-to-first-token with 480 tokens/sec streaming throughput.",
        "P95 / P99 SLA: P50 latency 112ms, P99 guaranteed under 340ms across multi-cloud regions.",
        "SSE Streaming Transcoder: Converts divergent upstream streams to standardized SSE in < 1.2ms."
    ], tag="Sub-4ms Architecture", tag_color=ACCENT_BLUE)

    if os.path.exists("assets/charts/latency_distribution.png"):
        s9.shapes.add_picture("assets/charts/latency_distribution.png", Inches(6.5), Inches(1.9), width=Inches(6.0))

    # ==============================================================================
    # SLIDE 10: ENTERPRISE SECURITY & GOVERNANCE
    # ==============================================================================
    s10 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s10, 10)
    add_header(s10, "Data Protection", "Enterprise Security, Virtual Keys & Guardrails", "Never expose root provider secrets. Issue scoped virtual keys with automated budget kill-switches.")

    add_borderless_card(s10, Inches(0.8), Inches(1.9), Inches(5.65), Inches(2.35), "Tenant Virtual API Keys", [
        "Issue isolated virtual keys to specific teams, microservices, or frontend clients.",
        "Clamp monthly budgets (e.g. $2,500/mo) with automated reject upon ceiling.",
        "Restrict keys to specific allowed model whitelists and RPM rate limits."
    ], tag="Token Scoping", tag_color=ACCENT_BLUE)

    add_borderless_card(s10, Inches(6.85), Inches(1.9), Inches(5.65), Inches(2.35), "Real-time DLP & PII Redaction", [
        "Sanitize credit card PANs, SSNs, and patient identifiers before packets leave VPC.",
        "Full HIPAA, GDPR, and PCI-DSS compliance conformance ready.",
        "Custom regex and embedding-based sensitive entity maskers."
    ], tag="Privacy Shield", tag_color=ACCENT_EMERALD)

    add_borderless_card(s10, Inches(0.8), Inches(4.45), Inches(5.65), Inches(2.35), "Prompt Injection Defense", [
        "Block adversarial jailbreak attempts ('Ignore all previous instructions...').",
        "Detect toxic outputs and hate speech with real-time classification gates.",
        "Cost velocity spike breaker ($50/min cap) prevents infinite agent loops."
    ], tag="Threat Mitigation", tag_color=ACCENT_ROSE)

    add_borderless_card(s10, Inches(6.85), Inches(4.45), Inches(5.65), Inches(2.35), "SOC2 Immutable Audit Trails", [
        "Every request, key rotation, policy change, and PII redaction event logged.",
        "Full W3C trace context propagation across every microservice hop.",
        "Export audit records to Splunk, Datadog, or AWS S3 cold storage."
    ], tag="Audit Compliance", tag_color=ACCENT_AMBER)

    # ==============================================================================
    # SLIDE 11: MCP & AUTONOMOUS AGENT GATEWAY
    # ==============================================================================
    s11 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s11, 11)
    add_header(s11, "Autonomous Agents", "Model Context Protocol (MCP) Tool Bridge", "Governed tool execution and human-in-the-loop approval gates for agentic workflows.")

    add_borderless_card(s11, Inches(0.8), Inches(1.9), Inches(3.64), Inches(4.9), "Agentic Integrations", [
        "Direct bridge for LangChain, CrewAI, AutoGen, Cursor, and Claude Code.",
        "Agents connect to Bifrost via standardized OpenAI tool-calling semantics.",
        "Eliminates unmonitored raw shell or direct production database access.",
        "Detailed tool call latency, token usage, and error metrics recorded."
    ], tag="Agent Clients", tag_color=ACCENT_PURPLE)

    add_borderless_card(s11, Inches(4.84), Inches(1.9), Inches(3.64), Inches(4.9), "Registered MCP Tools", [
        "PostgreSQL Enterprise MCP: Read-only parameterized queries with limit clamps.",
        "GitHub Org MCP: Secure PR creation and issue tracking with branch protection.",
        "Slack Alerts MCP: Incident escalation dispatch to #ai-ops channels.",
        "Brave Web Search MCP: Real-time web index search with content extraction."
    ], tag="Enterprise Tools", tag_color=ACCENT_CYAN)

    add_borderless_card(s11, Inches(8.88), Inches(1.9), Inches(3.64), Inches(4.9), "Approval Gates & Governance", [
        "Granular Execution Policies: Toggle tools between 'Auto-Approved' vs 'Approval Required'.",
        "Human-in-the-Loop: High-risk tools (e.g. create PR, send alert) require explicit admin sign-off.",
        "Parameter Validation: JSON schema enforcement blocks SQL injection attempts.",
        "Complete Audit Playback: Replay agent execution steps for incident forensics."
    ], tag="Human Gates", tag_color=ACCENT_AMBER)

    # ==============================================================================
    # SLIDE 12: DEPLOYMENT, CONSOLE & ROADMAP
    # ==============================================================================
    s12 = prs.slides.add_slide(blank_layout)
    apply_slide_background(s12, 12)
    add_header(s12, "Production Ready", "Deployment, Administration & Open-Source Roadmap", "Enterprise self-hosting with Docker, Kubernetes, and 14-screen admin console.")

    add_borderless_card(s12, Inches(0.8), Inches(1.9), Inches(5.65), Inches(2.35), "Self-Hosted Deployment Stack", [
        "Docker Compose: Single command bootstrap with Redis and pgvector.",
        "Kubernetes & Helm: Multi-replica deployment, mTLS ingress, and HPA auto-scaling.",
        "22MB Static Go Binary: Zero external runtime dependencies for maximum security."
    ], tag="Turnkey Deployment", tag_color=ACCENT_BLUE)

    add_borderless_card(s12, Inches(6.85), Inches(1.9), Inches(5.65), Inches(2.35), "14-Screen Admin Console", [
        "Built-in Next.js 15 dark-mode control plane at /dashboard.",
        "Live waterfall trace inspector with sub-millisecond execution spans.",
        "Configurable semantic similarity thresholds and one-click cache purges."
    ], tag="Control Plane", tag_color=ACCENT_CYAN)

    add_borderless_card(s12, Inches(0.8), Inches(4.45), Inches(5.65), Inches(2.35), "Proven Economic ROI", [
        "71% reduction in monthly API spend ($10,080/mo saved on 1.5M requests).",
        "Zero vendor lock-in allows negotiating volume discounts across providers.",
        "SLA protection prevents catastrophic customer churn during provider outages."
    ], tag="Executive ROI", tag_color=ACCENT_EMERALD)

    add_borderless_card(s12, Inches(6.85), Inches(4.45), Inches(5.65), Inches(2.35), "Open Source & Next Steps", [
        "Released under Apache 2.0 open-source license on GitHub.",
        "Explore live interactive playground at http://localhost:3000/playground.",
        "GitHub Repository: https://github.com/Ranjeet7680/BIFROST-GATEWAY."
    ], tag="Get Started Today", tag_color=ACCENT_AMBER)

    output_path = "Bifrost_Gateway_Enterprise_Pitch.pptx"
    prs.save(output_path)
    print(f"PowerPoint Presentation successfully saved to {output_path}")

if __name__ == "__main__":
    create_deck()
