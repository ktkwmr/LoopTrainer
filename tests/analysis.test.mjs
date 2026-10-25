// Unit tests for the beat and bar analysis in public/looptrainer/index.html (no browser needed).
// The code between "BEGIN analysis" and "END analysis" is taken from index.html, so the app and the tests cannot drift.
//   node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { makeSong, RATE } from "./signals.mjs";

const html = readFileSync(new URL("../public/looptrainer/index.html", import.meta.url), "utf8");
const m = html.match(/\/\/ BEGIN analysis[^\n]*\n([\s\S]*?)\/\/ END analysis/);
assert.ok(m, "analysis markers not found in index.html");
const { detectBeats, barPhaseOf } = new Function(m[1] + "\nreturn { detectBeats, barPhaseOf };")();
const LEAD = 0.01;
const go = async () => true;

// ms between each detected beat and the nearest true beat
const errors = (found, truth) => [...found].map((b) => truth.reduce((best, t) => (Math.abs(b - t) < Math.abs(best) ? b - t : best), Infinity) * 1000);

for (const [style, bpm, offset] of [["clicks", 97, 0.37], ["rock", 128, 0.21], ["rock", 92, 0.5]]) {
  test(`${style} at ${bpm} BPM: tempo within 1 %, beats within 6 ms`, async () => {
    const s = makeSong({ bpm, offset, dur: 30, style });
    const r = await detectBeats(s.L, null, RATE, go);
    assert.ok(r, "no beats found");
    assert.ok(Math.abs(r.tempo - bpm) / bpm < 0.01, `tempo ${r.tempo}`);
    const e = errors(r.beats, s.beats);
    assert.ok(Math.max(...e.map(Math.abs)) < 6, `max error ${Math.max(...e.map(Math.abs)).toFixed(1)} ms`);
    assert.ok(r.beats.length >= s.beats.length - 2, `found ${r.beats.length} of ${s.beats.length} beats`);
  });
}

for (const [name, f] of [
  ["a steady tone", (t) => 0.4 * Math.sin(2 * Math.PI * 440 * t)],
  ["noise", (() => { let s = 3; return () => ((s = (s * 16807) % 2147483647) / 2147483647 - 0.5) * 0.4; })()],
]) {
  test(`${name}: no beats`, async () => {
    const L = new Float32Array(RATE * 20);
    for (let i = 0; i < L.length; i++) L[i] = f(i / RATE);
    assert.equal(await detectBeats(L, null, RATE, go), null);
  });
}

// pickup: the song starts that many beats before a bar, so "the first beat is the bar start" would be wrong
for (const [style, bpm, meter, offset, pickup] of [["rock", 120, 4, 0.3, 0], ["rock", 100, 4, 1.1, 1], ["rock", 132, 4, 0.2, 2], ["rock", 90, 4, 0.6, 3], ["waltz", 150, 3, 0.4, 1], ["waltz", 132, 3, 0.4, 2]]) {
  test(`${style} in ${meter}, starting ${pickup} beats before a bar: bar starts land on the true first beats`, async () => {
    const s = makeSong({ bpm, offset, dur: 40, meter, pickup, style });
    const r = await detectBeats(s.L, null, RATE, go);
    assert.ok(r, "no beats found");
    const phase = barPhaseOf(r, meter);
    const heads = [...r.beats].filter((x, i) => i % meter === phase);
    const e = errors(heads, s.bars);
    const hits = e.filter((x) => Math.abs(x) < 20).length;
    assert.ok(hits / heads.length > 0.9, `${hits} of ${heads.length} bar starts on a true bar start`);
  });
}

test("stops when pause() says so", async () => {
  const s = makeSong({ bpm: 120, offset: 0.2, dur: 30, style: "rock" });
  assert.equal(await detectBeats(s.L, null, RATE, async () => false), null);
});

test("LEAD keeps loop points before the beat", () => {
  assert.ok(LEAD > 0 && LEAD < 0.03);
});
