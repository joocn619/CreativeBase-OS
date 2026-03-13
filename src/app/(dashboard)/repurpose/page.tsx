"use client";

import { useState } from "react";
import {
  Repeat, Sparkles, Zap, FlaskConical,
  Copy, Check, CheckCircle2, Save, Edit3, FileText
} from "lucide-react";

const FORMAT_OPTIONS = [
  { id: "twitter-thread", label: "Twitter / X Thread", emoji: "𝕏", credit: 2 },
  { id: "tiktok-script", label: "TikTok Script", emoji: "🎵", credit: 2 },
  { id: "linkedin-carousel", label: "LinkedIn Carousel", emoji: "💼", credit: 2 },
  { id: "seo-blog-intro", label: "SEO Blog Intro", emoji: "📝", credit: 3 },
  { id: "email-newsletter", label: "Email Newsletter", emoji: "✉️", credit: 3 },
  { id: "instagram-caption", label: "Instagram Caption", emoji: "📸", credit: 1 },
];

const SAMPLE_SOURCE = `YouTube Video Transcript: "3 AI Tools That Are Replacing Entire Teams"

In this video I walk through the three AI tools that have completely transformed my content workflow. First, I talk about how I use AI writing assistants to go from a rough idea to a full blog post in under 20 minutes. Then I cover automated video clip generation using AI — pointing out how one long-form video can become 15+ short clips in a single click. Finally, I cover AI voiceover tools and how they're allowing solo creators to produce podcast-quality audio at zero cost. The takeaway: solo creators now have the leverage of a full media team.`;

function generateForFormat(id: string, source: string) {
  const snippet = source.slice(0, 60);
  const map: Record<string, string> = {
    "twitter-thread": `𝕏 THREAD: ${snippet.trim()}...

1/ The AI revolution isn't coming. It's already here — and solo creators are the biggest winners.

2/ Tool #1: AI Writing Assistant
I went from idea → full blog post in under 20 minutes. No more staring at a blank page. No more writer's block. Just a stream-of-consciousness voice note that becomes a polished article.

3/ Tool #2: AI Video Clip Generator
One 30-minute YouTube video → 15 platform-native clips. Automatically trimmed, captioned, and formatted for TikTok, Reels, and Shorts. Done in a single click.

4/ Tool #3: AI Voiceover
Podcast-quality audio at zero cost. Upload your script, pick a voice, done. Your audience will never know the difference.

5/ The bottom line: A solo creator today has the leverage of an entire media team. If you're not using these tools, your competitors already are.

RT if this changed how you think about content. 🔁`,

    "tiktok-script": `🎵 TIKTOK SCRIPT

[HOOK - 0:00-0:05]
"Three AI tools just made an entire media team obsolete — here's what they are."

[HOOK VISUAL] Text on screen: "Teams are being replaced."

[BODY - 0:05-0:45]
"The first one is an AI writing tool. I gave it a 30-second voice note and got a full blog post back in 2 minutes."

"The second is a video clip AI. I feed it my long-form YouTube video — it spits out 15 ready-to-post short clips. All captioned. All formatted."

"The third? AI voiceover. I literally type and it sounds like a professional podcast recording."

[CTA - 0:45-0:60]
"If you're a creator and you're NOT using these, you're falling behind. Follow for more tools like this — dropping one every week."`,

    "linkedin-carousel": `💼 LINKEDIN CAROUSEL

📌 Slide 1 (Cover)
"3 AI Tools That Are Replacing Entire Teams"
(For solo creators who want media team leverage)

📌 Slide 2
TOOL #1: AI Writing
→ Voice note → polished blog post in 20 min
→ Eliminates writer's block permanently
→ Cost: < $30/month

📌 Slide 3
TOOL #2: Clip Generation
→ 1 long video → 15 short clips automatically
→ Auto-captions + platform formatting included
→ Saves 10+ hours per week

📌 Slide 4
TOOL #3: AI Voiceover
→ Podcast-quality audio at zero cost
→ 50+ voices, multiple languages
→ No recording equipment needed

📌 Slide 5 (CTA)
"The solo creator now has the leverage of an entire media team."
Save this post. You'll thank yourself later. ♻️`,

    "seo-blog-intro": `📝 SEO BLOG INTRO

Title: 3 AI Tools That Are Replacing Entire Teams in 2024

Meta Description: Discover the three AI tools solo creators are using to build a full media operation — with no team, no agency, and no massive budget.

---

In 2024, the barrier between a solo creator and a full media company has never been lower. Thanks to a new wave of AI tools designed specifically for content workflows, individual creators now have access to capabilities that once required entire teams to execute.

In this article, we break down the three tools driving this shift — an AI writing assistant, an automated video clip generator, and a professional-grade voiceover tool — and show you exactly how to integrate them into your creative workflow starting today.

Whether you're a YouTuber, podcaster, writer, or marketer, this guide will fundamentally change how you think about content production.`,

    "email-newsletter": `✉️ EMAIL NEWSLETTER

Subject: The AI tools replacing entire teams (and how to use them)

Preview: I was skeptical too. Then I saw the numbers.

---

Hey [First Name],

I want to talk about something that's been quietly changing everything in content creation.

Three AI tools — writing, video clipping, and voiceover — have given a solo creator the leverage of an entire media team.

Here's what each one does:

**Tool #1 — AI Writing Assistant**
Voice note in → Polished blog post out. 20 minutes, start to finish.

**Tool #2 — Video Clip Generator**
One long-form YouTube video in → 15 platform-ready clips out. Auto-captioned, auto-formatted.

**Tool #3 — AI Voiceover**
Type your script → Get back podcast-quality audio. Zero recording setup needed.

The compounding effect of using all three? You're creating 10x more content in half the time.

If you want the full breakdown — platform recommendations, pricing, workflow tips — hit reply and I'll send you the guide.

See you next week,
— The CreativeBase Team

P.S. Hit reply and tell me: which of these tools are you already using?`,

    "instagram-caption": `📸 INSTAGRAM CAPTION

The AI revolution isn't coming for creators.

It's already here — and the smartest ones are using it to their advantage.

3 tools I've been using to 10x my output without hiring a single person:

→ AI writing: idea to blog post in 20 minutes
→ AI clip gen: one video → 15 ready-to-post clips 
→ AI voiceover: podcast-quality audio, zero cost

The barrier between a solo creator and a full media team... is now basically nothing.

Save this if you want the full breakdown. 🔖

#AI #contentcreation #creatortools #solofounder #aitools #contentmarketing`,
  };
  return map[id] || `[Generated content for ${id}]`;
}

