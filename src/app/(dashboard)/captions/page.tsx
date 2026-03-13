"use client";

import { useState } from "react";
import {
  MessageSquare, Sparkles, Zap, FlaskConical, Hash, Globe,
  Copy, Check, CheckCircle2, Save, Edit3, Star, BarChart2
} from "lucide-react";

const PLATFORMS = [
  { id: "instagram-reels", label: "Instagram Reels", emoji: "📸" },
  { id: "instagram-post", label: "Instagram Post", emoji: "🖼️" },
  { id: "tiktok", label: "TikTok", emoji: "🎵" },
  { id: "linkedin", label: "LinkedIn", emoji: "💼" },
  { id: "twitter", label: "Twitter / X", emoji: "𝕏" },
];

const TONES = ["Hype & Energetic", "Conversational", "Professional", "Witty & Fun", "Emotional"];
const CTA_STYLES = [
  { id: "link-in-bio", label: "Link in Bio" },
  { id: "comment", label: "Comment to Enter" },
  { id: "tag-friend", label: "Tag a Friend" },
  { id: "none", label: "No CTA" },
];

const SAMPLE_CONTEXT = "Just launched our dark mode feature after 6 months of development. Incredibly proud of the team.";

function generateMockCaption(context: string, platform: string, tone: string, hashtags: boolean, cta: string) {
  const ctaMap: Record<string, string> = {
    "link-in-bio": "Link in bio to get yours now. 👇",
    "comment": "Drop a 🙌 in the comments if this resonates!",
    "tag-friend": "Tag someone who needs to see this! 👇",
    "none": "",
  };

  const lines = [
    `🚀 We just did the thing! ${context}`,
    "",
    "Six months. Hundreds of iterations. Thousands of hours of feedback. And here we are.",
    "",
    "Here's what we built and why it matters to you:",
    "→ Designed from the ground up for focus",
    "→ 60% reduction in eye strain after hours of work",
    "→ Feels *premium*. Like, actually premium.",
    "",
    "We didn't ship this until it was perfect — and now it finally is.",
    "",
    ctaMap[cta] || "",
    "",
    hashtags ? "#darkmode #productlaunch #saas #buildinpublic #startup #design #ux #tech" : "",
  ].filter((l, i) => !(l === "" && i === 0));

  return lines.join("\n").trim();
}

