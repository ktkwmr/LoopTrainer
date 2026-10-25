// Article: changing the key (tuned-down recordings, capo, singing range), with a calculated key table
import { wideTable } from "./layout.mjs";
import { KEYS, shiftKey, ratio, SEMI_MAX } from "./practice.mjs";

const SHIFTS = [-3, -2, -1, 1, 2, 3];
const sign = (n) => (n > 0 ? "+" + n : "−" + Math.abs(n));

function keyTable(lang) {
  const ja = lang === "ja";
  const head = `<th scope="col">${ja ? "原曲のキー" : "Original key"}</th>` + SHIFTS.map((n) => `<th scope="col">${sign(n)}</th>`).join("");
  const rows = KEYS.map((k) => `<tr><th scope="row">${k}</th>${SHIFTS.map((n) => `<td>${shiftKey(k, n, ja)}</td>`).join("")}</tr>`).join("\n      ");
  return wideTable(lang, `<table>
    <thead><tr>${head}</tr></thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`);
}

// [situation, shift] — the shift to apply to the recording in Loop Trainer
const CASES = {
  en: [
    ["The recording is tuned down a half step (E♭ tuning), and you play in standard tuning", "+1"],
    ["The recording is tuned down a whole step (D tuning), and you play in standard tuning", "+2"],
    ["The recording is in standard tuning, and your guitar is tuned down a half step", "−1"],
    ["The recording uses a capo on fret 2, and you want to play the same shapes without a capo", "−2"],
    ["The recording uses a capo on fret 3, and you want to put your capo on fret 1", "−2"],
    ["The song is too high to sing", "−1 to −3, as far as it feels comfortable"],
  ],
  ja: [
    ["録音が半音下げチューニング（E♭ チューニング）で、自分はレギュラーチューニング", "+1"],
    ["録音が全音下げチューニング（D チューニング）で、自分はレギュラーチューニング", "+2"],
    ["録音はレギュラーチューニングで、自分のギターが半音下げ", "−1"],
    ["録音はカポ 2 フレットで、同じフォームをカポなしで弾きたい", "−2"],
    ["録音はカポ 3 フレットで、自分はカポ 1 フレットで弾きたい", "−2"],
    ["歌うには高すぎる", "−1〜−3（楽に歌えるところまで）"],
  ],
};
const caseTable = (lang) => `<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">${lang === "ja" ? "場面" : "Situation"}</th><th scope="col">${lang === "ja" ? "キーの設定" : "Key setting"}</th></tr></thead>
    <tbody>
${CASES[lang].map(([s, k]) => `      <tr><td>${s}</td><td data-label="${lang === "ja" ? "キー：" : "Key:"}"><b>${k}</b></td></tr>`).join("\n")}
    </tbody>
  </table>
</div>`;

