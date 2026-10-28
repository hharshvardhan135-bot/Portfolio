"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap, useGSAP } from "@/lib/motion/registerGsap";

registerGsap();

export default function MotionRuntime({ scope }: { scope: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.09, smoothWheel: true, anchors: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    const update = () => ScrollTrigger.update();
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", update);

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(tick);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({ id: "portfolio-intro" });
      intro
        .fromTo(".hero-line-inner", { y: 6 }, { y: 0, stagger: 0.09, duration: 0.75, ease: "power2.out" })
        .fromTo(".hero-subtitle", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, "-=0.45")
        .fromTo(".hero-actions > *", { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.5 }, "-=0.38")
        .fromTo(".hero-art img", { scale: 1.07, autoAlpha: 0.55 }, { scale: 1, autoAlpha: 1, duration: 1.25 }, "-=1.05")
        .fromTo(".hero-art .hud", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.55 }, "-=0.75");
      intro.then(() => ScrollTrigger.refresh());

      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { y: 28, scale: 0.97, autoAlpha: 0 });
      ScrollTrigger.batch(reveals, {
        start: "top 88%",
        once: true,
        onEnter: elements => gsap.to(elements, {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.78,
          stagger: 0.08,
          overwrite: true,
        }),
      });

      gsap.fromTo(".about-image img", { scale: 1.09, yPercent: 2 }, {
        scale: 1,
        yPercent: -2,
        ease: "none",
        scrollTrigger: { id: "about-image-drift", trigger: ".about-image", start: "top bottom", end: "bottom top", scrub: 0.8 },
      });

      const counters = gsap.utils.toArray<HTMLElement>("[data-percentile]");
      counters.forEach((counter: HTMLElement, index: number) => {
        const value = { n: 0 };
        gsap.to(value, {
          n: 93.73,
          duration: 1.3,
          ease: "power2.out",
          snap: { n: 0.01 },
          onUpdate: () => { counter.textContent = value.n.toFixed(2); },
          scrollTrigger: { id: `percentile-counter-${index}`, trigger: counter, start: "top 85%", once: true },
        });
      });

      const art = document.querySelector<HTMLElement>(".hero-art");
      if (art && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(".hero-art img", "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(".hero-art img", "y", { duration: 0.6, ease: "power3.out" });
        const move = (event: PointerEvent) => {
          const rect = art.getBoundingClientRect();
          xTo(((event.clientX - rect.left) / rect.width - 0.5) * -10);
          yTo(((event.clientY - rect.top) / rect.height - 0.5) * -10);
        };
        const reset = () => { xTo(0); yTo(0); };
        art.addEventListener("pointermove", move);
        art.addEventListener("pointerleave", reset);
        return () => {
          art.removeEventListener("pointermove", move);
          art.removeEventListener("pointerleave", reset);
        };
      }
      return () => intro.kill();
    });

    return () => media.revert();
  }, { scope });

  return null;
}
