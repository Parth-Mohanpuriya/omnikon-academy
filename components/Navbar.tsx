"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Learning Paths", href: "/#learning-paths" },
  { label: "Projects", href: "/#projects" },
  { label: "Community", href: "/#community" },
  { label: "Blog", href: "/#blog" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030303]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Logo size={36} textClassName="text-lg" />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="nav-link-liquid relative flex items-center text-sm text-zinc-400 hover:text-white py-1.5 px-3"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-md bg-white/5 border border-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="opacity-0 group-hover:opacity-100 text-red-500/80 font-mono text-xs transition-opacity">&gt;</span>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-mono text-white/90 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_16px_rgba(255,255,255,0.04)] active:scale-[0.97] transition-all duration-200"
            >
              GET STARTED
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-[#050505] overflow-hidden"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="nav-link-liquid flex items-center py-3 px-4 text-sm font-medium text-zinc-400 hover:text-white"
                >
                  <span className="text-red-500/80 font-mono mr-2">&gt;</span>
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 border-t border-white/5 pt-6 flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium text-zinc-400 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg py-3 text-center text-xs font-mono font-bold text-white/90 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  GET STARTED
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
