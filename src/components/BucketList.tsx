import React, { useState, useEffect } from "react";
import { LayoutGrid, Cpu, Mountain, Compass, CheckCircle2, MessageSquarePlus, X, Plus, Loader2 } from "lucide-react";

const SHEET_API_URL = import.meta.env.VITE_SHEET_API_URL || "";

interface Goal {
  id: string;
  title: string;
  category: "hardware" | "adventure" | "mastery" | "community";
  done: boolean;
  desc: string;
  author: string;
}

const INITIAL_GOALS: Goal[] = [
  { id: "1", title: "Explore Amsterdam", category: "adventure", done: true, desc: "Walked the canals, studied local bicycle logistics, and explored historic cultural landmarks.", author: "Khoi" },
  { id: "2", title: "Build a life-sized functional R2D2 from scratch", category: "hardware", done: false, desc: "Complete 3D-printed chassis, custom Arduino motor driver, precision dome rotation, and authentic sound cues.", author: "Khoi" },
  { id: "3", title: "3D design and build a working FPV drone", category: "hardware", done: false, desc: "Custom lightweight frame modeled in Fusion 360, brushless motors, flight controller tuning, and low-latency video feed.", author: "Khoi" },
  { id: "4", title: "Build systems that fully self-fund homelab hardware", category: "hardware", done: false, desc: "Deploy autonomous software services that generate enough recurring value to cover all home server hardware and power.", author: "Khoi" },
  { id: "5", title: "Complete a Marathon", category: "adventure", done: false, desc: "42.195 km road race targeting a sub-4 hour finish at a European major marathon.", author: "Khoi" },
  { id: "6", title: "Summit a 4,000m+ mountain peak", category: "adventure", done: false, desc: "High alpine ascent in the European Alps requiring elevation conditioning and technical navigation.", author: "Khoi" },
  { id: "7", title: "Camp under the Northern Lights with loved ones", category: "adventure", done: false, desc: "Winter camping expedition in Northern Norway or Iceland under active Aurora Borealis conditions.", author: "Khoi" },
  { id: "8", title: "Try skydiving / parachuting", category: "adventure", done: false, desc: "High-altitude tandem jump from 4,000 meters with freefall acceleration.", author: "Khoi" },
  { id: "9", title: "Complete an Ironman triathlon", category: "adventure", done: false, desc: "Full long-distance multi-sport: 3.8 km swim, 180 km cycling, and a 42.2 km marathon run.", author: "Khoi" },
  { id: "10", title: "Backpack around the world", category: "adventure", done: false, desc: "Cross-continental budget backpacking expedition exploring global cultures and wilderness trails.", author: "Khoi" },
  { id: "11", title: "Learn to think in pure mathematics & first principles", category: "mastery", done: false, desc: "Master discrete mathematics, formal proof structures, and rigorous first-principles reasoning.", author: "Khoi" },
  { id: "12", title: "Secure high-impact engineering work with top compensation", category: "mastery", done: false, desc: "Land demanding engineering roles in operations, hardware prototyping, or automation systems.", author: "Khoi" },
  { id: "13", title: "Speak at an international tech / IE conference", category: "mastery", done: false, desc: "Present original research or applied engineering architecture on stage at a major industry gathering.", author: "Khoi" },
  { id: "14", title: "Open a charity fund", category: "mastery", done: false, desc: "Establish an independent fund providing STEM robotics kits and tools for high-school builders.", author: "Khoi" },
  { id: "15", title: "Introduce people to authentic Vietnamese Phin Coffee", category: "mastery", done: false, desc: "Host interactive campus brewing workshops sharing the heritage and slow-drip craft of Vietnamese Phin Coffee.", author: "Khoi" },
  { id: "16", title: "3D design a dedicated FPV flight simulator station", category: "community", done: false, desc: "Community quest: Build a custom ergonomic FPV sim rig with dedicated gimbal sticks.", author: "David & Aly · Maker's Club @ Constructor University" }
];

