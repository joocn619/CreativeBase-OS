"use client";

import { useState } from "react";
import { 
  Zap, Plus, Search, MoreVertical, PlayCircle, PauseCircle, 
  ArrowDown, Webhook, Mail, MessagesSquare, CheckCircle2,
  Clock, Share2, Network, Settings2
} from "lucide-react";

const WORKFLOWS = [
  { id: 1, name: "New YouTube Video to Twitter Thread", status: "Active", runs: "1,204", lastRun: "2 mins ago" },
  { id: 2, name: "Shopify Abandoned Cart to SMS", status: "Active", runs: "8,430", lastRun: "1 hour ago" },
  { id: 3, name: "Welcome Email Sequence", status: "Paused", runs: "450", lastRun: "2 days ago" },
  { id: 4, name: "Auto-Publish LinkedIn Articles", status: "Active", runs: "89", lastRun: "5 hours ago" },
];

export default function AutomationsTools() {
  const [activeTab, setActiveTab] = useState("builder");

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col flex-shrink-0 md:flex-row md:items-end justify-between gap-4 mb-6 px-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            Automations
          </h1>
          <p className="text-gray-400 mt-2">Build visual workflows to put your marketing on autopilot.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:scale-[1.02] transition-all">
          <Plus className="w-5 h-5" />
          Create Workflow
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 mb-6 flex-shrink-0">
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.02] border border-white/5 w-fit">
          <button 
            onClick={() => setActiveTab("workflows")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "workflows" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            My Workflows
          </button>
          <button 
            onClick={() => setActiveTab("builder")}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "builder" ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
          >
            <Network className="w-4 h-4" /> Visual Builder
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 pb-6">
        
        {/* === WORKFLOWS TAB === */}
        {activeTab === "workflows" && (
          <div className="h-full flex flex-col animate-in fade-in duration-300">
            <div className="flex-1 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold text-white">All Workflows</h3>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search workflows..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-yellow-500/50 focus:bg-white/10 transition-colors"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                      <th className="p-4 px-6 font-medium">Workflow Name</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Total Runs</th>
                      <th className="p-4 font-medium">Last Run</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {WORKFLOWS.map(flow => (
                      <tr key={flow.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                        <td className="p-4 px-6">
                          <div className="font-medium text-gray-200 group-hover:text-yellow-500 transition-colors">{flow.name}</div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            flow.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            "bg-gray-500/10 text-gray-400 border-gray-500/20"
                          }`}>
                            {flow.status === "Active" ? <PlayCircle className="w-3 h-3" /> : <PauseCircle className="w-3 h-3" />}
                            {flow.status}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-gray-300">{flow.runs}</td>
                        <td className="p-4 text-sm text-gray-300">{flow.lastRun}</td>
                        <td className="p-4 text-right">
                          <button className="p-2 text-gray-500 hover:text-white transition-colors">
                            <Settings2 className="w-4 h-4" />
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

        {/* === BUILDER TAB === */}
        {activeTab === "builder" && (
          <div className="h-full flex flex-col xl:flex-row gap-6 animate-in fade-in duration-300 overflow-hidden">
            
            {/* Visual Canvas Area */}
            <div className="flex-1 rounded-2xl bg-[#050810] border border-white/5 shadow-xl relative overflow-hidden flex items-center justify-center p-8 bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-opacity-20 flex-col">
              
              {/* Toolbar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between bg-[#0a0f1a]/80 backdrop-blur-md border border-white/10 p-2 rounded-xl">
                 <div className="flex items-center gap-3 px-2">
                   <Zap className="w-5 h-5 text-yellow-500" />
                   <h3 className="text-sm font-bold text-white">YouTube to Twitter Autofunnel</h3>
                 </div>
                 <div className="flex items-center gap-2">
                   <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                     <CheckCircle2 className="w-3 h-3" /> Published
                   </button>
                 </div>
              </div>

              {/* MOCK WORKFLOW NODES */}
              <div className="absolute inset-0 overflow-auto flex items-center justify-center custom-scrollbar">
                <div className="flex flex-col items-center py-20 min-h-max space-y-2">
                  
                  {/* Trigger Node */}
                  <div className="w-80 bg-[#0a0f1a] border border-yellow-500/30 rounded-2xl p-5 shadow-[0_0_30px_rgba(234,179,8,0.1)] relative group cursor-pointer hover:border-yellow-500/60 transition-colors">
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">Trigger</div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0">
                        <PlayCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">New YouTube Video</h4>
                        <p className="text-xs text-gray-400 mt-1">Triggers when a new video is uploaded to your authorized channel.</p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="h-10 w-px bg-yellow-500/30 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <ArrowDown className="w-4 h-4 text-yellow-500/50" />
                    </div>
                  </div>

                  {/* Action Node 1 */}
                  <div className="w-80 bg-[#0a0f1a] border border-white/10 rounded-2xl p-5 shadow-xl relative group cursor-pointer hover:border-cyan-500/50 transition-colors">
                    <div className="absolute -top-3 -right-3 bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded-full uppercase">Action 1</div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                        <Webhook className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Generate Twitter Thread</h4>
                        <p className="text-xs text-gray-400 mt-1">Transcribes video and uses AI to generate a 5-part native Twitter thread.</p>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="h-10 w-px bg-white/10 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                      <ArrowDown className="w-4 h-4 text-white/30" />
                    </div>
                  </div>

                  {/* Action Node 2 */}
                  <div className="w-80 bg-[#0a0f1a] border border-white/10 rounded-2xl p-5 shadow-xl relative group cursor-pointer hover:border-blue-500/50 transition-colors">
                    <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Action 2</div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shrink-0">
                        <Share2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">Publish to Twitter</h4>
                        <p className="text-xs text-gray-400 mt-1">Posts the generated thread immediately to your connected Twitter account.</p>
                      </div>
                    </div>
                  </div>

                  {/* New Node Button */}
                  <div className="h-10 w-px bg-white/10 relative" />
                  <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 border-dashed flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer">
                    <Plus className="w-5 h-5" />
                  </button>

                </div>
              </div>
            </div>

            {/* Properties Panel (Right Sidebar) */}
            <div className="w-full xl:w-96 flex flex-col overflow-y-auto custom-scrollbar">
              <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl space-y-6 h-full">
                <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shrink-0">
                    <Webhook className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Generate Thread</h3>
                    <p className="text-xs text-gray-500">Action Node Properties</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">AI Model</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50">
                      <option>GPT-4o</option>
                      <option>Claude 3.5 Sonnet</option>
                      <option>Gemini 1.5 Pro</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Prompt Instructions</label>
                    <textarea 
                      rows={5}
                      defaultValue="Extract the top 5 lessons from this video and format them as a high-converting Twitter thread. Use hooks in the first tweet to capture attention."
                      className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Thread Length</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50">
                      <option>Short (3-5 tweets)</option>
                      <option>Medium (5-8 tweets)</option>
                      <option>Long (8-12 tweets)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button className="w-full py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10 mb-3">
                    Test this Node
                  </button>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                    Save Configuration
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
