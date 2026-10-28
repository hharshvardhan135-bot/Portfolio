import type { CSSProperties } from "react";
import { profile } from "@/content/profile";

const flow = [
  ...profile.skills.Languages.map(name => ({ name, type: "Language" })),
  ...profile.skills.Frontend.map(name => ({ name, type: "Frontend" })),
  ...profile.skills.Backend.map(name => ({ name, type: "Backend" })),
  ...profile.skills.Databases.map(name => ({ name, type: "Database" })),
  ...profile.skills.Tools.map(name => ({ name, type: "Tool" })),
];

const markByName: Record<string, string> = {
  Java: "java", JavaScript: "js", "React.js": "react", HTML: "html", CSS: "css",
  "Node.js": "node", "Express.js": "express", "REST APIs": "api", MySQL: "sql",
  MongoDB: "mongo", Git: "git", GitHub: "gh", Postman: "pm",
};

function SkillMark({ name }: { name: string }) {
  const mark = markByName[name] ?? name.slice(0, 2).toUpperCase();
  if (mark === "java") return <svg className="flow-mark-svg" viewBox="0 0 48 48" aria-hidden="true"><path d="M18 8c7 4-5 6 2 11M28 5c7 5-5 7 1 11M12 22h23l-3 16H15zM35 25h3a4 4 0 0 1 0 8h-5M11 42h26"/><path d="M18 27v6m6-6v6m6-6v6"/></svg>;
  if (mark === "react") return <svg className="flow-mark-svg" viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/><circle className="flow-mark-fill" cx="24" cy="24" r="3"/></svg>;
  if (mark === "html" || mark === "css") return <svg className="flow-mark-svg flow-mark-shield" viewBox="0 0 48 48" aria-hidden="true"><path d="M10 5h28l-3 33-11 5-11-5z"/><text x="24" y="31" textAnchor="middle">{mark === "html" ? "5" : "3"}</text></svg>;
  if (mark === "mongo") return <svg className="flow-mark-svg" viewBox="0 0 48 48" aria-hidden="true"><path d="M25 5C15 15 14 24 23 39l2 5 3-5c9-15 8-24-3-34zM25 13v29"/></svg>;
  if (mark === "git") return <svg className="flow-mark-svg" viewBox="0 0 48 48" aria-hidden="true"><path d="m24 6 18 18-18 18L6 24zM18 18v14m0-7 12-9v16"/><circle cx="18" cy="18" r="2"/><circle cx="18" cy="32" r="2"/><circle cx="30" cy="16" r="2"/><circle cx="30" cy="32" r="2"/></svg>;
  const labels: Record<string, string> = { js: "JS", node: "N", express: "ex", api: "API", sql: "SQL", gh: "GH", pm: "PM" };
  return <span className={`flow-monogram flow-monogram-${mark}`} aria-hidden="true">{labels[mark] ?? mark.toUpperCase()}</span>;
}

export default function TiltedSkills() {
  const renderGroup = (copy: number) => <div className="skill-flow-group" key={copy} aria-hidden={copy === 1}>
    {flow.map((item, index) => {
      const angle = ((index / (flow.length - 1)) - 0.5) * 24;
      return <article className="skill-flow-tile" key={`${copy}-${item.name}`} style={{ "--face-angle": `${angle.toFixed(1)}deg` } as CSSProperties}>
        <div className="flow-card-top"><span className="flow-index">{String(index + 1).padStart(2, "0")}<i /></span><SkillMark name={item.name} /></div>
        <span className="flow-name">{item.name}</span>
        <span className="flow-type">{item.type}</span>
      </article>;
    })}
  </div>;

  return <div className="skill-flow" data-reveal>
    <div className="skill-flow-meta"><span>LANGUAGES, FRAMEWORKS &amp; TOOLS</span><span>01 — {String(flow.length).padStart(2, "0")}</span></div>
    <div className="skill-flow-window" aria-hidden="true">
      <div className="skill-flow-track">{renderGroup(0)}{renderGroup(1)}</div>
    </div>
    <ul className="visually-hidden">{flow.map(item => <li key={item.name}>{item.name} — {item.type}</li>)}</ul>
  </div>;
}
