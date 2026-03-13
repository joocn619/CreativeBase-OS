"use client";

import { useState } from "react";
import { 
  Mail, Calendar, Plus, Search, MoreVertical, 
  PlayCircle, PauseCircle, Send, CheckCircle2,
  ChevronLeft, ChevronRight, BarChart2, Users, Clock
} from "lucide-react";

// Mock Data
const CAMPAIGNS = [
  { id: 1, name: "Q1 Product Launch", type: "Email Sequence", status: "Active", sent: "12,450", openRate: "42%", clickRate: "12%" },
  { id: 2, name: "Win-back March", type: "SMS + Email", status: "Draft", sent: "-", openRate: "-", clickRate: "-" },
  { id: 3, name: "Weekly Newsletter (Mar 10)", type: "Newsletter", status: "Scheduled", sent: "-", openRate: "-", clickRate: "-" },
  { id: 4, name: "Black Friday Follow-up", type: "Email Sequence", status: "Completed", sent: "45,120", openRate: "38%", clickRate: "8%" },
];

export default function MarketingTools() {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col flex-shrink-0 md:flex-row md:items-end justify-between gap-4 mb-6 px-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-indigo-400" />
            Marketing Hub
          </h1>
          <p className="text-gray-400 mt-2">Manage your campaigns, plan content, and automate outreach.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 mb-6 flex-shrink-0">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5 w-fit">
          <button 
            onClick={() => setActiveTab("campaigns")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "campaigns" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            Campaigns
          </button>
          <button 
            onClick={() => setActiveTab("planner")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "planner" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            Content Planner
          </button>
          <button 
            onClick={() => setActiveTab("builder")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "builder" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            Campaign Builder
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-6">
        
        {/* === CAMPAIGNS TAB === */}
        {activeTab === "campaigns" && (
          <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-300">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-shrink-0">
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <Send className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Total Sent</h3>
                    <p className="text-2xl font-bold text-white">124.5k</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <BarChart2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Avg. Open Rate</h3>
                    <p className="text-2xl font-bold text-white">42.8%</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full group-hover:bg-purple-500/20 transition-colors" />
                <div className="flex items-center gap-4 mb-4 relative z-10">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Active Contacts</h3>
                    <p className="text-2xl font-bold text-white">12.2k</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Table Area */}
            <div className="flex-1 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-white">All Campaigns</h3>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search campaigns..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                      <th className="p-4 px-6 font-medium">Campaign Name</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Sent</th>
                      <th className="p-4 font-medium">Open Rate</th>
                      <th className="p-4 font-medium">Clicks</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {CAMPAIGNS.map(camp => (
                      <tr key={camp.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                        <td className="p-4 px-6">
                          <div className="font-medium text-gray-200 group-hover:text-indigo-400 transition-colors">{camp.name}</div>
                          <div className="text-xs text-gray-500 mt-1">{camp.type}</div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            camp.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            camp.status === "Draft" ? "bg-gray-500/10 text-gray-400 border-gray-500/20" :
                            camp.status === "Scheduled" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                            "bg-purple-500/10 text-purple-400 border-purple-500/20"
                          }`}>
                            {camp.status === "Active" && <PlayCircle className="w-3 h-3" />}
                            {camp.status === "Draft" && <PauseCircle className="w-3 h-3" />}
                            {camp.status === "Scheduled" && <Clock className="w-3 h-3" />}
                            {camp.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
                            {camp.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-300">{camp.sent}</td>
                        <td className="p-4 text-sm text-gray-300">{camp.openRate}</td>
                        <td className="p-4 text-sm text-gray-300">{camp.clickRate}</td>
                        <td className="p-4 text-right">
                          <button className="p-2 text-gray-500 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* === PLANNER TAB === */}
        {activeTab === "planner" && (
          <div className="h-full bg-[#0a0f1a] rounded-2xl border border-white/5 shadow-xl flex flex-col overflow-hidden animate-in fade-in duration-300">
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  March 2024
                </h3>
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                  <button className="p-1 hover:bg-white/10 rounded-md text-gray-400 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-white/10 rounded-md text-gray-400 transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-white/5 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/10 transition-colors border border-white/5">Today</button>
                <button className="px-3 py-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-sm font-medium rounded-lg hover:bg-indigo-500/20 transition-colors">Month View</button>
              </div>
            </div>
            
            {/* Mock Calendar Grid */}
            <div className="flex-1 overflow-auto bg-black/20 p-6 custom-scrollbar">
              <div className="grid grid-cols-7 gap-px rounded-xl border border-white/5 overflow-hidden bg-white/5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="bg-[#0a0f1a] p-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
                
                {Array.from({length: 35}).map((_, i) => (
                  <div key={i} className={`bg-[#0a0f1a] min-h-[120px] p-2 border-t border-white/5 hover:bg-white/[0.02] transition-colors ${i === 15 ? 'ring-1 ring-inset ring-indigo-500/50 bg-indigo-500/[0.02]' : ''}`}>
                    <span className={`text-sm font-medium ${i === 15 ? 'text-indigo-400' : 'text-gray-500'}`}>{i > 2 ? i - 2 : i + 28}</span>
                    
                    {/* Mock Events */}
                    {i === 10 && (
                      <div className="mt-1 p-1.5 rounded bg-blue-500/20 border border-blue-500/20 text-[10px] text-blue-200 leading-tight truncate cursor-pointer hover:bg-blue-500/30">
                        Newsletter Drop
                      </div>
                    )}
                    {i === 15 && (
                      <div className="mt-1 p-1.5 rounded bg-pink-500/20 border border-pink-500/20 text-[10px] text-pink-200 leading-tight flex flex-col gap-1 cursor-pointer hover:bg-pink-500/30">
                        <span>IG Reel Post</span>
                        <span className="text-pink-400">@ 10:00 AM</span>
                      </div>
                    )}
                    {i === 18 && (
                      <div className="mt-1 p-1.5 rounded bg-emerald-500/20 border border-emerald-500/20 text-[10px] text-emerald-200 leading-tight truncate cursor-pointer hover:bg-emerald-500/30">
                        Webinar Email 1
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === BUILDER TAB === */}
        {activeTab === "builder" && (
          <div className="h-full flex flex-col md:flex-row gap-6 animate-in fade-in duration-300 overflow-hidden">
            {/* Form Column */}
            <div className="w-full md:w-1/3 flex flex-col overflow-y-auto custom-scrollbar pr-2">
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl space-y-6">
                <h3 className="font-bold text-white text-lg">Campaign Details</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Campaign Name</label>
                    <input type="text" placeholder="e.g. Spring Sale Announcement" className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Content Type</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50">
                      <option>Email Newsletter</option>
                      <option>Automated Sequence</option>
                      <option>SMS Blast</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Target Audience</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50">
                      <option>All Subscribers</option>
                      <option>Active Customers</option>
                      <option>Churned Users</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <button className="w-full py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10">
                    Generate with AI Magic
                  </button>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all">
                    Save Campaign
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Column */}
            <div className="flex-1 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col overflow-hidden relative">
              <div className="p-4 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                 <span className="text-sm font-medium text-gray-400">Email Preview</span>
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                 </div>
              </div>
              
              <div className="flex-1 bg-white/5 flex items-center justify-center p-8">
                {/* Email Mock */}
                <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-8 flex flex-col">
                  <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-8"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>
                  <div className="space-y-3 mb-8">
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                    <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                  <div className="w-40 h-12 bg-indigo-500/20 rounded-md animate-pulse self-center mb-8"></div>
                  <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse mt-auto self-center"></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
