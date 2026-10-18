#!/usr/bin/env node
/**
 * Lightweight catalog integrity check (no Vitest dependency).
 * Run: node scripts/check-catalog.mjs  (from frontend/)
 * Or:  pnpm run test:catalog
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "src/lib/data.ts");
const src = readFileSync(dataPath, "utf8");

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error("FAIL:", msg);
    failed += 1;
  } else {
    console.log("OK:", msg);
  }
}

// Structural checks on the TypeScript source (demo catalog is source of truth today)
assert(src.includes("isDemo: true"), "catalog marks demo products with isDemo: true");
assert(!src.includes("isDemo: false"), "no product falsely marked isDemo: false without verification");
assert(src.includes("DEMO_FREE_SHIPPING_THRESHOLD"), "shipping threshold exported");
assert(src.includes("DEMO_SHIPPING_FEE"), "shipping fee exported");
assert(src.includes("getProductName"), "getProductName helper present");
assert(src.includes("getProductDescription"), "getProductDescription helper present");

const idMatches = [...src.matchAll(/\bid:\s*(\d+)/g)].map((m) => Number(m[1]));
assert(idMatches.length >= 10, `expected ≥10 product ids, found ${idMatches.length}`);
assert(new Set(idMatches).size === idMatches.length, "product ids are unique");

const priceMatches = [...src.matchAll(/\bprice:\s*(\d+)/g)].map((m) => Number(m[1]));
assert(
  priceMatches.every((p) => p > 0 && p < 100_000),
  "prices look like plausible EGP demo amounts"
);

assert(!/level\s*[0-9]|EN\s*388|lab\s*certified/i.test(src), "no invented certification claims in catalog source");

if (failed) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
console.log("\nAll catalog checks passed.");
