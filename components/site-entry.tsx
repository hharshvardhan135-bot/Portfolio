"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import ModernLoader from "@/components/ui/modern-loader";

export default function SiteEntry({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (!loading) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [loading]);

  return (
    <>
      <AnimatePresence initial={false}>
        {loading ? <ModernLoader key="portfolio-loader" onComplete={finishLoading} /> : null}
      </AnimatePresence>
      <div className="site-entry-content" aria-hidden={loading} inert={loading}>
        {children}
      </div>
    </>
  );
}