export default function RepurposeGenerator() {
  const [source, setSource] = useState("");
  const [selected, setSelected] = useState<string[]>(["twitter-thread", "tiktok-script"]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ id: string; content: string }[]>([]);
  const [activeResult, setActiveResult] = useState<string>("");
  const [step, setStep] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const loadSample = () => setSource(SAMPLE_SOURCE);

  const toggleFormat = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const totalCredits = selected.reduce((sum, id) => {
    const f = FORMAT_OPTIONS.find(f => f.id === id);
    return sum + (f?.credit ?? 2);
  }, 0);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim() || selected.length === 0) return;
    setLoading(true);
    setStep(2);
    setResults([]);
    setTimeout(() => {
      const generated = selected.map(id => ({ id, content: generateForFormat(id, source) }));
      setResults(generated);
      setActiveResult(generated[0]?.id);
      setStep(3);
      setLoading(false);
    }, 3000);
  };

  const steps = [
    { id: 1, label: "Source & Formats" },
    { id: 2, label: "Repurposing" },
    { id: 3, label: "Content Ready" },
  ];

  const activeContent = results.find(r => r.id === activeResult);
  const activeFormat = FORMAT_OPTIONS.find(f => f.id === activeResult);

  return (
    <div className="max-w-[1400px] mx-auto flex flex-col pt-2 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 px-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <Repeat className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Content Repurposer</h1>
            <p className="text-sm text-gray-400 mt-0.5">Turn one long-form piece into multiple platform-native posts instantly.</p>
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
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${step >= s.id ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" : "bg-white/5 text-gray-500 border border-white/5"}`}>
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-black ${step >= s.id ? "bg-blue-500 text-white" : "bg-white/10 text-gray-500"}`}>{s.id}</span>
                  {s.label}
                </div>
                {i < steps.length - 1 && <div className="w-3 h-px bg-white/10" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs">
            <Zap className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span className="text-gray-300 font-medium">{totalCredits} Credits</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 px-1">

        {/* LEFT — Config */}
        <div className="lg:col-span-5 flex flex-col">
          <form onSubmit={handleGenerate} className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl p-6 space-y-6">

            {/* Source Content */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Source Content</label>
                <div className="flex gap-2">
                  <button type="button" onClick={loadSample} className="text-[10px] text-blue-400 font-bold px-2 py-1 bg-blue-500/10 rounded-md hover:bg-blue-500/20 transition-colors">Sample</button>
                  <button type="button" onClick={() => setSource("")} className="text-[10px] text-gray-500 font-bold px-2 py-1 bg-white/5 rounded-md hover:bg-white/10 transition-colors">Clear</button>
                </div>
              </div>
              <textarea
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Paste your YouTube transcript, blog post, or long-form content here..."
                className="w-full h-40 px-4 py-3 rounded-xl bg-[#030712] border border-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500/40 resize-none transition-colors"
                required
              />
              {source && (
                <div className="text-[10px] text-gray-500">
                  {source.split(/\s+/).filter(Boolean).length} words detected
                </div>
              )}
            </div>

            {/* Format Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Output Formats</label>
                <span className="text-[10px] text-gray-500">{selected.length} selected</span>
              </div>
              <div className="space-y-1.5">
                {FORMAT_OPTIONS.map((f) => {
                  const active = selected.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => toggleFormat(f.id)}
                      className={`w-full px-3 py-2.5 rounded-xl text-xs border text-left flex items-center justify-between transition-all ${
                        active
                          ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                          : "bg-[#030712] border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${active ? "bg-blue-500 border-blue-500" : "border-gray-600 bg-white/5"}`}>
                          {active && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <span className="font-medium">{f.emoji} {f.label}</span>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-wide ${active ? "text-blue-400" : "text-gray-600"}`}>
                        {f.credit}cr
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-auto pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={loading || !source.trim() || selected.length === 0}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2.5 text-sm ${
                  loading || !source.trim() || selected.length === 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Repurposing {selected.length} formats...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-white/20" />
                    <span>Repurpose Content</span>
                    <span className="flex items-center gap-1 bg-black/30 text-xs px-2 py-0.5 rounded-md text-blue-100 font-medium">
                      <Zap className="w-3 h-3 fill-current" /> {totalCredits}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT — Tabbed Results */}
        <div className="lg:col-span-7 flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border border-white/[0.06] rounded-2xl text-center px-8 min-h-[400px]">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-[3px] border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>
              <p className="text-white font-semibold text-lg mb-2">Extracting core ideas...</p>
              <p className="text-gray-500 text-sm mb-6">Transforming into {selected.length} platform-native formats.</p>
              <div className="flex flex-wrap justify-center gap-2">
                {selected.map(id => {
                  const f = FORMAT_OPTIONS.find(f => f.id === id);
                  return (
                    <span key={id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                      {f?.emoji} {f?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="flex-1 flex flex-col bg-[#0a0f1a] border border-white/[0.06] rounded-2xl">
              {/* Format Tabs */}
              <div className="px-4 pt-4 pb-0 border-b border-white/5 shrink-0">
                <div className="flex gap-1 overflow-x-auto pb-3 custom-scrollbar">
                  {results.map(({ id }) => {
                    const f = FORMAT_OPTIONS.find(f => f.id === id);
                    const isActive = activeResult === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveResult(id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-semibold whitespace-nowrap border-b-2 transition-all shrink-0 ${
                          isActive
                            ? "text-blue-400 border-blue-500 bg-blue-500/5"
                            : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{f?.emoji}</span> {f?.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.01]">
                  <span className="text-sm font-semibold text-white">{activeFormat?.emoji} {activeFormat?.label}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setSavedId(activeResult); setTimeout(() => setSavedId(null), 2500); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${savedId === activeResult ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400"}`}
                    >
                      {savedId === activeResult ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                      {savedId === activeResult ? "Saved!" : "Save"}
                    </button>
                    <button
                      onClick={() => { if (activeContent) { navigator.clipboard.writeText(activeContent.content); setCopiedId(activeResult); setTimeout(() => setCopiedId(null), 2000); } }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${copiedId === activeResult ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/5 border-white/5 text-gray-300 hover:bg-blue-500/10 hover:text-blue-400"}`}
                    >
                      {copiedId === activeResult ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedId === activeResult ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={() => { const all = results.map(r => `=== ${FORMAT_OPTIONS.find(f => f.id === r.id)?.label} ===\n\n${r.content}`).join("\n\n\n"); navigator.clipboard.writeText(all); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-white/5 bg-white/5 text-gray-300 hover:bg-white/10 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copy All
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                  <pre className="text-gray-300 text-sm leading-[1.8] whitespace-pre-wrap font-sans">{activeContent?.content}</pre>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center gap-6 shrink-0 bg-white/[0.01]">
                <span className="text-[11px] text-gray-500">Formats: <span className="text-blue-400 font-semibold">{results.length} generated</span></span>
                <span className="text-[11px] text-gray-500">Credits Used: <span className="text-gray-300 font-semibold">{totalCredits}</span></span>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="flex-1 flex flex-col items-center justify-center bg-[#0a0f1a] border-2 border-dashed border-white/[0.07] rounded-2xl text-center px-12 py-16">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Content Engine Standby</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-sm leading-relaxed">
                Paste a transcript or long-form content on the left, select your output formats, and let AI do the rest.
              </p>

              <div className="w-full max-w-md text-left bg-[#030712] border border-white/5 rounded-xl p-4 mb-6">
                <div className="text-[10px] text-blue-400 font-black uppercase tracking-wider mb-2">Example — 1 video → 6 formats</div>
                <div className="grid grid-cols-3 gap-2">
                  {FORMAT_OPTIONS.map(f => (
                    <div key={f.id} className="text-[10px] text-gray-500 flex items-center gap-1">
                      <span>{f.emoji}</span> {f.label.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={loadSample} className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors text-sm">
                Try sample content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
