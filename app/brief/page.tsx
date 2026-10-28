import { profile as p } from "@/content/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Brief — Harshvardhan Sinha",
  description:
    "A concise, text-first professional profile for Harshvardhan Sinha.",
};

export default function Brief() {
  return (
    <main className="brief-page">
      <a className="brief-back" href="/">
        ← PORTFOLIO HOME
      </a>
      <header>
        <p>RECRUITER BRIEF / UPDATED OCTOBER 2026</p>
        <h1>{p.name}</h1>
        <p>
          {p.location} · <a href={`mailto:${p.email}`}>{p.email}</a> ·{" "}
          <a href={p.linkedin}>LinkedIn</a>
        </p>
      </header>
      <section>
        <h2>Summary</h2>
        <p>{p.summary} Currently open to internship and entry-level roles.</p>
      </section>
      <section>
        <h2>Target roles</h2>
        <p>{p.roles.join(" · ")}</p>
      </section>
      <section>
        <h2>Skills</h2>
        {Object.entries(p.skills).map(([group, skills]) => (
          <p key={group}>
            <strong>{group}:</strong> {skills.join(", ")}
          </p>
        ))}
      </section>
      <section>
        <h2>Experience</h2>
        <h3>
          {p.experience.title} — {p.experience.company}, {p.experience.team}
        </h3>
        <p>{p.experience.dates}</p>
        <ul>
          {p.experience.points.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Education</h2>
        {p.education.map((x) => (
          <p key={x.school}>
            <strong>{x.degree}</strong> — {x.school}, {x.dates}
            {x.note ? ` (${x.note})` : ""}
          </p>
        ))}
      </section>
      <section>
        <h2>Achievement</h2>
        <p>
          {p.achievement.title}, {p.achievement.event}. {p.achievement.detail}{" "}
          {p.achievement.issuer}, {p.achievement.date}. Certificate ID:{" "}
          {p.achievement.certificateId}.
        </p>
      </section>
      <section>
        <h2>Strengths and interests</h2>
        <p>{p.strengths.join(" · ")}</p>
        <p>{p.interests.join(" · ")}</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${p.email}`}>{p.email}</a> ·{" "}
          <a href={`tel:${p.phone}`}>{p.phone}</a> ·{" "}
          <a href={p.linkedin}>LinkedIn</a> · <a href={p.leetcode}>LeetCode</a>
        </p>
        <p>
          <a href="/resume.pdf">Download résumé (PDF)</a>
        </p>
      </section>
      <footer>
        <a href="/">← Back to portfolio</a>
      </footer>
    </main>
  );
}
