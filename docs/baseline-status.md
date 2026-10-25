# ベースラインの実施状況（Loop Trainer）

基準: WEBAPP_BASELINE.md（最終更新 2026-10-25 版）

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 1-1〜1-7 | アカウントと開発環境 | ✅ | ほかのアプリで実施済み |
| 1-4 | Claude の GitHub App のアクセス | ✅ | このセッションで push できている |
| 1-8 | Cloudflare の GitHub App のアクセス | ✅ | |
| 2-1 | wrangler.jsonc（`previews: {}` 含む） | ✅ | |
| 2-2 | `_redirects` | 対象外 | ドメイン直下は `ktkwmr/ktkwmr.com` |
| 2-3 | 404.html | ✅ | アプリのアイコンを使い、アプリへ戻る |
| 2-4 | .gitignore（`.wrangler/`） | ✅ | |
| 2-5 | .gitattributes（LF） | ✅ | |
| 2-6 | 生成スクリプトの `--check` | ✅ | build-ja / build-pages / update-third-party-licenses |
| 2-7 | README（英日） | ✅ | |
| 2-8 | LICENSE（MIT） | ✅ | SoundTouchJS（LGPL）は CDN から別ファイルで読み込み |
| 2-9 | CLAUDE.md | ✅ | |
| 2-10 | バージョン番号を出さない | ✅ | |
| 2-11 | Cloudflare に接続（Workers Builds） | ✅ | Project name `looptrainer`、本番ブランチ `main` |
| 2-13 | 自動デプロイの確認 | ✅ | LoopTrainer #1 で「Workers Builds: looptrainer」が success |
| 2-14 | 2 つ目以降のアプリ（routes・`workers_dev: false`・`preview_urls: true`、sitemap は `/looptrainer/`） | ✅ | |
| 2-16 | トップページへの追加 | ✅ | ktkwmr.com #2（`APPS`・`ICON`・`PREVIEW`、`robots.txt` の `Sitemap:`）。説明を変えたら同じく PR |
| 3-1〜3-5 | PWA（manifest・アイコン・meta・sw.js・登録） | ✅ | sw.js はバージョン固定の CDN ライブラリだけキャッシュ優先で保存（オフライン用） |
| 3-6 | `file://` 不可を README に | ✅ | |
| 3-7 | インストールの案内 | ✅ | ファイルを開いたあとだけ。Chrome・Edge は「インストール」ボタン、iOS は「共有 → ホーム画面に追加」を 1 回だけ |
| 3-8 | アイコンを render-icons.mjs で生成 | ✅ | |
| 4-1〜4-3 | I18N・言語の決め方・ja/index.html 生成 | ✅ | |
| 4-4 | 日本語の検索用タイトル・説明 | ✅ | `scripts/build-ja.mjs` 冒頭。title「キー・テンポを自由に変えて区間ループ｜音程そのままスロー再生できる耳コピ用プレイヤー – Loop Trainer」 |
| 5-1〜5-6 | title・canonical・hreflang・OGP・og-image・JSON-LD・sitemap | ✅ | |
| 5-7・5-8 | h1 とアプリの下の説明 | ✅ | `.intro`（`intro.title` / `intro.body`） |
| 5-10 | sitemap はアプリごと | ✅ | `/looptrainer/sitemap.xml` |
| 5-11 | スマホでページのスクロールを止めない | ✅ | 波形は `touch-action: pan-y`（横ドラッグで範囲選択、縦はスクロール） |
| 6-1〜6-4 | セキュリティヘッダー・CSP | ✅ | `cdn.jsdelivr.net` を script-src と connect-src（SW がキャッシュ用に取得）に追加。wrangler dev で CSP 違反 0 件 |
| 7-1〜7-3 | プライバシー（アプリ内・ポリシー）・運営者情報 | ✅ | 外部送信表に jsDelivr を追加 |
| 7-4 | 問い合わせ | ⚠️ | GitHub Issues のみ |
| 7-5 | 外部サービスの記述の同期 | ✅ | |
| 7-6 | 例のコンテンツ | 対象外 | 音源はユーザーの手持ちファイル |
| 7-7 | ポリシー内の外部リンクを本番で確認 | 👤 待ち | Cloudflare と jsDelivr のプライバシーポリシーの URL |
| 8-1〜8-3 | THIRD_PARTY_LICENSES・自動更新・About で表示 | ✅ | |
| 8-4 | CDN のバージョン固定・必要時に読み込み | ✅ | `soundtouchjs@0.3.0`、最初にファイルを開いたときだけ読み込む |
| 9-1 | 設定メニュー | ✅ | 使い方 / ガイド・記事 / プライバシー / このアプリについて |
| 9-2 | 使い方ダイアログ | ✅ | 最後に使い方ガイドへのリンク |
| 9-3 | 状態の保存・復元 | ✅ | 曲ごと（ファイル名＋サイズ）。保存できない環境でも動く |
| 9-4 | スマホ対応 | ✅ | 390px と iPhone 実機で確認済み |
| 9-5 | スマホでは `accept` を外す | ✅ | |
| 9-7 | 出力・保存 | 対象外 | |
| 9-8 | アクセシビリティ | ✅ | |
| 9-9 | 自動テスト | ✅ | `tests/analysis.test.mjs`（拍・小節の解析）と `tests/e2e.mjs`（Playwright）。`.github/workflows/test.yml` で PR と main への push で実行 |
| 9-10 | ボタンを押したときの反応 | ✅ | |
| 9-11 | ダイアログのフォーカス | ✅ | |
| 10-1〜10-6 | 記事（使い方ガイド・耳コピのやり方・少しずつ速くする練習法・キー変更の使い方・FAQ） | ✅ | 表は `scripts/pages/practice.mjs` で計算、画面写真は `scripts/render-guide-images.mjs`。390px で横はみ出し・エラー・CSP 違反 0 件 |
| 10-7 | 記事の人間確認 | ✅ | プレビューで確認してから #4 をマージ（確認点は `docs/article-review.md` の A〜I） |
| 2-16（記事） | トップページのガイド一覧 | ✅ | ktkwmr.com #5（`home.mjs` の `guides` に 5 本）。記事を足したら同じく PR |
| 11-1〜11-3 | Cloudflare Web Analytics | ✅ | 同じ token |
| 11-4 | 本番で beacon を確認 | 👤 待ち | |
| 12-1・12-2 | Actions（生成・ライセンス） | ✅ | |
| 13-1〜13-3 | 本番デプロイ・本番での動作・iPhone 実機 | ✅ | ユーザーが確認済み（2026-10-25） |
| 13-4 | GitHub の About | ✅ | Description・Website・Topics を入力済み（2026-10-25） |
| 13-5 | SNS のカード表示 | ✅ | |
| 14-1・14-2 | Search Console（sitemap 送信・インデックス登録のリクエスト） | ✅ | `https://ktkwmr.com/looptrainer/sitemap.xml`、`/looptrainer/`・`/looptrainer/ja/` |
| 14-3〜14-5 | Bing・インデックスの確認・外部からの紹介 | 👤 任意 | |
| 15 | 収益化 | 対象外 | |
