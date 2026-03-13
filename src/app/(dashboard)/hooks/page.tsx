"use client";

import { useState } from "react";
import {
  Zap, Sparkles, Anchor, Quote, Copy, Check, CheckCircle2,
  Save, Edit3, Download, FlaskConical, AlertCircle, Filter,
  BarChart2, Target, Star
} from "lucide-react";

const FRAMEWORKS = [
  { id: "curiosity", label: "Curiosity Gap", color: "cyan" },
  { id: "contrarian", label: "Contrarian", color: "rose" },
  { id: "story", label: "Storytelling", color: "amber" },
  { id: "authority", label: "Authority", color: "violet" },
  { id: "fear", label: "Fear / FOMO", color: "orange" },
  { id: "list", label: "Listicle", color: "emerald" },
];

const PLATFORMS = ["YouTube", "TikTok", "Instagram", "LinkedIn", "Twitter / X"];
const TONES = ["Authority", "Relatable", "Energetic", "Witty", "Emotional", "Controversial"];

const MOCK_HOOKS = (topic: string) => [
  {
    hook: `Stop making this ONE mistake with ${topic} if you want results in 2024.`,
    viralScore: 92, retentionScore: 88, platform: "TikTok",
    framework: "Contrarian", tone: "Authority",
    reason: "Opens a pattern interrupt with a relatable mistake. High CTR on short-form.",
    breakdown: { curiosity: 88, clarity: 84, emotion: 91, platformFit: 89 },
  },
  {
    hook: `Here's a secret about ${topic} that 1% of creators know. I'm giving it away for free.`,
    viralScore: 89, retentionScore: 82, platform: "YouTube",
    framework: "Curiosity Gap", tone: "Relatable",
    reason: "Classic curiosity loop — creates strong desire to watch to the end.",
    breakdown: { curiosity: 95, clarity: 79, emotion: 74, platformFit: 85 },
  },
  {
    hook: `I tried ${topic} every single day for 30 days. Here's what actually happened.`,
    viralScore: 86, retentionScore: 91, platform: "YouTube",
    framework: "Storytelling", tone: "Relatable",
    reason: "Personal journey narratives outperform generic content by 3x in watch time.",
    breakdown: { curiosity: 82, clarity: 90, emotion: 88, platformFit: 82 },
  },
  {
    hook: `Every expert on ${topic} is lying to you. Here's the truth nobody will say.`,
    viralScore: 94, retentionScore: 79, platform: "TikTok",
    framework: "Contrarian", tone: "Controversial",
    reason: "High-conflict framing generates massive shares even from people who disagree.",
    breakdown: { curiosity: 90, clarity: 72, emotion: 96, platformFit: 91 },
  },
  {
    hook: `5 brutal truths about ${topic} that most people ignore (until it's too late).`,
    viralScore: 81, retentionScore: 85, platform: "LinkedIn",
    framework: "Listicle", tone: "Authority",
    reason: "Number-based hooks set expectations clearly, boosting completion rates.",
    breakdown: { curiosity: 78, clarity: 93, emotion: 76, platformFit: 80 },
  },
  {
    hook: `How I went from $0 to $10,000/month using just ${topic}. No shortcuts, no fluff.`,
    viralScore: 88, retentionScore: 93, platform: "YouTube",
    framework: "Authority", tone: "Energetic",
    reason: "Specific result + credibility signal = peak trust-building at the start.",
    breakdown: { curiosity: 86, clarity: 88, emotion: 82, platformFit: 94 },
  },
];

function getScoreColor(score: number) {
  if (score >= 88) return "text-emerald-400";
  if (score >= 75) return "text-yellow-400";
  return "text-orange-400";
}

