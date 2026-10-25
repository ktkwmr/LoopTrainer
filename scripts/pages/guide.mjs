// How to use the app. Screenshots: node scripts/render-guide-images.mjs
import { readFileSync } from "node:fs";
import { SPEED_MIN, SPEED_MAX, SEMI_MAX } from "./practice.mjs";

const IMAGES = new URL("../../public/looptrainer/images/guide/", import.meta.url);
const SRC = "/looptrainer/images/guide/";

// Width and height from the PNG header, so the page reserves the right space before the image loads
function size(file) {
  const buf = readFileSync(new URL(file, IMAGES));
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}
// A screenshot that opens at full size when tapped. half: a 2x screenshot shown at its real size
const img = (lang, name, alt, { half } = {}) => {
  const file = `${lang}-${name}.png`;
  const { w, h } = size(file);
  const style = half ? ` style="max-width:${w / 2}px"` : "";
  return `<a href="${SRC}${file}"><img src="${SRC}${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"${style}></a>`;
};

export default {
  slug: "guide",
  en: {
    title: "How to Use Loop Trainer: Loop, Slow Down, and Change the Key",
    heading: "How to use Loop Trainer",
    nav: "How to use (guide)",
    description:
      "Step-by-step guide to Loop Trainer: open a song, choose a loop that snaps to the beat or the bar, slow it down without changing the pitch, change the key, speed up on every loop, add a count-in, and save your loops.",
    body: () => `
<p class="lead">Loop Trainer plays an audio file you have, repeats the part you choose, and changes the speed and the key independently. This guide walks through every part of the screen.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#quick">Start in three steps</a></li>
  <li><a href="#player">The player</a></li>
  <li><a href="#loop">Choosing the loop</a></li>
  <li><a href="#beats">Beats and bars</a></li>
  <li><a href="#settings">Practice settings</a></li>
  <li><a href="#phone">On a phone</a></li>
  <li><a href="#keys">Keyboard shortcuts</a></li>
  <li><a href="#saving">Saving, installing, and offline use</a></li>
</ol></nav>

<h2 id="quick">Start in three steps</h2>
<ol>
  <li><b>Open a song.</b> Tap “Open an audio file” and choose a file, or drop it on the waveform. MP3, AAC (m4a), and WAV work in every browser.</li>
  <li><b>Choose the part you want to learn.</b> Drag across the waveform. The ends snap to the nearest beat.</li>
  <li><b>Set the speed and press Play.</b> Tap 70% to hear it slower at the same pitch. It repeats until you stop it.</li>
</ol>
<p>The loop, the speed, and the key are saved for that song. Open the same file next time and you pick up where you left off.</p>

<h2 id="player">The player</h2>
<figure class="shot">
  ${img("en", "player", "Loop Trainer on a computer: the waveform of a song with an A-B loop of two bars highlighted, the time and the tempo under it (84 at this speed, 120 in the original), large displays of speed 70%, key +2, and the loop times, the Play button, and the A and B buttons. Numbers 1 to 10 mark the controls.")}
  <figcaption>The numbers match the list below. Tap the image to enlarge it.</figcaption>
</figure>
<ol>
  <li><b>Open file</b> – Open another song. The file is read in your browser and never uploaded.</li>
  <li><b>Waveform</b> – The whole song, with the loop shaded between the A and B flags. Tap anywhere to jump there; drag to choose a new loop. The small ticks at the bottom are the beats, and the taller ones are the bar starts.</li>
  <li><b>Time and tempo</b> – Where you are in the song, and the tempo the app found (♩ ≈ 120 means about 120 beats per minute). When you change the speed, it shows the tempo you hear and the original: ♩ ≈ 84 (original 120) at 70%.</li>
  <li><b>Zoom to loop</b> – Fits the loop to the screen for fine changes. Press it again to see the whole song.</li>
  <li><b>Speed, key, and loop</b> – Large enough to read from a distance. Under the loop: its length in seconds and in beats or bars, and which time round it is while it plays.</li>
  <li><b>Back to A</b> – Goes to the start of the loop.</li>
  <li><b>Play / Pause</b>.</li>
  <li><b>Loop on / off</b> – When it is off, the song plays on past B.</li>
  <li><b>A and B</b> – Press “A” or “B” while it plays to put the flag at the current position (it snaps to the nearest beat). ◀ and ▶ move the flag to the previous or next beat.</li>
  <li><b>+ Save this loop / Whole song</b> – Save the current loop to the list for this song, or make the loop the whole song.</li>
</ol>

<h2 id="loop">Choosing the loop</h2>
<p>There are several ways, so use the one that suits you:</p>
<ul>
  <li><b>Drag</b> across the waveform where there is no flag. This is the quickest way to start.</li>
  <li><b>Tap a flag, then tap where it should go.</b> The flag turns blue while it is selected. Tap the same flag again, or press Esc, to cancel.</li>
  <li><b>Long-press a flag and drag it</b> (on a phone or tablet). With a mouse, just drag the flag.</li>
  <li><b>Press “A” and “B” while it plays</b>, at the moments the phrase starts and ends. Pressing a little late is fine: the flag snaps to the nearest beat.</li>
  <li><b>◀ ▶</b> next to A and B, or the arrow keys, for the last adjustment.</li>
</ul>
<p>To see the waveform in more detail, pinch with two fingers on the waveform (Ctrl + mouse wheel, or a pinch on the trackpad, on a computer). Move two fingers sideways to scroll (Shift + wheel on a computer). While it plays zoomed in, the view follows the playback.</p>

<h2 id="beats">Beats and bars</h2>
<p>When you open a song, the app listens for its beat and finds the tempo and where each beat is. This is what lets the loop points snap onto the beat, so the loop comes around without a stumble.</p>
<ul>
  <li><b>Snap to beats</b> – On by default. Turn it off to place the flags anywhere (◀ ▶ then move them by 0.05 seconds).</li>
  <li><b>Snap to bar starts</b> – The flags snap to the first beat of each bar instead, so a loop of “the 4 bars of the solo” is easy to set. ◀ ▶ then move by a bar.</li>
  <li><b>Tempo ½ / ×2</b> – Beat detection sometimes finds half or double the tempo you feel. Fix it here.</li>
  <li><b>Beats per bar</b> – 4 for most songs; 3 for a waltz; 2 for many fast songs in 6/8.</li>
  <li><b>Bar starts ◀ ▶</b> – The bar starts are a guess, made from where the chords change and from the bass and kick drum. If the tall lines are not on the “one”, move them by a beat.</li>
</ul>
<div class="note"><p>Songs with a steady beat give the best results. For songs without a clear beat (rubato, free time, ambient), the app shows “No beat found”, and the flags can be placed freely.</p></div>

<h2 id="settings">Practice settings</h2>
<figure class="shot">
  ${img("en", "settings", "The practice settings: speed with a slider, step buttons, and Original speed, key with minus and plus, beats and bars, speed up on every loop with start, step, and top speed, count-in with clicks and song BPM, saved loops with a loop named Chorus, and volume. Numbers 1 to 7 mark the groups.")}
  <figcaption>The numbers match the list below.</figcaption>
</figure>
<ol>
  <li><b>Speed</b> – From ${SPEED_MIN}% to ${SPEED_MAX}% in 1% steps; “Original speed” sets it back to 100%. The pitch does not change. Below ${SPEED_MIN}% the sound breaks up too much to be useful.</li>
  <li><b>Key</b> – Up to ${SEMI_MAX} semitones up or down. The tempo does not change, and it works together with the speed. See <a href="../change-key/">changing the key</a>.</li>
  <li><b>Beats and bars</b> – See <a href="#beats">above</a>.</li>
  <li><b>Speed up on every loop</b> – Starts at the first speed (70% at first) and adds a little each time the loop comes around (+2%), until the top speed (100%). It starts again from the first speed when you play from the start of the loop. See <a href="../speed-up-practice/">speeding up step by step</a>.</li>
  <li><b>Count-in before each loop</b> – Clicks before each pass so you can get ready. The clicks follow the song's tempo and the current speed: at 70%, a 120 BPM song gets clicks at 84 BPM. The detected tempo is used until you enter or tap a BPM yourself.</li>
  <li><b>Saved loops for this song</b> – Each saved loop has a name (such as “Intro” or “Solo, first half”). Tap its time to play it.</li>
  <li><b>Volume</b> – For the song and for the count-in clicks.</li>
</ol>

<h2 id="phone">On a phone</h2>
<figure class="shot phone">
  ${img("en", "phone", "Loop Trainer on a phone: the waveform with the loop, the time and tempo, large speed 70%, key +2, and loop displays, and the Play button.", { half: true })}
  <figcaption>The player fits the width of the screen; the settings follow below it.</figcaption>
</figure>
<p>Everything works the same on a phone. The buttons are large so you can press them with a guitar in your hands. A few tips:</p>
<ul>
  <li>The sound starts after the first tap on Play (phones do not allow sound before you touch the page).</li>
  <li>On iPhone, it plays even when the ring/silent switch is on silent (iOS 17 or later).</li>
  <li>The screen stays on while it plays.</li>
  <li>Long songs need a lot of memory once decoded (about 20 MB a minute). Files longer than about 10 minutes show a warning and may be slow on older phones.</li>
</ul>

<h2 id="keys">Keyboard shortcuts</h2>
<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">Key</th><th scope="col">Action</th></tr></thead>
    <tbody>
      <tr><th scope="row"><code>Space</code></th><td>Play / pause</td></tr>
      <tr><th scope="row"><code>↑</code> <code>↓</code></th><td>Speed ±1% (with <code>Shift</code>: ±5%)</td></tr>
      <tr><th scope="row"><code>←</code> <code>→</code></th><td>Move A by a beat (with <code>Shift</code>: move B)</td></tr>
      <tr><th scope="row"><code>A</code> <code>B</code></th><td>Put A / B at the current position</td></tr>
      <tr><th scope="row"><code>L</code></th><td>Loop on / off</td></tr>
      <tr><th scope="row"><code>Enter</code></th><td>Back to A</td></tr>
      <tr><th scope="row"><code>-</code> <code>+</code></th><td>Key down / up a semitone</td></tr>
      <tr><th scope="row"><code>Z</code></th><td>Zoom to the loop / back to the whole song</td></tr>
      <tr><th scope="row"><code>Esc</code></th><td>Cancel moving a flag</td></tr>
      <tr><th scope="row"><code>O</code></th><td>Open a file</td></tr>
    </tbody>
  </table>
</div>

<h2 id="saving">Saving, installing, and offline use</h2>
<ul>
  <li>For each song, the loops, speed, key, and count-in tempo are saved in your browser, keyed by the file name and size. The audio itself is not saved: open the file again to continue.</li>
  <li>You can install the app: in Chrome or Edge, use the “Install” button that appears after you have opened a file (or the browser menu); on iPhone and iPad, tap Share and then “Add to Home Screen”.</li>
  <li>After you have opened a file once, the app also works offline.</li>
  <li>Nothing about your audio is sent anywhere. See the <a href="../privacy/">privacy policy</a>.</li>
</ul>
`,
  },
  ja: {
    title: "Loop Trainer の使い方：区間ループ・スロー再生・キー変更",
    heading: "Loop Trainer の使い方",
    nav: "使い方ガイド",
    description:
      "Loop Trainer の使い方。音源を開き、拍や小節に吸着するループを選び、音程を変えずにスロー再生、キー変更、1周ごとに速くする練習、カウントイン、ループの保存までを画面写真付きで説明します。",
    body: () => `
<p class="lead">Loop Trainer は、手持ちの音源を再生し、選んだ区間を繰り返しながら、速度とキーを別々に変えられる練習用プレイヤーです。画面の各部分を順に説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#quick">3 ステップで始める</a></li>
  <li><a href="#player">プレイヤー</a></li>
  <li><a href="#loop">ループ範囲の選び方</a></li>
  <li><a href="#beats">拍と小節</a></li>
  <li><a href="#settings">練習の設定</a></li>
  <li><a href="#phone">スマホで使う</a></li>
  <li><a href="#keys">キーボード操作</a></li>
  <li><a href="#saving">保存・インストール・オフライン</a></li>
</ol></nav>

<h2 id="quick">3 ステップで始める</h2>
<ol>
  <li><b>曲を開く。</b>「音源ファイルを開く」でファイルを選ぶか、波形の場所にドロップします。MP3・AAC（m4a）・WAV はどのブラウザでも開けます。</li>
  <li><b>練習したい部分を選ぶ。</b>波形の上をドラッグします。両端は一番近い拍に吸い付きます。</li>
  <li><b>速度を決めて再生。</b>「70%」を押すと、音程はそのままでゆっくりになります。止めるまで繰り返します。</li>
</ol>
<p>ループ・速度・キーは曲ごとに保存されます。次に同じファイルを開けば、前回の続きから練習できます。</p>

<h2 id="player">プレイヤー</h2>
<figure class="shot">
  ${img("ja", "player", "パソコンで開いた Loop Trainer。曲の波形の上で 2 小節の A-B ループが強調表示され、その下に時間とテンポ（この速度で 84、原曲 120）、大きく表示した速度 70%・キー +2・ループの時間、再生ボタン、A・B のボタンが並ぶ。1〜10 の番号で各部分を示している。")}
  <figcaption>番号は下の一覧と対応しています。画像を押すと拡大します。</figcaption>
</figure>
<ol>
  <li><b>ファイルを開く</b> – 別の曲を開きます。ファイルはブラウザの中で読み込まれ、アップロードされません。</li>
  <li><b>波形</b> – 曲全体の波形です。A と B の旗の間がループで、色が付きます。タップするとその位置に移動し、ドラッグすると新しいループを選べます。下端の短い目盛りが拍、長い目盛りが小節の頭です。</li>
  <li><b>時間とテンポ</b> – 曲のどこを再生しているかと、検出したテンポです（♩ ≈ 120 は 1 分間に約 120 拍）。速度を変えると、聞こえるテンポと原曲のテンポを表示します（70% なら ♩ ≈ 84（原曲 120））。</li>
  <li><b>ループを拡大</b> – ループを画面いっぱいに表示して、細かく調整できます。もう一度押すと曲全体に戻ります。</li>
  <li><b>速度・キー・ループ</b> – 離れていても読める大きさで表示します。ループの下には、長さ（秒と拍数・小節数）と、再生中は何周目かが出ます。</li>
  <li><b>A に戻る</b> – ループの先頭に戻ります。</li>
  <li><b>再生／一時停止</b>。</li>
  <li><b>ループのオン・オフ</b> – オフにすると、B を過ぎてもそのまま再生が続きます。</li>
  <li><b>A と B</b> – 再生中に「A」「B」を押すと、今の位置に旗を置きます（一番近い拍に吸い付きます）。◀ ▶ で前後の拍に動かせます。</li>
  <li><b>＋ このループを保存／曲全体</b> – 今のループをこの曲の一覧に保存します。「曲全体」はループを曲全体に戻します。</li>
</ol>

<h2 id="loop">ループ範囲の選び方</h2>
<p>いくつかの方法があるので、やりやすいものを使ってください。</p>
<ul>
  <li><b>ドラッグする。</b>旗のない場所で、波形の上を横にドラッグします。一番手早い方法です。</li>
  <li><b>旗をタップしてから、移動先をタップする。</b>選んでいる間、旗は青くなります。同じ旗をもう一度タップするか Esc で取り消せます。</li>
  <li><b>旗を長押しして、掴んだままドラッグする</b>（スマホ・タブレット）。マウスならそのままドラッグできます。</li>
  <li><b>再生しながら「A」「B」を押す。</b>フレーズの始まりと終わりで押します。少し遅れても、一番近い拍に吸い付きます。</li>
  <li><b>A・B の横の ◀ ▶</b> か矢印キーで、最後の微調整をします。</li>
</ul>
<p>波形を細かく見たいときは、波形の上で 2 本指でピンチします（パソコンは Ctrl＋ホイール、またはトラックパッドのピンチ）。2 本指を左右に動かすとスクロールします（パソコンは Shift＋ホイール）。拡大したまま再生すると、表示が再生位置に付いていきます。</p>

<h2 id="beats">拍と小節</h2>
<p>曲を開くと、アプリが曲を解析して、テンポと拍の位置を見つけます。これがあるので、ループの両端を拍の上にぴったり置け、ループのつなぎ目でつまずきません。</p>
<ul>
  <li><b>拍に合わせる</b> – 最初からオンです。オフにすると旗を自由な位置に置けます（◀ ▶ は 0.05 秒ずつ）。</li>
  <li><b>小節の頭に合わせる</b> – 旗が各小節の 1 拍目に吸い付きます。「ソロの 4 小節」のようなループが簡単に作れます。◀ ▶ は 1 小節ずつ動きます。</li>
  <li><b>テンポの ½・×2</b> – 拍の検出は、感じるテンポの半分や倍を見つけることがあります。そのときはここで直します。</li>
  <li><b>1小節の拍数</b> – ほとんどの曲は 4。ワルツは 3。速い 6/8 の曲は 2 にすると合うことが多いです。</li>
  <li><b>小節の頭の ◀ ▶</b> – 小節の頭は推定です。コードが変わる位置と、ベース・キックの強さから決めています。長い線が「1」に来ていなければ、1 拍ずつ動かしてください。</li>
</ul>
<div class="note"><p>一定の拍で進む曲ほどうまく検出できます。拍のはっきりしない曲（テンポを揺らす演奏、拍のない曲など）では「拍を検出できませんでした」と表示され、旗は自由な位置に置けます。</p></div>

<h2 id="settings">練習の設定</h2>
<figure class="shot">
  ${img("ja", "settings", "練習の設定。速度のスライダー・増減ボタン・「原曲の速度」、キーの − と +、拍と小節、1周ごとに速くする（開始・上げ幅・上限）、カウントイン（クリック数と曲の BPM）、「サビ」という名前の保存したループ、音量。1〜7 の番号で各項目を示している。")}
  <figcaption>番号は下の一覧と対応しています。</figcaption>
</figure>
<ol>
  <li><b>速度</b> – ${SPEED_MIN}%〜${SPEED_MAX}% を 1% 単位で。「原曲の速度」で 100% に戻ります。音程は変わりません。${SPEED_MIN}% より遅いと音が崩れすぎるため、${SPEED_MIN}% が下限です。</li>
  <li><b>キー</b> – 半音単位で上下 ${SEMI_MAX} つまで。テンポは変わらず、速度と同時に使えます。<a href="../change-key/">キー変更の使い方</a>も参考にしてください。</li>
  <li><b>拍と小節</b> – <a href="#beats">上の説明</a>をご覧ください。</li>
  <li><b>1周ごとに速くする</b> – 開始の速度（最初は 70%）から始まり、ループが一周するたびに少しずつ（+2%）上げて、上限（100%）で止めます。ループの先頭から再生すると、開始の速度に戻ります。<a href="../speed-up-practice/">少しずつ速くする練習法</a>もどうぞ。</li>
  <li><b>ループの前にカウントイン</b> – 毎周の前にクリックを鳴らし、構えてから弾けるようにします。クリックは曲のテンポと今の速度に合わせて鳴ります（120 BPM の曲を 70% にすると 84 BPM）。BPM を自分で入力するかタップするまでは、検出したテンポを使います。</li>
  <li><b>この曲の保存したループ</b> – 保存したループには名前（「イントロ」「ソロ前半」など）を付けられます。時間のボタンを押すと、そのループを再生します。</li>
  <li><b>音量</b> – 曲とカウントインのクリックで別々に。</li>
</ol>

<h2 id="phone">スマホで使う</h2>
<figure class="shot phone">
  ${img("ja", "phone", "スマホで開いた Loop Trainer。ループ付きの波形、時間とテンポ、大きな速度 70%・キー +2・ループの表示、再生ボタン。", { half: true })}
  <figcaption>プレイヤーは画面の幅に収まり、設定はその下に続きます。</figcaption>
</figure>
<p>スマホでも同じように使えます。ギターを抱えたままでも押せるよう、ボタンは大きめです。</p>
<ul>
  <li>音は、最初に「再生」を押したときから鳴ります（スマホでは、画面に触れる前に音を出せないため）。</li>
  <li>iPhone では、消音モード（サイレントスイッチ）でも音が出ます（iOS 17 以降）。</li>
  <li>再生中は画面が消えません。</li>
  <li>長い曲は、読み込むとメモリをたくさん使います（1 分あたり約 20 MB）。10 分くらいを超えると注意が表示され、古いスマホでは動作が重くなることがあります。</li>
</ul>

<h2 id="keys">キーボード操作</h2>
<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">キー</th><th scope="col">操作</th></tr></thead>
    <tbody>
      <tr><th scope="row"><code>Space</code></th><td>再生／一時停止</td></tr>
      <tr><th scope="row"><code>↑</code> <code>↓</code></th><td>速度 ±1%（<code>Shift</code> で ±5%）</td></tr>
      <tr><th scope="row"><code>←</code> <code>→</code></th><td>A を 1 拍ずつ移動（<code>Shift</code> で B）</td></tr>
      <tr><th scope="row"><code>A</code> <code>B</code></th><td>今の位置を A／B にする</td></tr>
      <tr><th scope="row"><code>L</code></th><td>ループのオン・オフ</td></tr>
      <tr><th scope="row"><code>Enter</code></th><td>A に戻る</td></tr>
      <tr><th scope="row"><code>-</code> <code>+</code></th><td>キーを半音下げる／上げる</td></tr>
      <tr><th scope="row"><code>Z</code></th><td>ループを拡大／曲全体に戻す</td></tr>
      <tr><th scope="row"><code>Esc</code></th><td>旗の移動を取り消す</td></tr>
      <tr><th scope="row"><code>O</code></th><td>ファイルを開く</td></tr>
    </tbody>
  </table>
</div>

<h2 id="saving">保存・インストール・オフライン</h2>
<ul>
  <li>曲ごとのループ・速度・キー・カウントインのテンポは、ファイル名とサイズで曲を見分けてブラウザに保存されます。音源そのものは保存しないので、続きを練習するときは同じファイルを開いてください。</li>
  <li>アプリとしてインストールできます。Chrome・Edge では、ファイルを開いたあとに出る「インストール」ボタン（またはブラウザのメニュー）から。iPhone・iPad では「共有 → ホーム画面に追加」です。</li>
  <li>一度ファイルを開けば、オフラインでも使えます。</li>
  <li>音源に関する情報はどこにも送られません。<a href="../privacy/">プライバシーポリシー</a>をご覧ください。</li>
</ul>
`,
  },
};
