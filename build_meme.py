#!/usr/bin/env python3
"""Build the GTA 6 meme image for the Make.fun 'Post a GTA 6 meme on X' bounty.
Base: real screenshot from Harry's own Sunset Shores entry (3-chase.jpg).
Text is Impact-style: bold white with black outline, legible at 480x480.
A 'make.fun' pill badge is placed top-right (bounty rule: make.fun must appear in-scene).
"""
from PIL import Image, ImageDraw, ImageFont
import os

SRC = "/home/hatch/workspace/makefun/entries/gta6/screenshots/3-chase.jpg"
OUTDIR = "/home/hatch/workspace/makefun/entries/meme-x"
os.makedirs(OUTDIR, exist_ok=True)
OUT = os.path.join(OUTDIR, "gta6-meme.jpg")

FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

img = Image.open(SRC).convert("RGB")
W, H = img.size  # 1280x720
d = ImageDraw.Draw(img, "RGBA")

def caption(lines, y_top, size):
    f = ImageFont.truetype(FONT, size)
    # measure block height
    lh = int(size * 1.15)
    total = lh * len(lines)
    # dark band behind text for legibility
    d.rectangle([0, y_top - 8, W, y_top + total + 8], fill=(0, 0, 0, 110))
    y = y_top
    for line in lines:
        w = d.textlength(line, font=f)
        x = (W - w) / 2
        d.text((x, y), line, font=f, fill="white",
               stroke_width=max(3, size // 14), stroke_fill="black")
        y += lh

caption(["GTA FANS AFTER", "WAITING 13 YEARS"], 16, 62)
caption(["MY AI AGENT JUST", "BUILT ONE INSTEAD"], H - 16 - int(62 * 1.15) * 2 - 16, 62)

# make.fun pill badge, top-right below the WANTED box
bf = ImageFont.truetype(FONT, 40)
label = "make.fun"
tw = d.textlength(label, font=bf)
pad_x, pad_y = 26, 10
bx1, by1 = W - int(tw) - pad_x * 2 - 18, 78
bx2, by2 = W - 18, 78 + 40 + pad_y * 2
d.rounded_rectangle([bx1, by1, bx2, by2], radius=24, fill=(0, 0, 0, 200))
d.text((bx1 + pad_x, by1 + pad_y - 2), label, font=bf, fill="white")

img.save(OUT, "JPEG", quality=92)
print("saved", OUT, img.size)
