/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Mail, CheckCircle2, Loader2, Sparkles } from "lucide-react";

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubjectType = "internship" | "collaboration" | "prototyping" | "greeting";

export const ContactDrawer: React.FC<ContactDrawerProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<SubjectType>("internship");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // ponytail: mailto fallback, add Formspree/serverless handler when needed
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail Coordinates: ${email}\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:hoangnguyenkhoi07@gmail.com?subject=${encodeURIComponent(`[Portfolio Outreach - ${subject}] ${name}`)}&body=${mailtoBody}`;
    
    // Tiny delay to make the loader state feel responsive before opening client
    setTimeout(() => {
      window.open(mailtoLink, "_blank");
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setSubject("internship");
    setMessage("");
    setIsSuccess(false);
  };

  const handleClose = () => {
    onClose();
    // Reset state after transition completes
    setTimeout(() => {
      resetForm();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-neutral-900 z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[600px] bg-[#F7F6F3] border-l border-[#d4d4d0] shadow-2xl z-50 flex flex-col overflow-hidden text-[#111111]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d4d4d0]">
              <span className="font-sans font-bold tracking-widest text-sm uppercase text-[#111111]">
                Contact / Initiate Dialogue
              </span>
              <button
                onClick={handleClose}
                className="p-2 rounded-full border border-[#d4d4d0] hover:border-black hover:text-black transition-colors group"
                aria-label="Close contact drawer"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col justify-between bg-[#F7F6F3]">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tight text-neutral-900">Let's build something real.</h2>
                      <p className="font-sans text-sm text-neutral-600 leading-relaxed">
                        Have an internship opportunity, a project idea, or a technical problem to solve? Send a note below or reach out directly at <a href="mailto:hoangnguyenkhoi07@gmail.com" className="underline font-bold text-black hover:opacity-80">hoangnguyenkhoi07@gmail.com</a>.
                      </p>
                    </div>

                    {/* Subject Selector Buttons */}
                    <div className="space-y-2">
                      <label className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-500">
                        Purpose of Outreach
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["internship", "collaboration", "prototyping", "greeting"] as SubjectType[]).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSubject(type)}
                            className={`p-3 border text-xs sm:text-sm font-sans font-bold rounded-xl text-left capitalize transition-all cursor-pointer ${
                              subject === type
                                ? "bg-black border-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)]"
                                : "bg-white/40 border-[#d4d4d0] text-neutral-800 hover:border-black"
                            }`}
                          >
                            {type === "internship" && "💼 Internship"}
                            {type === "collaboration" && "🔬 Research & Collab"}
                            {type === "prototyping" && "⚙️ Automation / Proto"}
                            {type === "greeting" && "☕ Just Say Hello"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-500">
                        Your Identity
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="E.g. Elena Rostova"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 border border-[#d4d4d0] rounded-xl bg-white/60 font-sans text-sm text-[#111111] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-neutral-400"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-500">
                        Digital Coordinates (Email)
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="E.g. elena@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border border-[#d4d4d0] rounded-xl bg-white/60 font-sans text-sm text-[#111111] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder-neutral-400"
                      />
                    </div>

                    {/* Message Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="font-sans font-bold text-xs tracking-widest uppercase text-neutral-500">
                        Narrative Details
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Describe your vision, scope, or timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-4 border border-[#d4d4d0] rounded-xl bg-white/60 font-sans text-sm text-[#111111] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none placeholder-neutral-400"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-black text-white font-sans font-bold text-sm tracking-widest uppercase rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:bg-neutral-300 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Transmitting System Data...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6 bg-[#F7F6F3]"
                  >
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                        className="w-16 h-16 bg-black rounded-full flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </motion.div>
                      <Sparkles className="w-6 h-6 text-black absolute -top-1 -right-1 animate-pulse" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-neutral-900">
                        Transmission Successful
                      </h3>
                      <p className="font-sans text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out, <strong className="text-black">{name}</strong>. Your message regarding <strong className="text-black">{subject}</strong> has been successfully registered. I will read and respond within 24 business hours.
                      </p>
                    </div>

                    <button
                      onClick={handleClose}
                      className="px-6 py-3 border border-[#d4d4d0] rounded-xl font-sans font-bold text-xs tracking-widest uppercase text-neutral-800 hover:border-black hover:text-black transition-all cursor-pointer"
                    >
                      Return to Workspace
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Coordinates Footer */}
              <div className="mt-8 pt-6 border-t border-[#d4d4d0] flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-neutral-500 uppercase tracking-widest gap-4">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-black" />
                  <span className="text-neutral-600">hoangnguyenkhoi07@gmail.com</span>
                </div>
                <div>
                  <span className="text-neutral-600">Bremen, Germany • +49 155 65196995</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
