"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Code, Users, GraduationCap, BookOpen, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TagData {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  initialAngle: number;
}

const TAGS: TagData[] = [
  { title: "Open Source", subtitle: "Transparent & Collaborative", icon: Code, initialAngle: -Math.PI / 2 },
  { title: "Community", subtitle: "Connected & Growing", icon: Users, initialAngle: -Math.PI / 2 - (2 * Math.PI) / 5 },
  { title: "Education", subtitle: "Learning & Building", icon: GraduationCap, initialAngle: -Math.PI / 2 + (2 * Math.PI) / 5 },
  { title: "Innovation", subtitle: "Ideas into Impact", icon: Zap, initialAngle: -Math.PI / 2 - (4 * Math.PI) / 5 },
  { title: "Documentation", subtitle: "Guides & Resources", icon: BookOpen, initialAngle: -Math.PI / 2 + (4 * Math.PI) / 5 },
];

const REVOLUTION_MS = 45_000;
const ANGULAR_VELOCITY = (2 * Math.PI) / REVOLUTION_MS;

export default function HeroGlobeTags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef<number>(-1);
  const [hovered, setHovered] = useState(-1);

  const handleMouse = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouse);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouse);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouse, handleMouseLeave]);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const animate = (time: number) => {
      if (!startRef.current) startRef.current = time;
      const elapsed = time - startRef.current;

      const sm = smoothMouseRef.current;
      const m = mouseRef.current;
      smoothMouseRef.current = {
        x: sm.x + (m.x - sm.x) * 0.04,
        y: sm.y + (m.y - sm.y) * 0.04,
      };

      const container = containerRef.current;
      if (container) {
        const cw = container.clientWidth;
        const ch = container.clientHeight;
        const isMobile = cw < 640;
        const isTablet = cw < 1024;
        const radiusX = isMobile ? cw * 0.32 : isTablet ? cw * 0.30 : cw * 0.34;
        const radiusY = isMobile ? ch * 0.30 : isTablet ? ch * 0.32 : ch * 0.34;
        const parallaxX = smoothMouseRef.current.x * 8;
        const parallaxY = smoothMouseRef.current.y * 8;
        const centerX = cw / 2 + parallaxX;
        const centerY = ch / 2 + parallaxY;

        for (let i = 0; i < TAGS.length; i++) {
          const tag = tagsRef.current[i];
          if (!tag) continue;
          const angle = TAGS[i].initialAngle + (elapsed * ANGULAR_VELOCITY);
          const x = centerX + Math.cos(angle) * radiusX;
          const y = centerY + Math.sin(angle) * radiusY;
          const depth = Math.sin(angle);
          const norm = (depth + 1) / 2;
          const scale = 0.88 + norm * 0.12;
          const opacity = 0.55 + norm * 0.45;
          const z = Math.round(norm * 10);
          const isHov = hoveredRef.current === i;
          const extraScale = isHov ? 1.06 : 1;
          tag.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale * extraScale})`;
          tag.style.opacity = String(opacity);
          tag.style.zIndex = String(z);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {TAGS.map((tag, i) => {
        const Icon = tag.icon;
        return (
          <div
            key={tag.title}
            ref={(el) => { tagsRef.current[i] = el; }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
            className="absolute top-0 left-0 flex items-center gap-2 rounded-lg border border-white/5 bg-[#0a0a0c]/90 px-3 py-1.5 shadow-lg backdrop-blur-sm cursor-default select-none transition-[border-color,box-shadow] duration-300"
            style={{
              willChange: "transform, opacity",
              pointerEvents: "auto",
              ...(hovered === i
                ? { borderColor: "rgba(239,68,68,0.3)", boxShadow: "0 0 20px rgba(239,68,68,0.12)" }
                : {}),
            }}
          >
            <Icon className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />
            <div className="text-left font-mono">
              <p className="text-[10px] font-bold text-white leading-tight">{tag.title}</p>
              <p className="text-[8px] text-zinc-500 leading-tight">{tag.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
