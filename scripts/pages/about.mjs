// Operator information (site information page, linked from the footer)
const ISSUES = "https://github.com/ktkwmr/LoopTrainer/issues";
const REPO = "https://github.com/ktkwmr/LoopTrainer";

export default {
  slug: "about",
  schemaType: "AboutPage",
  modified: "2026-10-24",
  en: {
    title: "About This Site",
    heading: "About this site",
    nav: "About this site",
    description: "Operator information for Loop Trainer: who runs the site, how to contact us, disclaimer, and copyright.",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">Site name</th><td>Loop Trainer</td></tr>
      <tr><th scope="row">URL</th><td><a href="/looptrainer/">https://ktkwmr.com/looptrainer/</a></td></tr>
      <tr><th scope="row">Operator</th><td>ktkwmr (individual developer)</td></tr>
      <tr><th scope="row">What we offer</th><td>A free web app for practising songs by ear: it changes the key and the tempo of an audio file freely and loops any section</td></tr>
      <tr><th scope="row">Contact</th><td><a href="${ISSUES}" rel="noopener">GitHub Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">Contact</h2>
<p>For questions, bug reports, and suggestions, please open an issue on <a href="${ISSUES}" rel="noopener">GitHub Issues</a>. A GitHub account (free) is required.</p>
<p>Issues are public. Do not include personal information, and do not attach audio files you do not own the rights to. If something seems wrong, the file format (for example <code>MP3</code> or <code>m4a</code>), the settings (for example <code>70%, key +2, count-in on</code>), your browser, and your device are enough.</p>

<h2 id="disclaimer">Disclaimer</h2>
<ul>
  <li>We try to make the app accurate, but we do not guarantee that its playback, sound quality, timing, or the information on this site are correct or complete. Slowing down or changing the key changes the sound a little, and timing can vary with your device, browser, and Bluetooth headphones or speakers.</li>
  <li>Use the app only with audio you have the right to use. You are responsible for the files you open.</li>
  <li>We are not responsible for any loss or damage resulting from the use of this site.</li>
  <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
  <li>The content of this site may be changed or removed, and the service may be stopped, without notice.</li>
</ul>

<h2 id="copyright">Copyright</h2>
<ul>
  <li>The app's source code is published under the <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT License</a>. The audio processing uses <a href="https://github.com/cutterbl/SoundTouchJS" rel="noopener">SoundTouchJS</a> (LGPL-2.1), loaded unmodified from jsDelivr as a separate file. Its license is shown under Settings → About in the app.</li>
  <li>The text and images on this site are © 2026 ktkwmr.</li>
</ul>

<h2 id="privacy">Privacy</h2>
<p>How this site handles information is described in the <a href="../privacy/">privacy policy</a>.</p>
`,
  },
  ja: {
    title: "運営者情報",
    heading: "運営者情報",
    nav: "運営者情報",
    description: "Loop Trainer の運営者情報。運営者、お問い合わせ先、免責事項、著作権について。",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">サイト名</th><td>Loop Trainer</td></tr>
      <tr><th scope="row">URL</th><td><a href="/looptrainer/ja/">https://ktkwmr.com/looptrainer/ja/</a></td></tr>
      <tr><th scope="row">運営者</th><td>ktkwmr（個人開発者）</td></tr>
      <tr><th scope="row">内容</th><td>音源ファイルのキーとテンポを自由に変えて、好きな区間をループ再生できる、耳コピ・フレーズ練習用の無料 Web アプリ</td></tr>
      <tr><th scope="row">お問い合わせ</th><td><a href="${ISSUES}" rel="noopener">GitHub の Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">お問い合わせ</h2>
<p>ご質問・不具合の報告・ご要望は、<a href="${ISSUES}" rel="noopener">GitHub の Issues</a> にお寄せください。投稿には GitHub のアカウント（無料）が必要です。</p>
<p>Issues の内容は公開されます。個人情報は書かないでください。権利を持っていない音源ファイルは添付しないでください。動きがおかしいときは、ファイルの形式（例: <code>MP3</code>・<code>m4a</code>）、設定（例: <code>速度 70%・キー +2・カウントインあり</code>）、ブラウザ・端末の種類があれば十分です。</p>

<h2 id="disclaimer">免責事項</h2>
<ul>
  <li>アプリの内容はできるだけ正確になるよう努めていますが、再生・音質・タイミング・本サイトの情報が正確・完全であることを保証するものではありません。速度やキーを変えると音は多少変わります。タイミングは端末・ブラウザ・Bluetooth のイヤホンやスピーカーによって変わることがあります。</li>
  <li>アプリは、利用する権利のある音源でお使いください。開いたファイルについては利用者の責任となります。</li>
  <li>本サイトの利用によって生じた損害について、運営者は責任を負いません。</li>
  <li>本サイトからリンクしている外部サイトの内容について、運営者は責任を負いません。</li>
  <li>本サイトの内容は、予告なく変更・削除したり、提供を終了したりすることがあります。</li>
</ul>

<h2 id="copyright">著作権</h2>
<ul>
  <li>アプリのソースコードは <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT ライセンス</a>で公開しています。音声処理には <a href="https://github.com/cutterbl/SoundTouchJS" rel="noopener">SoundTouchJS</a>（LGPL-2.1）を使用しており、jsDelivr から改変せずに別ファイルとして読み込んでいます。そのライセンスはアプリの「設定 → このアプリについて」に掲載しています。</li>
  <li>本サイトの文章と画像の著作権は ktkwmr に帰属します（© 2026 ktkwmr）。</li>
</ul>

<h2 id="privacy">プライバシー</h2>
<p>本サイトでの情報の取り扱いについては<a href="../privacy/">プライバシーポリシー</a>をご覧ください。</p>
`,
  },
};
