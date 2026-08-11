"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Terminal,
  Activity,
  GitBranch,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import LiveActivityFeed from "@/components/LiveActivityFeed";
import HeroGlobeTags from "@/components/HeroGlobeTags";
import { mockLearningPaths, mockCourses } from "@/lib/mock-data";

// ----------------------------------------------------
// Animated Counter Component
// ----------------------------------------------------
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2; // seconds
    const totalMiliseconds = duration * 1000;
    const steps = 50;
    const increment = Math.ceil(end / steps);
    const stepTime = totalMiliseconds / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span ref={ref} className="font-mono text-3xl font-extrabold text-white sm:text-4xl">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ----------------------------------------------------
// FAQ Item Component
// ----------------------------------------------------
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-sm font-semibold text-zinc-200 hover:text-white transition-colors"
      >
        <span>{question}</span>
        <ChevronDown className={`h-4 w-4 text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-red-500" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 font-sans">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [activePricingTab, setActivePricingTab] = useState<"monthly" | "annual">("monthly");
  
  // Custom mock projects built by students
  const studentProjects = [
    { title: "Astrodex", desc: "A React/Go package explorer with web workers.", stars: 412 },
    { title: "IssueSwipe", desc: "Mobile client for real-time repository issue reviews.", stars: 290 },
    { title: "CNTRL", desc: "Micro-deployment orchestration CLI utility.", stars: 185 }
  ];

  return (
    <div className="min-h-screen text-zinc-300 selection:bg-red-500 selection:text-white relative">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>Building Omnikon OS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl space-y-2">
              <span className="block">Open Source.</span>
              <span className="block text-zinc-400">
                Community Driven.
              </span>
              <span className="block">Student Powered.</span>
            </h1>

            <p className="max-w-xl text-base text-zinc-400 sm:text-lg leading-relaxed">
              We build developer centric open learning, and empower student developers to create real impact. Solve production challenges, write real-world code, and review pull requests.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="glow-btn-red rounded-lg px-6 py-3 text-sm font-medium text-white"
              >
                Explore Projects
              </Link>
              <Link
                href="/dashboard"
                className="rounded-lg border border-white/10 bg-[#0c0c0e] hover:bg-[#121215] px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-all"
              >
                Join Community
              </Link>
            </div>

            {/* Highlights Box */}
            <div className="max-w-md rounded-xl border border-white/5 bg-[#08080a] p-4 text-xs space-y-2.5">
              <div className="text-zinc-500 font-medium border-b border-white/5 pb-2">
                OMNIKON HIGHLIGHTS
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-zinc-400">
                  <span className="text-zinc-600">-</span> AI-Learning Hub
                </li>
                <li className="flex items-center gap-2 text-zinc-400">
                  <span className="text-zinc-600">-</span> Real-world impact
                </li>
                <li className="flex items-center gap-2 text-zinc-400">
                  <span className="text-zinc-600">-</span> Open contribution
                </li>
                <li className="flex items-center gap-2 text-zinc-400">
                  <span className="text-zinc-600">-</span> Student-first
                </li>
                <li className="flex items-center gap-2 text-zinc-400">
                  <span className="text-zinc-600">-</span> GitHub-native
                </li>
              </ul>
            </div>
          </div>

          {/* Hero Right - Vanta Globe with Orbital Tags */}
          <div className="lg:col-span-5 relative h-[400px] w-full mt-8 lg:mt-0">
            <HeroGlobeTags />
          </div>

        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="relative z-10 border-y border-white/5 bg-[#060608]/60 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-4 text-center">
            <div>
              <p className="text-zinc-500 text-xs tracking-wider uppercase mb-1">Students Trained</p>
              <Counter value={45000} suffix="+" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs tracking-wider uppercase mb-1">Hours of Content</p>
              <Counter value={180} suffix="h+" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs tracking-wider uppercase mb-1">Projects Completed</p>
              <Counter value={1200} suffix="+" />
            </div>
            <div>
              <p className="text-zinc-500 text-xs tracking-wider uppercase mb-1">Career Placement</p>
              <Counter value={96} suffix="%" />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Feature Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs text-red-500/80 uppercase tracking-widest">WHY OMNIKON ACADEMY</h2>
          <p className="text-3xl font-extrabold text-white">Engineered for Devs, Not Corporations.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Card 1: Interactive Terminal (2 Columns Wide on Desktop) */}
          <div className="glow-card md:col-span-2 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative min-h-[300px]">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
            <div className="space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <Terminal className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-bold text-white">Interactive Playrooms</h3>
              <p className="text-sm text-zinc-400 max-w-md">
                Learn syntax and architectures in real-time. Write backend API modules, protobuf declarations, and Docker configs inside mock browser terminals.
              </p>
            </div>
            
            {/* Simulated terminal block */}
            <div className="mt-6 rounded-lg border border-white/10 bg-[#08080a] p-3 font-mono text-[10px] text-zinc-400 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-2 text-zinc-600">
                <span>playground.go</span>
                <span className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-zinc-700" /><span className="h-1.5 w-1.5 rounded-full bg-zinc-700" /></span>
              </div>
              <p className="text-green-400">package main</p>
              <p className="text-zinc-500">import "fmt"</p>
              <p className="text-white mt-1"><span className="text-zinc-500">func</span> main() &#123;</p>
              <p className="text-zinc-400 pl-4">fmt.Println(<span className="text-red-400">"Omnikon System Ready."</span>)</p>
              <p className="text-white">&#125;</p>
              <p className="text-zinc-600 mt-2 hover:text-white transition-colors cursor-pointer border-t border-white/5 pt-1.5 text-right font-bold">[ EXECUTE RUN ]</p>
            </div>
          </div>

          {/* Card 2: GitHub PRs */}
          <div className="glow-card rounded-2xl p-6 flex flex-col justify-between min-h-[300px]">
            <div className="space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <GitBranch className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-bold text-white">GitHub Native Flow</h3>
              <p className="text-sm text-zinc-400">
                No artificial quiz templates. Progress by reading diffs, fixing edge-cases, and triggering mock workflow test runs.
              </p>
            </div>
            
            {/* PR Mock UI */}
            <div className="mt-6 p-3 rounded-lg border border-red-500/10 bg-red-500/5 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center justify-between text-[8px] text-red-400">
                <span>PR #2046</span>
                <span className="rounded bg-red-500/20 px-1 border border-red-500/30">PENDING_REVIEW</span>
              </div>
              <p className="text-white font-bold">feat: optimize Postgres indexing</p>
              <div className="flex gap-2 text-[8px] text-zinc-500 mt-1">
                <span className="text-green-500">+12 lines</span>
                <span className="text-red-500">-3 lines</span>
              </div>
            </div>
          </div>

          {/* Card 3: Live Feed */}
          <div className="glow-card rounded-2xl p-6 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <Activity className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-bold text-white">Live Logs Feed</h3>
              <p className="text-sm text-zinc-400">
                Stay motivated by watching real-time activities, merges, and achievements happening across our virtual cohort.
              </p>
            </div>
            <div className="mt-6">
              <div className="flex gap-1.5 text-[10px] font-mono text-zinc-500 mb-2">
                <Activity className="h-3.5 w-3.5 text-red-500 animate-pulse" />
                <span>ACTIVITY FEED</span>
              </div>
              <div className="border border-white/5 bg-[#09090b] rounded p-2.5 space-y-1.5 font-mono text-[9px]">
                <p><span className="text-red-400">alex_r</span> completed gRPC client</p>
                <p><span className="text-red-400">sonal_m</span> pushed master index</p>
              </div>
            </div>
          </div>

          {/* Card 4: Student Projects (2 Columns Wide on Desktop) */}
          <div className="glow-card md:col-span-2 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[350px]">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
            <div className="space-y-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <Star className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-bold text-white">Build Real Open Source</h3>
              <p className="text-sm text-zinc-400 max-w-md">
                Every cohort builds, tests, and deploys utilities that are released under permissive MIT licenses on GitHub. Work on active project backlogs.
              </p>
            </div>

            {/* Projects list */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {studentProjects.map((proj) => (
                <div key={proj.title} className="p-3 rounded-lg border border-white/5 bg-[#09090c] hover:border-red-500/30 transition-colors font-mono">
                  <div className="flex items-center justify-between text-xs text-white font-bold mb-1">
                    <span>{proj.title}</span>
                    <span className="flex items-center text-[10px] text-zinc-500 gap-0.5">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500/20" /> {proj.stars}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-normal">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Structured Learning Paths Section */}
      <section id="learning-paths" className="relative z-10 border-t border-white/5 py-20 bg-[#040406]/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs text-red-500/80 uppercase tracking-widest">CURRICULUM TRACKS</h2>
            <p className="text-3xl font-extrabold text-white">Structured Career Learning Paths</p>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto">
              Skip the tutorial hell. Our curated paths contain consecutive projects and lessons to transform you from beginner to systems developer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mockLearningPaths.map((path) => (
              <div
                key={path.id}
                className="group relative flex flex-col justify-between rounded-xl border border-white/5 bg-[#08080a] p-6 hover:border-red-500/30 transition-all duration-300"
              >
                {/* Accent top glow line */}
                <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-red-500/20 to-transparent group-hover:from-red-500/80 transition-all duration-300" />
                
                <div className="space-y-4">
                  <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-zinc-400 border border-white/10 uppercase">
                    {path.level}
                  </span>
                  <div>
                    <h3 className="text-md font-bold text-white group-hover:text-red-400 transition-colors">
                      {path.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {path.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-white/5 pt-4">
                    <span>{path.coursesCount} Courses</span>
                    <span>{path.duration}</span>
                  </div>
                  <Link
                    href="/courses"
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-[#0e0e11] group-hover:bg-red-500/10 group-hover:border-red-500/30 py-2.5 text-center text-xs text-zinc-300 group-hover:text-white transition-all"
                  >
                    <span>Explore Path</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Scrolling Ticker / Marquee */}
      <Marquee />

      {/* Popular Courses Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-xs text-red-500/80 uppercase tracking-widest">ACTIVE COHORT COURSES</h2>
            <p className="text-3xl font-extrabold text-white">Popular Programs</p>
            <p className="text-sm text-zinc-400 max-w-md">
              Learn advanced architectures directly from production codebases. Interactive, modular, and deep.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-1.5 text-xs text-red-400/80 hover:text-white transition-colors"
          >
            <span>View All Courses</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {mockCourses.slice(0, 3).map((course) => {
            const firstLessonId = course.modules[0]?.lessons[0]?.id || "nextjs-l1";
            return (
              <div
                key={course.id}
                className="glow-card flex flex-col justify-between rounded-2xl p-6 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] font-mono text-zinc-400 border border-white/10 uppercase">
                      {course.level}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{course.duration}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-md font-bold text-white hover:text-red-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-400 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* Topic Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono text-zinc-500 bg-[#0d0d0f] border border-white/5 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-zinc-500">
                    <span className="text-white font-bold">{course.studentsCount.toLocaleString()}</span> devs enrolled
                  </div>
                  <Link
                    href={`/lesson/${firstLessonId}`}
                    className="glow-btn-red rounded-lg px-4 py-2 text-[10px] font-medium text-white"
                  >
                    Start Course
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Activity logs & testimonials section */}
      <section id="community" className="relative z-10 border-t border-white/5 py-20 bg-[#040406]/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            
            {/* Left side: Live log feed */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xs text-red-500/80 uppercase tracking-widest">LIVE ACTIVITY STREAM</h2>
                <h3 className="text-2xl font-bold text-white">Telemetry Network</h3>
                <p className="text-sm text-zinc-400">
                  Watch as students check off modules, commit index patches, and merge exercises across our platform. Join the hive mind.
                </p>
              </div>
              <LiveActivityFeed />
            </div>

            {/* Right side: Testimonials */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xs text-red-500/80 uppercase tracking-widest">STUDENT REVIEWS</h2>
                <h3 className="text-2xl font-bold text-white">Terminal feedback</h3>
                <p className="text-sm text-zinc-400">
                  Hear from software engineers who scaled their learning and skipped the bootcamp debt.
                </p>
              </div>

              {/* Reviews grid */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/5 bg-[#08080a] space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-xs font-bold text-white">sonal_m (Senior Platform Eng)</span>
                    <span className="text-[10px] font-mono text-zinc-500">Verified Grad</span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-400 font-sans">
                    "The Go microservices track on Omnikon Academy is masterclass level. Compiling protobuf schemas and linking gRPC stream handlers in clean tests made me stand out in backend interviews."
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-[#08080a] space-y-3 relative">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-xs font-bold text-white">alex_rivera (Fullstack Dev)</span>
                    <span className="text-[10px] font-mono text-zinc-500">Verified Active</span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-400 font-sans">
                    "I love how there are no video placeholders. The Next.js 15 routing lessons resolved all my caching headaches. Having real PR reviews makes it feel like code reviews at work."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs text-red-500/80 uppercase tracking-widest">PRICING PLANS</h2>
          <p className="text-3xl font-extrabold text-white">Unlock Senior-Level Content</p>
          
          {/* Billing Switch */}
          <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#09090b] p-1 text-xs mt-4">
            <button
              onClick={() => setActivePricingTab("monthly")}
              className={`rounded-md px-3.5 py-1.5 transition-colors ${activePricingTab === "monthly" ? "bg-red-500 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActivePricingTab("annual")}
              className={`rounded-md px-3.5 py-1.5 transition-colors ${activePricingTab === "annual" ? "bg-red-500 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          
          {/* Plan 1: Free Dev */}
          <div className="rounded-2xl border border-white/5 bg-[#070709] p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6">
              <span className="text-xs text-zinc-500">INIT // BASE_TIER</span>
              <div>
                <h3 className="text-2xl font-extrabold text-white">Free Developer</h3>
                <p className="text-sm text-zinc-400 mt-1">Access core foundations. Learn tools.</p>
              </div>
              <div className="text-3xl font-extrabold text-white">$0</div>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Access to Beginner courses</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Interactive browser playrooms</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Discord server lounge access</span>
                </li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="mt-8 block w-full rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 py-3 text-center text-xs text-zinc-300 font-medium"
            >
              Start Free Coding
            </Link>
          </div>

          {/* Plan 2: Pro Member (Crimson Glow) */}
          <div className="rounded-2xl border border-red-500/20 bg-[#090505] p-8 flex flex-col justify-between relative shadow-[0_0_30px_rgba(239,68,68,0.05)]">
            <div className="absolute top-0 right-6 rounded-b bg-red-500 px-3 py-1 font-mono text-[9px] font-bold text-white uppercase">
              RECOMMENDED
            </div>
            <div className="space-y-6">
              <span className="text-xs text-red-400/80 font-medium">MUTATION // SENIOR_TIER</span>
              <div>
                <h3 className="text-2xl font-extrabold text-white">Pro Membership</h3>
                <p className="text-sm text-zinc-400 mt-1">Full curriculum path. Build live specs.</p>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white">
                  {activePricingTab === "monthly" ? "$29" : "$20"}
                </span>
                <span className="text-xs text-zinc-500"> / month</span>
                {activePricingTab === "annual" && (
                  <p className="text-[10px] text-red-400/80 mt-1">Billed annually ($240)</p>
                )}
              </div>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-500" />
                  <span className="text-white">All courses (Intermediate & Advanced)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-500" />
                  <span>GitHub pull request assignments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-500" />
                  <span>Review logs and custom certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-red-500" />
                  <span>System design template library</span>
                </li>
              </ul>
            </div>
            <Link
              href="/dashboard"
              className="mt-8 block w-full rounded-lg glow-btn-red py-3 text-center text-xs text-white font-medium"
            >
              Unlock Pro Access
            </Link>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-xs text-red-500/80 uppercase tracking-widest">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-3xl font-extrabold text-white">System Architecture & Support</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#060608] p-6 sm:p-8">
          <FAQItem
            question="Is this really a pure UI-only build for demo?"
            answer="Yes! All functionalities on Omnikon Academy (searching courses, completing items, switching dashboard tabs) run instantly in your browser utilizing local React state. There is no persistence, databases, or third-party authentication protocols hooked up."
          />
          <FAQItem
            question="What type of courses are included in the mock registry?"
            answer="Currently, our registry hosts courses detailing Next.js 15 Server Components, high-throughput backend gRPC microservices in Go, Cloud Native DevOps using Docker, and Radix/Tailwind design systems."
          />
          <FAQItem
            question="How do the interactive terminal cards work?"
            answer="In the full system, commands execute in sandboxed environment kernels. In this frontend demo, the terminal cards are mock components showing typing cursors, simulated commands, and code highlighting details."
          />
          <FAQItem
            question="Can I enroll in multiple paths concurrently?"
            answer="Yes. The dashboard allows you to select, activate, and follow progress metrics across multiple courses and paths at the same time."
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative z-10 border-t border-white/5 bg-[#060303]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="absolute inset-0 bg-radial-gradient from-red-500/5 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to compile your skills?
          </h2>
          <p className="mx-auto max-w-lg text-sm text-zinc-400">
            Join thousands of active engineers writing clean code, reviewing PRs, and deploying cloud native infrastructures.
          </p>
          <div className="flex justify-center">
            <Link
              href="/dashboard"
              className="glow-btn-red rounded-lg px-8 py-3.5 text-sm font-medium text-white"
            >
              Start Learning Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
