import Link from "next/link";
import { projects } from "./project-data";

export const metadata = {
  title: "yamanari.dev",
  description: "Portfolio and service pages for Yamanari projects.",
};

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">yamanari.dev</p>
            <h1>個人開発のプロダクトと技術判断をまとめる場所。</h1>
            <p className="hero-lead">
              Web品質評価、リアルタイム掲示板、iOS時計アプリ。作ったものを見せるだけでなく、
              何を削り、何を残し、どう運用するかまで整理して公開します。
            </p>
          </div>
          <div className="route-panel" aria-label="公開予定のURL構成">
            <span>yamanari.dev</span>
            <span>/web-quality-crawler</span>
            <span>web-quality-crawler.yamanari.dev</span>
            <span>/boarda</span>
            <span>boarda.yamanari.dev</span>
            <span>/idle-clock</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell section-heading">
          <p className="eyebrow">Projects</p>
          <h2>サービスページ</h2>
        </div>
        <div className="shell project-list">
          {projects.map((project) => (
            <Link className="project-card" href={project.href} key={project.slug}>
              <div>
                <p className="card-label">{project.label}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <span>{project.status}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
