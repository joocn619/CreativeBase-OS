"use client";

import { useState } from "react";
import { 
  Video, Search, Plus, Folder, LayoutGrid, List, FileText, 
  MessageSquare, Hash, Repeat, MoreVertical, X, Clock, Sparkles 
} from "lucide-react";

// Mock Data
const FOLDERS = [
  { id: 1, name: "All Content", count: 124, active: true },
  { id: 2, name: "SaaS Launch P1", count: 12, active: false },
  { id: 3, name: "Twitter Threads", count: 45, active: false },
  { id: 4, name: "TikTok Scripts", count: 28, active: false },
  { id: 5, name: "Blog Posts", count: 19, active: false },
];

const TAGS = ["Drafts", "Published", "Viral", "To Edit", "Archived"];

const MOCK_CONTENT = [
  {
    id: 1, 
    title: "How to build a SaaS in 2024",
    type: "script",
    preview: "A comprehensive guide to building your first software product using modern AI tools and no-code platforms. We cover everything from ideation to launch.",
    date: "2 days ago",
    tags: ["Published", "Viral"],
    icon: <Video className="w-5 h-5 text-indigo-400" />
  },
  {
    id: 2, 
    title: "5 React Native Tips",
    type: "caption",
    preview: "Stop using useEffect for everything! Here are 5 better ways to handle state in your React Native apps. 💥👇",
    date: "5 days ago",
    tags: ["Drafts"],
    icon: <MessageSquare className="w-5 h-5 text-pink-400" />
  },
  {
    id: 3, 
    title: "Cold Email Outline",
    type: "hook",
    preview: "How we booked 15 enterprise demos in 30 days using this exact cold email script.",
    date: "1 week ago",
    tags: ["Published"],
    icon: <Hash className="w-5 h-5 text-amber-400" />
  },
  {
    id: 4, 
    title: "Q1 Launch Retro Thread",
    type: "repurpose",
    preview: "1/ We just crossed $10k MRR. Here are the 5 biggest mistakes we made getting here...",
    date: "2 weeks ago",
    tags: ["To Edit"],
    icon: <Repeat className="w-5 h-5 text-blue-400" />
  },
  {
    id: 5, 
    title: "Weekly Newsletter Drop",
    type: "script",
    preview: "Welcome to the Weekly Hacker! This week we're covering the newest AI models and how they impact SaaS.",
    date: "2 weeks ago",
    tags: ["Published"],
    icon: <FileText className="w-5 h-5 text-emerald-400" />
  }
];

export default function ContentLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFolder, setActiveFolder] = useState(1);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const filteredContent = MOCK_CONTENT.filter(item => {
    if (activeTag && !item.tags.includes(activeTag)) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 px-2">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Folder className="w-8 h-8 text-cyan-400" />
            Content Library
          </h1>
          <p className="text-gray-400 mt-2">Manage, organize, and preview your generated AI content.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all">
          <Plus className="w-5 h-5" />
          Create New Content
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 pb-6 px-2">
        
        {/* Left Sidebar: Folders & Filters */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-1 custom-scrollbar">
          
          <div className="p-4 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Folders</h3>
              <div className="space-y-1">
                {FOLDERS.map((folder) => (
                  <button 
                    key={folder.id}
                    onClick={() => setActiveFolder(folder.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeFolder === folder.id 
                        ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                        : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Folder className={`w-4 h-4 ${activeFolder === folder.id ? "text-cyan-400" : "text-gray-500"}`} />
                      {folder.name}
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5">{folder.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Tags</h3>
              <div className="flex flex-wrap gap-2 px-2">
                {TAGS.map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                      activeTag === tag 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-transparent border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Main Area: Content Grid/List */}
        <div className="lg:col-span-9 flex flex-col h-full overflow-hidden">
          
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your content by title or keyword..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0a0f1a] border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.02] transition-colors shadow-sm"
              />
            </div>
            
            <div className="flex items-center p-1 rounded-xl bg-[#0a0f1a] border border-white/5 shrink-0">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white/10 text-white" : "text-gray-500 hover:text-gray-300"}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filteredContent.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500 py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5">
                  <Search className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-400">No content found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                {filteredContent.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all cursor-pointer group flex flex-col h-64"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
                      {item.preview}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 pb-20">
                {filteredContent.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-[#0a0f1a] border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group"
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 shrink-0 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate mt-1">
                        {item.preview}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0 mt-3 sm:mt-0">
                      <div className="flex items-center gap-2 hidden md:flex">
                        {item.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 flex-shrink-0 rounded bg-white/5 text-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-500 flex items-center gap-1 w-24 justify-end">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                      <button className="text-gray-500 hover:text-white p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Content Preview Modal Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          <div className="relative w-full max-w-2xl bg-[#0a0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  {selectedItem.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedItem.title}</h2>
                  <p className="text-xs text-gray-500">Generated {selectedItem.date}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-transparent to-black/20">
               <div className="whitespace-pre-wrap text-gray-300 leading-relaxed font-sans text-[15px]">
                 {selectedItem.preview}
                 <br/><br/>
                 <span className="text-gray-500 italic">[Extended content hidden in preview...]</span>
                 <br/><br/>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
               </div>
            </div>

            <div className="p-5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
               <div className="flex gap-2">
                 {selectedItem.tags.map((tag: string) => (
                   <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-400">
                     {tag}
                   </span>
                 ))}
               </div>
               <div className="flex gap-3">
                 <button className="px-4 py-2 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-colors font-medium text-sm">
                   Delete
                 </button>
                 <button className="px-4 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-colors font-medium text-sm flex items-center gap-2">
                   <Sparkles className="w-4 h-4" />
                   Open in Editor
                 </button>
               </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
