"use client";

import { useEffect, useRef } from "react";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<{ destroy: () => void } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );
        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"
        );

        if (cancelled || !containerRef.current) return;

        // Ensure Vanta + Three are available
        const VANTA = (window as any).VANTA;
        const THREE = (window as any).THREE;
        if (!VANTA || !THREE || !containerRef.current) return;

        vantaRef.current = VANTA.GLOBE({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x030303,
          color: 0x8f0b16,
          color2: 0x300509,
          size: 0.75,
          mouseCoeffX: 1.4,
          mouseCoeffY: 1.4,
        });
      } catch (err) {
        console.warn("VantaBackground:", err);
      }
    }

    // Use rAF to ensure DOM is painted before initializing
    rafRef.current = requestAnimationFrame(() => {
      init();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="vanta-background"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
