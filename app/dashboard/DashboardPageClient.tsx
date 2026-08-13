"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Activity,
  CheckCircle,
  Play,
  Plus,
  User as UserIcon
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockUser, mockCourses, Course, UserProgress } from "@/lib/mock-data";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface DashboardPageClientProps {
  user: SupabaseUser | null;
}

export default function DashboardPageClient({ user: supabaseUser }: DashboardPageClientProps) {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("omnikon_enrolled_courses");
      if (stored) return JSON.parse(stored);
    }
    return mockUser.enrolledCourses;
  });
  const [userProgressList, setUserProgressList] = useState<UserProgress[]>(mockUser.progress);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("omnikon_enrolled_courses", JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  const effectiveProgressList = useMemo(() => {
    return userProgressList.map((p) => {
      let completedLessons = p.completedLessons;
      if (typeof window !== "undefined") {
        const key = `omnikon_completed_lessons_${p.courseId}`;
        const stored = localStorage.getItem(key);
        if (stored) completedLessons = JSON.parse(stored);
      }
      const course = mockCourses.find((c) => c.id === p.courseId);
      let totalLessons = 0;
      if (course) course.modules.forEach((m) => (totalLessons += m.lessons.length));
      const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
      return { ...p, completedLessons, progressPercentage };
    });
  }, [userProgressList]);

  const enrolledCourses = useMemo(() => {
    return mockCourses.filter((course) => enrolledCourseIds.includes(course.id));
  }, [enrolledCourseIds]);

  const availableCourses = useMemo(() => {
    return mockCourses.filter((course) => !enrolledCourseIds.includes(course.id));
  }, [enrolledCourseIds]);

  const courseProgressMap = useMemo(() => {
    const map: Record<string, UserProgress> = {};
    effectiveProgressList.forEach((p) => {
      map[p.courseId] = p;
    });
    return map;
  }, [effectiveProgressList]);

  const handleEnroll = (courseId: string, courseTitle: string) => {
    setEnrolledCourseIds((prev) => [...prev, courseId]);
    setUserProgressList((prev) => [
      ...prev,
      {
        courseId,
        completedLessons: [],
        progressPercentage: 0
      }
    ]);
    
    setNotification(`Successfully enrolled in "${courseTitle}"`);
    setTimeout(() => setNotification(null), 4000);
  };

  const getNextLessonId = (course: Course) => {
    const progress = courseProgressMap[course.id];
    if (!progress) return course.modules[0]?.lessons[0]?.id || "";
    
    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        if (!progress.completedLessons.includes(les.id)) {
          return les.id;
        }
      }
    }
    return course.modules[0]?.lessons[0]?.id || "";
  };

  const overallProgress = useMemo(() => {
    if (enrolledCourses.length === 0) return 0;
    const total = enrolledCourses.reduce((acc, course) => {
      return acc + (courseProgressMap[course.id]?.progressPercentage || 0);
    }, 0);
    return Math.round(total / enrolledCourses.length);
  }, [enrolledCourses, courseProgressMap]);

  return (
    <div className="min-h-screen text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          
          {/* Notification Alert Pop */}
          <AnimatePresence>
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-20 right-4 z-50 rounded-lg border border-emerald-500/30 bg-[#061009] p-4 text-xs text-emerald-400 font-mono shadow-2xl flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>{notification}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Welcome Dashboard Banner */}
          <div className="rounded-xl border border-white/5 bg-[#070709] p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-xl border border-red-500/20 bg-zinc-900 overflow-hidden flex items-center justify-center">
                {supabaseUser?.user_metadata?.avatar_url ? (
                  <img
                    src={supabaseUser.user_metadata.avatar_url}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 block mb-0.5">DEV_ENVIRONMENT: ACTIVE</span>
                <h1 className="text-2xl font-extrabold text-white">
                  {supabaseUser?.user_metadata?.full_name || supabaseUser?.email?.split("@")[0] || mockUser.name}
                </h1>
                <p className="text-xs text-zinc-500 mt-0.5">ROLE: SYSTEM_ENGINEER_IN_TRAINING</p>
              </div>
            </div>

            {/* Quick Stats Column */}
            <div className="grid grid-cols-3 gap-6 text-center border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-8 text-xs">
              <div>
                <p className="text-zinc-500 text-[9px] uppercase tracking-wider mb-1">Courses</p>
                <p className="text-white font-bold text-lg">{enrolledCourseIds.length}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] uppercase tracking-wider mb-1">Path Progress</p>
                <p className="text-red-400 font-bold text-lg">{overallProgress}%</p>
              </div>
              <div>
                <p className="text-zinc-500 text-[9px] uppercase tracking-wider mb-1">Certificates</p>
                <p className="text-zinc-500 font-bold text-lg">0</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* Left Side: Learning Grid (Col Span 8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Enrolled Courses Section */}
              <div className="space-y-4">
                <h2 className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Play className="h-3 w-3 text-red-500 fill-red-500/20" />
                  Continue Learning
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {enrolledCourses.map((course) => {
                      const progress = courseProgressMap[course.id];
                      const completedCount = progress?.completedLessons.length || 0;
                      
                      let totalLessons = 0;
                      course.modules.forEach((m) => totalLessons += m.lessons.length);
                      
                      const resumeLessonId = getNextLessonId(course);

                      return (
                        <motion.div
                          key={course.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="glow-card rounded-xl p-5 flex flex-col justify-between min-h-[220px]"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center rounded-full bg-red-500/5 px-2.5 py-0.5 text-[8px] font-mono text-red-400 border border-red-500/10 uppercase">
                                {course.level}
                              </span>
                              <span className="text-[10px] text-zinc-500">
                                {completedCount} / {totalLessons} lessons
                              </span>
                            </div>
                            <h3 className="text-sm font-bold text-white line-clamp-1">
                              {course.title}
                            </h3>
                          </div>

                          <div className="mt-4 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-zinc-500">
                              <span>Progress</span>
                              <span className="text-white">{progress?.progressPercentage || 0}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress?.progressPercentage || 0}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </div>

                          <Link
                            href={`/lesson/${resumeLessonId}`}
                            className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 py-2 text-center text-xs text-white transition-all"
                          >
                            <Play className="h-3 w-3 fill-white" />
                            <span>Resume Lesson</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Available Courses to Enroll in */}
              <div className="space-y-4">
                <h2 className="text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Plus className="h-3.5 w-3.5 text-zinc-500" />
                  Available Courses
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {availableCourses.length > 0 ? (
                      availableCourses.map((course) => (
                        <motion.div
                          key={course.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="rounded-xl border border-white/5 bg-[#060608] p-5 flex flex-col justify-between min-h-[220px]"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[8px] font-mono text-zinc-400 border border-white/10 uppercase">
                                {course.level}
                              </span>
                              <span className="text-[10px] font-mono text-zinc-500">{course.duration}</span>
                            </div>
                            <h3 className="text-sm font-bold text-white line-clamp-1">
                              {course.title}
                            </h3>
                            <p className="text-xs leading-normal text-zinc-400 line-clamp-3">
                              {course.description}
                            </p>
                          </div>

                          <button
                            onClick={() => handleEnroll(course.id, course.title)}
                            className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 py-2 text-center text-xs text-zinc-300 hover:text-white transition-all cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                            <span>Enroll in Course</span>
                          </button>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2 rounded-xl border border-dashed border-white/5 p-8 text-center text-xs text-zinc-500">
                        Congratulations! You{"'"}ve enrolled in all courses.
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* Right Side: Telemetry logs / Info sidebar (Col Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Cohort Details */}
              <div className="rounded-xl border border-white/5 bg-[#060608] p-4 text-xs space-y-3">
                <div className="text-zinc-500 font-medium border-b border-white/5 pb-2">
                  Session Info
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <p><span className="text-zinc-500">Cohort ID:</span> <span className="text-white">2026-BETA</span></p>
                  <p><span className="text-zinc-500">Host Address:</span> <span className="text-white">192.168.42.100</span></p>
                  <p><span className="text-zinc-500">DNS Server:</span> <span className="text-zinc-400">omnikon.academy.internal</span></p>
                  <p><span className="text-zinc-500">Port:</span> <span className="text-white">3000</span></p>
                  <p><span className="text-zinc-500">Compiler:</span> <span className="text-white">TypeScript 5.x</span></p>
                </div>
              </div>

              {/* Path Progress Card */}
              <div className="rounded-xl border border-white/5 bg-[#060608] p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs text-white font-medium">
                  <Award className="h-4 w-4 text-red-500" />
                  <span>Active Path Objective</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Frontend Development</h4>
                  <p className="text-[11px] text-zinc-500">Average completion progress across path modules.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-500">Path Completion:</span>
                    <span className="text-red-400 font-medium">{overallProgress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500 rounded-full"
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Student Achievements widget */}
              <div className="rounded-xl border border-white/5 bg-[#060608] p-5 space-y-4 text-xs">
                <div className="flex items-center gap-2 text-zinc-500 font-medium border-b border-white/5 pb-2">
                  <Activity className="h-3.5 w-3.5 text-zinc-500" />
                  <span>System Messages</span>
                </div>
                <div className="space-y-3 text-[10px] leading-relaxed">
                  <div className="border-l-2 border-red-500/30 pl-2">
                    <p className="text-zinc-400">Welcome {supabaseUser?.user_metadata?.full_name || "Alex Rivera"}. Git authentication verified.</p>
                    <span className="text-[9px] text-zinc-600">just now</span>
                  </div>
                  <div className="border-l-2 border-zinc-700 pl-2">
                    <p className="text-zinc-400">Automatic local progress cache activated.</p>
                    <span className="text-[9px] text-zinc-600">10m ago</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
