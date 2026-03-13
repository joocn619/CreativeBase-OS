"use client";

import { useState } from "react";
import { 
  Settings2, CreditCard, Users, Link as LinkIcon, 
  Bell, CheckCircle2, Zap, Rocket, Shield, Globe,
  Smartphone, Store, Mail, MessagesSquare, BarChart3, AlertCircle
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const renderTabContent = () => {
    switch(activeTab) {
      case "general":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white mb-4">Workspace Settings</h3>
              
              <div className="space-y-4 max-w-2xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Workspace Name</label>
                  <input 
                    type="text" 
                    defaultValue="Acme Marketing Corp"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                
                <div className="space-y-2 pt-4">
                  <label className="text-sm font-medium text-gray-300">Brand Context for AI</label>
                  <p className="text-xs text-gray-500 mb-2">Instructions the AI will use globally to match your brand voice.</p>
                  <textarea 
                    rows={4}
                    defaultValue="We are a modern, playful B2B SaaS. Our tone is professional but witty. Avoid jargon and focus on clear, actionable insights."
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex gap-3">
                <button className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 shadow-xl space-y-4">
               <h3 className="text-lg font-bold text-red-400">Danger Zone</h3>
               <p className="text-sm text-gray-400 max-w-xl">Permanently delete your workspace and all of its contents. This action is not reversible, so please continue with caution.</p>
               <button className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 border border-red-500/20 transition-colors">
                  Delete Workspace
               </button>
            </div>
          </div>
        );
      
      case "billing":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Current Plan Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0f1a] to-[#050810] border border-white/5 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />
               
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                 <div>
                   <div className="flex items-center gap-3 mb-2">
                     <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                     <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/20">Active</span>
                   </div>
                   <p className="text-gray-400">Billed $49/month. Next charge on April 12, 2024.</p>
                 </div>
                 <div className="flex gap-3">
                   <button className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10">Cancel Plan</button>
                   <button className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)] flex items-center gap-2">
                     <Rocket className="w-4 h-4" /> Upgrade to Agency
                   </button>
                 </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-400">AI Words Generated</span>
                     <span className="text-white font-medium">45k / 100k</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-cyan-500 w-[45%] rounded-full relative">
                       <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                     </div>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Automations Active</span>
                     <span className="text-white font-medium">3 / 5</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-[60%] rounded-full relative">
                       <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                     </div>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Team Members</span>
                     <span className="text-white font-medium">4 / 5</span>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[80%] rounded-full relative">
                       <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                     </div>
                   </div>
                 </div>
               </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Visa ending in 4242</h4>
                  <p className="text-sm text-gray-500">Expires 12/2026</p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                Update Method
              </button>
            </div>

            {/* Billing History */}
            <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl">
              <h3 className="font-bold text-white mb-6">Billing History</h3>
              <div className="space-y-4">
                {[
                  { date: "Mar 12, 2024", amount: "$49.00", status: "Paid", invoice: "#INV-2024-03" },
                  { date: "Feb 12, 2024", amount: "$49.00", status: "Paid", invoice: "#INV-2024-02" },
                  { date: "Jan 12, 2024", amount: "$49.00", status: "Paid", invoice: "#INV-2024-01" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-gray-200">{item.amount}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                        <CheckCircle2 className="w-3 h-3" /> {item.status}
                      </span>
                      <button className="text-sm text-cyan-400 hover:text-cyan-300">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { 
                   name: "Shopify", 
                   desc: "Sync products, generate listings, and read reviews automatically.", 
                   icon: <Store className="w-6 h-6 text-[#95bf47]" />, 
                   connected: true 
                 },
                 { 
                   name: "Twitter / X", 
                   desc: "Auto-publish generated threads and schedule content.", 
                   icon: <Globe className="w-6 h-6 text-white" />, 
                   connected: true 
                 },
                 { 
                   name: "YouTube", 
                   desc: "Import videos to instantly generate hooks, scripts, and repurpose.", 
                   icon: <Zap className="w-6 h-6 text-red-500" />, 
                   connected: false 
                 },
                 { 
                   name: "Mailchimp", 
                   desc: "Sync your email audiences and send AI-written campaigns.", 
                   icon: <Mail className="w-6 h-6 text-yellow-400" />, 
                   connected: false 
                 },
                 { 
                   name: "Slack", 
                   desc: "Get notified when automations run or team members join.", 
                   icon: <MessagesSquare className="w-6 h-6 text-pink-400" />, 
                   connected: false 
                 },
                 { 
                   name: "Stripe", 
                   desc: "Import customer data to create targeted marketing segments.", 
                   icon: <CreditCard className="w-6 h-6 text-indigo-500" />, 
                   connected: false 
                 }
               ].map((integration, i) => (
                 <div key={i} className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col h-full relative group hover:border-white/10 transition-colors">
                   <div className="flex justify-between items-start mb-4">
                     <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                       {integration.icon}
                     </div>
                     <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${integration.connected ? 'bg-cyan-500' : 'bg-gray-700'}`}>
                       <div className={`w-4 h-4 rounded-full bg-white transition-transform ${integration.connected ? 'translate-x-6' : 'translate-x-0'}`} />
                     </div>
                   </div>
                   <h3 className="font-bold text-white mb-2">{integration.name}</h3>
                   <p className="text-sm text-gray-400 flex-1">{integration.desc}</p>
                   {integration.connected && (
                     <p className="text-xs text-emerald-400 mt-4 flex items-center gap-1">
                       <CheckCircle2 className="w-3 h-3" /> Connected
                     </p>
                   )}
                 </div>
               ))}
             </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="p-6 rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl">
               <h3 className="text-lg font-bold text-white mb-6">Notification Preferences</h3>
               
               <div className="space-y-6">
                 {[
                   { 
                     title: "Weekly Analytics Report", 
                     desc: "Receive a summary of your workspace's performance every Monday.",
                     icon: <BarChart3 className="w-5 h-5 text-gray-400" />,
                     email: true, push: false 
                   },
                   { 
                     title: "Automation Errors", 
                     desc: "Get notified immediately if a workflow fails to execute.",
                     icon: <AlertCircle className="w-5 h-5 text-red-400" />,
                     email: true, push: true 
                   },
                   { 
                     title: "Billing Updates", 
                     desc: "Invoices, failed payments, and plan changes.",
                     icon: <CreditCard className="w-5 h-5 text-purple-400" />,
                     email: true, push: false 
                   },
                   { 
                     title: "New Team Members", 
                     desc: "Alerts when someone joins your workspace via invite.",
                     icon: <Users className="w-5 h-5 text-emerald-400" />,
                     email: false, push: true 
                   }
                 ].map((pref, i) => (
                   <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0 last:pb-0">
                     <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                         {pref.icon}
                       </div>
                       <div>
                         <h4 className="font-medium text-white">{pref.title}</h4>
                         <p className="text-sm text-gray-400">{pref.desc}</p>
                       </div>
                     </div>
                     <div className="flex gap-4 shrink-0 pl-14 sm:pl-0">
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" defaultChecked={pref.email} className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500/50 bg-black/20" />
                         <span className="text-sm text-gray-300">Email</span>
                       </label>
                       <label className="flex items-center gap-2 cursor-pointer">
                         <input type="checkbox" defaultChecked={pref.push} className="w-4 h-4 rounded border-gray-600 text-cyan-500 focus:ring-cyan-500/50 bg-black/20" />
                         <span className="text-sm text-gray-300">Push</span>
                       </label>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="pt-6 mt-6 border-t border-white/5">
                 <button className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors shadow-[0_0_15px_rgba(8,145,178,0.4)]">
                   Save Preferences
                 </button>
               </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] flex flex-col pt-8 pb-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings2 className="w-8 h-8 text-cyan-400" />
            Settings
          </h1>
          <p className="text-gray-400 mt-2">Manage your workspace, billing, and connections.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 min-h-0">
        
        {/* Sidebar Tabs */}
        <div className="md:col-span-3 space-y-2">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 custom-scrollbar">
            <button 
              onClick={() => setActiveTab("general")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-left whitespace-nowrap transition-all ${
                activeTab === "general" 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
              }`}
            >
              <Settings2 className="w-5 h-5 shrink-0" /> General
            </button>
            <button 
              onClick={() => setActiveTab("billing")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-left whitespace-nowrap transition-all ${
                activeTab === "billing" 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
              }`}
            >
              <CreditCard className="w-5 h-5 shrink-0" /> Billing & Usage
            </button>
            <button 
              onClick={() => setActiveTab("integrations")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-left whitespace-nowrap transition-all ${
                activeTab === "integrations" 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
              }`}
            >
              <LinkIcon className="w-5 h-5 shrink-0" /> API Integrations
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-left whitespace-nowrap transition-all ${
                activeTab === "notifications" 
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border border-transparent"
              }`}
            >
              <Bell className="w-5 h-5 shrink-0" /> Notifications
            </button>
          </nav>
        </div>
        
        {/* Content Area */}
        <div className="md:col-span-9">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}
