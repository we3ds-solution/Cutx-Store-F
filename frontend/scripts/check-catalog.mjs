#!/usr/bin/env node
/**
 * Lightweight integrity checks (no Vitest dependency).
 * Run from frontend/: node scripts/check-catalog.mjs  |  pnpm run test:catalog
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataSrc = readFileSync(join(root, "src/lib/data.ts"), "utf8");
const langSrc = readFileSync(join(root, "src/contexts/lang-translations.ts"), "utf8");
const checkoutSrc = readFileSync(join(root, "src/pages/checkout.tsx"), "utf8");
const successSrc = readFileSync(join(root, "src/pages/success.tsx"), "utf8");

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed += 1;
  } else {
    console.log("OK:", msg);
  }
}

// --- Catalog ---
assert(dataSrc.includes("isDemo: true"), "catalog marks demo products with isDemo: true");
assert(!dataSrc.includes("isDemo: false"), "no product falsely marked isDemo: false");
assert(dataSrc.includes("DEMO_FREE_SHIPPING_THRESHOLD"), "shipping threshold exported");
assert(dataSrc.includes("DEMO_SHIPPING_FEE"), "shipping fee exported");
assert(dataSrc.includes("getProductName"), "getProductName helper present");
assert(dataSrc.includes("getProductDescription"), "getProductDescription helper present");

const idMatches = [...dataSrc.matchAll(/\bid:\s*(\d+)/g)].map((m) => Number(m[1]));
assert(idMatches.length >= 10, `expected ≥10 product ids, found ${idMatches.length}`);
assert(new Set(idMatches).size === idMatches.length, "product ids are unique");

const priceMatches = [...dataSrc.matchAll(/\bprice:\s*(\d+)/g)].map((m) => Number(m[1]));
assert(
  priceMatches.every((p) => p > 0 && p < 100_000),
  "prices look like plausible EGP demo amounts"
);

assert(
  !/level\s*[0-9]|EN\s*388|lab\s*certified/i.test(dataSrc),
  "no invented certification claims in catalog source"
);

const thresholdMatch = dataSrc.match(/DEMO_FREE_SHIPPING_THRESHOLD\s*=\s*(\d+)/);
const feeMatch = dataSrc.match(/DEMO_SHIPPING_FEE\s*=\s*(\d+)/);
assert(thresholdMatch && Number(thresholdMatch[1]) === 2000, "free-shipping threshold is 2000 EGP");
assert(feeMatch && Number(feeMatch[1]) === 60, "shipping fee is 60 EGP");

function demoShipping(subtotal) {
  const threshold = Number(thresholdMatch[1]);
  const fee = Number(feeMatch[1]);
  return subtotal >= threshold ? 0 : fee;
}
assert(demoShipping(0) === 60, "shipping fee applies below threshold");
assert(demoShipping(1999) === 60, "shipping fee at 1999");
assert(demoShipping(2000) === 0, "free shipping at threshold");
assert(demoShipping(5000) === 0, "free shipping above threshold");

// --- i18n structure ---
assert(langSrc.includes("export const translations"), "translations export present");
assert(/\ben:\s*\{/.test(langSrc), "en translation block present");
assert(/\bar:\s*\{/.test(langSrc), "ar translation block present");
assert(langSrc.includes("checkout:"), "checkout copy present");
assert(langSrc.includes("success:"), "success copy present");

// --- Demo checkout path ---
assert(checkoutSrc.includes("cutx-demo-order"), "checkout writes demo order session key");
assert(checkoutSrc.includes("demoTitle") || checkoutSrc.includes("ShieldAlert"), "checkout has demo UI");
assert(successSrc.includes("cutx-demo-order"), "success reads demo order session key");
assert(successSrc.includes("readDemoOrderRef"), "success uses readDemoOrderRef helper");

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll catalog / shipping / demo-checkout checks passed.");
