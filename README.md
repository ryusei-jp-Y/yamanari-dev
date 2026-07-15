# yamanari.dev

`yamanari.dev` 配下のポートフォリオと各サービス紹介ページです。Cloudflare Workers Static Assetsで配信する静的HTMLを、共通デザインシステムとページ固有CSSの二層構成で管理します。

## Routes

- `/` - ポートフォリオトップ
- `/web-quality-crawler/` - Web Quality Crawler紹介ページ
- `/boarda/` - Boarda紹介ページ
- `/idle-clock/` - Idle Clock紹介ページ
- `/_components/` - UIコンポーネントの実装カタログ

## Architecture

```text
htdocs/
├── _components/                  # 生きたスタイルガイド
│   ├── index.html
│   ├── scss/this.scss
│   └── css/this.css
├── common/
│   ├── css/common.css         # 共通SCSSの生成物
│   └── scss/
│       ├── common.scss        # 共通CSSエントリーポイント
│       ├── forward/           # ページへ公開する変数とmixin
│       ├── setting/           # Primitive / Semantic token、reset、keyframes
│       ├── layout/            # l-* ページ構造
│       ├── components/           # c-* 再利用UI
│       └── utilities/         # u-* 単一責務ヘルパー
├── index.html
├── scss/this.scss             # トップページ差分
├── css/this.css
└── {page}/
    ├── index.html
    ├── scss/this.scss         # ページ差分
    └── css/this.css
```

依存方向は `setting → layout → components → utilities` とし、ページ側は `common/scss/forward` が公開する変数とmixinだけを参照します。HTMLは `main.l-page > section.l-section > div.l-inner` を基本骨格にし、`l-` はレイアウト、`c-` はUIコンポーネント、`is-` は状態、`p-` はページ固有スコープとして使います。

このサイトはCloudflare Workers Static Assetsで静的配信するため、PHP includeは採用していません。将来サーバーサイドの組み立てが必要になった場合も、現在のCSS階層とHTMLクラスの責務は維持します。

## Development

```bash
pnpm install
pnpm run build
python3 -m http.server 3000 --directory htdocs
```

SCSSエントリーポイントは `scripts/build-css.mjs` が自動検出し、各 `scss/` と同じ階層の `css/` へ出力します。パーシャルは `_` で始めてください。生成済みCSSもデプロイ内容を確認できるようコミット対象です。

## Check

```bash
pnpm run check
```

## Cloudflare Workers Builds

Git連携では次の設定を使います。Wranglerは `wrangler.jsonc` の `assets.directory` に従い、`htdocs/` 配下だけを静的アセットとしてデプロイします。

```text
Build command: pnpm run build
Deploy command: npx wrangler deploy
Version command: npx wrangler versions upload
Root directory: /
```
