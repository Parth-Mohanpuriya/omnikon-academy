"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, BookOpen, Clock, Users, Star, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockCourses, Course } from "@/lib/mock-data";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Get all unique tags from our courses array for filters
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    mockCourses.forEach((c) => c.tags.forEach((t) => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet)];
  }, []);

  // Live filter mock array on search & tag & level selection
  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
      
      const matchesTag = selectedTag === "All" || course.tags.includes(selectedTag);

      return matchesSearch && matchesLevel && matchesTag;
    });
  }, [searchQuery, selectedLevel, selectedTag]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All");
    setSelectedTag("All");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 font-mono text-[10px] text-red-400">
              <span>&gt; REPOSITORY_INDEX</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-mono tracking-tight sm:text-4xl">
              Browse Systems Courses
            </h1>
            <p className="text-zinc-400 max-w-xl text-sm">
              Filter through our list of technical modules. Write server actions, deploy Kubernetes clusters, and build low-latency interfaces.
            </p>
          </div>

          {/* Search and Filters Controls Panel */}
          <div className="rounded-xl border border-white/5 bg-[#070709] p-4 mb-8 space-y-4">
            
            {/* Search Input Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repository titles, tags, descriptions..."
                className="w-full rounded-lg border border-white/10 bg-[#0c0c0e] py-2.5 pl-10 pr-4 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 placeholder-zinc-600 transition-all font-mono"
              />
            </div>

            {/* Filter Buttons row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-white/5">
              
              {/* Left filters: Level selectors */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-500 mr-1 flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3 w-3" />
                  LEVEL:
                </span>
                {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`rounded px-2.5 py-1 text-[11px] font-mono transition-colors ${selectedLevel === lvl ? "bg-red-500 text-white font-bold" : "bg-[#0f0f12] text-zinc-400 border border-white/5 hover:text-white"}`}
                  >
                    {lvl.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Reset link if active */}
              {(searchQuery || selectedLevel !== "All" || selectedTag !== "All") && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-mono self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>RESET_FILTERS</span>
                </button>
              )}

            </div>

            {/* Tag Selection list */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-xs font-mono text-zinc-500 mr-2 self-center">TAGS:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-mono border transition-all ${selectedTag === tag ? "border-red-500 bg-red-500/10 text-red-400 font-bold" : "border-white/5 bg-[#08080a] text-zinc-500 hover:text-zinc-300"}`}
                >
                  {tag === "All" ? "ALL_TAGS" : `#${tag}`}
                </button>
              ))}
            </div>

          </div>

          {/* Courses Grid */}
          <div className="relative">
            <AnimatePresence mode="popLayout">
              {filteredCourses.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                >
                  {filteredCourses.map((course) => {
                    const firstLessonId = course.modules[0]?.lessons[0]?.id || "nextjs-l1";
                    return (
                      <motion.div
                        key={course.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="glow-card flex flex-col justify-between rounded-xl p-6 transition-all"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-mono text-zinc-400 border border-white/10 uppercase">
                              {course.level}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {course.duration}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h2 className="text-lg font-bold text-white font-mono hover:text-red-400 transition-colors line-clamp-1">
                              {course.title}
                            </h2>
                            <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                              {course.description}
                            </p>
                          </div>

                          {/* Technical Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {course.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`text-[9px] font-mono px-2 py-0.5 rounded ${selectedTag === tag ? "border border-red-500/30 bg-red-500/5 text-red-400" : "border border-white/5 bg-[#09090b] text-zinc-500"}`}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card bottom */}
                        <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
                          <div className="flex flex-col gap-0.5 font-mono text-[9px] text-zinc-500">
                            <span className="text-zinc-400 flex items-center gap-1">
                              <Users className="h-3 w-3 text-red-500" /> {course.studentsCount.toLocaleString()} devs
                            </span>
                            <span className="text-zinc-400 flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500/20" /> {course.rating} / 5.0
                            </span>
                          </div>
                          
                          <Link
                            href={`/lesson/${firstLessonId}`}
                            className="glow-btn-red rounded-lg px-4 py-2 font-mono text-[10px] font-bold text-white uppercase"
                          >
                            [ START_COURSE ]
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-white/10 bg-[#060608]/40 p-12 text-center max-w-md mx-auto"
                >
                  <p className="text-sm font-mono text-zinc-500 mb-4">
                    NO_RESULTS_FOUND_FOR_QUERY: "{searchQuery}"
                  </p>
                  <button
                    onClick={resetFilters}
                    className="glow-btn-red rounded px-4 py-2 font-mono text-xs text-white"
                  >
                    Clear Search Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
