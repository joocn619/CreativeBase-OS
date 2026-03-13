"use client";

import { useState } from "react";
import {
  PenTool, Sparkles, Zap, FlaskConical,
  Copy, Check, CheckCircle2, Save, Edit3
} from "lucide-react";

const SCRIPT_LENGTHS = [
  { id: "shorts", label: "Shorts / Reels", duration: "< 60 sec" },
  { id: "standard", label: "Standard YouTube", duration: "3–5 min" },
  { id: "deep", label: "Deep Dive", duration: "8–10 min" },
  { id: "masterclass", label: "Masterclass / VSL", duration: "15+ min" },
];

const TONES = ["Educational & Engaging", "High Energy", "Storytelling", "Authoritative"];
const STRUCTURES = [
  { id: "hook-problem-solution", label: "Hook → Problem → Solution" },
  { id: "listicle", label: "Listicle / Countdown" },
  { id: "story", label: "Story Arc" },
  { id: "tutorial", label: "Tutorial / How-To" },
];

const SAMPLE_TOPIC = "How to start a SaaS business with $0 using only AI tools and no-code platforms.";

function generateMockScript(topic: string, length: string, tone: string, structure: string) {
  return `[0:00–0:12] 🎬 HOOK — ${tone.toUpperCase()}
"${topic.slice(0, 80)}... and nobody is telling you the real truth about this."

[0:12–0:45] ❓ THE PROBLEM
Most people approach this completely backwards. They focus on tactics before ever validating their core idea — and that's why 90% fail in the first 6 months. Today, you're not going to be one of them.

[0:45–2:30] 💡 THE CORE IDEA (${structure})
Here's what actually works. Break it down into 3 pillars:

  → PILLAR 1: Validate before building
    Don't spend 6 months building — spend 6 days testing. One landing page, one traffic source, one irresistible offer. Done.

  → PILLAR 2: Automate your acquisition
    The moment you step away from manual outreach is the moment you start scaling. Build systems, not habits.

  → PILLAR 3: Measure ruthlessly
    Track the ONE metric that matters. Not vanity metrics — conversion rates. Everything else is noise.

[2:30–3:20] 📖 STORY / SOCIAL PROOF
I made every mistake I just described. I spent 4 months building a product that nobody wanted, with no validation, burning cash on ads. The pivot that saved me? I stopped building and started listening.

[3:20–3:50] 🔁 RECAP + CALL TO ACTION
Today you learned:
✅ Why validation beats building
✅ How to automate your traffic
✅ The one metric you should track

If this changed how you think about ${topic.slice(0, 40)}, smash the like button. Subscribe for more frameworks like this every week. And grab the free template I mentioned — link in the description. See you in the next one. 🔥`;
}

