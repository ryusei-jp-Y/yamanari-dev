export type Project = {
  slug: "web-quality-crawler" | "boarda" | "idle-clock";
  name: string;
  label: string;
  href: string;
  status: string;
  summary: string;
  lead: string;
  audience: string;
  stack: string[];
  highlights: string[];
  links: {
    label: string;
    href: string;
  }[];
};

export const projects: Project[] = [
  {
    slug: "web-quality-crawler",
    name: "Web Quality Crawler",
    label: "Quality automation",
    href: "/web-quality-crawler",
    status: "Local-first demo / Tunnel on demand",
    summary:
      "Webサイト品質をコード、情報設計、文章、ビジュアル、操作性、Lighthouseの観点で自動評価するクローラーとダッシュボード。",
    lead:
      "決定的48ルールとAI 25ルールを同じスコアリング体系に載せ、検知箇所をスクリーンショット上のハイライトと改善提案へつなげます。",
    audience:
      "品質改善を継続的に回したいWeb制作・運用チーム、または技術ポートフォリオを見る採用担当者向け。",
    stack: [
      "Node.js",
      "Express",
      "Playwright",
      "Lighthouse",
      "SQLite",
      "Claude API",
    ],
    highlights: [
      "1ターゲットごとの子プロセス分離でクロールの安定性を優先",
      "Lighthouseと独自ルールを同じダッシュボードに統合",
      "AI評価と修正提案をキャッシュしてコストと再実行時間を抑制",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ryusei-jp-Y/web-quality-crawler",
      },
      {
        label: "Live demo host",
        href: "https://web-quality-crawler.yamanari.dev",
      },
    ],
  },
  {
    slug: "boarda",
    name: "Boarda",
    label: "Realtime board",
    href: "/boarda",
    status: "Product prototype",
    summary:
      "ひとつだけの共有掲示板を、匿名ユーザーが上書きしていくリアルタイムWebサービス。",
    lead:
      "時系列の投稿一覧ではなく、今いちばん表に貼られている一枚だけを見る体験に絞った、小さな共有場所です。",
    audience:
      "軽い告知、作業中の合図、イベント中の一言掲示など、履歴より現在地を共有したい場面向け。",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Realtime"],
    highlights: [
      "匿名IDをHttpOnly Cookieで保持し、DBにはHMACハッシュのみ保存",
      "5分間の編集制限をクライアントではなくDB/RPC側で判定",
      "Supabase Realtimeで閲覧中の画面へ即時反映",
    ],
    links: [
      {
        label: "App",
        href: "https://boarda.yamanari.dev",
      },
    ],
  },
  {
    slug: "idle-clock",
    name: "Idle Clock",
    label: "iOS visual clock",
    href: "/idle-clock",
    status: "iOS prototype",
    summary:
      "動き続けるビジュアルを眺めながら時間を確認できる、ローカルファーストな時計アプリ。",
    lead:
      "時計を見るという短い行為に、静かな視覚的変化を添えるiOS向けアプリです。MVPではバックエンドを持たず端末内で完結します。",
    audience:
      "作業机、ベッドサイド、展示用端末など、実用時計と環境演出の間にある使い方をしたい人向け。",
    stack: ["Flutter", "Dart", "iOS", "Local-first"],
    highlights: [
      "MVPは認証、DB、バックエンドを持たない単体アプリとして設計",
      "時計表示、反射アニメーション、画面回転への追従を検証中",
      "App Store公開に向けたクリエイティブとリリース準備を整理",
    ],
    links: [],
  },
];

export function getProject(slug: Project["slug"]) {
  return projects.find((project) => project.slug === slug);
}
