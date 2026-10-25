#!/usr/bin/env node
// Takes the app screenshots used in the guide page:
//   public/looptrainer/images/guide/{en,ja}-{player,settings,phone}.png
// The song is a made-up test signal (tests/signals.mjs), so there is no copyright issue.
// Requires Playwright and SoundTouchJS (the same version as the app loads):
//   npm install --no-save playwright@1.63.0 soundtouchjs@0.3.0 && npx playwright install chromium
// Then:
//   node scripts/render-guide-images.mjs
// Re-run it when the app's look changes.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { makeSong, wav } from "../tests/signals.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const PUBLIC = fileURLToPath(new URL("../public/", import.meta.url));
const OUT = join(PUBLIC, "looptrainer/images/guide/");
const ST = await readFile(require.resolve("soundtouchjs"));
const ST_URL = (await readFile(join(PUBLIC, "looptrainer/index.html"), "utf8")).match(/const ST_URL = "([^"]+)"/)[1];
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".md": "text/markdown; charset=utf-8" };
const PATH = { en: "/looptrainer/?lang=en", ja: "/looptrainer/ja/" };

// Minimal static server for public/ (the app needs http:// for its absolute paths)
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = normalize(join(PUBLIC, path));
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  try {
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" }).end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// A made-up rock song at 120 BPM, 40 s, starting one beat before a bar. Passed as a buffer: a file path with
// Japanese characters does not reach the page when the system locale is POSIX
const song = makeSong({ bpm: 120, offset: 0.3, dur: 40, pickup: 1, style: "rock" });
const SONG = {
  en: { name: "practice-song.wav", mimeType: "audio/wav", buffer: wav(song.L) },
  ja: { name: "練習曲.wav", mimeType: "audio/wav", buffer: wav(song.L) },
};

// Numbered markers drawn next to controls, matching the numbered lists in the guide.
// side: "left" | "right" | "inside" (top-right corner of the element) | "below" (under the left edge)
async function addMarkers(page, targets) {
  await page.evaluate((targets) => {
    targets.forEach(([sel, n, side]) => {
      const el = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
      if (!el) throw new Error("marker target not found: " + sel);
      const r = el.getBoundingClientRect();
      const m = document.createElement("div");
      m.textContent = n;
      m.className = "guide-marker";
      const size = 22;
      const x = side === "left" ? r.left - size - 4 : side === "inside" ? r.right - size - 6 : side === "below" ? r.left : r.right + 4;
      const y = side === "inside" ? r.top + 6 : side === "below" ? r.bottom + 4 : r.top + r.height / 2 - size / 2;
      Object.assign(m.style, {
        position: "absolute", left: x + scrollX + "px", top: y + scrollY + "px", width: size + "px", height: size + "px", zIndex: 99999,
        borderRadius: "50%", background: "#e11d48", color: "#fff", font: "700 13px/22px system-ui, sans-serif",
        textAlign: "center", boxShadow: "0 0 0 2px #fff", pointerEvents: "none",
      });
      document.body.appendChild(m);
    });
  }, targets);
}
const clearMarkers = (page) => page.evaluate(() => document.querySelectorAll(".guide-marker").forEach((m) => m.remove()));

// Open the song and set it up like a practice session: a loop of two bars at 70 %, key +2, one saved loop
async function setUp(page, lang) {
  await page.route(ST_URL, (r) => r.fulfill({ status: 200, contentType: "text/javascript", headers: { "access-control-allow-origin": "*" }, body: ST }));
  await page.route("https://static.cloudflareinsights.com/**", (r) => r.fulfill({ status: 200, contentType: "text/javascript", body: "" }));
  await page.goto(origin + PATH[lang]);
  await page.setInputFiles("#fileInput", SONG[lang]);
  await page.waitForFunction(() => /≈/.test(document.getElementById("tempo").textContent), null, { timeout: 60000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  const box = await page.locator("#wave").boundingBox();
  const X = (sec) => box.x + (sec / 40) * box.width, y = box.y + box.height / 2;
  // The bar starts are on 2.3 s, 4.3 s, …: snap to bar starts and drag over two bars
  await page.click("#barBtn");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.mouse.move(X(12.4), y); await page.mouse.down(); await page.mouse.move(X(16.2), y, { steps: 8 }); await page.mouse.up();
  await page.click('[data-preset="70"]');
  await page.click("#keyUp"); await page.click("#keyUp");
  await page.click("#saveSecBtn");
  await page.fill(".sec-name", lang === "ja" ? "サビ" : "Chorus");
  await page.locator(".sec-name").blur();
  await page.evaluate(() => { window.scrollTo(0, 0); document.activeElement && document.activeElement.blur(); });
  await page.mouse.move(0, 0);
  await page.waitForTimeout(300);
}

async function shot(page, selector, file, pad = 30) {
  const b = await page.locator(selector).boundingBox();
  await page.screenshot({ path: join(OUT, file), fullPage: true, clip: { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - 10), width: b.width + pad * 2, height: b.height + 20 } });
  console.log("Wrote images/guide/" + file);
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
for (const lang of ["en", "ja"]) {
  // Computer: the player and the practice settings, with numbered markers
  const ctx = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1100, height: 1400 }, deviceScaleFactor: 2, locale: lang === "ja" ? "ja-JP" : "en-US" });
  const page = await ctx.newPage();
  await setUp(page, lang);
  await addMarkers(page, [
    ["#openBtn", 1, "left"], ["#waveWrap", 2, "inside"], ["#tempo", 3, "left"], ["#zoomBtn", 4, "below"],
    [".status .tile", 5, "inside"], ["#toStartBtn", 6, "below"], ["#playBtn", 7, "inside"], ["#loopBtn", 8, "inside"],
    ["#setA", 9, "inside"], ["#saveSecBtn", 10, "left"],
  ]);
  await shot(page, ".panel.out", `${lang}-player.png`);
  await clearMarkers(page);
  await addMarkers(page, [
    ["#speedSlider", 1, "left"], ["#keyDown", 2, "left"], ["#barBtn", 3, "right"], ["#autoBtn", 4, "left"],
    ["#countBtn", 5, "left"], ["#sections", 6, "left"], ["#vol", 7, "inside"],
  ]);
  await shot(page, ".panel:not(.out)", `${lang}-settings.png`);
  await ctx.close();

  // Phone: the top of the page
  const phone = await browser.newContext({ serviceWorkers: "block", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: lang === "ja" ? "ja-JP" : "en-US" });
  const pp = await phone.newPage();
  await setUp(pp, lang);
  await pp.screenshot({ path: join(OUT, `${lang}-phone.png`) });
  console.log(`Wrote images/guide/${lang}-phone.png`);
  await phone.close();
}
await browser.close();
server.close();