export default function ScriptsGenerator() {
  const [topic, setTopic] = useState("");
  const [selectedLength, setSelectedLength] = useState("standard");
  const [tone, setTone] = useState("Educational & Engaging");
  const [structure, setStructure] = useState("hook-problem-solution");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState("");

  const loadSample = () => setTopic(SAMPLE_TOPIC);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setStep(2);
    setResult(null);
    setTimeout(() => {
      const script = generateMockScript(topic, selectedLength, tone, structure);
      setResult(script);
      setEditVal(script);
      setStep(3);
      setLoading(false);
    }, 3000);
  };

  const steps = [
    { id: 1, label: "Topic & Style" },
    { id: 2, label: "Writing" },
    { id: 3, label: "Script Ready" },
  ];

  const currentLength = SCRIPT_LENGTHS.find(l => l.id === selectedLength);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col pt-2 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header — amber icon, same as Hook Generator */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 px-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <PenTool className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Video Script Writer</h1>
            <p className="text-sm text-gray-400 mt-0.5">Generate full structured scripts for YouTube, VSLs, and long-form video.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={loadSample} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/20 transition-colors">
            <FlaskConical className="w-3.5 h-3.5" /> Demo Fill
          </button>
          {/* Step Indicator — cyan, same as Hook Generator */}
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${step >= s.id ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20" : "bg-white/5 text-gray-500 border border-white/5"}`}>
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${step >= s.id ? "bg-cyan-500 text-white" : "bg-white/10 text-gray-500"}`}>{s.id}</span>
                  {s.label}
                </div>
                {i < steps.length - 1 && <div className="w-3 h-px bg-white/10" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span className="text-gray-300 font-medium">5 Credits</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 px-1">

        {/* LEFT — Config */}
        <div className="lg:col-span-4 flex flex-col">
          <form onSubmit={handleGenerate} className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl p-6 space-y-5">

            {/* Topic */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Video Topic / Title</label>
                <div className="flex gap-2">
                  <button type="button" onClick={loadSample} className="text-[10px] text-cyan-400 font-bold px-2 py-1 bg-cyan-500/10 rounded-md hover:bg-cyan-500/20 transition-colors">Sample</button>
                  <button type="button" onClick={() => setTopic("")} className="text-[10px] text-gray-500 font-bold px-2 py-1 bg-white/5 rounded-md hover:bg-white/10 transition-colors">Clear</button>
                </div>
              </div>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How to build a SaaS from $0 using AI tools..."
                className="w-full h-28 px-4 py-3 rounded-xl bg-[#030712] border border-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 resize-none transition-colors"
                required
              />
            </div>

            {/* Script Length */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Script Length</label>
              <div className="grid grid-cols-2 gap-2">
                {SCRIPT_LENGTHS.map((len) => (
                  <button
                    key={len.id}
                    type="button"
                    onClick={() => setSelectedLength(len.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedLength === len.id
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                        : "bg-[#030712] border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                    }`}
                  >
                    <div className="text-[11px] font-semibold">{len.label}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedLength === len.id ? "text-cyan-400/70" : "text-gray-600"}`}>{len.duration}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Structure */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Script Structure</label>
              <div className="space-y-1.5">
                {STRUCTURES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStructure(s.id)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border text-left transition-all ${
                      structure === s.id
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 font-semibold"
                        : "bg-[#030712] border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030712] border border-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/40 appearance-none transition-colors"
              >
                {TONES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Generate Button — same cyan→violet gradient as Hook Generator */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2.5 text-sm ${
                  loading || !topic.trim()
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-600 to-violet-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Writing Script...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white/20" />
                    <span>Generate Script</span>
                    <span className="flex items-center gap-1 bg-black/30 text-xs px-2 py-0.5 rounded-md text-cyan-100 font-medium">
                      <Zap className="w-3 h-3 fill-current" /> 5
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT — Script Output */}
        <div className="lg:col-span-8 flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border border-white/[0.06] rounded-2xl text-center px-8 min-h-[400px]">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-[3px] border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <p className="text-white font-semibold text-lg mb-2">Writing your script...</p>
              <p className="text-gray-500 text-sm max-w-xs">
                Drafting intro, structuring {currentLength?.label}, and planning the CTA.
              </p>
              <div className="w-full max-w-sm mt-8 space-y-2">
                {[100, 80, 90, 60, 85].map((w, i) => (
                  <div key={i} className="h-2.5 bg-white/5 rounded-full animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          ) : result ? (
            <div className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl">
              {/* Top Bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold text-white">Generated Script</h3>
                  <span className="text-[10px] bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                    {currentLength?.label} · {currentLength?.duration}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${saved ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20"}`}
                  >
                    {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    {saved ? "Saved!" : "Save"}
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(editing ? editVal : result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${copied ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-500/20"}`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => setEditing(!editing)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${editing ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"}`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {editing ? "Done Editing" : "Edit"}
                  </button>
                </div>
              </div>

              {/* Script Content */}
              <div className="flex-1">
                {editing ? (
                  <textarea
                    value={editVal}
                    onChange={(e) => setEditVal(e.target.value)}
                    className="w-full min-h-[500px] p-6 bg-transparent text-gray-300 text-sm font-mono leading-[1.8] focus:outline-none resize-none"
                  />
                ) : (
                  <div className="p-6">
                    <pre className="text-gray-300 text-sm font-mono leading-[1.8] whitespace-pre-wrap">{result}</pre>
                  </div>
                )}
              </div>

              {/* Footer Stats */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center gap-6 shrink-0 bg-white/[0.01]">
                <span className="text-[11px] text-gray-500">Words: <span className="text-gray-300 font-semibold">{result.split(/\s+/).length}</span></span>
                <span className="text-[11px] text-gray-500">Est. Time: <span className="text-gray-300 font-semibold">{currentLength?.duration}</span></span>
                <span className="text-[11px] text-gray-500">Structure: <span className="text-cyan-400 font-semibold">{STRUCTURES.find(s => s.id === structure)?.label}</span></span>
              </div>
            </div>
          ) : (
            // Empty State — same style as Hook Generator
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border-2 border-dashed border-white/[0.07] rounded-2xl text-center px-12 py-16">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <PenTool className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Write</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">
                Provide a topic on the left and our AI will craft a complete, engagement-mapped script — frame by frame.
              </p>

              <div className="w-full max-w-md text-left bg-[#030712] border border-white/5 rounded-xl p-4 mb-6">
                <div className="text-[10px] text-cyan-400 font-black uppercase tracking-wider mb-2">Example Output Preview</div>
                <p className="text-sm text-gray-300 font-mono">
                  <span className="text-cyan-400">[0:00–0:12]</span> 🎬 HOOK<br />
                  <span className="text-gray-400 italic">&quot;Nobody tells you this one crucial step...&quot;</span>
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase font-bold">Timestamped</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase font-bold">Editable inline</span>
                </div>
              </div>

              <button
                onClick={loadSample}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors text-sm"
              >
                Try sample topic
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
