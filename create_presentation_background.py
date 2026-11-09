from PIL import Image, ImageDraw, ImageFilter
import math
import os

os.makedirs("assets", exist_ok=True)

width, height = 2560, 1440
# Base deep obsidian background
img = Image.new("RGBA", (width, height), (7, 9, 16, 255))

# Create glowing ambient light layers (soft Apple keynote aura without grid lines)
glow_layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
draw = ImageDraw.Draw(glow_layer)

# Aura 1: Top-center / top-left electric blue luminous pool
cx1, cy1 = int(width * 0.42), int(height * 0.12)
r1 = 1100
for i in range(r1, 0, -12):
    alpha = int(50 * (1 - i / r1)**2.2)
    draw.ellipse([cx1 - i, cy1 - i, cx1 + i, cy1 + i], fill=(30, 95, 230, alpha))

# Aura 2: Bottom-right deep violet radiance
cx2, cy2 = int(width * 0.82), int(height * 0.82)
r2 = 950
for i in range(r2, 0, -12):
    alpha = int(40 * (1 - i / r2)**2.2)
    draw.ellipse([cx2 - i, cy2 - i, cx2 + i, cy2 + i], fill=(110, 40, 180, alpha))

# Aura 3: Bottom-left subtle emerald glow
cx3, cy3 = int(width * 0.15), int(height * 0.90)
r3 = 850
for i in range(r3, 0, -12):
    alpha = int(28 * (1 - i / r3)**2.2)
    draw.ellipse([cx3 - i, cy3 - i, cx3 + i, cy3 + i], fill=(16, 140, 95, alpha))

# Aura 4: Top-right subtle cyan rim
cx4, cy4 = int(width * 0.88), int(height * 0.08)
r4 = 750
for i in range(r4, 0, -12):
    alpha = int(25 * (1 - i / r4)**2.2)
    draw.ellipse([cx4 - i, cy4 - i, cx4 + i, cy4 + i], fill=(0, 200, 240, alpha))

# Blur the aura slightly to make it ultra-smooth and silky
glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=40))

# Composite layers
img = Image.alpha_composite(img, glow_layer)

# Add a subtle top glass highlight bar (1px soft gradient at the very top edge)
top_highlight = Image.new("RGBA", (width, height), (0, 0, 0, 0))
th_draw = ImageDraw.Draw(top_highlight)
th_draw.rectangle([0, 0, width, 3], fill=(41, 151, 255, 180))
img = Image.alpha_composite(img, top_highlight)

# Save high-res PNG without any grid lines
output_bg = "assets/presentation_bg.png"
img.convert("RGB").save(output_bg, quality=95)
print(f"Silky ambient keynote background generated: {output_bg} ({width}x{height})")
