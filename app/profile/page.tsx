"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  BookOpen,
  Clock,
  Award,
  Activity,
  Edit3,
  Save,
  X,
  CheckCircle,
  Play,
  GitCommit,
  TrendingUp,
  Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockUser, mockCourses, mockActivities, User } from "@/lib/mock-data";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("omnikon_profile_overrides");
      if (stored) return JSON.parse(stored);
    }
    return {
      name: mockUser.name,
      email: mockUser.email,
      bio: "Full-stack developer passionate about React and Go. Learning system design and distributed systems.",
      location: "San Francisco, CA",
      joinedDate: "January 2024"
    };
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate stats
  const enrolledCourses = mockCourses.filter((c) =>
    mockUser.enrolledCourses.includes(c.id)
  );

  const totalLessonsCompleted = mockUser.progress.reduce(
    (acc, p) => acc + p.completedLessons.length,
    0
  );

  const avgProgress =
    mockUser.progress.reduce((acc, p) => acc + p.progressPercentage, 0) /
    mockUser.progress.length;

  // Mock activity history
  const recentActivity = mockActivities.slice(0, 5);

  // Mock achievements
  const achievements = [
    { id: 1, title: "First Course", description: "Enrolled in first course", earned: true },
    { id: 2, title: "Quick Learner", description: "Completed 5 lessons", earned: true },
    { id: 3, title: "Active Learner", description: "7-day streak", earned: true },
    { id: 4, title: "Course Master", description: "Complete a full course", earned: false },
    { id: 5, title: "Community Star", description: "10 contributions", earned: false },
    { id: 6, title: "Mentor", description: "Help 5 students", earned: false }
  ];

  const handleSave = () => {
    localStorage.setItem("omnikon_profile_overrides", JSON.stringify(profileData));
    setIsEditing(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatarPreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-white/5 bg-[#070709] p-6 mb-8 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative h-24 w-24 rounded-xl border border-red-500/20 bg-zinc-900 overflow-hidden flex items-center justify-center flex-shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-10 w-10 text-red-500" />
                )}
                {isEditing && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <button
                      onClick={handleAvatarClick}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Edit3 className="h-5 w-5 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-red-400 font-bold block">
                      DEVELOPER_PROFILE
                    </span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                        className="text-2xl font-extrabold text-white font-mono bg-[#0c0c0e] border border-white/10 rounded px-3 py-1 focus:border-red-500/50 focus:outline-none"
                      />
                    ) : (
                      <h1 className="text-2xl font-extrabold text-white font-mono">
                        {profileData.name}
                      </h1>
                    )}
                    <p className="text-xs text-zinc-500 font-mono flex items-center gap-2">
                      <Mail className="h-3 w-3" />
                      {profileData.email}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500 text-emerald-400 font-mono text-xs hover:bg-emerald-500/20 transition-colors"
                        >
                          <Save className="h-3 w-3" />
                          SAVE
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 font-mono text-xs hover:bg-white/10 transition-colors"
                        >
                          <X className="h-3 w-3" />
                          CANCEL
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-[#0e0e11] text-zinc-300 font-mono text-xs hover:bg-white/5 transition-colors"
                      >
                        <Edit3 className="h-3 w-3" />
                        EDIT_PROFILE
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full text-sm text-zinc-400 bg-[#0c0c0e] border border-white/10 rounded-lg px-3 py-2 focus:border-red-500/50 focus:outline-none resize-none"
                  />
                ) : (
                  <p className="text-sm text-zinc-400 max-w-xl">{profileData.bio}</p>
                )}

                <div className="flex flex-wrap gap-4 text-xs text-zinc-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    Joined {profileData.joinedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3 w-3" />
                    {mockUser.enrolledCourses.length} courses enrolled
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8"
          >
            <div className="rounded-xl border border-white/5 bg-[#070709] p-4 text-center">
              <BookOpen className="h-5 w-5 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white font-mono">
                {mockUser.enrolledCourses.length}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                Courses Enrolled
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#070709] p-4 text-center">
              <CheckCircle className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white font-mono">
                {totalLessonsCompleted}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                Lessons Completed
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#070709] p-4 text-center">
              <TrendingUp className="h-5 w-5 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white font-mono">
                {Math.round(avgProgress)}%
              </p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                Avg Progress
              </p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#070709] p-4 text-center">
              <Award className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white font-mono">
                {achievements.filter((a) => a.earned).length}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono uppercase">
                Achievements
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Enrolled Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Play className="h-3 w-3 text-red-500 fill-red-500/20" />
                  MY_COURSES
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {enrolledCourses.map((course) => {
                    const progress = mockUser.progress.find(
                      (p) => p.courseId === course.id
                    );
                    // Find next incomplete lesson
                    let nextLessonId = course.modules[0]?.lessons[0]?.id || "";
                    if (progress) {
                      for (const mod of course.modules) {
                        for (const les of mod.lessons) {
                          if (!progress.completedLessons.includes(les.id)) {
                            nextLessonId = les.id;
                            break;
                          }
                        }
                        if (nextLessonId !== course.modules[0]?.lessons[0]?.id) break;
                      }
                    }
                    return (
                      <div
                        key={course.id}
                        className="glow-card rounded-xl p-5 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center rounded-full bg-red-500/5 px-2.5 py-0.5 text-[8px] font-mono text-red-400 border border-red-500/10 uppercase">
                              {course.level}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">
                              {course.duration}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white font-mono line-clamp-1">
                            {course.title}
                          </h3>
                        </div>

                        <div className="mt-4 space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                            <span>PROGRESS</span>
                            <span className="text-white">
                              {progress?.progressPercentage || 0}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${progress?.progressPercentage || 0}%`
                              }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        <Link
                          href={`/lesson/${nextLessonId}`}
                          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 py-2 text-center text-xs font-mono text-zinc-300 hover:text-white transition-all uppercase"
                        >
                          CONTINUE_LEARNING
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Activity Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-3 w-3 text-red-500" />
                  RECENT_ACTIVITY
                </h2>

                <div className="rounded-xl border border-white/5 bg-[#070709] p-4 space-y-4">
                  {recentActivity.map((act, index) => (
                    <div
                      key={act.id}
                      className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                    >
                      <div className="mt-0.5 h-6 w-6 rounded bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                        {act.type === "commit" && (
                          <GitCommit className="h-3 w-3 text-red-500" />
                        )}
                        {act.type === "lesson" && (
                          <CheckCircle className="h-3 w-3 text-emerald-500" />
                        )}
                        {act.type === "enroll" && (
                          <BookOpen className="h-3 w-3 text-blue-500" />
                        )}
                        {act.type === "project" && (
                          <Award className="h-3 w-3 text-purple-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-zinc-400">
                          <span className="text-zinc-300 font-medium">
                            {act.action}
                          </span>{" "}
                          in <span className="text-white font-medium">{act.target}</span>
                        </p>
                        <span className="text-[10px] text-zinc-600 font-mono">
                          {act.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-white/5 bg-[#070709] p-5 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <Award className="h-4 w-4 text-red-500" />
                  <span>ACHIEVEMENTS</span>
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned
                          ? "border-red-500/30 bg-red-500/5"
                          : "border-white/5 bg-[#060608] opacity-50"
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          achievement.earned
                            ? "bg-red-500/20 text-red-500"
                            : "bg-white/5 text-zinc-600"
                        }`}
                      >
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <p
                          className={`text-xs font-bold font-mono ${
                            achievement.earned ? "text-white" : "text-zinc-500"
                          }`}
                        >
                          {achievement.title}
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-white/5 bg-[#070709] p-5 space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  <span>SKILLS_FOCUS</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Go", "gRPC", "Docker"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-[#0c0c0e] border border-white/5 text-[10px] font-mono text-zinc-400"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-white/5 bg-[#070709] p-5 space-y-3"
              >
                <div className="text-xs font-mono text-white font-bold mb-3">
                  QUICK_ACTIONS
                </div>
                <Link
                  href="/courses"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors py-2"
                >
                  <BookOpen className="h-3.5 w-3.5 text-red-500" />
                  Browse Courses
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors py-2"
                >
                  <Play className="h-3.5 w-3.5 text-red-500" />
                  Go to Dashboard
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors py-2"
                >
                  <Edit3 className="h-3.5 w-3.5 text-red-500" />
                  Edit Settings
                </Link>
              </motion.div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
