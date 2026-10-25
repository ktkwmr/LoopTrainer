// Article: speeding up step by step (the "Speed up on every loop" feature), with calculated tables
import { wideTable } from "./layout.mjs";
import { SPEED_MIN, heardBpm, passes, rampSeconds, mmss, barsSeconds } from "./practice.mjs";

const SONG_BPMS = [70, 90, 100, 120, 140, 160, 180];
const SPEEDS = [50, 60, 70, 80, 90, 100];
// The table of passes: a 4-bar loop at 120 BPM (8 s at 100 %), from 70 % to 100 %
const LOOP_BARS = 4, LOOP_BPM = 120, START = 70, TOP = 100;
const STEPS = [1, 2, 3, 5];
const loopSec = barsSeconds(LOOP_BARS, 4, LOOP_BPM);
const two = passes(START, 2, TOP);

function bpmTable(lang) {
  const head = `<th scope="col">${lang === "ja" ? "曲の BPM" : "Song BPM"}</th>` + SPEEDS.map((p) => `<th scope="col">${p}%</th>`).join("");
  const rows = SONG_BPMS.map((b) => `<tr><th scope="row">${b}</th>${SPEEDS.map((p) => `<td class="num">${heardBpm(b, p)}</td>`).join("")}</tr>`).join("\n      ");
  return wideTable(lang, `<table>
    <thead><tr>${head}</tr></thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`);
}

function rampTable(lang) {
  const ja = lang === "ja";
  const rows = STEPS.map((step) => {
    const list = passes(START, step, TOP);
    const shown = list.length > 6 ? `${list.slice(0, 4).join(", ")}, … ${list[list.length - 1]}` : list.join(", ");
    return `<tr><th scope="row">+${step}%</th><td data-label="${ja ? "周回数：" : "Passes:"}" class="num">${list.length}</td><td data-label="${ja ? "時間：" : "Time:"}" class="num">${mmss(rampSeconds(loopSec, list))}</td><td data-label="${ja ? "速度：" : "Speeds:"}">${shown}%</td></tr>`;
  }).join("\n      ");
  return `<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">${ja ? "1周ごとに" : "Each loop"}</th><th scope="col">${ja ? "100% までの周回数" : "Passes to 100%"}</th><th scope="col">${ja ? "かかる時間" : "Time"}</th><th scope="col">${ja ? "各周の速度" : "Speed of each pass"}</th></tr></thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</div>`;
}

