"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  PlayCircle,
  Menu,
  Terminal,
  BookOpen,
  ArrowUpRight,
  LogOut,
  Laptop
} from "lucide-react";
import { getCourseAndLessonByLessonId, Course, Lesson } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function LessonPlayerPage({ params }: PageProps) {
  const router = useRouter();
  
  // Resolve asynchronous route params using React.use() as required in Next.js 15+
  const resolvedParams = React.use(params);
  const currentLessonId = resolvedParams.id;

  // Retrieve course, module, and lesson details
  const courseDetails = useMemo(() => {
    return getCourseAndLessonByLessonId(currentLessonId);
  }, [currentLessonId]);

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Parse course and lesson safely
  const course = courseDetails?.course;
  const currentLesson = courseDetails?.lesson;
  const currentModule = courseDetails?.module;

  // Flat array of all lessons in this course to calculate Prev/Next
  const allCourseLessons = useMemo(() => {
    if (!course) return [];
    const list: Lesson[] = [];
    course.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        list.push(les);
      });
    });
    return list;
  }, [course]);

  // Find index of current lesson in course
  const currentIndex = useMemo(() => {
    return allCourseLessons.findIndex((l) => l.id === currentLessonId);
  }, [allCourseLessons, currentLessonId]);

  const prevLesson = currentIndex > 0 ? allCourseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allCourseLessons.length - 1 ? allCourseLessons[currentIndex + 1] : null;

  // Load completion states from localStorage on mount
  useEffect(() => {
    if (!course) return;
    const key = `omnikon_completed_lessons_${course.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setCompletedLessonIds(JSON.parse(stored));
    } else {
      // Initialize with default mock progress from mockUser
      const initialCompleted = ["nextjs-l1", "nextjs-l2", "design-l1"]; // Mock presets
      const filtered = initialCompleted.filter(id => 
        allCourseLessons.some(l => l.id === id)
      );
      setCompletedLessonIds(filtered);
      localStorage.setItem(key, JSON.stringify(filtered));
    }
  }, [course, allCourseLessons]);

  if (!courseDetails || !course || !currentLesson || !currentModule) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#030303] text-zinc-400 font-mono p-4">
        <p className="text-xs text-red-500 mb-2">&gt; ERROR: LESSON_NOT_FOUND</p>
        <p className="text-sm mb-6 text-zinc-500">The lesson code "{currentLessonId}" is not registered in the system.</p>
        <Link
          href="/dashboard"
          className="glow-btn-red rounded-lg px-4 py-2 text-xs text-white"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Toggle complete state
  const handleToggleComplete = () => {
    const key = `omnikon_completed_lessons_${course.id}`;
    setCompletedLessonIds((prev) => {
      let updated: string[];
      if (prev.includes(currentLesson.id)) {
        updated = prev.filter((id) => id !== currentLesson.id);
      } else {
        updated = [...prev, currentLesson.id];
      }
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  const isCurrentCompleted = completedLessonIds.includes(currentLesson.id);

  // Compute course progress percentage
  const progressPercent = Math.round(
    (completedLessonIds.length / allCourseLessons.length) * 100
  );

  return (
    <div className="flex h-screen flex-col bg-[#030303] text-zinc-300 selection:bg-red-500 selection:text-white overflow-hidden">
      
      {/* Custom Top Classroom Bar */}
      <header className="flex h-14 items-center justify-between border-b border-white/5 bg-[#060608]/90 px-4 z-20">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">[ BACK_TO_DASHBOARD ]</span>
          </Link>
          <span className="text-zinc-700 font-mono text-sm hidden md:inline">|</span>
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-red-500/10 border border-red-500/20 text-red-500">
              <Laptop className="h-3 w-3" />
            </span>
            <span className="font-mono text-xs text-zinc-300 font-bold max-w-[280px] truncate">
              {course.title}
            </span>
          </div>
        </div>

        {/* Mid-top progress stats */}
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span className="text-zinc-500">PROGRESS:</span>
          <div className="h-2 w-28 rounded-full bg-zinc-900 border border-white/5 overflow-hidden hidden sm:block">
            <div
              className="h-full bg-red-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-red-400 font-bold">{progressPercent}%</span>
        </div>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded border border-white/5 bg-white/5 p-2 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Classroom layout body */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left Side: Video & Details (Main viewport) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Responsive YouTube Embed Container */}
          <div className="relative aspect-video w-full rounded-xl border border-white/5 bg-black overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${currentLesson.videoUrl}?autoplay=0&rel=0&modestbranding=1`}
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Navigation Controls Row */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <button
              onClick={() => prevLesson && router.push(`/lesson/${prevLesson.id}`)}
              disabled={!prevLesson}
              className={`inline-flex items-center gap-1 rounded-lg border border-white/5 bg-[#09090b] px-3.5 py-2 font-mono text-xs font-bold transition-all ${prevLesson ? "text-zinc-300 hover:text-white hover:border-white/20 active:scale-[0.98]" : "text-zinc-700 cursor-not-allowed"}`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>PREV_LESSON</span>
            </button>

            {/* Completion Toggle */}
            <button
              onClick={handleToggleComplete}
              className={`glow-btn px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${isCurrentCompleted ? "bg-emerald-500/10 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/20" : "bg-red-500 border border-red-500 text-white hover:bg-red-400"}`}
            >
              {isCurrentCompleted ? "[ ✓_COMPLETE ]" : "[ MARK_COMPLETE ]"}
            </button>

            <button
              onClick={() => nextLesson && router.push(`/lesson/${nextLesson.id}`)}
              disabled={!nextLesson}
              className={`inline-flex items-center gap-1 rounded-lg border border-white/5 bg-[#09090b] px-3.5 py-2 font-mono text-xs font-bold transition-all ${nextLesson ? "text-zinc-300 hover:text-white hover:border-white/20 active:scale-[0.98]" : "text-zinc-700 cursor-not-allowed"}`}
            >
              <span>NEXT_LESSON</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Lesson Metadata details */}
          <div className="space-y-4 max-w-4xl">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-zinc-500">
                MODULE: {currentModule.title.toUpperCase()}
              </span>
              <h2 className="text-xl font-bold text-white font-mono">
                {currentLesson.title}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              {currentLesson.description}
            </p>

            {/* Simulated Resource block */}
            <div className="rounded-xl border border-white/5 bg-[#060608] p-4 font-mono text-xs space-y-2.5 mt-8">
              <div className="text-zinc-400 font-bold border-b border-white/5 pb-2 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-red-500" />
                <span>WORKSPACE_RESOURCES</span>
              </div>
              <ul className="space-y-2 text-[10px]">
                <li className="flex items-center justify-between text-zinc-400 hover:text-white transition-colors cursor-pointer group">
                  <span className="flex items-center gap-1.5">
                    <span className="text-red-500">&gt;</span> index.tsx (completed code solution)
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-red-500" />
                </li>
                <li className="flex items-center justify-between text-zinc-400 hover:text-white transition-colors cursor-pointer group">
                  <span className="flex items-center gap-1.5">
                    <span className="text-red-500">&gt;</span> README.md (systems specifications document)
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-red-500" />
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right Side: Modules & Playlist Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "320px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full border-l border-white/5 bg-[#060608]/90 overflow-y-auto flex-shrink-0 z-10"
            >
              <div className="p-4 border-b border-white/5 font-mono text-xs font-bold text-zinc-300 tracking-wider">
                &gt; COURSE_PLAYLIST
              </div>

              <div className="p-4 space-y-6">
                {course.modules.map((mod) => (
                  <div key={mod.id} className="space-y-2">
                    <h4 className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">
                      {mod.title}
                    </h4>
                    <div className="space-y-1">
                      {mod.lessons.map((les) => {
                        const isCurrent = les.id === currentLessonId;
                        const isCompleted = completedLessonIds.includes(les.id);

                        return (
                          <Link
                            key={les.id}
                            href={`/lesson/${les.id}`}
                            className={`flex items-start gap-2.5 rounded-lg p-2.5 text-xs font-mono transition-colors ${isCurrent ? "bg-red-500/10 border border-red-500/30 text-white" : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200"}`}
                          >
                            <span className="mt-0.5 flex-shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="h-3.5 w-3.5 text-emerald-500 fill-emerald-500/10" />
                              ) : (
                                <PlayCircle className={`h-3.5 w-3.5 ${isCurrent ? "text-red-500" : "text-zinc-600"}`} />
                              )}
                            </span>
                            <div className="space-y-0.5">
                              <p className={`font-bold line-clamp-2 ${isCurrent ? "text-white" : ""}`}>
                                {les.title}
                              </p>
                              <span className="text-[9px] text-zinc-600 font-mono block">
                                DURATION: {les.duration}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
