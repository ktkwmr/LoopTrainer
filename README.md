# Loop Trainer

A practice player for learning songs by ear. Open an audio file you have, change its key and tempo freely, and loop any section (A-B repeat). Slowing down (to 50%) keeps the pitch, changing the key keeps the tempo, loops snap to the beat, and it can speed up a little on every loop.

耳コピ・フレーズ練習用のプレイヤーです。手持ちの音源ファイルのキーとテンポを自由に変えて、好きな区間をループ再生（A-B リピート）できます。50% までスロー再生しても音程はそのまま、キーを変えてもテンポはそのまま。ループは拍に吸着し、1 周ごとに少しずつ速くする機能もあります。

**▶ https://ktkwmr.com/looptrainer/** (日本語: https://ktkwmr.com/looptrainer/ja/)

## Features / 機能

- **Open audio files**: MP3, AAC (m4a), WAV, and other formats the browser can decode (FLAC, Ogg, … depending on the browser), by file picker or drag and drop. Decoded with the Web Audio API in the browser
  MP3・AAC（m4a）・WAV など、ブラウザがデコードできる形式。ファイル選択とドラッグ＆ドロップに対応。Web Audio API でブラウザ内でデコード
- **Waveform**: drag to choose the loop, tap to jump. Move a flag by tapping it (it turns blue) and then tapping where it should go, or by long-pressing it and dragging (with a mouse, drag it straight away). Pinch to zoom the waveform in or out and move two fingers sideways to scroll (Ctrl + wheel / Shift + wheel on a computer); while playing zoomed in, the view follows the cursor. “Zoom to loop” fits the loop to the screen
  波形をドラッグしてループ範囲を選択、タップで移動。旗はタップして（青くなる）移動先をタップするか、長押しして掴んだままドラッグ（マウスならそのままドラッグ）。ピンチで波形を横に拡大・縮小、2 本指を左右に動かしてスクロール（パソコンは Ctrl＋ホイール／Shift＋ホイール）。拡大中に再生するとカーソルに付いて表示が動く。「ループを拡大」でループを画面いっぱいに表示
- **Beat detection and snapping**: the tempo and the beats are found in the browser after a file is opened, the beats are drawn on the waveform, and A / B snap to the nearest beat (◀ ▶ then move by one beat). ½ / ×2 fix a tempo found at half or double speed. The detected tempo is used for the count-in until a BPM is entered or tapped
  開いた曲のテンポと拍をブラウザ内で検出して波形に表示し、A・B を一番近い拍に吸着（◀ ▶ は 1 拍ずつ）。テンポが倍・半分になったときは ½ / ×2 で修正。BPM を手で入れるまでは検出したテンポをカウントインに使う
- **Bar starts**: guessed from where the harmony changes (chroma) and from the low end (bass, kick), drawn as taller lines; “Snap to bar starts” snaps A / B to them (◀ ▶ then move by a bar). Beats per bar (2–7) and a one-beat shift of the bar start are saved for each song
  小節の頭をコードの変わり目（クロマ）と低音（ベース・キック）から推定して長い線で表示。「小節の頭に合わせる」で A・B を小節の頭に吸着（◀ ▶ は 1 小節ずつ）。1 小節の拍数（2〜7）と小節の頭のずらしは曲ごとに保存
- **A-B loop**: set A / B at the current position, move them by a beat (or 0.05 s without snapping), loop on / off, back to A
  今の位置を A・B に設定、1 拍ずつ（吸着オフなら 0.05 秒ずつ）移動、ループのオン・オフ、A に戻る
- **Speed (pitch unchanged)**: 50–150% in 1% steps, with 50–100% presets
  50〜150%（1% 単位）、50〜100% のプリセット
- **Key (tempo unchanged)**: ±6 semitones, together with the speed
  半音単位で ±6。速度と同時に使える
- **Speed up on every loop**: start speed, step per loop, and top speed (for example 70% → +2% → 100%)
  開始の速度・1 周ごとの上げ幅・上限（例: 70% から +2% ずつ 100% まで）
