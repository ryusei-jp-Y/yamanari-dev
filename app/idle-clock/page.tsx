import Link from "next/link";
import { getProject } from "../project-data";

const project = getProject("idle-clock");

export const metadata = {
  title: "Idle Clock | yamanari.dev",
  description: "Idle Clock introduction page: a visual iOS clock prototype.",
};

export default function IdleClockPage() {
  if (!project) return null;

  return (
    <main>
      <section className="project-hero clock-hero">
        <div className="shell project-hero-grid">
          <div>
            <p className="eyebrow">{project.label}</p>
            <h1>{project.name}</h1>
            <p className="hero-lead">{project.lead}</p>
          </div>
          <div className="clock-face" aria-label="Idle Clockの体験イメージ">
            <span>10:24</span>
            <small>quiet visual clock</small>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">Product direction</p>
            <h2>眺めるための時計</h2>
          </div>
          <p>{project.audience}</p>
        </div>
      </section>

      <section className="section muted">
        <div className="shell detail-grid">
          <DetailList title="開発メモ" items={project.highlights} />
          <DetailList title="技術スタック" items={project.stack} />
        </div>
      </section>

      <footer className="project-footer shell">
        <Link href="/">yamanari.devへ戻る</Link>
      </footer>
    </main>
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
