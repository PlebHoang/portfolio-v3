import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomCursor } from "./CustomCursor";

export default function Newsletter() {
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[#F7F6F3] text-[#111111] selection:bg-black selection:text-white relative">
        <div className="pointer-events-none fixed inset-0 opacity-[0.018] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] z-40" />

        <header className="sticky top-0 w-full z-40 bg-[#F7F6F3]/80 backdrop-blur-md border-b border-[#d4d4d0]">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-wider hover:opacity-75 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              <span>Back Home</span>
            </Link>
            <span className="font-serif font-black text-xl tracking-tighter text-[#111111]">
              KH
            </span>
          </div>
        </header>

        <main className="max-w-3xl mx-auto px-6 md:px-10 py-24 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="font-display font-black text-5xl md:text-6xl uppercase tracking-tight">
              Thoughts & Grill-Me
            </h1>
            <p className="font-serif text-xl leading-relaxed text-neutral-600">
              A space for me to share my thoughts on engineering, building products, and navigating life in Bremen. Drop your email below to get notified when I post something new.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 md:p-12 border border-[#d4d4d0] bg-white/40 rounded-2xl shadow-sm"
          >
            <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 bg-white border border-[#d4d4d0] rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-sans text-sm"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-xs font-sans text-neutral-500 uppercase tracking-wider">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-12 border-t border-[#d4d4d0]"
          >
            <p className="text-sm font-sans text-neutral-500 text-center">
              No articles yet. Check back soon.
            </p>
          </motion.div>
        </main>
      </div>
    </>
  );
}
