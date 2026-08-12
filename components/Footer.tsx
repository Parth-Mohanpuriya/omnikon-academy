"use client"

import Link from "next/link"
import { useState } from "react"
import Logo from "@/components/Logo"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="w-full border-t border-white/5 bg-[#030303] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <Logo size={32} textClassName="text-md" />
            <p className="text-sm text-zinc-400 max-w-xs">
              A premium, open-source first education platform designed to train the next generation of engineers.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/Omnikon-Org" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="https://discord.gg/yWtjK2Tb8T" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Discord">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.738a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043zm-3.78 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z"/>
                </svg>
              </a>
              <a href="https://x.com/OmnikonOrg" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/omnikon-org" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-medium text-zinc-200 tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/courses" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/#learning-paths" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Learning Paths
                </Link>
              </li>
              <li>
                <span className="text-sm text-zinc-400 cursor-default">
                  Interactive Sandbox
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-400 cursor-default">
                  System Architectures
                </span>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-medium text-zinc-200 tracking-wider uppercase mb-4">Community</h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-zinc-400 cursor-default">
                  GitHub Discussions
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-400 cursor-default">
                  Discord Server
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-400 cursor-default">
                  Student Showcases
                </span>
              </li>
              <li>
                <span className="text-sm text-zinc-400 cursor-default">
                  Hackathons 2026
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-200 tracking-wider uppercase">Subscribe</h3>
            <p className="text-sm text-zinc-400">
              Receive updates on new courses, micro-lessons, and hackathons.
            </p>
            <div className="relative flex flex-col gap-2 p-3 rounded-lg border border-white/5 bg-[#09090b] text-xs">
              <div className="flex items-center gap-1">
                <input
                  type="email"
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="bg-transparent border-none text-white focus:outline-none placeholder-zinc-600 w-full"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubscribe}
                className="mt-2 text-center text-[10px] uppercase font-medium text-black bg-zinc-200 hover:bg-white rounded py-1.5 transition-colors cursor-pointer"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Omnikon Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-default">Privacy Policy</span>
            <span className="hover:text-zinc-300 transition-colors cursor-default">Terms of Service</span>
            <span className="hover:text-zinc-300 transition-colors cursor-default">License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
