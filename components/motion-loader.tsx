"use client";

import { useEffect, useRef, useState } from "react";

type RuntimeProps = { scope: React.RefObject<HTMLDivElement | null> };
type RuntimeComponent = React.ComponentType<RuntimeProps>;

export default function MotionLoader({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const [Runtime, setRuntime] = useState<RuntimeComponent | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let idleId: number | undefined;
    let timerId: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const load = () => {
      import("./motion-runtime").then(({ default: MotionRuntime }) => {
        if (!cancelled) setRuntime(() => MotionRuntime);
      }).catch(() => undefined);
    };

    if (idleWindow.requestIdleCallback) idleId = idleWindow.requestIdleCallback(load, { timeout: 1400 });
    else timerId = window.setTimeout(load, 900);
    return () => {
      cancelled = true;
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return <div className="motion-runtime" ref={scope}>{children}{Runtime ? <Runtime scope={scope} /> : null}</div>;
}
