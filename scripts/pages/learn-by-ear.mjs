// Article: learning a phrase by ear with loops and slow playback
import { barsSeconds, heardBpm } from "./practice.mjs";

// A two-bar fast lick: 16th notes at 140 BPM, slowed to 50 % for listening
const LICK_BPM = 140;
const nps = (bpm) => ((bpm / 60) * 4).toFixed(1); // 16th notes per second

export default {
  slug: "learn-by-ear",
  en: {
    title: "How to Learn a Song by Ear: Loop Short Phrases and Slow Them Down",
    heading: "How to learn a song by ear with loops and slow playback",
    nav: "Learning by ear",
    description:
      "A practical method for transcribing and learning guitar parts by ear: pick a short phrase, loop it, slow it down without changing the pitch, find the notes, and build back up to full speed.",
    body: () => `
<p class="lead">Learning a part by ear goes much faster when you stop listening to the whole song and work on one short phrase at a time, slowly, over and over. This article describes a method that works for solos, riffs, and chord parts.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#why">Why loops and slow playback help</a></li>
  <li><a href="#steps">The method, step by step</a></li>
  <li><a href="#speed">How slow is slow enough?</a></li>
  <li><a href="#tips">Tips for hard-to-hear parts</a></li>
  <li><a href="#mistakes">Common mistakes</a></li>
</ol></nav>

<h2 id="why">Why loops and slow playback help</h2>
<p>A fast phrase goes past before you can follow it. A two-bar sixteenth-note lick at ${LICK_BPM} BPM is ${nps(LICK_BPM)} notes a second and lasts only ${barsSeconds(2, 4, LICK_BPM).toFixed(1)} seconds. At 50% it becomes ${nps(heardBpm(LICK_BPM, 50))} notes a second over ${barsSeconds(2, 4, heardBpm(LICK_BPM, 50)).toFixed(1)} seconds — slow enough to hear each note.</p>
<p>Slowing a recording down the old way (a slower tape or record) also lowers the pitch, so the notes no longer match your instrument. A <b>time-stretching</b> player like Loop Trainer keeps the pitch, so you can find the notes on the fretboard at the speed you can follow.</p>
<p>A loop removes the time spent rewinding. Each pass gives you one more chance to hear the same notes, and you can play along on every pass.</p>

<h2 id="steps">The method, step by step</h2>
<ol>
  <li><b>Listen to the whole section first.</b> Get the shape of it: where it goes up, where it rests, where it repeats.</li>
  <li><b>Loop one short phrase.</b> One or two bars, or one musical sentence. With “Snap to bar starts” on, drag over the bars you want and the loop lands exactly on the bar lines.</li>
  <li><b>Slow it down until every note is clear.</b> Start at 70%; go to 60% or 50% for fast passages.</li>
  <li><b>Sing or hum it.</b> If you can sing it, you have heard it. If you cannot, loop an even shorter part.</li>
  <li><b>Find the first note and the last note</b> on your instrument, then fill in between. Notes that land on the beat are easiest; the ticks under the waveform show where the beats are.</li>
  <li><b>Play along with the loop.</b> When it sounds the same, save the loop with a name (“Solo, bar 1–2”) and move on to the next phrase.</li>
  <li><b>Join the phrases</b> into a longer loop, then build the speed back up. “Speed up on every loop” does this automatically: for example from 70% to 100% in steps of 2%.</li>
</ol>

<h2 id="speed">How slow is slow enough?</h2>
<p>Slow enough that you can follow every note, and no slower. Very slow playback stretches the sound and makes the attack of each note less clear.</p>
<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">Speed</th><th scope="col">Good for</th></tr></thead>
    <tbody>
      <tr><th scope="row">90–100%</th><td data-label="Good for:">Checking a part you have nearly learned; getting the feel back</td></tr>
      <tr><th scope="row">70–80%</th><td data-label="Good for:">Most riffs and chord parts; practising a phrase until it is reliable</td></tr>
      <tr><th scope="row">50–60%</th><td data-label="Good for:">Fast solos, sixteenth-note lines, ornaments and slides</td></tr>
    </tbody>
  </table>
</div>
<p>Below 50% the sound breaks up too much to be useful, which is why the app stops there.</p>

<h2 id="tips">Tips for hard-to-hear parts</h2>
<ul>
  <li><b>Bass lines:</b> raising the key by a few semitones and listening on headphones can make low notes easier to hear. Change it back before you play along.</li>
  <li><b>Fast ornaments:</b> zoom in on the waveform (pinch, or Ctrl + wheel) and set a loop around just the ornament.</li>
  <li><b>Chords:</b> listen for the bass note first, then the top note. Together they usually tell you the chord.</li>
  <li><b>Songs in an unusual tuning:</b> if everything sounds a semitone off, the recording may be tuned down. See <a href="../change-key/">changing the key</a>.</li>
  <li><b>Take breaks.</b> After a while every version starts to sound right. Come back later with fresh ears.</li>
</ul>

<h2 id="mistakes">Common mistakes</h2>
<ul>
  <li><b>Looping too much at once.</b> A whole solo in one loop is too much to remember. Two bars at a time is plenty.</li>
  <li><b>Staying slow forever.</b> The goal is to play it at the real tempo. Raise the speed as soon as a phrase is reliable.</li>
  <li><b>Ignoring the rhythm.</b> The right notes in the wrong rhythm do not sound like the record. Count along, or turn on the count-in.</li>
</ul>
`,
  },
  ja: {
    title: "耳コピのやり方：短いフレーズをループしてスロー再生で聞き取る",
    heading: "ループとスロー再生でする耳コピのやり方",
    nav: "耳コピのやり方",
    description:
      "ギターのフレーズを耳コピする実践的な手順。短いフレーズを選んでループし、音程を変えずにスロー再生して音を探し、原曲のテンポまで戻すまでを説明します。",
    body: () => `
<p class="lead">耳コピは、曲を最初から最後まで聞き流すのをやめて、短いフレーズを 1 つずつ、ゆっくり、何度も聞くと格段に速く進みます。ソロ・リフ・コードのどれにも使える方法を紹介します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#why">ループとスロー再生が効く理由</a></li>
  <li><a href="#steps">手順</a></li>
  <li><a href="#speed">どのくらい遅くすればいい？</a></li>
  <li><a href="#tips">聞き取りにくいパートのコツ</a></li>
  <li><a href="#mistakes">よくある失敗</a></li>
</ol></nav>

<h2 id="why">ループとスロー再生が効く理由</h2>
<p>速いフレーズは、追いかける前に過ぎ去ってしまいます。${LICK_BPM} BPM の 16 分音符で 2 小節のフレーズなら、1 秒に ${nps(LICK_BPM)} 音、長さはわずか ${barsSeconds(2, 4, LICK_BPM).toFixed(1)} 秒です。50% にすると 1 秒に ${nps(heardBpm(LICK_BPM, 50))} 音、${barsSeconds(2, 4, heardBpm(LICK_BPM, 50)).toFixed(1)} 秒になり、1 音ずつ聞き取れる速さになります。</p>
<p>昔ながらの方法（テープやレコードを遅く回す）で遅くすると、音程も下がって楽器と合わなくなります。Loop Trainer のような<b>タイムストレッチ</b>のプレイヤーは音程を保ったまま遅くするので、聞き取れる速さのまま指板で音を探せます。</p>
<p>ループにすれば、巻き戻す手間がなくなります。1 周ごとに同じ音を聞き直せて、毎周一緒に弾くこともできます。</p>

<h2 id="steps">手順</h2>
<ol>
  <li><b>まずセクション全体を聞く。</b>どこで上がり、どこで休み、どこが繰り返しかなど、全体の形をつかみます。</li>
  <li><b>短いフレーズを 1 つループする。</b>1〜2 小節、または音楽的なひとまとまり。「小節の頭に合わせる」をオンにして目的の小節をドラッグすれば、小節線ぴったりのループになります。</li>
  <li><b>全部の音がはっきり聞こえるまで遅くする。</b>まず 70%、速いところは 60% や 50% に。</li>
  <li><b>歌う・ハミングする。</b>歌えれば聞き取れています。歌えなければ、もっと短くループします。</li>
  <li><b>最初の音と最後の音を楽器で探し、</b>その間を埋めていきます。拍の上の音が一番見つけやすく、波形の下の目盛りで拍の位置が分かります。</li>
  <li><b>ループに合わせて弾く。</b>同じに聞こえたら、名前（「ソロ 1〜2 小節」など）を付けてループを保存し、次のフレーズへ進みます。</li>
  <li><b>フレーズをつなげて</b>長いループにし、速度を原曲まで戻します。「1周ごとに速くする」を使えば自動です（例：70% から 2% ずつ 100% まで）。</li>
</ol>

<h2 id="speed">どのくらい遅くすればいい？</h2>
<p>全部の音を追える遅さで、それより遅くはしないのが目安です。極端に遅くすると音が引き伸ばされて、音の立ち上がりがぼやけます。</p>
<div class="table-wrap">
  <table class="text stack">
    <thead><tr><th scope="col">速度</th><th scope="col">向いている使い方</th></tr></thead>
    <tbody>
      <tr><th scope="row">90〜100%</th><td data-label="向いている使い方：">ほぼ覚えたパートの確認、ノリを取り戻す</td></tr>
      <tr><th scope="row">70〜80%</th><td data-label="向いている使い方：">たいていのリフやコード弾き。確実に弾けるまでの反復</td></tr>
      <tr><th scope="row">50〜60%</th><td data-label="向いている使い方：">速いソロ、16 分音符のライン、装飾音やスライド</td></tr>
    </tbody>
  </table>
</div>
<p>50% より遅いと音が崩れすぎて役に立たないため、アプリは 50% を下限にしています。</p>

<h2 id="tips">聞き取りにくいパートのコツ</h2>
<ul>
  <li><b>ベースライン：</b>キーを数半音上げてヘッドホンで聞くと、低い音が聞き取りやすくなることがあります。一緒に弾くときは元に戻してください。</li>
  <li><b>速い装飾音：</b>波形を拡大して（ピンチか Ctrl＋ホイール）、装飾音のところだけをループにします。</li>
  <li><b>コード：</b>まず一番低い音（ベース音）、次に一番高い音を聞きます。この 2 つでコードが分かることが多いです。</li>
  <li><b>変則チューニングの曲：</b>全部が半音ずれて聞こえるなら、録音が半音下げチューニングかもしれません。<a href="../change-key/">キー変更の使い方</a>をご覧ください。</li>
  <li><b>休憩をはさむ。</b>聞き続けると、どれも正しく聞こえてきます。時間をおいて、新しい耳で聞き直しましょう。</li>
</ul>

<h2 id="mistakes">よくある失敗</h2>
<ul>
  <li><b>一度に長くループしすぎる。</b>ソロ全体を 1 つのループにすると覚えきれません。2 小節ずつで十分です。</li>
  <li><b>ずっと遅いまま。</b>目標は原曲のテンポで弾くこと。確実に弾けたら、すぐに速度を上げましょう。</li>
  <li><b>リズムをおろそかにする。</b>音が合っていてもリズムが違うと原曲らしく聞こえません。数えながら弾くか、カウントインを使いましょう。</li>
</ul>
`,
  },
};
