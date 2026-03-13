import Link from "next/link";
import { Video, ArrowRight, Zap, Target, LayoutDashboard, Repeat } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

export default async function Home() {
  // Check if user is logged in natively on server
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "placeholder-anon-key";
  const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // Natively redirect to dashboard if already logged in
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#020811] text-white selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            CreativeBase <span className="text-cyan-400">OS</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/10"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-cyan-400 mb-8 animate-in slide-in-from-bottom flex-wrap">
          <Zap className="w-3 h-3" />
          <span>The ultimate AI growth system for modern creators.</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-[1.1] mb-6 animate-in slide-in-from-bottom delay-100">
          Supercharge your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Content Engine</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 animate-in slide-in-from-bottom delay-200">
          Generate viral hooks, write engaging scripts, repurpose long-form videos, and launch automated campaigns—all from one powerful dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in slide-in-from-bottom delay-300">
          <Link
            href="/signup"
            className="flex items-center gap-2 rounded-full bg-cyan-500 px-8 py-4 text-sm font-bold text-white hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all"
          >
            Start Creating for Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-medium text-gray-300 hover:bg-white/10 transition-all"
          >
            Explore Platform
          </Link>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl hover:bg-white/[0.04] transition-colors">
            <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Creator Tools</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Generate viral hooks, full YouTube scripts, and engaging captions optimized for your specific brand voice.
            </p>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl hover:bg-white/[0.04] transition-colors">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Repeat className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Repurposing</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Turn one YouTube video into 10 TikToks, 5 LinkedIn posts, and a full blog article with a single click.
            </p>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl hover:bg-white/[0.04] transition-colors">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
              <LayoutDashboard className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Unified Dashboard</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Manage your content library, ecommerce listings, and marketing campaigns from one central command center.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export const dynamic = 'force-dynamic';