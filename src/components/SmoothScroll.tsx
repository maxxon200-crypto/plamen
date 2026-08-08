"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide smooth scroll, mounted once in the locale layout. Renders
 * nothing — Lenis only ever changes scroll *behaviour*, never markup, so a
 * no-JS visitor simply gets ordinary native scrolling with zero visual
 * difference.
 *
 * CLAUDE.md's motion hard rule requires an explicit runtime check here: the
 * global `prefers-reduced-motion` kill-switch in globals.css only zeroes CSS
 * transition/animation durations — it does not stop Lenis's own JS-driven
 * scroll hijacking. So this effect checks `matchMedia` itself and, when the
 * user has asked for reduced motion, never constructs a Lenis instance (or
 * hooks it into the GSAP ticker) at all. Scrolling then falls back entirely
 * to plain native browser behaviour, no exceptions.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ duration: 1.1 });

    // Keep ScrollTrigger's cached measurements in sync with Lenis's virtual
    // scroll position, and drive Lenis from GSAP's own rAF ticker so both
    // stay on the same clock (the standard GSAP + Lenis integration).
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
