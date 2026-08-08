"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hero background photo-slot. Per PHASES.md Phase 5: subtle scale tied to
 * scroll on the background only, no text animation. Renders the same plain,
 * fully-visible `<div>` (the grain-textured placeholder from Phase 2/4) with
 * or without JS — the scale starts at 1 (its natural, un-animated CSS
 * state) and is only ever nudged by GSAP after this component mounts, so a
 * no-JS visitor sees the untransformed placeholder, not a hidden one.
 *
 * TODO(photography): replace the inner div with a real <Image> of the gym
 * floor (B&W + grain, or duotone-blood) once the owner supplies photography.
 * Do not fill it with a stock/AI placeholder in the meantime — CLAUDE.md
 * bans both.
 */
export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(el, { scale: 1.08, transformOrigin: "50% 50%" });
      gsap.to(el, {
        scale: 1.22,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref} className="h-full w-full bg-charcoal texture-grain" />;
}
