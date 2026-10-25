// Numbers used by the articles, so their tables are calculated instead of typed.
// The app's limits are read from public/looptrainer/index.html, so a change in the app shows up here
// (and the build stops if the constants cannot be found).
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../../public/looptrainer/index.html", import.meta.url), "utf8");
function constant(name) {
  const m = html.match(new RegExp(`\\b${name} = (-?[\\d.]+)`));
  if (!m) throw new Error(`scripts/pages/practice.mjs: ${name} not found in index.html`);
  return +m[1];
}
export const SPEED_MIN = constant("SPEED_MIN");
export const SPEED_MAX = constant("SPEED_MAX");
export const SEMI_MAX = constant("SEMI_MAX");

/** The tempo you hear (BPM) when a song at `bpm` is played at `percent` % */
export const heardBpm = (bpm, percent) => Math.round((bpm * percent) / 100);

/**
 * Speeding up on every loop: the speeds of each pass from `start` to `max` in steps of `step`
 * (as the app does: the first pass at `start`, then + `step` each time the loop comes around, never above `max`).
 */
export function passes(start, step, max) {
  const out = [start];
  while (out[out.length - 1] < max) out.push(Math.min(max, out[out.length - 1] + step));
  return out;
}
/** How long (s) all passes take for a loop that lasts `loopSec` at 100 % */
export const rampSeconds = (loopSec, list) => list.reduce((t, p) => t + (loopSec * 100) / p, 0);
/** Seconds as "m:ss" */
export const mmss = (sec) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, "0")}`;
/** Length (s) of `bars` bars of `beats` beats at `bpm` */
export const barsSeconds = (bars, beats, bpm) => (bars * beats * 60) / bpm;

// Key names. Sharps for the sharp keys, flats for the flat keys, as usually written for major keys
const NAMES = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const NAMES_JA = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
export const KEYS = NAMES;
/** The key `semitones` above (or below, when negative) `key` */
export function shiftKey(key, semitones, ja = false) {
  const i = NAMES.indexOf(key);
  if (i < 0) throw new Error("unknown key " + key);
  return (ja ? NAMES_JA : NAMES)[(((i + semitones) % 12) + 12) % 12];
}
/** Pitch ratio of a shift in semitones (equal temperament) */
export const ratio = (semitones) => Math.pow(2, semitones / 12);