function ViralBar({ score }: { score: number }) {
  const color = score >= 88 ? "from-emerald-500 to-cyan-500" : score >= 75 ? "from-yellow-500 to-orange-400" : "from-orange-500 to-red-400";
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
        <span className="text-gray-500">Viral Score</span>
        <span className={getScoreColor(score)}>{score}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function HookCard({ item, index }: { item: ReturnType<typeof MOCK_HOOKS>[0]; index: number }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(item.hook);

  return (
    <div className="group relative bg-[#0d1424] border border-white/[0.06] hover:border-cyan-500/30 rounded-[20px] p-6 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]">
      {/* Top row: Tags + Actions */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-[9px] font-black uppercase tracking-widest border border-cyan-500/20">
            {item.framework}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-gray-400 text-[9px] font-bold uppercase tracking-widest border border-white/5">
            {item.tone}
          </span>
        </div>
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => { navigator.clipboard.writeText(editVal); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-transparent hover:border-white/10 transition-all"
            title="Copy"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
            className={`p-1.5 rounded-lg border transition-all ${saved ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border-transparent hover:border-white/10"}`}
            title="Save to Library"
          >
            {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Hook Text */}
      <div className="flex-1 mb-6 relative cursor-text" onClick={() => !editing && setEditing(true)}>
        <Quote className="w-7 h-7 text-cyan-500/10 absolute -top-2 -left-2 pointer-events-none" />
        {editing ? (
          <div className="relative">
            <textarea
              value={editVal}
              onChange={(e) => setEditVal(e.target.value)}
              autoFocus
              className="w-full bg-black/40 border border-cyan-500/30 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 min-h-[100px] resize-none leading-relaxed"
            />
            <button
              onClick={(e) => { e.stopPropagation(); setEditing(false); }}
              className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <p className="text-[15px] font-medium text-gray-200 leading-[1.65] pl-2 group-hover:text-white transition-colors">
            {editVal}
          </p>
        )}
        {!editing && (
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider flex items-center gap-1">
              <Edit3 className="w-2.5 h-2.5 text-cyan-600" /> Click to edit
            </span>
          </div>
        )}
      </div>

      {/* Analytics */}
      <div className="mt-auto space-y-4">
        <ViralBar score={item.viralScore} />

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/15 text-[10px] font-bold text-emerald-300 uppercase tracking-wide">
            Retention {item.retentionScore}%
          </span>
          <span className="px-2 py-1 rounded-md bg-violet-500/10 border border-violet-500/15 text-[10px] font-bold text-violet-300 uppercase tracking-wide">
            Best: {item.platform}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-500">
          <div className="rounded-lg bg-black/25 border border-white/5 p-2">Curiosity {item.breakdown.curiosity}%</div>
          <div className="rounded-lg bg-black/25 border border-white/5 p-2">Clarity {item.breakdown.clarity}%</div>
          <div className="rounded-lg bg-black/25 border border-white/5 p-2">Emotion {item.breakdown.emotion}%</div>
          <div className="rounded-lg bg-black/25 border border-white/5 p-2">Fit {item.breakdown.platformFit}%</div>
        </div>

        <div className="p-3 rounded-xl bg-black/30 border border-white/[0.04] text-[11px] text-gray-500 leading-relaxed italic">
          <span className="text-gray-600 font-black not-italic uppercase tracking-tighter mr-1 text-[9px]">Reason:</span>
          {item.reason}
        </div>
      </div>
    </div>
  );
}

export default function HooksGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [tone, setTone] = useState("Authority");
  const [count, setCount] = useState(6);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["curiosity", "contrarian"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof MOCK_HOOKS>>([]);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"generated" | "saved">("generated");

  const toggleFramework = (id: string) => {
    setSelectedFrameworks(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const loadSample = () => {
    setTopic("How I grew my YouTube channel from 0 to 100k subscribers in 6 months with zero ad spend.");
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setStep(2);
    setResults([]);
    setTimeout(() => {
      setResults(MOCK_HOOKS(topic).slice(0, count));
      setStep(3);
      setLoading(false);
      setActiveTab("generated");
    }, 2500);
  };

  const steps = [
    { id: 1, label: "Topic & Settings" },
    { id: 2, label: "Analyzing" },
    { id: 3, label: "Hook Factory" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col pt-2 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 px-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Anchor className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Hook Optimizer</h1>
            <p className="text-sm text-gray-400 mt-0.5">Craft scroll-stopping hooks using proven viral frameworks.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={loadSample}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/20 transition-colors"
          >
            <FlaskConical className="w-3.5 h-3.5" /> Demo Fill
          </button>
          {/* Step Indicator */}
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
            <span className="text-gray-300 font-medium">2 Credits</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 px-1">

        {/* LEFT — Config Panel */}
        <div className="lg:col-span-4 flex flex-col">
          <form onSubmit={handleGenerate} className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl p-6 space-y-5">

            {/* Topic Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">What is your video about?</label>
                <div className="flex gap-2">
                  <button type="button" onClick={loadSample} className="text-[10px] text-cyan-400 font-bold px-2 py-1 bg-cyan-500/10 rounded-md hover:bg-cyan-500/20 transition-colors">Sample</button>
                  <button type="button" onClick={() => setTopic("")} className="text-[10px] text-gray-500 font-bold px-2 py-1 bg-white/5 rounded-md hover:bg-white/10 transition-colors">Clear</button>
                </div>
              </div>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How I grew my newsletter to 50,000 subscribers in 90 days without paid ads..."
                className="w-full h-28 px-4 py-3 rounded-xl bg-[#030712] border border-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/40 resize-none transition-colors"
                required
              />
            </div>

            {/* Framework Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Hook Frameworks</label>
              <div className="grid grid-cols-2 gap-2">
                {FRAMEWORKS.map((fw) => {
                  const active = selectedFrameworks.includes(fw.id);
                  return (
                    <button
                      key={fw.id}
                      type="button"
                      onClick={() => toggleFramework(fw.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                        active
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                          : "bg-[#030712] border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
                      }`}
                    >
                      {fw.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Platform + Tone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#030712] border border-white/5 text-white text-sm focus:outline-none focus:border-cyan-500/40 appearance-none transition-colors"
                >
                  {PLATFORMS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
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
            </div>

            {/* Hook Count Slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-medium text-gray-400">Number of Hooks</label>
                <span className="text-xs font-bold text-cyan-400">{count}</span>
              </div>
              <input
                type="range" min={4} max={10} value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full accent-cyan-500 h-1.5 rounded-full"
              />
              <div className="flex justify-between text-[10px] text-gray-600">
                <span>4</span><span>10</span>
              </div>
            </div>

            {/* Generate Button */}
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
                    <span>Generating Hooks...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white/20" />
                    <span>Generate Hooks</span>
                    <span className="flex items-center gap-1 bg-black/30 text-xs px-2 py-0.5 rounded-md text-cyan-100 font-medium">
                      <Zap className="w-3 h-3 fill-current" /> 2
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT — Results */}
        <div className="lg:col-span-8 flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border border-white/[0.06] rounded-2xl text-center px-8 min-h-[400px]">
              <div className="w-14 h-14 border-[3px] border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-6" />
              <p className="text-white font-semibold text-lg mb-2">Generating Hook Variations...</p>
              <p className="text-gray-500 text-sm max-w-xs">
                Applying {selectedFrameworks.length} frameworks and optimizing for {platform}
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="flex-1 flex flex-col">
              {/* Tab Bar */}
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex gap-1 bg-[#0a0f1a] p-1 rounded-xl border border-white/5">
                  {(["generated", "saved"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                        activeTab === tab
                          ? "bg-white/10 text-white border border-white/10"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      {tab} {tab === "generated" && <span className="ml-1 bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded text-[10px]">{results.length}</span>}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { navigator.clipboard.writeText(results.map(r => r.hook).join("\n\n---\n\n")); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy All
                  </button>
                  <button
                    onClick={() => { setResults([]); setStep(1); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Generate More
                  </button>
                </div>
              </div>

              {/* Hook Cards Grid */}
              <div className="flex-1 p-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-4">
                  {results.map((item, i) => (
                    <HookCard key={i} item={item} index={i} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border-2 border-dashed border-white/[0.07] rounded-2xl text-center px-12 py-16">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Anchor className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">The Hook Factory</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">
                Enter your concept, pick frameworks, and generate A/B-ready hook variants with retention scoring.
              </p>

              <div className="w-full max-w-md text-left bg-[#030712] border border-white/5 rounded-xl p-4 mb-6">
                <div className="text-[10px] text-cyan-400 font-black uppercase tracking-wider mb-2">Example Output</div>
                <p className="text-sm text-gray-300 italic">
                  &quot;You have been told waking up at 5AM is the secret to success. Here is why that quietly kills your output.&quot;
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase font-bold">Contrarian</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase font-bold">Viral Score 94%</span>
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
