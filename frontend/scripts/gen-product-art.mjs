// Generates garment-matched illustrated previews for every Cut X product.
// These are HONEST stylized illustrations (each tagged "ILLUSTRATED PREVIEW"),
// never fake photos: each matches its product's garment type and details.
// See docs/CUTX-CATALOG.md.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "products");
const RED = "#E10600";
const INK = "#101013";
const INK2 = "#1B1B20";
const BODY = "#2B2B32";
const SHADE = "#1E1E24";
const SEAM = "#45454E";
const RIB = "#17171B";
const GREY = "#8E8E96";

function frame(label, sub, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000" role="img">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${INK2}"/><stop offset="1" stop-color="${INK}"/>
</linearGradient>
<pattern id="diag" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
<rect width="28" height="28" fill="none"/><line x1="0" y1="0" x2="0" y2="28" stroke="#ffffff" stroke-opacity="0.05" stroke-width="2"/>
</pattern>
</defs>
<rect width="800" height="1000" fill="url(#bg)"/>
<rect width="800" height="1000" fill="url(#diag)"/>
<text x="400" y="120" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="56" letter-spacing="14" fill="#ffffff">CUT X</text>
<text x="400" y="162" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6" fill="${GREY}">ILLUSTRATED PREVIEW · PHOTO COMING SOON</text>
${inner}
<text x="400" y="858" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="34" letter-spacing="4" fill="#ffffff">${label.toUpperCase()}</text>
<text x="400" y="896" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="${GREY}">${sub}</text>
<rect x="64" y="930" width="672" height="3" fill="${RED}" opacity="0.85"/>
</svg>`;
}

function xMark(cx, cy, s, color = RED) {
  const t = s / 2;
  return `<g transform="translate(${cx} ${cy})" stroke="${color}" stroke-width="${s * 0.24}" stroke-linecap="round">
<line x1="${-t}" y1="${-t}" x2="${t}" y2="${t}"/><line x1="${t}" y1="${-t}" x2="${-t}" y2="${t}"/>
</g>`;
}

const seamLine = (d) => `<path d="${d}" fill="none" stroke="${SEAM}" stroke-width="3" stroke-dasharray="10 7"/>`;

/* ── Shared garment pieces ── */
function teeBody(withLogo) {
  return `
<path d="M340 282 L258 298 L168 432 L252 464 L300 432 L300 762 L500 762 L500 432 L548 464 L632 432 L542 298 L460 282 C448 318 352 318 340 282 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M340 282 C352 318 448 318 460 282" fill="none" stroke="${RIB}" stroke-width="12"/>
${seamLine("M300 470 L300 730 M500 470 L500 730")}
<path d="M300 726 L500 726" stroke="${RIB}" stroke-width="10"/>
<path d="M182 420 L244 448 M618 420 L556 448" stroke="${RIB}" stroke-width="10"/>
${withLogo ? xMark(400, 545, 92) : `<text x="400" y="380" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="30" letter-spacing="8" fill="${GREY}">CUT X</text>`}
${withLogo ? "" : seamLine("M310 440 L490 440")}`;
}

function longSleeves() {
  return `
<path d="M258 300 L182 690 L262 706 L312 470 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M542 300 L618 690 L538 706 L488 470 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="176" y="686" width="92" height="34" rx="10" fill="${RIB}"/>
<rect x="532" y="686" width="92" height="34" rx="10" fill="${RIB}"/>
${seamLine("M230 340 L200 660 M570 340 L600 660")}`;
}

const files = {};

/* 1 — Everyday Tee (front) */
files["everyday-protective-tee.svg"] = frame("Everyday Tee", "Crew neck · regular fit", teeBody(true));
/* 1b — Everyday Tee (back view) */
files["everyday-protective-tee-alt.svg"] = frame("Everyday Tee", "Back view", teeBody(false));

/* 2 — Urban Hoodie */
files["urban-protective-hoodie.svg"] = frame("Urban Hoodie", "Hood · kangaroo pocket", `
<path d="M318 296 C318 196 482 196 482 296 L460 296 C460 226 340 226 340 296 Z" fill="${SHADE}"/>
${longSleeves()}
<path d="M340 282 L258 300 L300 432 L300 762 L500 762 L500 432 L542 300 L460 282 C448 318 352 318 340 282 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M330 620 L470 620 L492 742 L308 742 Z" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
${seamLine("M330 620 L308 742 M470 620 L492 742")}
<path d="M300 726 L500 726" stroke="${RIB}" stroke-width="10"/>
<line x1="384" y1="344" x2="374" y2="436" stroke="${GREY}" stroke-width="7" stroke-linecap="round"/>
<line x1="416" y1="344" x2="426" y2="436" stroke="${GREY}" stroke-width="7" stroke-linecap="round"/>
<circle cx="374" cy="444" r="7" fill="${GREY}"/><circle cx="426" cy="444" r="7" fill="${GREY}"/>
${xMark(400, 505, 62)}`);

/* 3 — Training Long-Sleeve */
files["training-long-sleeve.svg"] = frame("Training Top", "Long sleeves · athletic fit", `
${longSleeves()}
<path d="M340 282 L258 300 L300 432 L300 762 L500 762 L500 432 L542 300 L460 282 C448 318 352 318 340 282 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M340 282 C352 318 448 318 460 282" fill="none" stroke="${RIB}" stroke-width="12"/>
${seamLine("M312 340 L312 730 M488 340 L488 730")}
<path d="M300 726 L500 726" stroke="${RIB}" stroke-width="10"/>
<path d="M560 380 L596 660 M240 380 L204 660" stroke="${RED}" stroke-width="6" opacity="0.9"/>
${xMark(400, 520, 80)}`);

/* 4 — Compression Training Pants */
files["compression-training-pants.svg"] = frame("Training Pants", "Elastic waist · side pocket", `
<rect x="298" y="286" width="204" height="56" rx="12" fill="${RIB}"/>
<line x1="388" y1="296" x2="382" y2="336" stroke="${GREY}" stroke-width="6" stroke-linecap="round"/>
<line x1="412" y1="296" x2="418" y2="336" stroke="${GREY}" stroke-width="6" stroke-linecap="round"/>
<path d="M298 342 L288 792 L390 792 L398 480 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M502 342 L512 792 L410 792 L394 480 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M398 480 C396 498 396 498 394 480" fill="none" stroke="${SHADE}" stroke-width="4"/>
<rect x="286" y="756" width="106" height="36" rx="10" fill="${RIB}"/>
<rect x="408" y="756" width="106" height="36" rx="10" fill="${RIB}"/>
<path d="M292 380 L286 740 M508 380 L514 740" stroke="${RED}" stroke-width="6" opacity="0.9"/>
<rect x="452" y="470" width="44" height="90" rx="10" fill="none" stroke="${SEAM}" stroke-width="3"/>
${xMark(343, 560, 44)}`);

/* 5 — Track Jacket */
files["track-protective-jacket.svg"] = frame("Track Jacket", "Full zip · stand collar", `
${longSleeves()}
<rect x="352" y="246" width="96" height="52" rx="12" fill="${RIB}"/>
<path d="M336 296 L262 312 L300 432 L300 762 L500 762 L500 432 L538 312 L464 296 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<line x1="400" y1="298" x2="400" y2="762" stroke="${SEAM}" stroke-width="5"/>
${Array.from({ length: 16 }, (_, i) => `<line x1="392" y1="${320 + i * 28}" x2="408" y2="${320 + i * 28}" stroke="${GREY}" stroke-width="4"/>`).join("")}
<path d="M300 726 L500 726" stroke="${RIB}" stroke-width="10"/>
<path d="M252 360 L214 640 M548 360 L586 640" stroke="${RED}" stroke-width="7" opacity="0.9"/>
<path d="M330 600 L330 700 M470 600 L470 700" stroke="${SEAM}" stroke-width="3"/>
${xMark(452, 460, 52)}`);

/* 6 — Duty Jacket */
files["duty-protective-jacket.svg"] = frame("Duty Jacket", "Utility pockets · reinforced", `
<path d="M250 312 L172 700 L258 716 L306 470 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M550 312 L628 700 L542 716 L494 470 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="166" y="694" width="96" height="36" rx="10" fill="${RIB}"/>
<rect x="538" y="694" width="96" height="36" rx="10" fill="${RIB}"/>
<path d="M330 296 L250 314 L296 440 L296 770 L504 770 L504 440 L550 314 L470 296 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="356" y="252" width="88" height="56" rx="10" fill="${RIB}"/>
<line x1="400" y1="308" x2="400" y2="770" stroke="${SEAM}" stroke-width="5"/>
<rect x="318" y="470" width="72" height="86" rx="8" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
<rect x="410" y="470" width="72" height="86" rx="8" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
<rect x="314" y="470" width="80" height="22" rx="6" fill="${SEAM}"/>
<rect x="406" y="470" width="80" height="22" rx="6" fill="${SEAM}"/>
<rect x="318" y="600" width="72" height="96" rx="8" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
<rect x="410" y="600" width="72" height="96" rx="8" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
<path d="M296 734 L504 734" stroke="${RIB}" stroke-width="10"/>
${seamLine("M262 340 L250 700 M538 340 L550 700")}
${xMark(400, 395, 56)}`);

/* 7 — Tactical Overshirt */
files["tactical-overshirt.svg"] = frame("Tactical Overshirt", "Button front · chest pockets", `
${longSleeves()}
<path d="M336 296 L262 312 L300 440 L300 770 L500 770 L500 440 L538 312 L464 296 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M352 292 L400 360 L448 292" fill="none" stroke="${RIB}" stroke-width="12"/>
<path d="M352 292 L336 330 L372 322 Z" fill="${RIB}"/>
<path d="M448 292 L464 330 L428 322 Z" fill="${RIB}"/>
<line x1="400" y1="360" x2="400" y2="770" stroke="${SEAM}" stroke-width="4"/>
${[410, 470, 530, 590, 650, 710].map((y) => `<circle cx="400" cy="${y}" r="9" fill="${SEAM}" stroke="${GREY}" stroke-width="2"/>`).join("")}
<rect x="318" y="460" width="66" height="80" rx="8" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
<rect x="416" y="460" width="66" height="80" rx="8" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
<circle cx="351" cy="472" r="6" fill="${GREY}"/><circle cx="449" cy="472" r="6" fill="${GREY}"/>
${seamLine("M300 740 L500 740")}`);

/* 8 — Protective Gloves */
files["protective-gloves.svg"] = frame("Gloves", "Grip palm · elastic cuff", `
<rect x="348" y="648" width="104" height="66" rx="14" fill="${RIB}"/>
<rect x="340" y="420" width="120" height="240" rx="46" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="344" y="298" width="26" height="140" rx="13" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="374" y="284" width="26" height="154" rx="13" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="404" y="288" width="26" height="150" rx="13" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="434" y="306" width="26" height="132" rx="13" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="300" y="470" width="30" height="120" rx="15" transform="rotate(24 315 530)" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
${seamLine("M352 470 L448 470")}
<rect x="362" y="500" width="76" height="60" rx="12" fill="${SHADE}" stroke="${SEAM}" stroke-width="3"/>
${xMark(400, 600, 34)}`);

/* 9 — Protective Arm Sleeves */
files["protective-arm-sleeves.svg"] = frame("Arm Sleeves", "Sold as a pair", `
<path d="M296 330 L368 330 L350 730 L278 730 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M432 330 L504 330 L522 730 L450 730 Z" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<rect x="292" y="322" width="80" height="30" rx="10" fill="${RIB}"/>
<rect x="428" y="322" width="80" height="30" rx="10" fill="${RIB}"/>
<rect x="276" y="700" width="76" height="30" rx="10" fill="${RIB}"/>
<rect x="448" y="700" width="76" height="30" rx="10" fill="${RIB}"/>
${seamLine("M332 380 L322 680 M468 380 L478 680")}
${xMark(332, 530, 44)}
<path d="M448 420 L496 420" stroke="${RED}" stroke-width="8" opacity="0.9"/>`);

/* 10 — Protective Neck Gaiter */
files["protective-neck-gaiter.svg"] = frame("Neck Gaiter", "One-size stretch fit", `
<rect x="268" y="380" width="264" height="270" rx="64" fill="${BODY}" stroke="${SHADE}" stroke-width="4"/>
<path d="M268 460 L532 460 M268 540 L532 540 M268 610 L532 610" stroke="${SHADE}" stroke-width="8"/>
<path d="M268 610 L532 610" stroke="${RIB}" stroke-width="6"/>
<ellipse cx="400" cy="380" rx="132" ry="26" fill="${RIB}"/>
<ellipse cx="400" cy="380" rx="104" ry="15" fill="${INK}"/>
${xMark(400, 505, 72)}`);

for (const [rel, content] of Object.entries(files)) {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  console.log("wrote", rel);
}
