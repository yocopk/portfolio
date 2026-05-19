"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setHovered = (state: boolean) => {
      ring.dataset.hover = state ? "true" : "false";
      dot.dataset.hover = state ? "true" : "false";
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role='button'], [data-cursor='hover'], input, textarea, select, label",
      );
      setHovered(!!interactive);
    };

    const tick = () => {
      // Smooth follow for the ring (trailing effect)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const handleLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const handleEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      cancelAnimationFrame(raf);
      html.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 h-10 w-10 rounded-full border border-[var(--color-sumi)]/40 transition-[width,height,border-color,opacity] duration-300 ease-[var(--ease-zen)] data-[hover=true]:h-14 data-[hover=true]:w-14 data-[hover=true]:-ml-7 data-[hover=true]:-mt-7 data-[hover=true]:border-[var(--color-shu)] data-[hover=true]:bg-[var(--color-shu)]/5"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[91] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[var(--color-sumi)] transition-[transform,opacity] duration-150 data-[hover=true]:bg-[var(--color-shu)]"
      />
    </>
  );
}
