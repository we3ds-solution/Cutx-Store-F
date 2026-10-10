// Generates honest, clearly-branded SVG placeholder assets for Cut X Egypt.
// These are NOT product photos: they are explicit graphic placeholders used until
// official Cut X product photography is available. See docs/CUTX-CATALOG.md.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const RED = "#E10600";
const INK = "#101013";
const INK2 = "#1B1B20";
const GREY = "#8E8E96";

function frame(w, h, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${INK2}"/><stop offset="1" stop-color="${INK}"/>
</linearGradient>
<pattern id="diag" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
<rect width="28" height="28" fill="none"/><line x1="0" y1="0" x2="0" y2="28" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2"/>
</pattern>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect width="${w}" height="${h}" fill="url(#diag)"/>
${inner}
</svg>`;
}

function xMark(cx, cy, s, color = RED, opacity = 1) {
  const t = s / 2;
  return `<g transform="translate(${cx} ${cy})" opacity="${opacity}" stroke="${color}" stroke-width="${s * 0.24}" stroke-linecap="round">
<line x1="${-t}" y1="${-t}" x2="${t}" y2="${t}"/><line x1="${t}" y1="${-t}" x2="${-t}" y2="${t}"/>
</g>`;
}

function wordmark(x, y, size, color = "#fff", anchor = "middle") {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="${size}" letter-spacing="${size * 0.18}" fill="${color}">CUT X</text>`;
}

function productArt(label, sub, w = 800, h = 1000) {
  const cx = w / 2;
  return frame(w, h, `
${xMark(cx, h * 0.36, Math.min(w, h) * 0.22, RED, 0.95)}
${xMark(cx, h * 0.36, Math.min(w, h) * 0.34, "#ffffff", 0.08)}
${wordmark(cx, h * 0.62, w * 0.075)}
<text x="${cx}" y="${h * 0.62 + w * 0.075}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${w * 0.038}" letter-spacing="${w * 0.01}" fill="${GREY}">${label.toUpperCase()}</text>
<text x="${cx}" y="${h * 0.62 + w * 0.13}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${w * 0.028}" fill="#5A5A62">${sub}</text>
<rect x="${w * 0.08}" y="${h - h * 0.075}" width="${w * 0.84}" height="3" fill="${RED}" opacity="0.85"/>
`);
}

const files = {};

// ── Product placeholders (3/4 aspect) ──
const products = [
  ["everyday-protective-tee", "Everyday Tee", "Cut-resistant everyday wear · placeholder"],
  ["urban-protective-hoodie", "Urban Hoodie", "Cut-resistant everyday wear · placeholder"],
  ["training-long-sleeve", "Training Top", "Athletic protection · placeholder"],
  ["compression-training-pants", "Training Pants", "Athletic protection · placeholder"],
  ["track-protective-jacket", "Track Jacket", "Athletic protection · placeholder"],
  ["duty-protective-jacket", "Duty Jacket", "Security & workwear · placeholder"],
  ["tactical-overshirt", "Tactical Overshirt", "Security & workwear · placeholder"],
  ["protective-gloves", "Gloves", "Protective accessory · placeholder"],
  ["protective-arm-sleeves", "Arm Sleeves", "Protective accessory · placeholder"],
  ["protective-neck-gaiter", "Neck Gaiter", "Protective accessory · placeholder"],
];
for (const [slug, label, sub] of products) {
  files[`products/${slug}.svg`] = productArt(label, sub);
}
files["products/everyday-protective-tee-alt.svg"] = productArt("Everyday Tee", "Back view · placeholder");

// ── Category tiles (3/4 aspect, smaller) ──
const cats = [
  ["daily-essentials", "DAILY", "Everyday protective wear"],
  ["athletic-protection", "ATHLETIC", "Protection for training & sport"],
  ["security-workwear", "SECURITY", "Duty & industrial workwear"],
  ["accessories", "GEAR", "Gloves, sleeves & extras"],
];
for (const [slug, label, sub] of cats) {
  files[`categories/${slug}.svg`] = frame(600, 800, `
${xMark(300, 300, 150, RED, 0.95)}
${wordmark(300, 520, 44)}
<text x="300" y="566" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="30" letter-spacing="6" fill="#fff">${label}</text>
<text x="300" y="606" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="${GREY}">${sub}</text>
<rect x="48" y="736" width="504" height="3" fill="${RED}" opacity="0.85"/>
`);
}

// ── Banners ──
files["banners/hero.svg"] = frame(1600, 900, `
${xMark(800, 330, 190, RED, 0.95)}
${xMark(800, 330, 300, "#ffffff", 0.07)}
${wordmark(800, 600, 120)}
<text x="800" y="668" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="34" letter-spacing="10" fill="${GREY}">CUT-RESISTANT APPAREL · EGYPT</text>
<rect x="640" y="730" width="320" height="5" fill="${RED}"/>
`);
files["banners/cta.svg"] = frame(1400, 500, `
${xMark(700, 180, 110, RED, 0.9)}
${wordmark(700, 350, 64)}
<text x="700" y="400" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="6" fill="${GREY}">EVERYDAY PROTECTION, ENGINEERED IN EGYPT</text>
`);

// ── Brand ──
files["brand/og.svg"] = frame(1200, 630, `
${xMark(600, 250, 130, RED, 0.95)}
${wordmark(600, 450, 96)}
<text x="600" y="510" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" letter-spacing="8" fill="${GREY}">CUT X EGYPT</text>
`);

for (const [rel, content] of Object.entries(files)) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log("wrote", rel);
}
