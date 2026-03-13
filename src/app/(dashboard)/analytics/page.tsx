"use client";

import { 
  BarChart3, TrendingUp, Users, MousePointerClick, 
  ArrowUpRight, ArrowDownRight, Eye, Calendar,
  Download, Filter
} from "lucide-react";

const TOP_CONTENT = [
  { id: 1, title: "10 AI Tools for Marketers (YouTube)", views: "142K", clicks: "12K", ctr: "8.4%", trend: "+12%" },
  { id: 2, title: "Spring Sale Announcement (Email)", views: "85K", clicks: "21K", ctr: "24.7%", trend: "+5%" },
  { id: 3, title: "How to scale your SaaS (Twitter)", views: "56K", clicks: "1.2K", ctr: "2.1%", trend: "-3%" },
  { id: 4, title: "Product Launch Webinar (LinkedIn)", views: "34K", clicks: "4.5K", ctr: "13.2%", trend: "+28%" },
];

export default function AnalyticsDashboard() {
  return (
    <div className="max-w-[1600px] mx-auto min-h-[calc(100vh-80px)] flex flex-col pt-4 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 px-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            Performance Analytics
          </h1>
          <p className="text-gray-400 mt-2">Track the ROI of your content, campaigns, and overall impressions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-gray-300 hover:bg-white/5 transition-colors text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-gray-300 hover:bg-white/5 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="px-4 space-y-6 flex-1">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-4 h-4" /> 24%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Impressions</p>
              <h3 className="text-3xl font-bold text-white">1.2M</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <MousePointerClick className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-4 h-4" /> 12%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Clicks</p>
              <h3 className="text-3xl font-bold text-white">84.5K</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                  <ArrowDownRight className="w-4 h-4" /> 2%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-400 mb-1">Avg. Conversion Rate</p>
              <h3 className="text-3xl font-bold text-white">4.2%</h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[40px] rounded-full group-hover:bg-amber-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Users className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-4 h-4" /> 38%
                </span>
              </div>
              <p className="text-sm font-medium text-gray-400 mb-1">New Audience</p>
              <h3 className="text-3xl font-bold text-white">12.8K</h3>
            </div>
          </div>

        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart (Mock Line Chart) */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-bold text-white text-lg">Growth Overview</h3>
                <p className="text-sm text-gray-400 mt-1">Impressions across all channels</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs font-medium rounded-md bg-white/10 text-white">Views</button>
                <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Clicks</button>
              </div>
            </div>
            
            <div className="flex-1 relative min-h-[300px] flex items-end gap-2 pt-10">
              {/* Y-Axis mock */}
              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col justify-between text-[10px] text-gray-500 pb-8">
                <span>100k</span>
                <span>75k</span>
                <span>50k</span>
                <span>25k</span>
                <span>0</span>
              </div>
              
              {/* Grid lines */}
              <div className="absolute left-10 right-0 top-0 bottom-8 flex flex-col justify-between z-0">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-full h-px bg-white/5" />
                ))}
              </div>

              {/* CSS Bar Chart serving as a mock area/line chart */}
              <div className="flex-1 h-full pl-10 flex items-end justify-between gap-1 z-10 pb-8 relative">
                {[
                  30, 45, 40, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 70, 60, 50, 65, 75, 85, 100,
                  90, 80, 95, 85, 110, 100, 120, 115, 130, 140
                ].map((val, i) => (
                  <div key={i} className="w-full relative group h-full flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500/20 to-blue-400/80 rounded-t-sm transition-all duration-300 group-hover:opacity-80"
                      style={{ height: `${(val / 140) * 100}%` }}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-lg">
                      {val}K Views
                    </div>
                  </div>
                ))}
              </div>

              {/* X-Axis dates */}
              <div className="absolute left-10 right-0 bottom-0 h-8 flex justify-between text-[10px] text-gray-500 pt-2 border-t border-white/5">
                <span>Mar 1</span>
                <span>Mar 8</span>
                <span>Mar 15</span>
                <span>Mar 22</span>
                <span>Mar 30</span>
              </div>
            </div>
          </div>

          {/* Traffic Sources (Donut/Progress Mock) */}
          <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col">
            <h3 className="font-bold text-white text-lg mb-1">Top Channels</h3>
            <p className="text-sm text-gray-400 mb-8">Traffic distribution by source</p>
            
            <div className="flex-1 flex flex-col justify-center space-y-6">
              
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm font-medium text-white">YouTube</span>
                  </div>
                  <span className="text-sm font-bold text-gray-300">45%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[45%] rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium text-white">Email Newsletters</span>
                  </div>
                  <span className="text-sm font-bold text-gray-300">25%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[25%] rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-sky-500" />
                    <span className="text-sm font-medium text-white">Twitter / X</span>
                  </div>
                  <span className="text-sm font-bold text-gray-300">15%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 w-[15%] rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-sm font-medium text-white">LinkedIn</span>
                  </div>
                  <span className="text-sm font-bold text-gray-300">10%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[10%] rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                    <span className="text-sm font-medium text-white">Other</span>
                  </div>
                  <span className="text-sm font-bold text-gray-300">5%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500 w-[5%] rounded-full" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Content Performance Table */}
        <div className="rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white">Top Performing Content</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300 hover:bg-white/10 transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                  <th className="p-4 px-6 font-medium">Content Title</th>
                  <th className="p-4 font-medium text-right">Views / Opens</th>
                  <th className="p-4 font-medium text-right">Clicks</th>
                  <th className="p-4 font-medium text-right">CTR</th>
                  <th className="p-4 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TOP_CONTENT.map((content) => (
                  <tr key={content.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 px-6 font-medium text-gray-200 group-hover:text-blue-400 transition-colors">
                      {content.title}
                    </td>
                    <td className="p-4 text-sm text-gray-300 text-right">{content.views}</td>
                    <td className="p-4 text-sm text-gray-300 text-right">{content.clicks}</td>
                    <td className="p-4 text-sm text-gray-300 text-right">{content.ctr}</td>
                    <td className="p-4 text-sm text-right">
                      <span className={`inline-flex items-center gap-1 ${content.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {content.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {content.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
