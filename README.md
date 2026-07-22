# yamanari.dev

`yamanari.dev` 配下のポートフォリオと各プロジェクト紹介ページです。Cloudflare Workers Static AssetsでHTML/CSS/画像を配信し、Worker APIでInstagramの最新投稿を取得します。

## Routes

- `/` - ポートフォリオトップ
- `/web-quality-crawler/` - Web Quality Crawler紹介ページ
- `/boarda/` - Boarda紹介ページ
- `/idle-clock/` - Idle Clock紹介ページ
- `/kaosan-live/` - Kaosan Live紹介ページ
- `/_components/` - UIコンポーネントの実装カタログ

## Architecture

```text
htdocs/
├── .assetsignore                 # Workerの配信対象外ルール
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
├── js/instagram-feed.js        # Instagram API結果で静的フォールバックを更新
├── scss/this.scss             # トップページ差分
├── css/this.css
└── {page}/
    ├── index.html
    ├── scss/this.scss         # ページ差分
    └── css/this.css
worker/
├── index.mjs                   # Workerエントリーポイント / Instagram API
└── index.test.mjs
```

依存方向は `setting → layout → components → utilities` とし、ページ側は `common/scss/forward` が公開する変数とmixinだけを参照します。HTMLは `main.l-page > section.l-section > div.l-inner` を基本骨格にし、`l-` はレイアウト、`c-` はUIコンポーネント、`is-` は状態として使います。ページ固有のスタイルは各ページの `scss/this.scss` に記述します。

PHP includeは採用せず、Cloudflare Workerをサーバーサイド境界にします。Instagram APIが利用できない場合も、HTML内のローカル画像をフォールバックとして表示します。

## Development

```bash
pnpm install
pnpm run build
pnpm run dev
```

SCSSエントリーポイントは `scripts/build-css.mjs` が自動検出し、各 `scss/` と同じ階層の `css/` へ出力します。パーシャルは `_` で始めてください。生成済みCSSもデプロイ内容を確認できるようコミット対象です。SCSSソースとソースマップはリポジトリには保持しますが、`htdocs/.assetsignore` によりWorkerからは配信しません。

Instagram APIをローカルで確認する場合は、`.dev.vars.example`をもとに`.dev.vars`を作成し、次の値を設定します。

```dotenv
INSTAGRAM_USER_ID=...
INSTAGRAM_ACCESS_TOKEN=...
```

未設定でもサイトは起動し、Instagram欄にはローカル画像が表示されます。

## Check

```bash
pnpm run check
```

## Cloudflare Workers Builds

Git連携では次の設定を使います。WranglerはWorker本体と`htdocs/`配下の静的アセットをまとめてデプロイします。

```text
Build command: pnpm run build
Deploy command: npx wrangler deploy
Version command: npx wrangler versions upload
Root directory: /
```

初回のみ、InstagramのユーザーIDとアクセストークンをWorker Secretへ登録します。

```bash
npx wrangler secret put INSTAGRAM_USER_ID
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN
```

トークンはソースコードや`wrangler.jsonc`へ直接記載しません。`/api/instagram`の正常レスポンスは15分間エッジキャッシュされ、API取得に失敗した場合はトップページの静的画像が維持されます。長期アクセストークンには有効期限があるため、期限前に更新して同じSecretへ再登録してください。
