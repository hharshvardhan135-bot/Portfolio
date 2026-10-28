"use client";

import { motion, useSpring } from "motion/react";
import type { JSX } from "react";
import { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };
type Sparkle = { id: number; x: number; y: number; driftX: number; driftY: number; size: number; color: string };

export type SmoothCursorProps = {
  cursor?: JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
};

const defaultSpring = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 };

function ThemeCursor() {
  return (
    <svg aria-hidden="true" width="34" height="50" viewBox="0 0 52 62" fill="none">
      <path d="M26 3C19.5 10.2 16.2 18.6 15.4 28v11l10.6-5.1L36.6 39V28C35.8 18.6 32.5 10.2 26 3Z" fill="url(#cursor-rocket)" stroke="#dbeafe" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m15.8 27-8.2 11.2 9.4-1.9M36.2 27l8.2 11.2-9.4-1.9" fill="#4c1d95" stroke="#c4b5fd" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="26" cy="22" r="4.1" fill="#071326" stroke="#bfdbfe" strokeWidth="1.8" />
      <path d="M20.4 38.6c-1.2 5.3 1.5 10.8 5.6 15.4 4.1-4.6 6.8-10.1 5.6-15.4L26 41.3l-5.6-2.7Z" fill="url(#cursor-flame)" />
      <path d="M24 40.8c-.2 3 1 5.6 2 7.3 1-1.7 2.2-4.3 2-7.3l-2 1-2-1Z" fill="#fff4c2" />
      <defs>
        <linearGradient id="cursor-rocket" x1="17" y1="7" x2="39" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e0f2fe" />
          <stop offset=".4" stopColor="#818cf8" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="cursor-flame" x1="26" y1="39" x2="26" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset=".55" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SmoothCursor({ cursor = <ThemeCursor />, springConfig = defaultSpring }: SmoothCursorProps) {
  const [active, setActive] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const latest = useRef<Position>({ x: 0, y: 0 });
  const last = useRef<Position>({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const previousAngle = useRef(0);
  const totalRotation = useRef(0);
  const frame = useRef<number | null>(null);
  const settleTimer = useRef<number | null>(null);
  const lastSparkleTime = useRef(0);
  const sparkleId = useRef(0);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, { ...springConfig, damping: 60, stiffness: 300 });
  const scale = useSpring(1, { ...springConfig, stiffness: 500, damping: 35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    document.documentElement.classList.add("has-smooth-cursor");

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      latest.current = { x: event.clientX, y: event.clientY };
      setActive(true);
      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const current = latest.current;
        const now = performance.now();

        if (lastTime.current > 0) {
          const elapsed = Math.max(now - lastTime.current, 1);
          const deltaX = current.x - last.current.x;
          const deltaY = current.y - last.current.y;
          const vx = deltaX / elapsed;
          const vy = deltaY / elapsed;
          if (Math.hypot(vx, vy) > 0.02) {
            const angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
            let difference = angle - previousAngle.current;
            if (difference > 180) difference -= 360;
            if (difference < -180) difference += 360;
            totalRotation.current += difference;
            rotation.set(totalRotation.current);
            previousAngle.current = angle;
            scale.set(0.94);
            if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
            settleTimer.current = window.setTimeout(() => scale.set(1), 130);
          }

          if (Math.hypot(deltaX, deltaY) > 2 && now - lastSparkleTime.current > 55) {
            const distance = Math.hypot(deltaX, deltaY) || 1;
            const spread = 4 + Math.random() * 7;
            const sparkle: Sparkle = {
              id: sparkleId.current++,
              x: current.x - (deltaX / distance) * 8,
              y: current.y - (deltaY / distance) * 8,
              driftX: -(deltaX / distance) * (8 + Math.random() * 9) + (Math.random() - 0.5) * spread,
              driftY: -(deltaY / distance) * (8 + Math.random() * 9) + (Math.random() - 0.5) * spread,
              size: 7 + Math.random() * 7,
              color: Math.random() > 0.35 ? "#bfdbfe" : "#fcd34d",
            };
            lastSparkleTime.current = now;
            setSparkles((currentSparkles) => [...currentSparkles.slice(-13), sparkle]);
          }
        }

        cursorX.set(current.x);
        cursorY.set(current.y);
        last.current = current;
        lastTime.current = now;
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.classList.remove("has-smooth-cursor");
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, [cursorX, cursorY, rotation, scale]);

  if (!active) return null;

  return (
    <>
      <motion.div
        className="smooth-cursor"
        style={{ left: cursorX, top: cursorY, x: -17, y: -2, transformOrigin: "17px 2px", rotate: rotation, scale }}
        aria-hidden="true"
      >
        {cursor}
      </motion.div>
      {sparkles.map((sparkle) => (
        <motion.span
          className="cursor-sparkle"
          key={sparkle.id}
          style={{ left: sparkle.x, top: sparkle.y, color: sparkle.color, fontSize: sparkle.size }}
          initial={{ opacity: 0, scale: 0.2, rotate: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0], rotate: 80, x: sparkle.driftX, y: sparkle.driftY }}
          transition={{ duration: 0.48, ease: "easeOut" }}
          onAnimationComplete={() => setSparkles((items) => items.filter((item) => item.id !== sparkle.id))}
          aria-hidden="true"
        >
          ✦
        </motion.span>
      ))}
    </>
  );
}
