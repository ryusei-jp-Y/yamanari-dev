import Link from "next/link";
import { getProject } from "../project-data";

const project = getProject("web-quality-crawler");

export const metadata = {
  title: "Web Quality Crawler | yamanari.dev",
  description:
    "Web Quality Crawler introduction page: local-first quality crawler and dashboard.",
};

export default function WebQualityCrawlerPage() {
  if (!project) return null;

  return (
    <main>
      <ProjectHero />
      <ProjectBody />
    </main>
  );
}

function ProjectHero() {
  return (
    <section className="project-hero crawler-hero">
      <div className="shell project-hero-grid">
        <div>
          <p className="eyebrow">{project?.label}</p>
          <h1>{project?.name}</h1>
          <p className="hero-lead">{project?.lead}</p>
          <div className="action-row">
            <a href="https://github.com/ryusei-jp-Y/web-quality-crawler">
              GitHub
            </a>
            <a href="https://web-quality-crawler.yamanari.dev">Live demo</a>
          </div>
        </div>
        <div className="score-board" aria-label="評価カテゴリ">
          <strong>73 rules</strong>
          <span>48 deterministic</span>
          <span>25 AI-assisted</span>
          <span>Lighthouse 4 categories</span>
        </div>
      </div>
    </section>
  );
}

function ProjectBody() {
  return (
    <>
      <section className="section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">Use case</p>
            <h2>ローカルで動かし、必要な時だけ見せる</h2>
          </div>
          <p>{project?.audience}</p>
        </div>
      </section>
      <section className="section muted">
        <div className="shell detail-grid">
          <DetailList title="技術ハイライト" items={project?.highlights ?? []} />
          <DetailList title="技術スタック" items={project?.stack ?? []} />
        </div>
      </section>
      <footer className="project-footer shell">
        <Link href="/">yamanari.devへ戻る</Link>
      </footer>
    </>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="detail-panel">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
