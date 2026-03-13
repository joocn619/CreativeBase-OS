"use client";

import { useState } from "react";
import { ShoppingCart, Link as LinkIcon, Sparkles, AlertCircle, CheckCircle2, Copy, Save, Loader2, ArrowUpRight, BarChart3 } from "lucide-react";
import { useCredits } from "@/hooks/useCredits";

export default function MarketplaceTools() {
  const { credits, refreshCredits } = useCredits();
  const [productUrl, setProductUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productUrl) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
      refreshCredits();
    }, 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 px-2">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-emerald-400" />
            Listing Optimizer
          </h1>
          <p className="text-gray-400 mt-2">Generate high-converting, SEO-optimized product listings for Amazon & Shopify.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-100 font-medium">Costs 2 Credits</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0 pb-6 px-2">
        
        {/* === Left Column: Input === */}
        <div className="xl:col-span-3 flex flex-col h-full overflow-y-auto custom-scrollbar pr-1">
          <form onSubmit={handleOptimize} className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <h3 className="font-bold text-white text-lg border-b border-white/5 pb-4">Import Product</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Product URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input 
                    type="url" 
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="Paste Amazon or Shopify URL" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
                <p className="text-[11px] text-gray-500">We will scrape existing details and images.</p>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-semibold text-gray-500 uppercase">OR MANUAL ENTRY</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Target Keywords (Optional)</label>
                <input type="text" placeholder="e.g. noise cancelling, wireless earbuds" className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50" />
              </div>
            </div>

             <button
              type="submit"
              disabled={loading || (!productUrl && !result)}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:scale-[1.02] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 relative z-10"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Listing
                </>
              )}
            </button>
          </form>
        </div>

        {/* === Middle Column: Generated Output === */}
        <div className="xl:col-span-6 flex flex-col h-full overflow-hidden">
          <div className="flex-1 p-0 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl overflow-hidden flex flex-col">
            {result ? (
              <>
                <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-emerald-400" />
                    Optimized Listing
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-all">
                      <Save className="w-4 h-4" /> Save
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-sm font-medium transition-all">
                      <ArrowUpRight className="w-4 h-4" /> Export to Shopify
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
                  <div className="space-y-3 group relative">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Optimized Title</h4>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-opacity"><Copy className="w-4 h-4" /></button>
                    </div>
                    <h2 className="text-xl font-bold text-white leading-snug">
                      ProGrip Wireless Earbuds - Active Noise Cancelling Bluetooth 5.3 Headphones with 40H Playtime & Deep Bass, IPX7 Waterproof
                    </h2>
                  </div>

                  <div className="space-y-3 group relative text-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">5 Key Bullets</h4>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-opacity"><Copy className="w-4 h-4" /></button>
                    </div>
                    <ul className="space-y-4 text-gray-300 leading-relaxed">
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <b>Immersive Active Noise Cancellation:</b> Block out 90% of ambient noise with our dual-mic ANC technology, perfect for commuting, office work, or focused gym sessions.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <b>40-Hour Battery Life & Fast Charge:</b> Get 8 hours of continuous playtime per charge, plus 32 extra hours from the compact charging case. A mere 10-minute charge gives you 2 hours of audio.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <b>Deep Bass & Studio Sound:</b> Custom 10mm dynamic drivers deliver punchy bass, clear mids, and crisp highs for a truly premium listening experience.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <b>Bluetooth 5.3 Seamless Pairing:</b> Experience ultra-low latency and unbreakable connections up to 50 feet away. Automatically connects to your last device instantly upon opening the case.</li>
                      <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <b>IPX7 Waterproof & Ergonomic Fit:</b> Sweatproof and rain-resistant design with 4 sizes of silicone ear tips included to assure a secure, pressure-free fit for any activity.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 group relative text-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest">A+ A/B Tested Description</h4>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white transition-opacity"><Copy className="w-4 h-4" /></button>
                    </div>
                    <div className="text-gray-400 leading-relaxed space-y-4">
                      <p><b>Upgrade Your Audio Reality.</b> Skip the wires and the distractions with the all-new ProGrip Wireless Earbuds. Engineered for audiophiles and daily commuters alike, these earbuds bring studio-quality sound directly into your daily routine.</p>
                      <p>Whether you're pushing through an intense HIIT workout, taking back-to-back Zoom calls, or traveling across the globe, the ProGrip adapts to your environment. The integrated Active Noise Cancellation (ANC) chipset evaluates ambient noise at 1,000 times per second to create the perfect sound isolating barrier.</p>
                      <p><b>What's in the box?</b><br/>1x Pair ProGrip Earbuds<br/>1x Wireless Charging Case<br/>1x USB-C Cable<br/>4x Silicone Eartips (XS, S, M, L)</p>
                    </div>
                  </div>
                </div>
              </>
            ) : loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-6">
                 <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-bold text-white">Scraping URL & Optimizing...</p>
                  <p className="text-sm text-gray-500">Cross-referencing high volume keywords.</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 px-8">
                <div className="w-24 h-24 rounded-3xl bg-white/[0.02] flex items-center justify-center border border-white/5 shadow-inner">
                  <ShoppingCart className="w-10 h-10 text-gray-600" />
                </div>
                <div className="max-w-md">
                  <p className="text-xl font-bold text-white">Paste a product URL</p>
                  <p className="text-sm mt-3 text-gray-400 leading-relaxed">Let AI rewrite your product title, bullets, and description based on top-performing e-commerce SEO data.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* === Right Column: SEO Analyzer === */}
        <div className="xl:col-span-3 flex flex-col h-full overflow-hidden">
          <div className="flex-1 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl p-6 flex flex-col relative overflow-hidden">
             
             {!result ? (
               <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center flex-col text-center p-6">
                 <BarChart3 className="w-8 h-8 text-gray-500 mb-3" />
                 <p className="text-sm font-medium text-gray-400">SEO Analyzer unlock after generation.</p>
               </div>
             ) : null}

             <div className="space-y-6">
               <h3 className="font-bold text-white text-lg flex items-center gap-2">
                 <BarChart3 className="w-5 h-5 text-emerald-400" />
                 SEO Analyzer
               </h3>

               {/* Gauge Mock */}
               <div className="flex flex-col items-center py-4">
                 <div className="w-32 h-32 rounded-full border-[12px] border-emerald-500/20 relative flex items-center justify-center">
                   <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                     <circle 
                       cx="64" cy="64" r="58" 
                       fill="none" 
                       stroke="currentColor" 
                       strokeWidth="12" 
                       strokeDasharray="364" 
                       strokeDashoffset="36" 
                       className="text-emerald-500 transition-all duration-1000"
                     />
                   </svg>
                   <div className="text-center">
                     <span className="text-4xl font-black text-white">92</span>
                     <span className="text-[10px] block text-gray-400 uppercase font-bold tracking-widest mt-1">SCORE</span>
                   </div>
                 </div>
                 <p className="text-sm font-medium text-emerald-400 mt-4 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                   Excellent Optimization
                 </p>
               </div>

               <div className="space-y-4 pt-4 border-t border-white/5">
                 <div className="space-y-1.5">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-300">Keyword Density</span>
                     <span className="text-emerald-400 font-medium">9/10</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[90%] rounded-full" />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-300">Readability Score</span>
                     <span className="text-emerald-400 font-medium">8.5/10</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
                   </div>
                 </div>

                 <div className="space-y-1.5">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-300">Title Length Max</span>
                     <span className="text-yellow-400 font-medium">Warning</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-yellow-400 w-[95%] rounded-full" />
                   </div>
                   <p className="text-[11px] text-gray-500 flex items-start gap-1 pt-1">
                     <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                     Title is close to 200 character limit for Amazon mobile.
                   </p>
                 </div>
               </div>

             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
