"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { profile as p } from "@/content/profile";

const roles = {
  Backend: {
    intro: "I can contribute across Node.js services, REST endpoints, and database-backed features while growing my backend depth.",
    skills: ["Node.js", "Express.js", "REST APIs", "MySQL", "MongoDB", "Java"],
    evidence: [p.experience.points[0], p.experience.points[1], p.experience.points[2]],
    focus: "APIs · data · debugging",
  },
  "Full-stack": {
    intro: "I can connect React interfaces with backend services and keep developing a practical view of the whole application.",
    skills: ["React.js", "HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    evidence: [p.experience.points[0], p.experience.points[2], p.experience.points[3]],
    focus: "UI · services · collaboration",
  },
  "Software Engineer": {
    intro: "I bring programming fundamentals, a steady approach to problem solving, and experience working on a team’s real tasks.",
    skills: ["Java", "JavaScript", "OOP", "DBMS", "System Design", "Data Structures & Algorithms", "Git"],
    evidence: [p.experience.points[1], p.experience.points[3], p.experience.points[2]],
    focus: "fundamentals · learning · teamwork",
  },
} as const;

type Role = keyof typeof roles;

export default function RoleMatch() {
  const [selected, setSelected] = useState<Role>("Backend");
  const detail = roles[selected];

  return <section className="match section-wrap" id="role-match">
    <div className="section-label" data-reveal><span>[ 02 — HOW I CAN CONTRIBUTE ]</span><span>ROLE MATCH / SELECT A ROLE</span></div>
    <h2 data-reveal>One foundation.<br/><span>Ready to contribute.</span></h2>
    <div className="role-tabs" aria-label="Choose a role to explore" role="group">
      {(Object.keys(roles) as Role[]).map(role => <button key={role} type="button" aria-pressed={selected === role} onClick={() => setSelected(role)}>{role}<span>↗</span></button>)}
    </div>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div className="role-panel" key={selected} aria-live="polite" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
        <div className="role-panel-copy"><p className="eyebrow">A MATCH FOR {selected.toUpperCase()}</p><p className="role-intro">{detail.intro}</p><p className="role-focus">FOCUS / {detail.focus}</p></div>
        <div className="role-panel-evidence"><h3>Relevant experience</h3><ul>{detail.evidence.map(item => <li key={item}>{item}</li>)}</ul></div>
        <div className="role-panel-skills"><span className="card-no">RELEVANT SKILLS</span><div>{detail.skills.map((skill, i) => <motion.span layout key={skill} transition={{ duration: 0.25, delay: i * 0.025 }}>{skill}</motion.span>)}</div></div>
      </motion.div>
    </AnimatePresence>
  </section>;
}
