import matplotlib.pyplot as plt
import numpy as np
import os

os.makedirs("assets/charts", exist_ok=True)

# Set global dark theme styling
plt.style.use('dark_background')
plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#2A2E3D'
plt.rcParams['axes.linewidth'] = 0.8

# ==============================================================================
# Chart 1: Cost Comparison (Unmanaged vs Bifrost Managed)
# ==============================================================================
fig, ax = plt.subplots(figsize=(7, 4.2), dpi=200)
fig.patch.set_facecolor('#080A12')
ax.set_facecolor('#0B0E18')

categories = ['Direct OpenAI\n(Unmanaged)', 'Bifrost Gateway\n(Cache + Smart Routing)']
costs = [14200, 4120]
colors = ['#F43F5E', '#10B981']

bars = ax.bar(categories, costs, color=colors, width=0.48, edgecolor=['#E11D48', '#059669'], linewidth=1.5)

for bar in bars:
    yval = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2.0, yval + 350, f"${yval:,.0f}", ha='center', va='bottom', fontsize=12, fontweight='bold', color='white')

ax.annotate('71% Net Savings\n($10,080 / month)', xy=(1, 4120), xytext=(1.05, 9500),
            arrowprops=dict(facecolor='#00F5FF', shrink=0.08, width=2, headwidth=8),
            fontsize=11, fontweight='bold', color='#00F5FF', ha='center',
            bbox=dict(boxstyle="round,pad=0.5", fc="#071E26", ec="#00F5FF", lw=1.2))

ax.set_ylabel('Monthly API Spend (USD)', fontsize=10, color='#94A3B8')
ax.set_title('Monthly Infrastructure Spend Comparison (1.5M Requests)', fontsize=12, fontweight='bold', color='white', pad=15)
ax.set_ylim(0, 16500)
ax.grid(axis='y', linestyle='--', alpha=0.15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('assets/charts/cost_savings.png', facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()

# ==============================================================================
# Chart 2: Latency Benchmark & Distribution (P50, P90, P95, P99, Semantic Cache)
# ==============================================================================
fig, ax = plt.subplots(figsize=(7, 4.2), dpi=200)
fig.patch.set_facecolor('#080A12')
ax.set_facecolor('#0B0E18')

metrics = ['Semantic Cache', 'Groq LPU', 'P50 Latency', 'P90 Latency', 'P95 Latency', 'P99 Latency']
latencies = [3.8, 38, 112, 195, 285, 340]
bar_colors = ['#00F5FF', '#F43F5E', '#2997FF', '#60A5FA', '#F59E0B', '#E11D48']

y_pos = np.arange(len(metrics))
bars = ax.barh(y_pos, latencies, color=bar_colors, height=0.55, edgecolor='#334155', linewidth=1)

for bar in bars:
    xval = bar.get_width()
    ax.text(xval + 8, bar.get_y() + bar.get_height()/2.0, f"{xval:.1f}ms", ha='left', va='center', fontsize=10, fontweight='bold', color='white')

ax.set_yticks(y_pos)
ax.set_yticklabels(metrics, fontsize=10, color='#E2E8F0')
ax.invert_yaxis()
ax.set_xlabel('Response Time (Milliseconds)', fontsize=10, color='#94A3B8')
ax.set_title('Response Latency Spectrum & Cache Acceleration', fontsize=12, fontweight='bold', color='white', pad=15)
ax.set_xlim(0, 420)
ax.grid(axis='x', linestyle='--', alpha=0.15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('assets/charts/latency_distribution.png', facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()

# ==============================================================================
# Chart 3: Provider Workload Distribution (Donut Chart)
# ==============================================================================
fig, ax = plt.subplots(figsize=(6.5, 4.2), dpi=200)
fig.patch.set_facecolor('#080A12')
ax.set_facecolor('#0B0E18')

labels = ['Anthropic Claude\n(Complex Code)', 'DeepSeek V3/R1\n(Cost-Optimized)', 'Groq LPU\n(Realtime Voice)', 'OpenAI GPT-4o\n(Multimodal)']
sizes = [38, 29, 18, 15]
colors = ['#D97706', '#00F5FF', '#F43F5E', '#10B981']

wedges, texts, autotexts = ax.pie(sizes, labels=labels, autopct='%1.0f%%', startangle=140,
                                  colors=colors, pctdistance=0.75,
                                  wedgeprops=dict(width=0.45, edgecolor='#080A12', linewidth=2.5),
                                  textprops=dict(color='white', fontsize=9))

for autotext in autotexts:
    autotext.set_color('#080A12')
    autotext.set_fontweight('bold')
    autotext.set_fontsize(10)

ax.set_title('Intelligent Router: Traffic Allocation by Workload', fontsize=12, fontweight='bold', color='white', pad=15)

plt.tight_layout()
plt.savefig('assets/charts/provider_distribution.png', facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()

# ==============================================================================
# Chart 4: Request Waterfall Breakdown
# ==============================================================================
fig, ax = plt.subplots(figsize=(7, 4.2), dpi=200)
fig.patch.set_facecolor('#080A12')
ax.set_facecolor('#0B0E18')

steps = ['Auth & Rate Limit', 'PII / DLP Scrub', 'Semantic Cache', 'Router Decision', 'Upstream Provider', 'Response Normalize']
times = [1.2, 1.8, 3.2, 2.1, 135.0, 1.5]
step_colors = ['#2997FF', '#00F5FF', '#A855F7', '#F59E0B', '#10B981', '#38BDF8']

y_pos = np.arange(len(steps))
bars = ax.barh(y_pos, times, color=step_colors, height=0.5, edgecolor='#334155', linewidth=1)

for bar in bars:
    xval = bar.get_width()
    ax.text(xval + 3, bar.get_y() + bar.get_height()/2.0, f"{xval:.1f}ms", ha='left', va='center', fontsize=9.5, fontweight='bold', color='white')

ax.set_yticks(y_pos)
ax.set_yticklabels(steps, fontsize=10, color='#E2E8F0')
ax.invert_yaxis()
ax.set_xlabel('Execution Time (Milliseconds)', fontsize=10, color='#94A3B8')
ax.set_title('Sub-Millisecond Gateway Overhead Breakdown (< 4ms Core)', fontsize=12, fontweight='bold', color='white', pad=15)
ax.set_xlim(0, 165)
ax.grid(axis='x', linestyle='--', alpha=0.15)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

plt.tight_layout()
plt.savefig('assets/charts/waterfall_breakdown.png', facecolor=fig.get_facecolor(), edgecolor='none')
plt.close()

print("All 4 charts successfully generated in assets/charts/")
