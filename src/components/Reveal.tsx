"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealProps {
  children: ReactNode;
}

/**
 * Progressive-enhancement scroll reveal for one section at a time. THE
 * GSAP-VISIBILITY-WITHOUT-JS GUARANTEE (CLAUDE.md's motion hard rule):
 *
 * - The wrapping <div> below carries no className, no inline style, and no
 *   opacity/transform of any kind in server-rendered markup. A no-JS visitor
 *   (or a crawler, or a visitor whose JS fails) gets the section exactly as
 *   the child Server Component rendered it — fully visible, in normal flow.
 * - Only *after* this client component mounts does the effect run. It first
 *   does its own `prefers-reduced-motion` check via `matchMedia` (the global
 *   CSS kill-switch in globals.css only zeroes transition/animation
 *   durations — it does not stop a ScrollTrigger from being created at all,
 *   so this component must skip that step itself). If the user prefers
 *   reduced motion, the effect returns immediately: no ScrollTrigger, no
 *   animation, the section simply stays at its natural visible state.
 * - Otherwise it calls `gsap.fromTo()`. GSAP applies the "from" values
 *   itself, in JS, at that point — never as a base CSS style — and then
 *   animates to full visibility once the section's ScrollTrigger fires on
 *   scroll. Because this only ever executes inside a mounted client
 *   component's effect, a no-JS page load never runs this code and the DOM
 *   never contains a hidden-by-default section.
 */
export default function Reveal({ children }: RevealProps) {
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
      gsap.fromTo(
        el,
        { opacity: 0.4, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          // fromTo() applies its "from" values the instant the tween is
          // created by default (immediateRender: true) — for a
          // scrollTrigger-driven tween that means every section below the
          // fold sits at opacity 0.4 from first paint until it's scrolled
          // into view, not just during its own reveal. Confirmed via a real
          // browser check: a fresh page load left this element at inline
          // `opacity: 0.4` indefinitely pre-scroll, which is a real
          // washed-out-content bug (and explains a Lighthouse color-contrast
          // failure), not just a cosmetic nit. immediateRender: false defers
          // applying "from" until the ScrollTrigger actually starts the
          // tween, so content stays at its natural full-opacity state until
          // the moment it begins animating in.
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
