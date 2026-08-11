"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowRight, Tag, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockBlogPosts, BlogPost } from "@/lib/mock-data";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    mockBlogPosts.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet)];
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return mockBlogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag =
        selectedTag === "All" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // Featured post
  const featuredPost = mockBlogPosts.find((p) => p.featured);

  // Regular posts (excluding featured)
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-300 relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="grid-bg-glow" />

      <div>
        <Navbar />

        <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/5 px-3 py-1 font-mono text-[10px] text-red-400">
              <span>&gt; DEVELOPER_BLOG</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white font-mono tracking-tight sm:text-4xl">
              Engineering Insights
            </h1>
            <p className="text-zinc-400 max-w-xl text-sm">
              Technical deep dives, career advice, and updates from the Omnikon
              Academy team.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-white/5 bg-[#070709] p-4 mb-8 space-y-4"
          >
            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, tutorials..."
                className="w-full rounded-lg border border-white/10 bg-[#0c0c0e] py-2.5 pl-10 pr-4 text-sm text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50 placeholder-zinc-600 transition-all font-mono"
              />
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-mono text-zinc-500 mr-2 self-center flex items-center gap-1.5">
                <Tag className="h-3 w-3" />
                TOPICS:
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-md px-2.5 py-1 text-[10px] font-mono border transition-all ${
                    selectedTag === tag
                      ? "border-red-500 bg-red-500/10 text-red-400 font-bold"
                      : "border-white/5 bg-[#08080a] text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tag === "All" ? "ALL_TOPICS" : tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Featured Post */}
          {featuredPost && selectedTag === "All" && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Link href={`/blog/${featuredPost.slug}`} className="block">
                <div className="glow-card rounded-2xl p-8 relative overflow-hidden group">
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-400 font-bold">
                      FEATURED
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-white font-mono mb-3 group-hover:text-red-400 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm text-zinc-400 max-w-2xl mb-4">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="font-mono">{featuredPost.author}</span>
                    <span>•</span>
                    <span className="font-mono">{featuredPost.publishedAt}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-6 text-xs font-mono text-red-400 group-hover:text-white transition-colors">
                    <span>READ_ARTICLE</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Blog Grid */}
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {(searchQuery || selectedTag !== "All"
                  ? filteredPosts
                  : regularPosts
                ).map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="glow-card rounded-xl p-6 h-full flex flex-col transition-all group">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                          <span className="text-zinc-700">•</span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {post.publishedAt}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white font-mono mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono text-zinc-500 bg-[#09090b] border border-white/5 px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                              <BookOpen className="h-3 w-3 text-red-500" />
                            </div>
                            <div>
                              <p className="text-[10px] font-mono text-white">
                                {post.author}
                              </p>
                              <p className="text-[8px] font-mono text-zinc-600">
                                {post.authorRole}
                              </p>
                            </div>
                          </div>

                          <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-xl border border-dashed border-white/10 bg-[#060608]/40 p-12 text-center max-w-md mx-auto"
              >
                <p className="text-sm font-mono text-zinc-500 mb-4">
                  NO_ARTICLES_FOUND
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("All");
                  }}
                  className="glow-btn-red rounded px-4 py-2 font-mono text-xs text-white"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
}
