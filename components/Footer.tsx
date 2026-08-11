import Link from "next/link";
import { Terminal } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
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
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Slack">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.522-2.522V8.824a2.528 2.528 0 0 1 2.522-2.52h5.043zm10.135 3.738a2.528 2.528 0 0 1 2.52-2.522 2.528 2.528 0 0 1 2.522 2.522 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043zm-3.78 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52h-5.043z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-mono text-zinc-200 tracking-wider uppercase mb-4">&gt; RESOURCES</h3>
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
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Interactive Sandbox
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  System Architectures
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-mono text-zinc-200 tracking-wider uppercase mb-4">&gt; COMMUNITY</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  GitHub Discussions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Student Showcases
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Hackathons 2026
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / CLI Shell signup */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-zinc-200 tracking-wider uppercase">&gt; SUBSCRIBE</h3>
            <p className="text-sm text-zinc-400">
              Receive updates on new courses, micro-lessons, and hackathons.
            </p>
            <div className="relative flex flex-col gap-2 p-3 rounded-lg border border-white/5 bg-[#09090b] font-mono text-xs">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Terminal className="h-3 w-3" />
                <span>newsletter.sh</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-red-500">$</span>
                <input
                  type="email"
                  placeholder="enter email..."
                  className="bg-transparent border-none text-white focus:outline-none placeholder-zinc-600 w-full"
                />
              </div>
              <button
                type="submit"
                className="mt-2 text-center text-[10px] uppercase font-bold text-black bg-zinc-200 hover:bg-white rounded py-1.5 transition-colors cursor-pointer"
              >
                Execute Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Omnikon Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">License</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