export default function CaptionsGenerator() {
  const [context, setContext] = useState("");
  const [platform, setPlatform] = useState("instagram-reels");
  const [tone, setTone] = useState("Conversational");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [ctaStyle, setCtaStyle] = useState("link-in-bio");
  const [emojiDensity, setEmojiDensity] = useState(2); // 1-3
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState("");

  const loadSample = () => setContext(SAMPLE_CONTEXT);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context.trim()) return;
    setLoading(true);
    setStep(2);
    setResult(null);
    setTimeout(() => {
      const caption = generateMockCaption(context, platform, tone, includeHashtags, ctaStyle);
      setResult(caption);
      setEditVal(caption);
      setStep(3);
      setLoading(false);
    }, 2000);
  };

  const steps = [
    { id: 1, label: "Context & Style" },
    { id: 2, label: "Writing" },
    { id: 3, label: "Caption Ready" },
  ];

  const currentPlatform = PLATFORMS.find(p => p.id === platform);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col pt-2 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 px-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Smart Caption Writer</h1>
            <p className="text-sm text-gray-400 mt-0.5">Generate algorithm-friendly, engagement-boosting captions for any platform.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={loadSample} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold hover:bg-violet-500/20 transition-colors">
            <FlaskConical className="w-3.5 h-3.5" /> Demo Fill
          </button>
          {/* Step Indicator */}
          <div className="flex items-center gap-1">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${step >= s.id ? "bg-pink-500/15 text-pink-400 border border-pink-500/20" : "bg-white/5 text-gray-500 border border-white/5"}`}>
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${step >= s.id ? "bg-pink-500 text-white" : "bg-white/10 text-gray-500"}`}>{s.id}</span>
                  {s.label}
                </div>
                {i < steps.length - 1 && <div className="w-3 h-px bg-white/10" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs">
            <Zap className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span className="text-gray-300 font-medium">1 Credit</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 px-1">

        {/* LEFT — Config */}
        <div className="lg:col-span-4 flex flex-col">
          <form onSubmit={handleGenerate} className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl p-6 space-y-5">

            {/* Context */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">What is the post about?</label>
                <div className="flex gap-2">
                  <button type="button" onClick={loadSample} className="text-[10px] text-pink-400 font-bold px-2 py-1 bg-pink-500/10 rounded-md hover:bg-pink-500/20 transition-colors">Sample</button>
                  <button type="button" onClick={() => setContext("")} className="text-[10px] text-gray-500 font-bold px-2 py-1 bg-white/5 rounded-md hover:bg-white/10 transition-colors">Clear</button>
                </div>
              </div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g. Just launched our new dark mode feature after months of hard work..."
                className="w-full h-24 px-4 py-3 rounded-xl bg-[#030712] border border-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-pink-500/40 resize-none transition-colors"
                required
              />
            </div>

            {/* Platform Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Platform</label>
              <div className="grid grid-cols-1 gap-1.5">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs border text-left flex items-center gap-2.5 transition-all font-medium ${
                      platform === p.id
                        ? "bg-pink-500/10 border-pink-500/30 text-pink-300"
                        : "bg-[#030712] border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                    }`}
                  >
                    <span className="text-base">{p.emoji}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone + CTA in a grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-[#030712] border border-white/5 text-white text-xs focus:outline-none focus:border-pink-500/40 appearance-none transition-colors">
                  {TONES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">CTA Style</label>
                <select value={ctaStyle} onChange={(e) => setCtaStyle(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-[#030712] border border-white/5 text-white text-xs focus:outline-none focus:border-pink-500/40 appearance-none transition-colors">
                  {CTA_STYLES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </div>

            {/* Hashtags Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#030712] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-2.5">
                <Hash className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">Include Hashtags</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={includeHashtags} onChange={(e) => setIncludeHashtags(e.target.checked)} />
                <div className="w-10 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500 border border-white/5" />
              </label>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={loading || !context.trim()}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2.5 text-sm ${
                  loading || !context.trim()
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-pink-600 to-rose-600 hover:shadow-[0_0_25px_rgba(236,72,153,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Writing Caption...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white/20" />
                    <span>Generate Caption</span>
                    <span className="flex items-center gap-1 bg-black/30 text-xs px-2 py-0.5 rounded-md text-pink-100 font-medium">
                      <Zap className="w-3 h-3 fill-current" /> 1
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT — Output */}
        <div className="lg:col-span-8 flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border border-white/[0.06] rounded-2xl text-center px-8 min-h-[400px]">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-[3px] border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-pink-400 animate-pulse" />
                </div>
              </div>
              <p className="text-white font-semibold text-lg mb-2">Crafting your caption...</p>
              <p className="text-gray-500 text-sm">Optimizing for {currentPlatform?.label} algorithm and engagement.</p>
            </div>
          ) : result ? (
            <div className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl">
              {/* Top Bar */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  <h3 className="font-bold text-white">Generated Caption</h3>
                  <span className="text-base">{currentPlatform?.emoji}</span>
                  <span className="text-[10px] bg-pink-500/15 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                    {currentPlatform?.label}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${saved ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400"}`}
                  >
                    {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    {saved ? "Saved!" : "Save"}
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(editing ? editVal : result); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${copied ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-pink-500/10 hover:text-pink-400"}`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() => setEditing(!editing)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${editing ? "bg-pink-500/10 border-pink-500/20 text-pink-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10"}`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {editing ? "Done" : "Edit"}
                  </button>
                </div>
              </div>

              {/* Caption + Engagement Score side by side */}
              <div className="flex-1 flex flex-col md:flex-row">
                
                {/* Left Side: Editor */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-white/5 relative">
                  {editing ? (
                    <textarea
                      value={editVal}
                      onChange={(e) => setEditVal(e.target.value)}
                      className="w-full min-h-[400px] p-6 bg-transparent text-gray-300 text-[15px] leading-[1.7] focus:outline-none resize-none font-sans"
                    />
                  ) : (
                    <div className="p-8">
                      <p className="text-gray-200 text-[15px] leading-[1.8] whitespace-pre-wrap font-sans">{result}</p>
                    </div>
                  )}
                </div>

                {/* Right Sidebar: Engagement Metrics */}
                <div className="w-52 shrink-0 border-l border-white/5 p-5 space-y-5 overflow-y-auto bg-white/[0.01]">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-600 font-black mb-3">Engagement Scores</div>
                    {[
                      { label: "Hook Strength", score: 87 },
                      { label: "CTA Power", score: 79 },
                      { label: "Readability", score: 94 },
                      { label: "Hashtag Quality", score: includeHashtags ? 82 : 0 },
                    ].map((metric) => (
                      <div key={metric.label} className="mb-3">
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-gray-500">{metric.label}</span>
                          <span className={metric.score > 80 ? "text-emerald-400 font-bold" : "text-yellow-400 font-bold"}>{metric.score}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-1000 ${metric.score > 80 ? "bg-emerald-500" : "bg-yellow-500"}`} style={{ width: `${metric.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <div className="text-[10px] uppercase tracking-widest text-gray-600 font-black mb-3">Platform Tips</div>
                    <div className="space-y-2 text-[11px] text-gray-500 leading-relaxed">
                      <p>✅ Optimal length for {currentPlatform?.label}</p>
                      <p>✅ {includeHashtags ? "8 hashtags detected" : "No hashtags — organic feel"}</p>
                      <p>✅ CTA included</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center gap-6 shrink-0 bg-white/[0.01]">
                <span className="text-[11px] text-gray-500">Characters: <span className="text-gray-300 font-semibold">{(editing ? editVal : result).length}</span></span>
                <span className="text-[11px] text-gray-500">Words: <span className="text-gray-300 font-semibold">{(editing ? editVal : result).split(/\s+/).filter(Boolean).length}</span></span>
                <span className="text-[11px] text-gray-500">Hashtags: <span className="text-pink-400 font-semibold">{includeHashtags ? "8 included" : "none"}</span></span>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border-2 border-dashed border-white/[0.07] rounded-2xl text-center px-12 py-16">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Boost Engagement</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">
                Describe your post and get a platform-native caption with engagement scoring.
              </p>

              <div className="w-full max-w-md text-left bg-[#030712] border border-white/5 rounded-xl p-4 mb-6">
                <div className="text-[10px] text-pink-400 font-black uppercase tracking-wider mb-2">Example Output</div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  🚀 We just did the thing!<br />
                  <span className="text-gray-500 text-xs">Six months. Hundreds of iterations. Here we are...</span>
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase font-bold">Engagement scored</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-gray-500 uppercase font-bold">Platform optimized</span>
                </div>
              </div>

              <button onClick={loadSample} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors text-sm">
                Try sample post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
