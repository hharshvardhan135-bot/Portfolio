import Image from "next/image";
import Link from "next/link";
import RoleMatch from "@/components/role-match";
import TiltedSkills from "@/components/tilted-skills";
import { profile as p } from "@/content/profile";

const nav = [
  { label: "Skills", href: "#skills" },
  { label: "Match", href: "#role-match" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="nav-capsule">
          <Link className="wordmark" href="/">
            Harshvardhan Sinha
          </Link>
          <nav aria-label="Main navigation">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a
            className="top-cta"
            href="#contact-footer"
            aria-label="Scroll to contact and footer"
          >
            Let’s talk <span>↗</span>
          </a>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="hero-line-mask">
                  <span className="hero-line-inner">Harshvardhan</span>
                </span>
                <span className="hero-line-mask">
                  <span className="hero-line-inner">
                    Sinha<b>.</b>
                  </span>
                </span>
              </h1>
              <div className="hero-bottom">
                <p className="hero-subtitle">
                  Backend &amp; full-stack developer.
                  <br />
                  Final-year Computer Science student.
                </p>
                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href="/resume.pdf"
                    download
                  >
                    Download résumé
                  </a>
                  <a className="text-link" href="#contact-footer">
                    Get in touch
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-art" aria-label="Galaxy portrait artwork">
              <Image
                src="/images/galaxy-portrait.webp"
                alt="Blue monochrome portrait with a luminous galaxy at its center"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
              />
              <div className="art-shade" />
              <span className="hud hud-top">
                SIGNAL / 001
                <br />
                BUILDING IN PUBLIC
              </span>
              <span className="hud hud-bottom">
                CSE · 2027
                <br />
                FIG. 01 — THE BUILDER
              </span>
              <span className="art-index">01</span>
            </div>
          </div>
          <div className="hero-meta">
            <span>
              SOFTWARE DEVELOPER INTERN <i>↗</i>
            </span>
            <span>
              SCROLL TO EXPLORE <i className="scroll-line" />
            </span>
          </div>
        </section>

        <section className="brief section-wrap" aria-labelledby="brief-title">
          <div className="section-label" data-reveal>
            <span>[ 00 — THE SHORT VERSION ]</span>
            <span>30 SECOND READ</span>
          </div>
          <div className="brief-head" data-reveal>
            <h2 id="brief-title">
              A quick
              <br />
              introduction<span>.</span>
            </h2>
            <p className="lead">
              I’m a final-year Computer Science student in Delhi, growing into
              the kind of developer who can move from a problem to a thoughtful,
              working solution.
            </p>
          </div>
          <div className="brief-grid">
            {[
              <>
                <span className="card-no">01 / LOOKING FOR</span>
                <h3>Software roles</h3>
                <p>
                  Internship and entry-level opportunities across software
                  engineering, backend, and full-stack development.
                </p>
              </>,
              <>
                <span className="card-no">02 / TOOLKIT</span>
                <h3>Java to React</h3>
                <p>
                  Java, JavaScript, React, Node.js, Express, REST APIs, MySQL,
                  and MongoDB.
                </p>
              </>,
              <>
                <span className="card-no">03 / RIGHT NOW</span>
                <h3>Learning in a team</h3>
                <p>
                  Software Developer Intern at Sri Aurobindo Society, IT
                  Department.
                </p>
              </>,
            ].map((card, i) => (
              <article data-reveal key={i}>
                {card}
              </article>
            ))}
          </div>
        </section>

        <section className="skills section-wrap" id="skills">
          <div className="section-label" data-reveal>
            <span>[ 01 — SKILLS ]</span>
            <span>TOOLS I’M BUILDING WITH</span>
          </div>
          <div className="skills-head" data-reveal>
            <h2>
              Learned.
              <br />
              <em>
                Practiced.
                <br />
                Growing.
              </em>
            </h2>
            <p>
              Skills are more than keywords. Here’s the toolkit I’m developing
              and the fundamentals I bring to the work.
            </p>
          </div>
          <TiltedSkills />
        </section>

        <RoleMatch />

        <section className="experience section-wrap" id="experience">
          <div className="section-label" data-reveal>
            <span>[ 03 — EXPERIENCE ]</span>
            <span>LEARNING BY DOING</span>
          </div>
          <div className="experience-grid" data-reveal>
            <div>
              <p className="eyebrow">A PROFESSIONAL START</p>
              <h2>
                Learning the
                <br />
                <em>whole picture.</em>
              </h2>
              <p className="experience-note">
                Early in my career, and already learning what it takes to build
                software with others.
              </p>
            </div>
            <article className="experience-card">
              <div className="experience-card-top">
                <span>01 / CURRENT ROLE</span>
                <span>DELHI, INDIA</span>
              </div>
              <h3>{p.experience.title}</h3>
              <p className="company">
                {p.experience.company} <span>· {p.experience.team}</span>
              </p>
              <p className="date">{p.experience.dates}</p>
              <ul>
                {p.experience.points.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="experience-card-bottom">
                <span>TEAMWORK</span>
                <span>DEBUGGING</span>
                <span>SOFTWARE LIFECYCLE</span>
              </div>
            </article>
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="section-label" data-reveal>
            <span>[ 04 — ABOUT ME ]</span>
            <span>A LITTLE CONTEXT</span>
          </div>
          <div className="about-grid" data-reveal>
            <h2>
              Good work
              <br />
              starts with
              <br />
              <em>good questions.</em>
            </h2>
            <div className="about-text">
              <p>
                My internship is where coursework meets real delivery: working
                with experienced developers, contributing to technical tasks,
                debugging issues, and seeing software through its lifecycle.
              </p>
              <p>
                Chess has taught me to slow down, consider the next move, and
                stay adaptable when the position changes. I bring that same
                curiosity to learning new tools and solving problems with a
                team.
              </p>
              <div className="about-tags">
                <span>LEARN WITH INTENT</span>
                <span>THINK IN SYSTEMS</span>
                <span>BUILD TOGETHER</span>
              </div>
            </div>
          </div>
        </section>

        <section className="education section-wrap">
          <div className="section-label" data-reveal>
            <span>[ 05 — EDUCATION ]</span>
            <span>THE FOUNDATION</span>
          </div>
          <div className="education-list">
            {p.education.map((item, i) => (
              <article key={item.school} data-reveal>
                <span className="education-index">0{i + 1}</span>
                <div>
                  <h3>{item.degree}</h3>
                  <p>
                    {item.school}
                    {item.note ? ` · ${item.note}` : ""}
                  </p>
                </div>
                <span className="education-date">{item.dates}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="chess section-wrap">
          <div className="section-label" data-reveal>
            <span>[ 06 — OUTSIDE THE IDE ]</span>
            <span>STRATEGY &amp; CURIOSITY</span>
          </div>
          <div className="chess-grid" data-reveal>
            <div className="chess-art">
              <span className="chess-symbol">♘</span>
              <span className="chess-orbit orbit-one" />
              <span className="chess-orbit orbit-two" />
              <span className="chess-coord">A—H / 01—08</span>
              <span className="chess-coord chess-coord-bottom">
                THINK AHEAD. STAY ADAPTABLE.
              </span>
            </div>
            <div className="chess-copy">
              <h2>
                Think in
                <br />
                <em>possibilities.</em>
              </h2>
              <p>
                Chess reminds me that a good solution is rarely the first move.
                Look for patterns, consider what could change, then adapt with
                the information in front of you.
              </p>
              <p>
                That habit—curious, patient, and ready to rethink—is one I carry
                into debugging and learning how systems fit together.
              </p>
              <div className="about-tags">
                <span>CHESS</span>
                <span>TRAVEL</span>
                <span>ALWAYS LEARNING</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact section-wrap" id="contact-footer">
          <div className="section-label">
            <span>[ 07 — LET’S CONNECT ]</span>
            <span>OPEN TO WHAT’S NEXT</span>
          </div>
          <div className="contact-main">
            <p className="eyebrow">
              <i className="status-dot" /> OPEN TO INTERNSHIP &amp; ENTRY-LEVEL
              ROLES
            </p>
            <h2>
              Ready for the
              <br />
              <em>next move?</em>
            </h2>
            <div className="contact-row">
              <p>
                I’m looking forward to learning, contributing, and growing with
                a team that cares about doing thoughtful work.
              </p>
              <a
                className="button button-primary"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(p.email)}`}
                target="_blank"
                rel="noreferrer"
              >
                Start a conversation <span>↗</span>
              </a>
            </div>
          </div>
          <div className="contact-links">
            <a href={`mailto:${p.email}`}>
              EMAIL <span>{p.email} ↗</span>
            </a>
            <a href={`tel:${p.phone}`}>
              PHONE <span>+91 {p.phone} ↗</span>
            </a>
            <a href={p.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN <span>VIEW PROFILE ↗</span>
            </a>
            <a href={p.leetcode} target="_blank" rel="noreferrer">
              LEETCODE <span>DELULUCODE ↗</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Link className="wordmark" href="/">
          Harshvardhan Sinha
        </Link>
        <span>
          © {new Date().getFullYear()} HARSHVARDHAN SINHA · MADE WITH CURIOSITY
        </span>
      </footer>
    </>
  );
}
