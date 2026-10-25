// Questions and answers. The answers are HTML; build-pages.mjs also puts a plain-text
// copy in the FAQPage structured data.
import { SPEED_MIN, SPEED_MAX, SEMI_MAX } from "./practice.mjs";

const EN = [
  { q: "Is Loop Trainer free?", a: "Yes. It is free to use, with no sign-up or account." },
  {
    q: "Is my audio uploaded?",
    a: 'No. The file is read and played only in your browser. Nothing about your audio is sent anywhere. See the <a href="../privacy/">privacy policy</a>.',
  },
  {
    q: "Which files can I open?",
    a: "MP3, AAC (m4a), and WAV work in every browser. FLAC, Ogg, and others work where the browser supports them. Video files with an audio track (such as MP4) often work too.",
  },
  {
    q: "Can I use songs from Apple Music, Spotify, or YouTube?",
    a: "No. Music from streaming services is protected and cannot be opened in other apps. Use audio files you have, such as songs you bought as files, recordings of your band, or practice tracks.",
  },
  {
    q: "Does slowing down change the pitch?",
    a: `No. The speed (${SPEED_MIN}%–${SPEED_MAX}%) and the key (±${SEMI_MAX} semitones) are changed separately, so you can use either one, or both together.`,
  },
  {
    q: `Why can't I go slower than ${SPEED_MIN}%?`,
    a: "Below that, the sound is stretched so much that notes blur and it stops being useful for practice.",
  },
  {
    q: "The loop points do not land on the beat.",
    a: 'Check the tempo next to the time: if it shows half or double the tempo you feel, use ½ or ×2 under “Beats and bars”. If the song has no steady beat, the app shows “No beat found”; place the points freely then. See <a href="../guide/#beats">beats and bars</a>.',
  },
  {
    q: "The bar starts are on the wrong beat.",
    a: "The bar starts are a guess, made from where the chords change and from the bass and kick drum. Move them with ◀ ▶ next to “Bar starts”, and check the beats per bar (3 for a waltz).",
  },
  {
    q: "Are my loops saved?",
    a: "Yes, in your browser, for each song (recognised by the file name and size). Open the same file again and the loops, speed, and key come back. The audio itself is not saved. If you clear the site data, or use a private window, they are lost.",
  },
  {
    q: "Can I use it offline?",
    a: "Yes, after you have opened one file while online (the audio library is saved then). You can also install it: “Install” in Chrome or Edge, or Share → Add to Home Screen on iPhone and iPad.",
  },
  {
    q: "There is no sound on my iPhone.",
    a: "Tap Play once (phones only allow sound after a tap), and check the volume. On iOS 17 or later the app plays even when the silent switch is on; on older versions, turn the silent switch off.",
  },
  {
    q: "A long file is slow or does not open.",
    a: "Decoded audio needs about 20 MB of memory per minute. On phones, files of more than about 10 minutes can be too large. Cut the part you want to practise into a shorter file.",
  },
];

const JA = [
  { q: "無料ですか？", a: "はい。無料で、登録やアカウントも不要です。" },
  {
    q: "音源はアップロードされますか？",
    a: 'いいえ。ファイルはブラウザの中だけで読み込み・再生します。音源に関する情報はどこにも送られません。<a href="../privacy/">プライバシーポリシー</a>をご覧ください。',
  },
  {
    q: "どんなファイルを開けますか？",
    a: "MP3・AAC（m4a）・WAV はどのブラウザでも開けます。FLAC・Ogg などは、ブラウザが対応していれば開けます。音声の入った動画ファイル（MP4 など）も開けることが多いです。",
  },
  {
    q: "Apple Music・Spotify・YouTube の曲は使えますか？",
    a: "使えません。配信サービスの曲は保護されていて、ほかのアプリでは開けません。ファイルで購入した曲、バンドの録音、練習用の音源など、手持ちの音源ファイルを使ってください。",
  },
  {
    q: "遅くすると音程は変わりますか？",
    a: `変わりません。速度（${SPEED_MIN}%〜${SPEED_MAX}%）とキー（半音単位で ±${SEMI_MAX}）は別々に変わるので、片方だけでも、両方同時にも使えます。`,
  },
  {
    q: `${SPEED_MIN}% より遅くできないのはなぜですか？`,
    a: "それより遅くすると音が引き伸ばされすぎて、音の輪郭がぼやけ、練習に使えなくなるためです。",
  },
  {
    q: "ループの位置が拍に合いません。",
    a: '時間の横のテンポを確認してください。感じるテンポの半分や倍になっていたら、「拍と小節」の ½ か ×2 で直します。拍のはっきりしない曲では「拍を検出できませんでした」と表示されるので、自由な位置に置いてください。<a href="../guide/#beats">拍と小節</a>の説明もご覧ください。',
  },
  {
    q: "小節の頭が違う拍になっています。",
    a: "小節の頭は、コードが変わる位置とベース・キックの強さから推定しています。「小節の頭」の横の ◀ ▶ で動かし、1 小節の拍数（ワルツなら 3）も確認してください。",
  },
  {
    q: "ループは保存されますか？",
    a: "はい。曲ごと（ファイル名とサイズで見分けます）にブラウザ内に保存されます。同じファイルを開けば、ループ・速度・キーが元に戻ります。音源そのものは保存しません。サイトデータを削除したときやプライベートモードでは消えます。",
  },
  {
    q: "オフラインで使えますか？",
    a: "はい。オンラインのときに一度ファイルを開けば使えます（そのときに音声処理のライブラリを保存します）。インストールもできます（Chrome・Edge は「インストール」、iPhone・iPad は「共有 → ホーム画面に追加」）。",
  },
  {
    q: "iPhone で音が出ません。",
    a: "「再生」を一度タップしてください（スマホはタップしてからでないと音を出せません）。音量も確認してください。iOS 17 以降は消音モードでも音が出ます。それより前の iOS では消音モードを解除してください。",
  },
  {
    q: "長いファイルが重い・開けません。",
    a: "読み込んだ音声は 1 分あたり約 20 MB のメモリを使います。スマホでは 10 分くらいを超えると大きすぎることがあります。練習したい部分だけを短いファイルにしてください。",
  },
];

const list = (items) => `<dl class="faq">\n${items.map((x) => `  <dt>${x.q}</dt>\n  <dd>${x.a}</dd>`).join("\n")}\n</dl>`;

export default {
  slug: "faq",
  faq: true,
  en: {
    title: "Loop Trainer FAQ",
    heading: "Frequently asked questions",
    nav: "FAQ",
    description:
      "Answers to common questions about Loop Trainer: privacy, supported files, streaming services, slowing down without changing the pitch, beat and bar snapping, saved loops, offline use, and iPhone sound.",
    faq: EN,
    body: () => `<p class="lead">Short answers to common questions. For step-by-step instructions, see the <a href="../guide/">guide</a>.</p>\n${list(EN)}`,
  },
  ja: {
    title: "よくある質問（FAQ）",
    heading: "よくある質問",
    nav: "よくある質問",
    description:
      "Loop Trainer についてのよくある質問。プライバシー、開けるファイル、配信サービスの曲、音程を変えないスロー再生、拍と小節への吸着、ループの保存、オフライン、iPhone の音について。",
    faq: JA,
    body: () => `<p class="lead">よくある質問への短い回答です。詳しい手順は<a href="../guide/">使い方ガイド</a>をご覧ください。</p>\n${list(JA)}`,
  },
};