export default {
  slug: "speed-up-practice",
  en: {
    title: "Speed Up Your Practice Step by Step: From 70% to Full Tempo",
    heading: "Speeding up step by step: from slow to full tempo",
    nav: "Speeding up step by step",
    description:
      "How to practise a phrase slowly and raise the tempo a little at a time until you reach full speed, with a table of BPM at each speed and how many loops it takes from 70% to 100%.",
    body: () => `
<p class="lead">Playing a phrase slowly and cleanly, then a little faster, is one of the most reliable ways to get it up to speed. This article explains the idea, how far to slow down, and how to let Loop Trainer raise the tempo for you.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#why">Why speed up gradually</a></li>
  <li><a href="#bpm">What tempo you hear at each speed</a></li>
  <li><a href="#auto">Letting the app speed up on every loop</a></li>
  <li><a href="#plan">A practice plan</a></li>
</ol></nav>

<h2 id="why">Why speed up gradually</h2>
<p>When you try a phrase at full speed before your hands know it, you repeat mistakes as often as the right notes. Played slowly, every repetition is clean. Raising the tempo in small steps keeps it clean while the speed comes up. A step of a few percent is small enough that each pass feels almost the same as the last one.</p>

<h2 id="bpm">What tempo you hear at each speed</h2>
<p>The speed in Loop Trainer is a percentage of the original. To know the tempo you are actually playing at, multiply the song's BPM by the speed:</p>
${bpmTable("en")}
<p class="cap">The BPM you hear at each speed (rounded). The count-in clicks at this tempo too, and the app shows it next to the time (♩ ≈ 84 (original 120) at 70%).</p>
<p>If you practise with a metronome as well, this is the number to set. A good place to start is the speed where you can play the phrase three times in a row without a mistake.</p>

<h2 id="auto">Letting the app speed up on every loop</h2>
<p>Turn on <b>Speed up on every loop</b> and set three numbers:</p>
<ul>
  <li><b>Start at</b> – the speed of the first pass (for example ${START}%).</li>
  <li><b>Each loop</b> – how much faster each pass is (for example +2%).</li>
  <li><b>Up to</b> – where it stops (for example ${TOP}%). After that, the loop keeps playing at that speed.</li>
</ul>
<p>Each time you play from the start of the loop, it starts again from the first speed. With a ${LOOP_BARS}-bar loop at ${LOOP_BPM} BPM (${loopSec} seconds at 100%), going from ${START}% to ${TOP}% takes:</p>
${rampTable("en")}
<p class="cap">Times are for the passes only, without a count-in.</p>
<p>+2% is a good default: it reaches full speed in ${two.length} passes, about ${mmss(rampSeconds(loopSec, two))}, short enough to repeat a few times in one practice session. Use +1% for a phrase that is still shaky, and +5% to warm up on a phrase you already know.</p>
<div class="note"><p>Turn on the <b>count-in</b> as well when you play along: the clicks before each pass follow the new speed, so you always know the tempo of the next pass.</p></div>

<h2 id="plan">A practice plan</h2>
<ol>
  <li>Loop one or two bars. Find the speed where you can play it cleanly (often ${START}% or less; the lowest is ${SPEED_MIN}%).</li>
  <li>Set <b>Start at</b> to that speed, <b>Each loop</b> to +2%, and <b>Up to</b> to 100%. Play along until you reach the top.</li>
  <li>If you start making mistakes, stop, and set <b>Up to</b> to the speed where it was still clean. Next time, start from there.</li>
  <li>When it is clean at 100%, try <b>Up to</b> 105% or 110% for a few passes. Afterwards the real tempo feels easy.</li>
  <li>Join it with the next phrase and repeat with a longer loop.</li>
</ol>
`,
  },
  ja: {
    title: "練習テンポを少しずつ上げる方法：70% から原曲のテンポへ",
    heading: "少しずつ速くする練習法：ゆっくりから原曲のテンポへ",
    nav: "少しずつ速くする練習法",
    description:
      "フレーズをゆっくり確実に弾き、少しずつテンポを上げて原曲の速さまで持っていく練習法。速度ごとの BPM の早見表と、70% から 100% まで何周かかるかの表付き。",
    body: () => `
<p class="lead">フレーズをゆっくり正確に弾き、それから少しだけ速くする。これは、速いフレーズを弾けるようにする一番確実な方法のひとつです。考え方、どこまで遅くするか、Loop Trainer に自動でテンポを上げさせる方法を説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#why">少しずつ上げる理由</a></li>
  <li><a href="#bpm">速度ごとの BPM</a></li>
  <li><a href="#auto">1周ごとに自動で速くする</a></li>
  <li><a href="#plan">練習の進め方</a></li>
</ol></nav>

<h2 id="why">少しずつ上げる理由</h2>
<p>手が覚える前に原曲の速さで弾こうとすると、正しい音と同じくらい間違いも繰り返してしまいます。ゆっくりなら、毎回正確に弾けます。テンポを小さな刻みで上げていけば、正確さを保ったまま速くできます。数 % の刻みなら、前の周とほとんど同じ感覚で弾けます。</p>

<h2 id="bpm">速度ごとの BPM</h2>
<p>Loop Trainer の速度は原曲に対する割合です。実際に弾いているテンポは、曲の BPM に速度を掛けると分かります。</p>
${bpmTable("ja")}
<p class="cap">各速度で聞こえる BPM（四捨五入）。カウントインもこのテンポで鳴り、アプリでも時間の横に表示されます（70% なら ♩ ≈ 84（原曲 120））。</p>
<p>メトロノームでも練習するなら、この数字に合わせます。最初の目安は、間違えずに 3 回続けて弾ける速度です。</p>

<h2 id="auto">1周ごとに自動で速くする</h2>
<p><b>1周ごとに速くする</b>をオンにして、3 つの数字を決めます。</p>
<ul>
  <li><b>開始</b> – 最初の周の速度（例：${START}%）。</li>
  <li><b>1周ごとに</b> – 1 周ごとにどれだけ速くするか（例：+2%）。</li>
  <li><b>上限</b> – どこで止めるか（例：${TOP}%）。上限に着いたあとは、その速度でループを続けます。</li>
</ul>
<p>ループの先頭から再生するたびに、開始の速度に戻ります。${LOOP_BPM} BPM で ${LOOP_BARS} 小節のループ（100% で ${loopSec} 秒）を ${START}% から ${TOP}% まで上げると、次のようになります。</p>
${rampTable("ja")}
<p class="cap">時間は周回の分だけで、カウントインは含みません。</p>
<p>+2% が使いやすい目安です。${two.length} 周、約 ${mmss(rampSeconds(loopSec, two)).replace(":", " 分 ")} 秒で 100% に届くので、1 回の練習の中で何度か繰り返せます。まだ不安定なフレーズは +1%、もう弾けるフレーズのウォームアップには +5% が向いています。</p>
<div class="note"><p>一緒に弾くときは<b>カウントイン</b>もオンにすると便利です。毎周の前のクリックが新しい速度で鳴るので、次の周のテンポが分かります。</p></div>

<h2 id="plan">練習の進め方</h2>
<ol>
  <li>1〜2 小節をループし、正確に弾ける速度を探します（${START}% 以下になることが多く、下限は ${SPEED_MIN}%）。</li>
  <li><b>開始</b>をその速度に、<b>1周ごとに</b>を +2%、<b>上限</b>を 100% にして、上限まで一緒に弾きます。</li>
  <li>間違いが出始めたら止めて、<b>上限</b>をまだ正確に弾けた速度にします。次の練習はそこから始めます。</li>
  <li>100% で正確に弾けたら、<b>上限</b>を 105% や 110% にして数周弾いてみます。そのあとで原曲のテンポに戻すと楽に感じます。</li>
  <li>次のフレーズとつなげて、長いループで同じことを繰り返します。</li>
</ol>
`,
  },
};
