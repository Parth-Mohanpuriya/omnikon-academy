"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code,
  Users,
  Globe,
  Heart,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Target,
  Lightbulb,
  Rocket,
  GraduationCap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockTeamMembers } from "@/lib/mock-data";

const values = [
  {
    icon: <Code className="h-5 w-5" />,
    title: "Open Source First",
    description:
      "Everything we build is transparent. Our curriculum, tools, and community contributions are open for everyone to learn from and improve."
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Community Driven",
    description:
      "We believe in the power of collaborative learning. Our community shapes the platform, mentors new learners, and builds together."
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Real-World Impact",
    description:
      "No toy projects. Students work on production-grade code, contribute to actual repositories, and solve real engineering challenges."
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Student First",
    description:
      "Every decision we make prioritizes student success. From curriculum design to platform features, learners are at the center."
  }
];

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Omnikon Academy started as a small Discord study group for developers preparing for technical interviews."
  },
  {
    year: "2024",
    title: "Platform Launch",
    description:
      "Launched our first courses on React and Go. Hit 1,000 students in the first month."
  },
  {
    year: "2025",
    title: "Growing Fast",
    description:
      "Expanded to 45,000+ students. Launched Learning Paths, the GitHub integration, and community features."
  },
  {
    year: "2026",
    title: "The Future",
    description:
      "Building the Omnikon OS - a complete developer education ecosystem with AI-powered learning, job placement, and enterprise training."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10">
          {/* Hero Section */}
          <section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-zinc-400 mb-6">
                <span>About Omnikon</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
                Building the Future of
                <span className="block text-zinc-400">
                  Developer Education
                </span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                Omnikon Academy is an open-source, community-driven platform
                training the next generation of software engineers. We believe
                in learning by building, not just watching.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/courses"
                  className="glow-btn-red rounded-lg px-6 py-3 text-sm font-medium text-white"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/#community"
                  className="rounded-lg border border-white/10 bg-[#0c0c0e] hover:bg-[#121215] px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-all"
                >
                  Join Community
                </Link>
              </div>
            </motion.div>
          </section>

          {/* Stats Banner */}
          <section className="border-y border-white/5 bg-[#060608]/60 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-3xl font-extrabold text-white font-mono">
                    45,000+
                  </p>
                  <p className="text-xs text-zinc-500 font-mono uppercase mt-1">
                    Active Students
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-3xl font-extrabold text-white font-mono">
                    100+
                  </p>
                  <p className="text-xs text-zinc-500 font-mono uppercase mt-1">
                    Hours of Content
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-3xl font-extrabold text-white font-mono">
                    1,200+
                  </p>
                  <p className="text-xs text-zinc-500 font-mono uppercase mt-1">
                    Projects Completed
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-3xl font-extrabold text-white font-mono">
                    96%
                  </p>
                  <p className="text-xs text-zinc-500 font-mono uppercase mt-1">
                    Career Placement
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xs text-red-500/80 uppercase tracking-widest">
                  OUR MISSION
                </h2>
                <h3 className="text-3xl font-extrabold text-white">
                  Democratizing Developer Education
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  We started Omnikon Academy because we saw a gap in how
                  developers are trained. Traditional bootcamps are expensive.
                  Online courses are passive. And corporate training is
                  inaccessible.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  Our mission is to create a learning experience that is
                  hands-on, community-driven, and aligned with real-world
                  engineering practices. Every student should have access to
                  production-quality education.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-white font-bold">
                      Built by Engineers
                    </p>
                    <p className="text-xs text-zinc-500">
                      For the Next Generation of Engineers
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500/5 rounded-2xl blur-3xl" />
                  <div className="relative rounded-2xl border border-white/5 bg-[#08080a] p-8 space-y-4">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs border-b border-white/5 pb-4">
                      <Lightbulb className="h-4 w-4 text-zinc-500" />
                      <span>KEY PRINCIPLES</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Learn by building real projects",
                        "Contribute to open source",
                        "Peer review and mentorship",
                        "Production-grade code quality",
                        "Community-first development"
                      ].map((principle, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-zinc-400"
                        >
                          <span className="text-zinc-600 text-xs">
                            -
                          </span>
                          {principle}
                        </li>
                      ))}
                    </ul>
                  </div>
              </motion.div>
            </div>
          </section>

          {/* Values Section */}
          <section className="border-t border-white/5 py-20 bg-[#040406]/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-xs text-red-500/80 uppercase tracking-widest">
                  CORE VALUES
                </h2>
                <p className="text-3xl font-extrabold text-white">
                  What We Stand For
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glow-card rounded-xl p-6 space-y-4"
                  >
                    <div className="h-10 w-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {value.title}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-xs text-red-500/80 uppercase tracking-widest">
                THE TEAM
              </h2>
              <p className="text-3xl font-extrabold text-white">
                Meet the Builders
              </p>
              <p className="text-sm text-zinc-400 max-w-lg mx-auto">
                A small but dedicated team of engineers, educators, and community
                builders working to transform developer education.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockTeamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glow-card rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <span className="text-xl font-bold text-red-500 font-mono">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {member.name}
                      </h4>
                      <p className="text-xs text-zinc-400">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 bg-[#0a0a0c] hover:bg-white/5 transition-colors"
                      >
                        <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 bg-[#0a0a0c] hover:bg-white/5 transition-colors"
                      >
                        <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 bg-[#0a0a0c] hover:bg-white/5 transition-colors"
                      >
                        <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Timeline Section */}
          <section className="border-t border-white/5 py-20 bg-[#040406]/30">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-xs text-red-500/80 uppercase tracking-widest">
                  OUR JOURNEY
                </h2>
                <p className="text-3xl font-extrabold text-white">Timeline</p>
              </div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-red-400 font-mono">
                          {milestone.year.slice(2)}
                        </span>
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-full bg-white/10 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="text-xs text-zinc-500">
                        {milestone.year}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-zinc-400 mt-2 max-w-md">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t border-white/5 bg-[#060303]">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center space-y-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-lg text-sm text-zinc-400">
                Join thousands of developers learning to build production-ready
                software with Omnikon Academy.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/courses"
                  className="glow-btn-red rounded-lg px-8 py-3.5 text-sm font-medium text-white"
                >
                  Start Learning
                </Link>
                <Link
                  href="/#community"
                  className="rounded-lg border border-white/10 bg-[#0c0c0e] hover:bg-[#121215] px-8 py-3.5 text-sm font-medium text-zinc-300 hover:text-white transition-all"
                >
                  Join Discord
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
