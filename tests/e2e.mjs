// Browser test of the app with Playwright (Chromium): open a file, beats and bars, loop and snapping, speed and key
// (measured on the audio output), auto speed-up, count-in, saving, the Japanese page, and no CSP violations or errors.
//
// Needs (once): npm install --no-save playwright@1.63.0 soundtouchjs@0.3.0 && npx playwright install chromium
//   node tests/e2e.mjs
//
// public/ is served by a small server here with the headers from public/_headers (so the CSP is checked).
// The CDN is not used: SoundTouchJS is served from node_modules, and the Service Worker is blocked because requests
// from it would bypass page.route (WEBAPP_BASELINE.md §12-11).
import { createServer } from "node:http";
import { readFile, writeFile, mkdtemp } from "node:fs/promises";
import { join, extname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { makeSong, wav } from "./signals.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const ROOT = fileURLToPath(new URL("../public/", import.meta.url));
const ST = await readFile(require.resolve("soundtouchjs"));
const ST_URL = (await readFile(join(ROOT, "looptrainer/index.html"), "utf8")).match(/const ST_URL = "([^"]+)"/)[1];

// ---------- static server with public/_headers ----------
const headersFile = await readFile(join(ROOT, "_headers"), "utf8");
const HEADERS = {};
for (const line of headersFile.split("\n")) {
  const m = line.match(/^\s+([\w-]+):\s*(.+)$/);
  if (m) HEADERS[m[1]] = m[2];
}
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".md": "text/markdown; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".xml": "application/xml" };
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  try {
    const body = await readFile(join(ROOT, path));
    res.writeHead(200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream", ...HEADERS });
    res.end(body);
  } catch {
    res.writeHead(404, HEADERS); res.end("not found");
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}`;

// ---------- test song: rock at 120 BPM, starting one beat before a bar ----------
const BPM = 120, OFFSET = 0.3, P = 60 / BPM, LEAD = 0.01;
const song = makeSong({ bpm: BPM, offset: OFFSET, dur: 30, pickup: 1, style: "rock" });
// A pure tone for measuring pitch (no beats in it)
const tone = new Float32Array(44100 * 12);
for (let i = 0; i < tone.length; i++) tone[i] = 0.4 * Math.sin(2 * Math.PI * 440 * i / 44100);
const dir = await mkdtemp(join(tmpdir(), "looptrainer-"));
const SONG = join(dir, "rock120.wav"), TONE = join(dir, "tone440.wav");
await writeFile(SONG, wav(song.L)); await writeFile(TONE, wav(tone));
const offBeat = (sec) => Math.round(Math.min(...song.beats.map((b) => Math.abs(sec + LEAD - b))) * 1000);
const offBar = (sec) => Math.round(Math.min(...song.bars.map((b) => Math.abs(sec + LEAD - b))) * 1000);

const browser = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
let failed = 0;
async function check(name, fn) {
  try { await fn(); console.log("ok   " + name); }
  catch (e) { failed++; console.log("FAIL " + name + "\n     " + String(e.message || e).split("\n").join("\n     ")); }
}
async function newPage(opts = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 }, ...opts });
  await ctx.route(ST_URL, (r) => r.fulfill({ status: 200, contentType: "text/javascript", headers: { "access-control-allow-origin": "*" }, body: ST }));
  await ctx.route("https://static.cloudflareinsights.com/**", (r) => r.fulfill({ status: 200, contentType: "text/javascript", body: "" }));
  await ctx.addInitScript(() => {
    window.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => window.__csp.push(e.violatedDirective + " " + e.blockedURI));
    // Tap everything that goes to the speakers, to measure the pitch of the output
    const orig = AudioNode.prototype.connect;
    AudioNode.prototype.connect = function (dest, ...rest) {
      const r = orig.call(this, dest, ...rest);
      if (dest instanceof AudioDestinationNode) {
        const c = this.context;
        if (!c.__an) { c.__an = c.createAnalyser(); c.__an.fftSize = 32768; window.__ctx = c; }
        orig.call(this, c.__an);
      }
      return r;
    };
    window.__pitch = () => {
      const an = window.__ctx.__an, d = new Float32Array(an.fftSize);
      an.getFloatTimeDomainData(d);
      let z = 0;
      for (let i = 1; i < d.length; i++) if (d[i - 1] < 0 && d[i] >= 0) z++;
      return z / (d.length / window.__ctx.sampleRate);
    };
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  return { ctx, page, errors };
}
// The saved state is written 0.4 s after a change
const saved = async (page) => { await page.waitForTimeout(500); return page.evaluate(() => Object.values(JSON.parse(localStorage.getItem("looptrainer-state")).songs)[0]); };
const text = (page, sel) => page.textContent(sel);

// ---------- English page, computer ----------
{
  const { ctx, page, errors } = await newPage();
  await page.goto(BASE + "/looptrainer/");
  await page.setInputFiles("#fileInput", SONG);
  await page.waitForFunction(() => /≈/.test(document.getElementById("tempo").textContent), null, { timeout: 60000 });
  // Buttons further down scroll the page: go back to the top before using the waveform, so its position is the same
  const top = () => page.evaluate(() => window.scrollTo(0, 0));
  await top();
  const box = await page.locator("#wave").boundingBox();
  const X = (sec) => box.x + (sec / 30) * box.width, y = box.y + box.height / 2;

  await check("tempo is found and used for the count-in", async () => {
    assert.match(await text(page, "#tempo"), /≈ 120/);
    assert.equal(await page.inputValue("#bpmInput"), "120");
  });
  await check("dragging a loop snaps both ends to beats", async () => {
    await top();
    await page.mouse.move(X(5.1), y); await page.mouse.down(); await page.mouse.move(X(8.85), y, { steps: 8 }); await page.mouse.up();
    const s = await saved(page);
    assert.ok(offBeat(s.a) <= 6 && offBeat(s.b) <= 6, `A ${s.a} B ${s.b}`);
    assert.ok(s.loop);
  });
  await check("▶ moves A by one beat", async () => {
    const a0 = (await saved(page)).a;
    await page.click('[data-nudge="a:1"]');
    assert.ok(Math.abs((await saved(page)).a - a0 - P) < 0.01);
  });
  await check("snapping to bar starts lands on true bar starts (song starts one beat before a bar)", async () => {
    await page.click("#barBtn");
    await top();
    await page.mouse.move(X(6.3), y); await page.mouse.down(); await page.mouse.move(X(13.6), y, { steps: 8 }); await page.mouse.up();
    const s = await saved(page);
    assert.ok(offBar(s.a) <= 6 && offBar(s.b) <= 6, `A ${s.a} (${offBar(s.a)} ms) B ${s.b} (${offBar(s.b)} ms)`);
    assert.match(await text(page, "#loopSub"), /bars?/);
  });
  await check("tap a flag, then tap where it should go", async () => {
    const s = await saved(page);
    await top();
    await page.mouse.click(X(s.a) + 8, box.y + 8);
    assert.ok(await page.isVisible("#armHint"));
    await page.mouse.click(X(2.2), y);
    const s2 = await saved(page);
    assert.ok(offBar(s2.a) <= 6 && s2.a < s.a, `A ${s2.a}`);
    assert.ok(!(await page.isVisible("#armHint")));
    await page.click("#barBtn");
  });
  await check("plays at 70 % inside the loop, and the loop comes around", async () => {
    await page.locator("#speedSlider").fill("70");
    assert.match(await text(page, "#tempo"), /≈ 84 \(original 120\)/);
    const s = await saved(page);
    await page.click("#playBtn");
    await page.waitForTimeout(800);
    const t1 = await page.evaluate(() => [performance.now(), document.querySelector("#time b").textContent]);
    await page.waitForTimeout(1500);
    const t2 = await page.evaluate(() => [performance.now(), document.querySelector("#time b").textContent]);
    const sec = (str) => { const [m, x] = str.split(":"); return +m * 60 + +x; };
    const rate = (sec(t2[1]) - sec(t1[1])) / ((t2[0] - t1[0]) / 1000);
    assert.ok(sec(t1[1]) >= s.a - 0.1 && sec(t1[1]) <= s.b, `position ${t1[1]} outside ${s.a}–${s.b}`);
    assert.ok(Math.abs(rate - 0.7) < 0.12, `played ${rate.toFixed(2)} s per s`);
    await page.waitForFunction(() => /Loop [2-9]/.test(document.getElementById("loopSub").textContent), null, { timeout: (s.b - s.a) / 0.7 * 1000 + 4000 });
    await page.click("#playBtn");
  });
  await check("speed-up on every loop, with a count-in", async () => {
    await page.click("#autoBtn"); await page.click("#countBtn");
    await page.click("#toStartBtn"); await page.click("#playBtn");
    await page.waitForTimeout(300);
    assert.match(await text(page, "#time b"), /Count-in/);
    await page.waitForFunction(() => document.getElementById("speedBig").textContent === "72%", null, { timeout: 20000 });
    await page.click("#playBtn");
    await page.click("#autoBtn"); await page.click("#countBtn");
  });
  await check("saved loops come back when the same file is opened again", async () => {
    await page.click("#saveSecBtn");
    await page.fill(".sec-name", "Chorus");
    await saved(page);
    await page.reload();
    await page.setInputFiles("#fileInput", SONG);
    await page.waitForFunction(() => !document.getElementById("playBtn").disabled);
    assert.deepEqual(await page.$$eval(".sec-name", (els) => els.map((e) => e.value)), ["Chorus"]);
    assert.match(await text(page, "#notice"), /left off/);
  });
  await check("Ctrl + wheel zooms in, Z goes back to the whole song", async () => {
    await top();
    await page.mouse.move(X(15), y);
    await page.keyboard.down("Control"); for (let i = 0; i < 4; i++) await page.mouse.wheel(0, -100); await page.keyboard.up("Control");
    await page.waitForTimeout(100);
    assert.equal(await page.getAttribute("#zoomBtn", "aria-pressed"), "true");
    await page.keyboard.press("z");
    assert.equal(await page.getAttribute("#zoomBtn", "aria-pressed"), "false");
  });
  await check("no CSP violations or errors", async () => {
    assert.deepEqual(await page.evaluate(() => window.__csp), []);
    assert.deepEqual(errors, []);
  });
  await ctx.close();
}

// ---------- pitch and speed, measured on the output ----------
{
  const { ctx, page, errors } = await newPage();
  await page.goto(BASE + "/looptrainer/");
  await page.setInputFiles("#fileInput", TONE);
  await page.waitForFunction(() => !document.getElementById("playBtn").disabled);
  await page.click("#playBtn");
  const pitch = async () => { await page.waitForTimeout(1300); return page.evaluate(() => window.__pitch()); };
  await check("100 %: 440 Hz", async () => { const hz = await pitch(); assert.ok(Math.abs(hz - 440) < 6, `${hz}`); });
  await check("50 %: still 440 Hz", async () => { await page.locator("#speedSlider").fill("50"); const hz = await pitch(); assert.ok(Math.abs(hz - 440) < 6, `${hz}`); });
  await check("Original speed sets 100 % again", async () => {
    assert.ok(!(await page.isDisabled("#speedReset")));
    await page.click("#speedReset");
    assert.equal(await text(page, "#speedBig"), "100%");
    assert.ok(await page.isDisabled("#speedReset"));
  });
  await check("key +2: 493.9 Hz", async () => { await page.click("#keyUp"); await page.click("#keyUp"); const hz = await pitch(); assert.ok(Math.abs(hz - 493.9) < 6, `${hz}`); });
  await check("key −3: 370 Hz", async () => { for (let i = 0; i < 5; i++) await page.click("#keyDown"); const hz = await pitch(); assert.ok(Math.abs(hz - 370) < 6, `${hz}`); });
  await check("no beats in a steady tone", async () => { await page.waitForFunction(() => !/…/.test(document.getElementById("tempo").textContent)); assert.doesNotMatch(await text(page, "#tempo"), /≈/); });
  await check("no errors", async () => { assert.deepEqual(errors, []); });
  await ctx.close();
}

// ---------- Japanese page, phone (touch) ----------
{
  const { ctx, page, errors } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(BASE + "/looptrainer/ja/");
  await check("Japanese text on /ja/", async () => {
    assert.equal(await page.getAttribute("html", "lang"), "ja");
    assert.match(await text(page, "#introTitle"), /キーとテンポ/);
  });
  await page.setInputFiles("#fileInput", SONG);
  await page.waitForFunction(() => /≈/.test(document.getElementById("tempo").textContent), null, { timeout: 60000 });
  const cdp = await ctx.newCDPSession(page);
  const box = await page.locator("#wave").boundingBox();
  const X = (sec) => box.x + (sec / 30) * box.width, y = box.y + box.height / 2;
  const touch = (type, xs) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: xs.map((x, i) => ({ x, y, id: i + 1 })) });
  await check("long-press B and drag it", async () => {
    const s = await saved(page);
    await touch("touchStart", [X(s.b) - 4]);
    await page.waitForTimeout(500);
    assert.match(await text(page, "#armHint"), /掴んで/);
    for (const sec of [25, 20, 15.1]) { await touch("touchMove", [X(sec)]); await page.waitForTimeout(30); }
    await touch("touchEnd", []);
    const s2 = await saved(page);
    assert.ok(offBeat(s2.b) <= 6 && s2.b < 16 && s2.b > 14, `B ${s2.b}`);
  });
  await check("pinch out zooms in, pinch in goes back", async () => {
    const cx = box.x + box.width / 2;
    await touch("touchStart", [cx - 20]); await touch("touchStart", [cx - 20, cx + 20]);
    for (let d = 20; d <= 140; d += 30) await touch("touchMove", [cx - d, cx + d]);
    await touch("touchEnd", [cx - 140]); await touch("touchEnd", []);
    assert.equal(await page.getAttribute("#zoomBtn", "aria-pressed"), "true");
    await touch("touchStart", [cx - 150]); await touch("touchStart", [cx - 150, cx + 150]);
    for (let d = 150; d >= 10; d -= 35) await touch("touchMove", [cx - d, cx + d]);
    await touch("touchEnd", [cx]); await touch("touchEnd", []);
    assert.equal(await page.getAttribute("#zoomBtn", "aria-pressed"), "false");
  });
  await check("no CSP violations or errors", async () => {
    assert.deepEqual(await page.evaluate(() => window.__csp), []);
    assert.deepEqual(errors, []);
  });
  await ctx.close();
}

// ---------- install hint on iPhone: after a file is opened, once ----------
{
  const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
  const { ctx, page, errors } = await newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent: UA });
  await page.goto(BASE + "/looptrainer/ja/");
  await check("iPhone: no install hint before a file is opened", async () => { assert.ok(await page.isHidden("#installBar")); });
  await page.setInputFiles("#fileInput", SONG);
  await page.waitForFunction(() => !document.getElementById("playBtn").disabled);
  await check("iPhone: “Add to Home Screen” hint after a file is opened", async () => {
    assert.ok(await page.isVisible("#installBar"));
    assert.match(await text(page, "#installText"), /ホーム画面に追加/);
    assert.ok(await page.isHidden("#installBtn"));
  });
  await check("iPhone: the hint is not shown again on the next visit", async () => {
    await page.reload();
    assert.ok(await page.isHidden("#installBar"));
  });
  await check("no errors", async () => { assert.deepEqual(errors, []); });
  await ctx.close();
}

await browser.close();
server.close();
console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
