import { 
  Zap, 
  Video, 
  Target, 
  MessageSquare,
  Sparkles,
  CreditCard,
  PenTool,
  Repeat,
  Type,
  Mail,
  Bot,
  ShoppingBag,
  FileText,
  Blocks,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-16 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome back. Here's an overview of your creative workspace.</p>
        </div>
      </div>
      
      {/* Section 1: Stats cards */}
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Views", value: "1.2M", trend: "+12.5%", isPositive: true },
            { label: "Hooks Generated", value: "348", trend: "+5.2%", isPositive: true },
            { label: "Scripts Written", value: "42", trend: "-2.1%", isPositive: false },
            { label: "Active Campaigns", value: "12", trend: "+18.0%", isPositive: true }
          ].map((stat, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-sm hover:bg-white/[0.04] transition-all cursor-default">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <dt className="text-sm font-medium text-gray-400 relative z-10">{stat.label}</dt>
              <dd className="mt-3 flex items-baseline justify-between gap-2 relative z-10">
                <span className="text-3xl font-bold tracking-tight text-white">{stat.value}</span>
                <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-md ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {stat.trend}
                </span>
              </dd>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 spans) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Section 2: Quick Actions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: 'Generate Hook', icon: Target, href: '/hooks', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                { name: 'Generate Script', icon: PenTool, href: '/scripts', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
                { name: 'Write Caption', icon: Type, href: '/captions', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                { name: 'Repurpose Content', icon: Repeat, href: '/repurpose', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
              ].map((action, i) => (
                <Link key={i} href={action.href} className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 hover:bg-white/[0.05] hover:border-white/10 hover:-translate-y-1 transition-all group">
                  <div className={`h-12 w-12 rounded-xl border ${action.bg} ${action.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{action.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 3: Recent Content Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Content</h2>
              <Link href="/library" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                View Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-black/20 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 font-medium">Content Name</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: '10 SaaS Ideas for 2024', type: 'Script', date: 'Today, 2:30 PM', status: 'Ready' },
                      { name: 'How to use AI in Marketing', type: 'Hook', date: 'Yesterday', status: 'Ready' },
                      { name: 'Q3 Product Launch Thread', type: 'Repurposed', date: 'Oct 12, 2023', status: 'Draft' },
                      { name: 'Why cold email is dead', type: 'Caption', date: 'Oct 10, 2023', status: 'Ready' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/[0.04] transition-colors cursor-pointer group">
                        <td className="px-6 py-4 font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {row.name}
                        </td>
                        <td className="px-6 py-4 text-gray-400">{row.type}</td>
                        <td className="px-6 py-4 text-gray-500">{row.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide border ${
                            row.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${row.status === 'Ready' ? 'bg-emerald-400' : 'bg-gray-400'}`} />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column (1 span) */}
        <div className="space-y-8">
          
          {/* Section 4: AI Usage Panel */}
          <section>
             <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-100" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                       <Zap className="w-4 h-4 text-cyan-400" />
                     </div>
                     <h3 className="text-base font-semibold text-white">AI Credits</h3>
                   </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-3xl font-bold text-white">2,450</span>
                    <span className="text-sm font-medium text-gray-500">of 10,000</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '24.5%' }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Credits reset in 12 days on Pro Plan.</p>
                </div>

                <button className="w-full flex justify-center items-center gap-2 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-colors">
                  <CreditCard className="w-4 h-4" />
                  Upgrade Plan
                </button>
              </div>
            </div>
          </section>

          {/* Section 5: Ecosystem Apps */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Blocks className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">Ecosystem Apps</h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: 'MailPlanned', icon: Mail, desc: 'Advanced email marketing automation.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
                { name: 'Xcriptex AI', icon: Bot, desc: 'Autonomous AI writing assistant.', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
                { name: 'Babble Chatbot', icon: MessageSquare, desc: 'Customer support AI agent.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { name: 'FansMonster', icon: ShoppingBag, desc: 'Creator storefront & digital products.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
                { name: 'Blog Engine', icon: FileText, desc: 'SEO-optimized headless CMS.', color: 'text-orange-400', bg: 'bg-orange-500/10' }
              ].map((app, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors relative overflow-hidden group cursor-pointer">
                  <div className={`shrink-0 w-10 h-10 rounded-xl ${app.bg} flex items-center justify-center mt-0.5`}>
                    <app.icon className={`w-5 h-5 ${app.color}`} />
                  </div>
                  <div className="flex-1 pr-16">
                    <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{app.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{app.desc}</p>
                  </div>
                  <div className="absolute top-4 right-4 leading-none">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest border border-white/10 rounded-md px-1.5 py-0.5 bg-black/20">
                      Soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