- **Count-in**: 1–8 clicks before each loop, at the song's BPM × the current speed. BPM by input or tap tempo
  ループの前に 1〜8 回のクリック。曲の BPM × 今の速度で鳴る。BPM は入力かタップ
- **Saved for each song**: loops, speed, key, count-in BPM, and several named loops per song (“Intro”, “Solo, first half”), restored when the same file (name + size) is opened again
  曲ごとにループ範囲・速度・キー・BPM と、名前付きのループを複数保存。同じファイル（名前とサイズ）を開くと復元
- **Keyboard**: Space play / pause, ↑↓ speed, ←→ move A (Shift: B), A / B set here, L loop, Enter back to A, − / + key, Z zoom, O open
- **Dark mode** (follows the system), large buttons, screen kept on while playing
  ダークモード（端末の設定に連動）、大きめのボタン、再生中は画面を消さない
- **Installable PWA** that also works offline after the first file has been opened. After a file has been opened, an Install button (Chrome / Edge) or a one-time “Add to Home Screen” hint (iPhone / iPad) is shown
  ホーム画面に追加でき、一度ファイルを開けばオフラインでも動作。ファイルを開いたあとに「インストール」ボタン（Chrome・Edge）か「ホーム画面に追加」の案内（iPhone・iPad、1 回だけ）を表示
- **Guides**: how to use, learning by ear, speeding up step by step, changing the key, and FAQ (English and Japanese), linked from ⚙ → Guides & articles
  使い方ガイド・耳コピのやり方・少しずつ速くする練習法・キー変更の使い方・よくある質問（英日）。⚙ →「ガイド・記事」から
- **English / Japanese UI**, chosen automatically from your browser language. `/looptrainer/ja/` is always Japanese, and `?lang=en` / `?lang=ja` overrides both

Not supported: music from streaming services (Apple Music / Spotify DRM, YouTube). Below 50% the sound breaks up, so 50% is the lowest speed. Decoded audio takes about 20 MB per minute; files over about 10 minutes show a warning.
配信サービスの音源（DRM 付きの Apple Music・Spotify、YouTube）は対象外です。50% 未満は音が崩れやすいため 50% が下限です。デコード後の音声は 1 分あたり約 20 MB のメモリを使うため、約 10 分を超えるファイルでは警告を出します。

## How the audio works / 音声処理の仕組み

