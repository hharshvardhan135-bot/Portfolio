"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const statuses = ["INITIALIZING PORTFOLIO", "LOADING EXPERIENCE", "READY TO EXPLORE"];
const codeRows = [
  [34, 68, 24], [52, 27, 45, 19], [22, 41, 71], [62, 32],
  [39, 58, 25], [70, 18, 42], [28, 51, 34, 23], [47, 33, 61],
  [65, 22, 31], [31, 49, 54], [42, 70, 20], [58, 27, 38],
  [25, 63, 32], [49, 36, 60],
];

export default function ModernLoader({ onComplete }: { onComplete: () => void }) {
  const [visibleRows, setVisibleRows] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 500 : 2100;
    const rowTimer = window.setInterval(
      () => setVisibleRows((count) => Math.min(count + 1, codeRows.length)),
      duration / codeRows.length,
    );
    const statusTimer = window.setInterval(
      () => setStatusIndex((index) => (index + 1) % statuses.length),
      duration / statuses.length,
    );
    const finishTimer = window.setTimeout(onComplete, duration);

    return () => {
      window.clearInterval(rowTimer);
      window.clearInterval(statusTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="site-loader"
      role="status"
      aria-label="Loading Harshvardhan Sinha’s portfolio"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015 }}
      transition={{ duration: 0.42, ease: "easeInOut" }}
    >
      <div className="loader-orbit-glow" aria-hidden="true" />
      <motion.div
        className="loader-terminal"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.985 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="loader-terminal-head">
          <div className="loader-window-dots" aria-hidden="true">
            <i /><i /><i />
          </div>
          <span>HS / PORTFOLIO SYSTEM</span>
          <span className="loader-version">2026</span>
        </div>

        <div className="loader-terminal-content">
          <div className="loader-status-line">
            <span className="loader-prompt">&gt;_</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={statusIndex}
                className="loader-status-text"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.18 }}
              >
                {statuses[statusIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="loader-caret" aria-hidden="true" />
          </div>

          <div className="loader-code" aria-hidden="true">
            {codeRows.slice(0, visibleRows).map((row, rowIndex) => (
              <motion.div
                className="loader-code-row"
                key={rowIndex}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
              >
                <span className="loader-line-number">{String(rowIndex + 1).padStart(2, "0")}</span>
                <span className="loader-code-segments">
                  {row.map((width, segmentIndex) => (
                    <i
                      className={`loader-code-token token-${(rowIndex + segmentIndex) % 4}`}
                      key={`${rowIndex}-${segmentIndex}`}
                      style={{ width: `${width}px` }}
                    />
                  ))}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="loader-progress-meta">
            <span>BUILDING A CLEAR PICTURE</span>
            <span>PLEASE WAIT</span>
          </div>
          <div className="loader-progress-track" aria-hidden="true">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.1, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>

      <p className="loader-signature">HARSHVARDHAN SINHA <i /> SOFTWARE DEVELOPER</p>
    </motion.div>
  );
}
