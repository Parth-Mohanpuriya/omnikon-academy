"use client";

import { useCallback, useRef } from "react";

/**
 * Tracks pointer position and updates --mx / --my CSS custom properties
 * on the nearest .gq-glass ancestor (or the element itself).
 *
 * Returns onMouseMove and onMouseLeave handlers to spread on the glass element.
 * In reduced-motion mode, does nothing — the CSS static fallback handles it.
 */
export function useGlassPointer() {
  const rafRef = useRef<number>(0);

  const updatePosition = useCallback((el: HTMLElement, e: React.MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const target = e.currentTarget;
        updatePosition(target, e);
      });
    },
    [updatePosition]
  );

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
  }, []);

  return { onMouseMove, onMouseLeave };
}
