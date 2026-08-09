"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HeroBackgroundProps {
  alt: string;
}

/**
 * Hero background — real gym photo (Phase 8: first real photography landed,
 * owner-supplied via chat). B&W + grain per CLAUDE.md's Photography rule
 * (grayscale + contrast filter, texture-grain overlay), not colour-corrected
 * stock. Per PHASES.md Phase 5's motion contract: subtle scale tied to
 * scroll on the background only, no text animation, and the scale starts at
 * 1 (its natural, un-animated CSS state) and is only ever nudged by GSAP
 * after this component mounts, so a no-JS visitor sees the untransformed
 * photo, not a hidden one.
 *
 * Source photo is a small, chat-compressed JPEG (owner sent it inline, not
 * as a full-resolution upload) — it'll look soft blown up past small/mid
 * viewport widths. Swap `public/photos/dumbbell-rack.jpg` for a
 * full-resolution version the moment one's available; nothing else in this
 * component needs to change when that happens.
 */
export default function HeroBackground({ alt }: HeroBackgroundProps) {
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

  return (
    <div ref={ref} className="relative h-full w-full texture-grain">
      <Image
        src="/photos/dumbbell-rack.jpg"
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale contrast-125"
      />
    </div>
  );
}
