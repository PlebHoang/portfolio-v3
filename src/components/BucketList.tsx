import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";

interface Goal {
  id: string;
  text: string;
  done: boolean;
}

const INITIAL_GOALS: Goal[] = [
  { id: "1", text: "Explore Amsterdam", done: true },
  { id: "2", text: "Try paragliding", done: true },
  { id: "3", text: "Introduce people to Phin Coffee", done: false },
  { id: "4", text: "Reach 10k followers", done: false },
  { id: "5", text: "Deploy self-hosted homelab infrastructure", done: false },
  { id: "6", text: "Backpack across Vietnam", done: false },
];

export const BucketList: React.FC = () => {
  // ponytail: client state only, backend persistence deferred
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [input, setInput] = useState("");

  const toggle = (id: string) => {
    setGoals(goals.map(g => (g.id === id ? { ...g, done: !g.done } : g)));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setGoals([...goals, { id: Date.now().toString(), text: input.trim(), done: false }]);
    setInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start border border-[#d4d4d0] bg-white/40 p-8 md:p-12 rounded-2xl">
      {/* Checkbox List */}
      <div className="lg:col-span-3 space-y-4">
        <span className="font-mono text-xs tracking-widest uppercase text-neutral-400 font-bold block">
          Khoi's Goals // Click to cross off
        </span>
        <div className="space-y-3 pt-2">
          {goals.map(g => (
            <label
              key={g.id}
              className="flex items-center gap-4 p-3.5 rounded-xl border border-[#d4d4d0]/80 bg-white/60 hover:bg-white cursor-pointer transition-all select-none"
            >
              <input
                type="checkbox"
                checked={g.done}
                onChange={() => toggle(g.id)}
                className="w-4 h-4 accent-black rounded cursor-pointer"
              />
              <span
                className={`font-sans text-base md:text-lg transition-all ${
                  g.done ? "line-through text-neutral-400" : "text-neutral-800 font-medium"
                }`}
              >
                {g.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Form */}
      <div className="lg:col-span-2 border border-[#d4d4d0] bg-white/80 p-6 md:p-8 rounded-2xl space-y-5">
        <div className="flex items-center gap-2 text-black">
          <Sparkles className="w-4 h-4" />
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest">Submit a Goal</h4>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            maxLength={80}
            required
            placeholder="Suggest a challenge..."
            className="w-full p-3.5 bg-white border border-[#d4d4d0] rounded-xl focus:border-black outline-none font-sans text-sm text-neutral-800 placeholder-neutral-400"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-black hover:bg-neutral-800 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-xl transition-colors cursor-pointer"
          >
            Add Goal <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