- [SoundTouchJS](https://github.com/cutterbl/SoundTouchJS) (LGPL-2.1) does the time stretching and pitch shifting. It is loaded **unmodified, as a separate file**, from `https://cdn.jsdelivr.net/npm/soundtouchjs@0.3.0/dist/soundtouch.js` the first time a file is opened, and `sw.js` keeps a copy for offline use.
- The player reads the decoded `AudioBuffer` itself and feeds it to SoundTouch from a `ScriptProcessorNode` (works on iOS Safari). Loops are joined in the source, so there is no gap at the loop point, and a count-in is inserted there as silence while the clicks are scheduled on the audio clock.
- Everything that depends on the library is inside `createStretcher()` in `index.html` (`setSpeed`, `setSemitones`, `put`, `receive`, `pendingInput`). To try another engine (for example Rubber Band in WebAssembly), replace that function. Note that Rubber Band is GPL: the whole app would then have to be published under a GPL-compatible license, with a link to the source of the WebAssembly build.
- Beat detection (`detectBeats()`): spectral flux of an 11 kHz mono copy → tempo by autocorrelation weighted toward 120 BPM → beats by dynamic programming (Ellis 2007) → each beat moved to the nearest onset peak. With test signals the beats land within ±3 ms; songs whose onsets do not repeat clearly get no beats (“No beat found”). It runs on the main thread in small chunks, so playback is not interrupted.
- iOS only starts audio from a tap: the AudioContext is resumed by the first Play. `navigator.audioSession.type = "playback"` lets it play with the silent switch on (Safari 17+).

- 速度とキーの変更は [SoundTouchJS](https://github.com/cutterbl/SoundTouchJS)（LGPL-2.1）で行います。最初にファイルを開いたときに jsDelivr から**改変せずに別ファイルとして**読み込み、`sw.js` がオフライン用に保存します。
- プレイヤーはデコードした `AudioBuffer` を自分で読み出し、`ScriptProcessorNode`（iOS Safari でも動く）から SoundTouch に渡します。ループは読み出し側でつなぐので継ぎ目に隙間がなく、カウントインはそこに無音として挟み、クリックは音声の時計で予約して鳴らします。
- ライブラリに依存する部分は `index.html` の `createStretcher()` にまとめています。Rubber Band（WebAssembly、GPL）などに差し替えるときはこの関数を置き換えます。その場合はアプリ全体を GPL 互換のライセンスで公開し、WebAssembly の元のソースへのリンクを載せる必要があります。

## Privacy / プライバシー

- Audio files are decoded and played only in your browser and are never uploaded. The app has no accounts, cookies, or ads.
- For each song you open, the file name and size, loops, speed, key, count-in BPM, and the last position are saved in your browser's storage (`looptrainer-state` in `localStorage`); the audio itself is not saved. For offline use, the app and the SoundTouchJS library are saved there too. Clear this site's data to remove them. If storage is not available (for example in private browsing), the app works without saving.
- When the first file is opened, SoundTouchJS is loaded from jsDelivr, which receives your IP address and browser information like any web request.
- The site is hosted on Cloudflare, which keeps standard access logs (IP address, time, requested page) for operation and security. Page views are counted with Cloudflare Web Analytics, which uses no cookies.

- 音源ファイルはブラウザの中だけで読み込み・再生し、アップロードしません。アカウント登録・Cookie・広告はありません。
- 開いた曲ごとに、ファイル名とサイズ・ループ・速度・キー・カウントインの BPM・最後の再生位置をブラウザ内（`localStorage` の `looptrainer-state`）に保存します。音源そのものは保存しません。オフラインで使うため、アプリ本体と SoundTouchJS も保存します。サイトデータを削除すると消えます。保存できない環境（プライベートモードなど）でも、保存なしで動きます。
- 最初にファイルを開いたとき、jsDelivr から SoundTouchJS を読み込みます。通常の Web の通信と同じく、IP アドレスやブラウザの情報が jsDelivr に送られます。
- サイトは Cloudflare で配信しており、運用・セキュリティのために標準的なアクセスログが記録されます。閲覧数は Cookie を使わない Cloudflare Web Analytics で集計しています。

The same notice is shown in the app under ⚙ → **Privacy**. The full privacy policy is at `/looptrainer/privacy/` (Japanese: `/looptrainer/ja/privacy/`), and the operator information is at `/looptrainer/about/`.
アプリ内の ⚙ → **プライバシー** でも同じ内容を表示しています。プライバシーポリシーは `/looptrainer/ja/privacy/`、運営者情報は `/looptrainer/ja/about/` にあります。

## Project structure / 構成

```
public/
  _headers                      # security headers (CSP etc.)
  404.html                      # page for unknown URLs under /looptrainer/ (status 404)
  looptrainer/
    index.html                  # the app (HTML / CSS / JS, English and Japanese text)
    ja/index.html               # Japanese page, generated from index.html (do not edit)
    guide/  learn-by-ear/  speed-up-practice/  change-key/  faq/   # articles, generated from scripts/pages/ (do not edit)
    about/  privacy/  ja/...    # info pages, generated from scripts/pages/ (do not edit)
    images/guide/               # app screenshots for the guide (scripts/render-guide-images.mjs)
    sitemap.xml                 # generated by scripts/build-pages.mjs (do not edit)
    sw.js                       # Service Worker (network first, offline fallback; the pinned CDN library cache first)
    manifest.json               # PWA manifest
    icons/                      # icon.svg and PNGs (scripts/render-icons.mjs)
    og-image.png                # image for search results and social media shares
    THIRD_PARTY_LICENSES.md     # third-party notices (shown in About)
scripts/
  build-ja.mjs                  # generates ja/index.html from index.html
  build-pages.mjs               # generates the articles, info pages, and sitemap.xml from scripts/pages/
  pages/                        # page content (one file per page, English and Japanese), layout, practice.mjs (numbers for the tables)
  render-guide-images.mjs       # takes the guide screenshots (Playwright)
  update-third-party-licenses.mjs
  og-image.html                 # source of og-image.png
  render-og-image.mjs           # renders og-image.html to og-image.png (Playwright)
  render-icons.mjs              # renders icons/icon.svg to the PNG icons (Playwright)
tests/
  analysis.test.mjs             # unit tests of the beat and bar analysis (code taken from index.html)
  e2e.mjs                       # browser test of the app (Playwright)
  signals.mjs                   # test songs with known tempo, beats, and bar starts
.github/workflows/test.yml      # runs the tests on pull requests and on push to main
wrangler.jsonc                  # Cloudflare Workers (static assets, route ktkwmr.com/looptrainer*)
CLAUDE.md                       # instructions for Claude Code
docs/baseline-status.md         # status of the shared web app baseline items
```

This is the fifth app on `ktkwmr.com`. Its Worker only serves `/looptrainer/*`; the domain root (`/`, `robots.txt`, the root `sitemap.xml`, and 404 for other paths) belongs to the `ktkwmr-home` Worker ([ktkwmr/ktkwmr.com](https://github.com/ktkwmr/ktkwmr.com)), so this app does not depend on any other app.
`ktkwmr.com` の 5 つ目のアプリです。この Worker は `/looptrainer/*` だけを配信し、ドメイン直下は `ktkwmr/ktkwmr.com` の Worker が持っています。

When you load a script or data from a new external host, add it to the `Content-Security-Policy` in `public/_headers`, or the browser will block it. Also update the privacy text (see below).
新しい外部サイトからスクリプトやデータを読み込むときは、`public/_headers` の `Content-Security-Policy` にそのホストを追加してください。プライバシーの説明も同時に直します。

## Development / 開発

Serve `public/` with a local server and open `/looptrainer/`. Opening `index.html` as a `file://` URL does not work (the Service Worker, the module import, and the license file need a server).
ローカルのサーバーで `public/` を配信して `/looptrainer/` を開きます。`file://` で直接開くと Service Worker などが動きません。

```sh
npx wrangler dev        # http://localhost:8787/looptrainer/ (also runs the generators)
# or
npx serve public
```

On Windows PowerShell, use `npx.cmd` if `npx` is blocked by the execution policy. `wrangler dev` keeps serving old ETags after a file changes; restart it after editing.
Windows の PowerShell で `npx` が止められるときは `npx.cmd` を使います。`wrangler dev` はファイルを編集しても古い ETag を返すので、編集したら起動し直してください。

If the app shows an old version, reload the page (or restart the installed app); the Service Worker fetches the latest files first and uses the cache only when offline.
古い画面が出るときは再読み込み（ホーム画面のアプリは再起動）してください。

## Tests / テスト

```sh
node --test tests/analysis.test.mjs   # beat, tempo, and bar-start analysis on test songs (no browser needed)

npm install --no-save playwright@1.63.0 soundtouchjs@0.3.0 && npx playwright install chromium
node tests/e2e.mjs                    # the app in Chromium: snapping, loop, speed and key measured on the output, saving, CSP
```

The browser test serves `public/` with the headers from `public/_headers`, serves SoundTouchJS from `node_modules` instead of the CDN, and blocks the Service Worker (requests from it would bypass Playwright's routing). The **Tests** GitHub Actions workflow runs both on every pull request. Keep the `soundtouchjs` version in the workflow the same as `ST_URL`.
解析の単体テスト（ブラウザ不要）と、Playwright でアプリを動かすテストがあります。PR ごとに GitHub Actions の **Tests** で実行されます。

## Deploy / デプロイ

The app is served with Cloudflare Workers static assets. With Workers Builds connected to this repository, a push to `main` deploys automatically, and other branches get preview builds. To deploy by hand:

```sh
npx wrangler deploy
```

## Generated files / 生成ファイル

Edit only `public/looptrainer/index.html` and `scripts/`. These files are generated and must not be edited by hand:

- `public/looptrainer/ja/index.html` – `index.html` with Japanese `<head>` (title, description, canonical, Open Graph, JSON-LD) and Japanese UI text, so search engines can index the Japanese version. The Japanese title and description are in `scripts/build-ja.mjs`; UI text comes from `I18N.ja` in `index.html`.
- The articles (`guide`, `learn-by-ear`, `speed-up-practice`, `change-key`, `faq`), the info pages (`about`, `privacy`), their `ja/` versions, and `sitemap.xml` – from `scripts/pages/<slug>.mjs` (English and Japanese written separately) and `scripts/pages/layout.mjs`. The tables in the articles are calculated by `scripts/pages/practice.mjs`, which reads the app's limits (`SPEED_MIN`, `SPEED_MAX`, `SEMI_MAX`, `PRESETS`) from `index.html`.

They are regenerated automatically by `npx wrangler deploy` / `npx wrangler dev` (`build.command` in `wrangler.jsonc`) and by the **Build generated pages** GitHub Actions workflow on push to `main`. To run them manually:

```sh
node scripts/build-ja.mjs             # regenerate ja/index.html
node scripts/build-pages.mjs          # regenerate the articles, info pages, and sitemap.xml
node scripts/build-ja.mjs --check     # exit 1 if out of date (same for build-pages.mjs)
```

To add an article, create `scripts/pages/<slug>.mjs` and add the slug to `PAGES` in `scripts/build-pages.mjs`; it is added to the footer of every page and to the sitemap. Also add it to the guide list in `intro.body` in `index.html`. A person checks every new or changed article in the preview build before it is merged (see `docs/article-review.md`).

When a service that receives visitors' information is added or removed (for example ads), update `scripts/pages/privacy.mjs` and its dates, the Privacy text in the app (`privacy.body` in `index.html`), and this README in the same change.

編集するのは `public/looptrainer/index.html` と `scripts/` だけです。`ja/index.html`、情報ページ（運営者情報・プライバシーポリシー）、`sitemap.xml` は生成ファイルなので手で編集しません。外部サービスを足す・外すときは、プライバシーポリシー（`scripts/pages/privacy.mjs`）、アプリ内の `privacy.body`、この README を同時に直してください。

## Images / 画像

```sh
npm install --no-save playwright && npx playwright install chromium
node scripts/render-og-image.mjs      # og-image.png from scripts/og-image.html
node scripts/render-icons.mjs         # PNG icons from icons/icon.svg
node scripts/render-guide-images.mjs  # screenshots for the guide (needs soundtouchjs too; re-run when the app's look changes)
```

With Chrome or Edge installed, `npm install --no-save playwright-core` and `PW_CHANNEL=msedge` (or `chrome`) also work.

## Third-party licenses / サードパーティライセンス

The **Update third-party licenses** GitHub Actions workflow adds every CDN library (`cdn.jsdelivr.net/npm/…` or `unpkg.com/…`) found under `public/` to [`public/looptrainer/THIRD_PARTY_LICENSES.md`](public/looptrainer/THIRD_PARTY_LICENSES.md) on push to `main`. Pin the version in the URL, add the host to the CSP, and update the URL in `sw.js` (`CDN`) when the version changes.

```sh
node scripts/update-third-party-licenses.mjs          # add missing entries
node scripts/update-third-party-licenses.mjs --check  # exit 1 if the file would change
```

## License / ライセンス

[MIT](LICENSE) © 2026 ktkwmr. SoundTouchJS is LGPL-2.1 and is not part of this repository; it is loaded unmodified from the CDN.
