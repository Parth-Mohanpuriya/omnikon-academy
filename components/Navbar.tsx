"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Settings, User } from "lucide-react";

import Logo from "@/components/Logo";
import { mockUser } from "@/lib/mock-data";

const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Learning Paths", href: "/#learning-paths" },
  { label: "Projects", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("omnikon_signed_in") === "true";
    }
    return false;
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  const userInitials = mockUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

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
                    <span className="relative z-10">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Action Buttons / Profile */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white text-sm font-bold ring-2 ring-white/10 hover:ring-white/20 transition-all cursor-pointer"
                >
                  {userInitials}
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/10 bg-[#0c0c0e] shadow-2xl overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-sm font-medium text-white">{mockUser.name}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">{mockUser.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>
                          <Link
                            href="/settings"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Settings className="h-4 w-4" />
                            Settings
                          </Link>
                        </div>
                        <div className="border-t border-white/5 py-1">
                          <button
                            onClick={() => {
                              setIsSignedIn(false);
                              localStorage.removeItem("omnikon_signed_in");
                              setShowDropdown(false);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors w-full cursor-pointer"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    setIsSignedIn(true);
                    localStorage.setItem("omnikon_signed_in", "true");
                  }}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    setIsSignedIn(true);
                    localStorage.setItem("omnikon_signed_in", "true");
                  }}
                  className="px-4 py-2 text-xs font-medium text-white/90 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 active:scale-[0.97] transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {isSignedIn && (
              <Link href="/profile">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-bold ring-2 ring-white/10">
                  {userInitials}
                </div>
              </Link>
            )}
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
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 border-t border-white/5 pt-6 flex flex-col gap-4">
                {isSignedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-bold">
                        {userInitials}
                      </div>
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white"
                    >
                      <Settings className="h-4 w-4 ml-0.5" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsSignedIn(false);
                        localStorage.removeItem("omnikon_signed_in");
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 ml-0.5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => {
                        setIsSignedIn(true);
                        localStorage.setItem("omnikon_signed_in", "true");
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium text-zinc-400 hover:text-white"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => {
                        setIsSignedIn(true);
                        localStorage.setItem("omnikon_signed_in", "true");
                        setIsOpen(false);
                      }}
                      className="block rounded-lg py-3 text-center text-xs font-medium text-white/90 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
