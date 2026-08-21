import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle2, Loader2, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomCursor } from "./CustomCursor";

const NEWSLETTER_API_URL = import.meta.env.VITE_NEWSLETTER_API_URL || "";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      action: "newsletter",
      email: email.trim(),
      timestamp: new Date().toISOString(),
      source: "newsletter_page",
    };

    if (!NEWSLETTER_API_URL) {
      // Local simulation when no backend endpoint is configured
      setTimeout(() => {
        setStatus("success");
        setEmail("");
      }, 700);
      return;
    }

    try {
      await fetch(NEWSLETTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        mode: "no-cors",
      });

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setStatus("error");
      setErrorMessage("Unable to connect to server. Please try again.");
    }
  };

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
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 text-center py-4"
                >
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900">
                      You're on the list.
                    </h3>
                    <p className="font-sans text-sm text-neutral-600">
                      Thanks for subscribing. I'll send an update whenever new engineering notes or essays drop.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setEmail("");
                    }}
                    className="mt-2 text-xs font-mono font-bold uppercase underline text-neutral-500 hover:text-black transition-colors cursor-pointer"
                  >
                    Subscribe another address
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "submitting"}
                      className="flex-1 px-4 py-3 bg-white border border-[#d4d4d0] rounded-xl focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all font-sans text-base sm:text-sm disabled:opacity-50"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="px-6 py-3 bg-black text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Subscribe</span>
                        </>
                      )}
                    </button>
                  </div>

                  {status === "error" && (
                    <p className="text-xs font-sans text-rose-600 font-bold">
                      {errorMessage || "Submission failed. Please try again."}
                    </p>
                  )}

                  <p className="text-xs font-sans text-neutral-500 uppercase tracking-wider">
                    No spam. Unsubscribe anytime.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
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
