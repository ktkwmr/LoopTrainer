# Loop Trainer

耳コピ・フレーズ練習用の区間ループ＆減速プレイヤー（音程を変えずに速度変更、テンポを変えずにキー変更）。公開 URL: https://ktkwmr.com/looptrainer/ （日本語: /looptrainer/ja/）
構成・開発・デプロイの詳細は README.md を参照。

## 共通ベースライン
- 独自機能以外の共通項目は ktkwmr/webapp-baseline（非公開）の WEBAPP_BASELINE.md に従う。
  セッションに無ければ add_repo（read。更新するときは push）で追加して読む。
- 各項目の状態は docs/baseline-status.md に記録する。
- どのアプリにも当てはまる新しい作業・設定・落とし穴が出てきたら、作業の最後に
  ベースラインへの追記案を出す（ユーザーが了承したらベースラインのリポジトリに PR）。
- 共通部分のファイル（`wrangler.jsonc`、`public/_headers`、`sw.js`、workflows など）を直したら、`webapp-baseline/templates/` の同じファイルも直す案を出す。
- 独自機能（再生・ループ・速度・キー・カウントイン・波形・曲ごとの保存）の変更だけなら追記は不要。

## このアプリの値
- スラッグ: `looptrainer` / ドメイン: `ktkwmr.com` / 言語: en（既定）+ ja（`/ja/`）
- 運営者: ktkwmr / 問い合わせ: GitHub Issues
- Cloudflare Web Analytics token: `5c53079cb9a64d819d1ca53e8533ca63`（ほかのアプリと同じサイト）
- ホスティング: Cloudflare Workers 静的アセット。ドメインの 5 つ目のアプリなので、別 Worker に Route `ktkwmr.com/looptrainer*` だけを割り当てる（ベースライン §0 の A）。
  ドメイン直下（`/` のトップページ＝アプリ一覧、`robots.txt`、ルートの `sitemap.xml`、`_redirects`、ルートの 404）は別リポジトリ `ktkwmr/ktkwmr.com`（Worker `ktkwmr-home`、ルート `ktkwmr.com/*`）にある。このアプリの sitemap は `/looptrainer/sitemap.xml`。

## ルール
- 手で編集するのはアプリ本体 `public/looptrainer/index.html` と `scripts/`。生成ファイル（`public/looptrainer/ja/index.html`、情報ページ `<slug>/` とその `ja/`、`public/looptrainer/sitemap.xml`）は編集せず、`node scripts/build-ja.mjs` と `node scripts/build-pages.mjs` で作り直す（`--check` で確認）。
- 画面の文言は `index.html` の `I18N`（en / ja）に書き、要素には `data-i18n` / `data-i18n-html` / `data-i18n-attr` を付ける（`build-ja.mjs` が日本語ページの本文を置き換える）。JS で作る文言は `t()` を使う。子要素を持つ要素に `data-i18n` は付けない（`build-ja.mjs` が止まる）。`data-i18n-html` の中に同じタグ名の要素を入れ子にしない。
- 音声処理は SoundTouchJS（LGPL-2.1）を jsDelivr から**バージョン固定・改変なし**で読み込む（`ST_URL`）。バージョンを変えるときは `index.html` の `ST_URL`、`sw.js` の `CDN`、`THIRD_PARTY_LICENSES.md` を同じ PR で直す。`createStretcher()` は SoundTouchJS 0.3.0 の内部（`_intermediateBuffer`・`_rate`・`_tempo`）を読んでいるので、上げたら再生位置の表示とカウントインのずれを確かめる。
- 拍の検出は `detectBeats()`（スペクトルフラックス → 自己相関でテンポ → 動的計画法で拍）。`BEAT_BIAS`（14 ms）はテンポと位置が分かっている合成音で測った値なので、解析の窓や刻み（`N`・`HOP`）を変えたら測り直す。吸着したループ点は拍の `LEAD`（10 ms）手前に置く。
- ピッチ処理を差し替えるときは `createStretcher()` だけを置き換える。Rubber Band（GPL）にする場合はアプリ全体を GPL 互換で公開し、WASM の元ソースへのリンクを載せる（LICENSE・README・about・THIRD_PARTY_LICENSES も直す）。
- 保存は `localStorage` の `looptrainer-state`（`prefs` と、`ファイル名|サイズ` をキーにした `songs`）。読み込んだ値は `sanitizePrefs()` / `sanitizeSong()` で検証してから使う。保存形式を変えるときは古い形式も読めるようにする。保存できなくても再生は動くこと。
- 外部ホストを足したら `public/_headers` の CSP と、プライバシーの説明（`scripts/pages/privacy.mjs`、アプリ内の `privacy.body`、README）を同じ PR で直す。
- トップページ（https://ktkwmr.com/）のアプリ一覧に、このアプリの名前・説明・特徴を載せる（`ktkwmr/ktkwmr.com` の `scripts/pages/home.mjs` の `APPS`。アイコンは `ICON`。`public/robots.txt` の `Sitemap:` 行も）。ガイド記事を追加・改名・削除したとき、アプリ名・説明・アイコンを変えたときは、`ktkwmr/ktkwmr.com` に `home.mjs` を直す PR を別に出す（ベースライン §2-16）。
- 記事を追加・変更したら、PR のプレビューで人間が内容を確認してからマージする（ベースライン §10-7）。
- 作業はブランチ → PR → Cloudflare のプレビュービルド確認 → squash マージ。
- 本番サイト・Cloudflare 管理画面・外部 CDN にはこの環境から届かないことが多い。確かめられなかったことは「未確認」と書き、ユーザーに確認手順を伝える。Playwright で確かめるときは、CDN を npm の tarball の `dist/soundtouch.js` で返し、Service Worker を止める（SW からのリクエストは `page.route` で横取りできない。`context.route` なら届く）。
