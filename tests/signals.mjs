// Test signals with a known tempo, beat positions, and bar starts (made up here, so no copyright issue).
// Used by tests/analysis.test.mjs and scripts/render-guide-images.mjs.
export const RATE = 44100;

// Small deterministic random numbers, so every run makes the same signal
function random(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647) * 2 - 1;
}

function hit(out, t, kind, amp, rnd, freq = 220) {
  const s0 = Math.round(t * RATE);
  for (let i = 0; i < RATE * 0.35 && s0 + i < out.length; i++) {
    const tt = i / RATE;
    let v = 0;
    if (kind === "click") v = rnd() * Math.exp(-tt * 300);
    else if (kind === "kick") v = Math.sin(2 * Math.PI * (50 + 100 * Math.exp(-tt * 30)) * tt) * Math.exp(-tt * 12);
    else if (kind === "snare") v = (rnd() * 0.7 + 0.3 * Math.sin(2 * Math.PI * 190 * tt)) * Math.exp(-tt * 20);
    else if (kind === "hat") v = rnd() * Math.exp(-tt * 120) * 0.3;
    else if (kind === "bass") v = Math.sin(2 * Math.PI * freq * tt) * Math.exp(-tt * 4);
    out[s0 + i] += v * amp;
  }
}

// A sustained chord (three sine tones) from t0 for dur seconds
function chord(out, t0, dur, freqs, amp) {
  const s0 = Math.round(t0 * RATE), n = Math.round(dur * RATE);
  for (let i = 0; i < n && s0 + i < out.length; i++) {
    const tt = i / RATE, env = Math.min(1, tt / 0.02) * Math.min(1, (dur - tt) / 0.05);
    let v = 0;
    for (const f of freqs) v += Math.sin(2 * Math.PI * f * tt);
    out[s0 + i] += (v / freqs.length) * amp * env;
  }
}

const NOTE = (n) => 440 * Math.pow(2, (n - 69) / 12);
// C, Am, F, G and C, F, G for the waltz (MIDI note numbers)
const PROGRESSION = [[48, 60, 64, 67], [45, 57, 60, 64], [41, 57, 60, 65], [43, 55, 59, 62]];

/**
 * @param {object} o
 * @param {number} o.bpm
 * @param {number} o.offset   time of the first beat (s)
 * @param {number} o.dur      length (s)
 * @param {number} [o.meter]  beats per bar
 * @param {number} [o.pickup] beats before the first bar starts (the song begins in the middle of a bar)
 * @param {"clicks"|"rock"|"waltz"} o.style
 * @returns {{ L: Float32Array, beats: number[], bars: number[] }}
 */
export function makeSong({ bpm, offset, dur, meter = 4, pickup = 0, style }) {
  const L = new Float32Array(Math.round(RATE * dur)), rnd = random(7), p = 60 / bpm;
  const beats = [], bars = [];
  for (let k = 0, t = offset; t < dur - 0.4; k++, t = offset + k * p) {
    beats.push(t);
    const pos = k - pickup + meter * 8, head = pos % meter === 0, bar = Math.floor(pos / meter), notes = PROGRESSION[bar % PROGRESSION.length];
    if (head) bars.push(t);
    if (style === "clicks") hit(L, t, "click", 1, rnd);
    if (style === "rock") {
      // Kick on 1 and 3, snare on 2 and 4, eighth-note hi-hat, a new chord every bar
      hit(L, t, pos % 2 ? "snare" : "kick", 0.7, rnd);
      hit(L, t, "hat", 1, rnd); hit(L, t + p / 2, "hat", 1, rnd);
      if (head || k === 0) chord(L, t, p * (head ? meter : meter - (pos % meter)), notes.slice(1).map(NOTE), 0.25);
      hit(L, t, "bass", 0.35, rnd, NOTE(notes[0]));
    }
    if (style === "waltz") {
      // Bass on 1, chord on 2 and 3, a new harmony every bar
      if (head) { hit(L, t, "bass", 0.7, rnd, NOTE(notes[0])); chord(L, t, p * meter, notes.slice(1).map(NOTE), 0.12); }
      else chord(L, t, p * 0.4, notes.slice(1).map((n) => NOTE(n + 12)), 0.3);
      hit(L, t, "hat", 0.6, rnd);
    }
  }
  return { L, beats, bars };
}

/** WAV (16-bit mono) bytes of a signal */
export function wav(L) {
  const n = L.length, buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(RATE, 24);
  buf.writeUInt32LE(RATE * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 30000), 44 + i * 2);
  return buf;
}