export default {
  slug: "change-key",
  en: {
    title: "Change the Key of a Song Without Changing the Tempo: Tuning, Capo, and Vocal Range",
    heading: "Changing the key: tuned-down recordings, capo, and vocal range",
    nav: "Changing the key",
    description:
      "When and how to shift the key of a recording by semitones without changing the tempo: play along with songs in E♭ or D tuning, match a capo position, or move a song to fit your voice. With a key table.",
    body: () => `
<p class="lead">Loop Trainer can move a recording up or down by up to ${SEMI_MAX} semitones without changing its tempo. This is useful whenever the recording and your instrument (or your voice) are not in the same key.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#semitones">Semitones in one minute</a></li>
  <li><a href="#cases">How many semitones? Common situations</a></li>
  <li><a href="#table">Key table</a></li>
  <li><a href="#tips">Tips</a></li>
</ol></nav>

<h2 id="semitones">Semitones in one minute</h2>
<p>A semitone (half step) is the distance of one fret on a guitar. Twelve semitones make an octave. Shifting the key by +1 raises every note by one fret's worth: E becomes F, A becomes B♭. Each semitone changes the pitch by a factor of ${ratio(1).toFixed(4)}, so +2 is ${ratio(2).toFixed(3)} times the original frequency.</p>
<p>Changing the key on a record player or a tape changes the speed too. Loop Trainer changes the pitch and the speed separately, so you can use the key and the speed together: for example −1 and 70%.</p>

<h2 id="cases">How many semitones? Common situations</h2>
${caseTable("en")}
<p>The rule behind all of these: move the recording toward where your instrument is. If the recording is lower than your guitar, shift it up; if it is higher, shift it down.</p>
<div class="note"><p>Many rock and metal recordings are in E♭ tuning. If the chords you hear seem to sit between two frets, try +1 first.</p></div>

<h2 id="table">Key table</h2>
<p>The key of the song after shifting it. For example, a song in E shifted by −2 is in D.</p>
${keyTable("en")}
<p class="cap">Keys are written with sharps or flats as they are usually named (F♯ rather than G♭).</p>

<h2 id="tips">Tips</h2>
<ul>
  <li><b>Small shifts sound most natural.</b> One or two semitones are hard to notice; larger shifts make voices sound a little unnatural.</li>
  <li><b>Check by ear.</b> Play a note along with the recording. If it beats or sounds sour, try one semitone either way.</li>
  <li><b>The key is saved for each song</b>, together with the loops and the speed. “Original key” sets it back to ±0.</li>
  <li><b>For learning by ear</b>, find the notes in the shifted key, then remember the shift when you write them down. See <a href="../learn-by-ear/">learning by ear</a>.</li>
</ul>
`,
  },
  ja: {
    title: "テンポを変えずに曲のキーを変える：半音下げチューニング・カポ・歌いやすいキー",
    heading: "キー変更の使い方：半音下げチューニング・カポ・歌いやすいキー",
    nav: "キー変更の使い方",
    description:
      "録音のキーをテンポそのままで半音単位で変える場面と方法。半音下げ・全音下げチューニングの曲に合わせる、カポの位置を合わせる、歌いやすいキーに移す。キーの早見表付き。",
    body: () => `
<p class="lead">Loop Trainer は、録音をテンポそのままで上下 ${SEMI_MAX} 半音まで移せます。録音と自分の楽器（や声）のキーが合わないときに役立ちます。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#semitones">半音のきほん</a></li>
  <li><a href="#cases">いくつ動かす？よくある場面</a></li>
  <li><a href="#table">キーの早見表</a></li>
  <li><a href="#tips">コツ</a></li>
</ol></nav>

<h2 id="semitones">半音のきほん</h2>
<p>半音は、ギターの 1 フレット分の音の高さの差です。12 半音で 1 オクターブになります。キーを +1 にすると、すべての音が 1 フレット分高くなります（E は F に、A は B♭ に）。半音 1 つで周波数は ${ratio(1).toFixed(4)} 倍になり、+2 なら元の ${ratio(2).toFixed(3)} 倍です。</p>
<p>レコードやテープの回転でキーを変えると、速さも変わってしまいます。Loop Trainer は音の高さと速さを別々に変えるので、キーと速度を同時に使えます（例：キー −1 で速度 70%）。</p>

<h2 id="cases">いくつ動かす？よくある場面</h2>
${caseTable("ja")}
<p>どれも考え方は同じで、録音を自分の楽器のほうへ動かします。録音がギターより低ければ上げ、高ければ下げます。</p>
<div class="note"><p>ロックやメタルの録音には半音下げチューニングのものが多くあります。聞こえるコードがフレットとフレットの間にあるように感じたら、まず +1 を試してみてください。</p></div>

<h2 id="table">キーの早見表</h2>
<p>キーを動かしたあとの曲のキーです。たとえば E の曲を −2 にすると D になります。</p>
${keyTable("ja")}
<p class="cap">キー名はふつう使われる書き方（G♭ ではなく F♯ など）にしています。</p>

<h2 id="tips">コツ</h2>
<ul>
  <li><b>小さく動かすほど自然に聞こえます。</b>1〜2 半音なら違和感はほとんどありませんが、大きく動かすと声が少し不自然になります。</li>
  <li><b>耳で確かめる。</b>録音に合わせて 1 音弾き、うなりや濁りがあれば、上下に 1 半音ずつ試します。</li>
  <li><b>キーは曲ごとに保存されます</b>（ループ・速度と一緒に）。「原曲のキー」で ±0 に戻ります。</li>
  <li><b>耳コピでは、</b>動かしたキーで音を探し、書き留めるときに動かした分を戻して考えます。<a href="../learn-by-ear/">耳コピのやり方</a>もご覧ください。</li>
</ul>
`,
  },
};
