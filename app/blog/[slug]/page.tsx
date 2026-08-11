"use client";

import * as React from "react";
import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  BookOpen,
  ArrowRight,
  Share2,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostBySlug, mockBlogPosts, BlogPost } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const post = useMemo(() => {
    return getBlogPostBySlug(slug);
  }, [slug]);

  // Get related posts (same tags, excluding current)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return mockBlogPosts
      .filter(
        (p) =>
          p.id !== post.id && p.tags.some((t) => post.tags.includes(t))
      )
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-zinc-400 font-mono p-4">
        <p className="text-xs text-red-500 mb-2">&gt; ERROR: ARTICLE_NOT_FOUND</p>
        <p className="text-sm mb-6 text-zinc-500">
          The article &quot;{slug}&quot; does not exist.
        </p>
        <Link
          href="/blog"
          className="glow-btn-red rounded-lg px-4 py-2 text-xs text-white"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <pre
              key={`code-${index}`}
              className="rounded-lg border border-white/10 bg-[#08080a] p-4 my-4 overflow-x-auto"
            >
              <code className="text-xs font-mono text-zinc-300">
                {codeContent.trim()}
              </code>
            </pre>
          );
          codeContent = "";
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.slice(3);
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      // Handle headers
      if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-xl font-bold text-white font-mono mt-8 mb-4"
          >
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-lg font-bold text-white font-mono mt-6 mb-3"
          >
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith("- **")) {
        // Bold list items
        const match = line.match(/^- \*\*(.+?)\*\*\s*-?\s*(.*)$/);
        if (match) {
          elements.push(
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-zinc-400 mb-2 ml-4"
            >
              <span className="text-red-500 mt-1">•</span>
              <span>
                <strong className="text-white">{match[1]}</strong> - {match[2]}
              </span>
            </li>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-zinc-400 mb-2 ml-4"
          >
            <span className="text-red-500 mt-1">•</span>
            <span>{line.slice(2)}</span>
          </li>
        );
      } else if (line.match(/^\d+\.\s/)) {
        const match = line.match(/^(\d+)\.\s(.+)$/);
        if (match) {
          elements.push(
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-zinc-400 mb-2 ml-4"
            >
              <span className="text-red-500 font-mono">{match[1]}.</span>
              <span>{match[2]}</span>
            </li>
          );
        }
      } else if (line.startsWith("|")) {
        // Skip table headers and separators
        if (!line.includes("---") && !line.match(/^\|\s*\w+\s*\|$/)) {
          const cells = line
            .split("|")
            .filter((c) => c.trim())
            .map((c) => c.trim());
          elements.push(
            <div
              key={index}
              className="grid grid-cols-4 gap-2 text-xs font-mono text-zinc-400 py-2 border-b border-white/5"
            >
              {cells.map((cell, i) => (
                <span key={i}>{cell}</span>
              ))}
            </div>
          );
        }
      } else if (line.trim() === "") {
        elements.push(<div key={index} className="h-2" />);
      } else {
        // Regular paragraph with inline code support
        const parts = line.split(/`([^`]+)`/);
        elements.push(
          <p key={index} className="text-sm text-zinc-400 leading-relaxed mb-3">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <code
                  key={i}
                  className="px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs"
                >
                  {part}
                </code>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              [ BACK_TO_BLOG ]
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-mono mb-8 pb-8 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-white">{post.author}</p>
                  <p className="text-[10px] text-zinc-600">{post.authorRole}</p>
                </div>
              </div>
              <span className="text-zinc-700">|</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>

            {/* Excerpt */}
            <div className="p-4 rounded-xl border border-white/5 bg-[#070709] mb-8">
              <p className="text-sm text-zinc-400 italic">{post.excerpt}</p>
            </div>

            {/* Content */}
            <div className="prose-custom">{renderContent(post.content)}</div>

            {/* Share Section */}
            <div className="mt-12 p-6 rounded-xl border border-white/5 bg-[#070709]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-red-500" />
                  <span className="text-xs font-mono text-white">
                    SHARE_ARTICLE
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 transition-colors">
                    <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </button>
                  <button className="p-2 rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 transition-colors">
                    <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </button>
                  <button className="p-2 rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 transition-colors">
                    <svg className="h-4 w-4 text-zinc-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16"
            >
              <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
                RELATED_ARTICLES
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="block"
                  >
                    <div className="glow-card rounded-xl p-5 h-full flex flex-col group transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readTime}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-white font-mono mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2 flex-1">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center gap-1 mt-4 text-[10px] font-mono text-red-400 group-hover:text-white transition-colors">
                        <span>READ_MORE</span>
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
