import Link from "next/link";
import { getProject } from "../project-data";

const project = getProject("boarda");

export const metadata = {
  title: "Boarda | yamanari.dev",
  description: "Boarda introduction page: a realtime board with one current note.",
};

export default function BoardaPage() {
  if (!project) return null;

  return (
    <main>
      <section className="project-hero boarda-hero">
        <div className="shell project-hero-grid">
          <div>
            <p className="eyebrow">{project.label}</p>
            <h1>{project.name}</h1>
            <p className="hero-lead">{project.lead}</p>
            <div className="action-row">
              <a href="https://boarda.yamanari.dev">Boarda app</a>
            </div>
          </div>
          <div className="note-preview" aria-label="Boardaの体験イメージ">
            <span>最新の紙</span>
            <p>いま掲示板に貼られている一枚だけを、全員で見ています。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">Concept</p>
            <h2>履歴ではなく、現在地を共有する</h2>
          </div>
          <p>{project.audience}</p>
        </div>
      </section>

      <section className="section muted">
        <div className="shell detail-grid">
          <DetailList title="設計ポイント" items={project.highlights} />
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