export const BucketList: React.FC = () => {
  // ponytail: client-side memory store, database persistence deferred
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [category, setCategory] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string>("2");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inputTitle, setInputTitle] = useState("");
  const [inputCategory, setInputCategory] = useState<"hardware" | "adventure" | "mastery">("hardware");
  const [inputAuthor, setInputAuthor] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (!SHEET_API_URL) return;

    const controller = new AbortController();
    fetch(SHEET_API_URL, { signal: controller.signal })
      .then(res => res.json())
      .then(res => {
        const rows = Array.isArray(res) ? res : res.data || [];
        if (rows.length === 0) return;

        const communityGoals: Goal[] = rows.map((r: any) => ({
          id: String(r.id || Date.now()),
          title: String(r.title),
          category: "community" as const,
          done: r.done === true || String(r.done).toLowerCase() === "true",
          desc: String(r.desc || `Community challenge suggested by ${r.author || "Visitor"}`),
          author: String(r.author || "Community Visitor"),
        }));

        setGoals(prev => {
          const existingIds = new Set(prev.map(g => g.id));
          const uniqueNew = communityGoals.filter(g => !existingIds.has(g.id));
          return [...prev, ...uniqueNew];
        });
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const toggleDone = (id: string) => {
    setGoals(goals.map(g => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  const handlePropose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim() || submitStatus === "sending") return;

    const submission = {
      id: Date.now().toString(),
      title: inputTitle.trim(),
      category: inputCategory,
      desc: `Community suggestion submitted by ${inputAuthor.trim() || "Visitor"} for ${inputCategory}.`,
      author: inputAuthor.trim() || "Visitor"
    };

    if (!SHEET_API_URL) {
      const newGoal: Goal = {
        ...submission,
        category: "community",
        done: false
      };
      setGoals(prev => [...prev, newGoal]);
      setSelectedId(newGoal.id);
      setCategory("community");
      setInputTitle("");
      setInputAuthor("");
      setIsModalOpen(false);
      return;
    }

    setSubmitStatus("sending");
    try {
      await fetch(SHEET_API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(submission),
        mode: "no-cors"
      });

      setSubmitStatus("sent");
      setInputTitle("");
      setInputAuthor("");
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus("idle");
      }, 2200);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const getTabCount = (tabId: string) => {
    if (tabId === "all") return goals.length;
    if (tabId === "done") return goals.filter(g => g.done).length;
    return goals.filter(g => g.category === tabId).length;
  };

  const filteredGoals = category === "done" 
    ? goals.filter(g => g.done) 
    : category === "all" 
    ? goals 
    : goals.filter(g => g.category === category);

  const selectedGoal = goals.find(g => g.id === selectedId) || goals[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT PANE: Category Tabs & Goals List */}
      <div className="lg:col-span-7 bg-white/70 border border-[#d4d4d0] rounded-2xl p-5 space-y-4 shadow-sm backdrop-blur-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin border-b border-[#d4d4d0]/60">
          {[
            { id: "all", label: "All", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            { id: "hardware", label: "Hardware", icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: "adventure", label: "Adventure", icon: <Mountain className="w-3.5 h-3.5" /> },
            { id: "mastery", label: "Mastery", icon: <Compass className="w-3.5 h-3.5" /> },
            { id: "done", label: "Done", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
            { id: "community", label: "Community", icon: <MessageSquarePlus className="w-3.5 h-3.5" /> },
          ].map(tab => {
            const count = getTabCount(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-all ${
                  category === tab.id
                    ? "bg-black text-white"
                    : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono ${category === tab.id ? "text-neutral-300" : "text-neutral-400"}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Goal List Viewport */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-2 scrollbar-thin">
          {filteredGoals.length === 0 ? (
            <div className="p-6 text-center text-neutral-400 text-xs font-mono">No items in this tab.</div>
          ) : (
            filteredGoals.map(g => {
              const isSelected = g.id === selectedId;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedId(g.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                    isSelected
                      ? "border-black bg-white shadow-sm ring-1 ring-black/5"
                      : "border-[#d4d4d0]/80 bg-white/40 hover:bg-white hover:border-black"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={g.done}
                      onChange={() => toggleDone(g.id)}
                      onClick={e => e.stopPropagation()}
                      className="w-4 h-4 accent-black rounded cursor-pointer"
                    />
                    <span
                      className={`font-medium transition-all ${
                        g.done
                          ? "line-through text-neutral-400"
                          : isSelected
                          ? "text-black font-bold"
                          : "text-neutral-800"
                      }`}
                    >
                      {g.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-200/70 text-neutral-700 flex-shrink-0">
                    {g.category}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT PANE: Spotlight Card & Propose Box */}
      <div className="lg:col-span-5 space-y-4">
        {/* Spotlight Card */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between min-h-[260px]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold px-2 py-0.5 bg-neutral-100 rounded">
                {selectedGoal?.category}
              </span>
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  selectedGoal?.done
                    ? "bg-neutral-900 text-white border-black"
                    : "bg-neutral-100 text-neutral-800 border-neutral-300"
                }`}
              >
                {selectedGoal?.done ? "✓ Completed" : "In Progress"}
              </span>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-900 tracking-tight uppercase leading-tight">
              {selectedGoal?.title}
            </h3>

            <p className="text-xs text-neutral-600 leading-relaxed font-sans pt-1">
              {selectedGoal?.desc}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-[#d4d4d0] flex items-center justify-between">
            <span className="text-[10px] font-mono text-neutral-400">Attribution</span>
            <span className="text-xs font-bold text-neutral-800">
              {selectedGoal?.author === "Khoi" ? "Personal Milestone" : `Suggested by ${selectedGoal?.author} (Community)`}
            </span>
          </div>
        </div>

        {/* Propose Challenge Box */}
        <div className="border-2 border-dashed border-black bg-white/40 rounded-2xl p-5 flex items-center justify-between gap-4 hover:bg-white transition-all">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-black font-bold text-xs uppercase tracking-wider">
              <Plus className="w-4 h-4" />
              <span>Suggest a Challenge</span>
            </div>
            <p className="text-[11px] text-neutral-500">Have a crazy build or endurance quest? Propose it.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            + Propose
          </button>
        </div>
      </div>

      {/* Propose Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black rounded-2xl p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between border-b border-[#d4d4d0] pb-3">
              <h3 className="font-display font-black text-base uppercase tracking-tight">Propose a Challenge</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-black font-bold text-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePropose} className="space-y-3 pt-1">
              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">Goal / Quest</label>
                <input
                  type="text"
                  required
                  value={inputTitle}
                  onChange={e => setInputTitle(e.target.value)}
                  placeholder="e.g. 3D design an FPV simulator rig"
                  className="w-full p-2.5 text-xs border border-[#d4d4d0] rounded-xl outline-none focus:border-black bg-[#FAF9F6]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">Category</label>
                <select
                  value={inputCategory}
                  onChange={e => setInputCategory(e.target.value as any)}
                  className="w-full p-2.5 text-xs border border-[#d4d4d0] rounded-xl outline-none focus:border-black bg-[#FAF9F6]"
                >
                  <option value="hardware">Hardware & Robotics</option>
                  <option value="adventure">Adventure & Endurance</option>
                  <option value="mastery">Systems & Mastery</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  value={inputAuthor}
                  onChange={e => setInputAuthor(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full p-2.5 text-xs border border-[#d4d4d0] rounded-xl outline-none focus:border-black bg-[#FAF9F6]"
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus === "sending" || submitStatus === "sent"}
                className={`w-full py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  submitStatus === "sent"
                    ? "bg-emerald-700 text-white"
                    : submitStatus === "error"
                    ? "bg-rose-700 text-white"
                    : "bg-black text-white hover:bg-neutral-800"
                }`}
              >
                {submitStatus === "sending" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>
                  {submitStatus === "sending"
                    ? "Submitting for Review..."
                    : submitStatus === "sent"
                    ? "✓ Quest Sent for Approval!"
                    : submitStatus === "error"
                    ? "Submission Failed · Try Again"
                    : "Submit Challenge"}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

