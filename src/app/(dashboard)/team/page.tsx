"use client";

import { useState } from "react";
import { 
  Users, UserPlus, MoreVertical, Shield, 
  Mail, Clock, CheckCircle2, Search, X
} from "lucide-react";

const TEAM_MEMBERS = [
  { id: 1, name: "Alex Jenkins", email: "alex@creativebase.os", role: "Owner", status: "Active", lastActive: "Just now", avatar: "AJ" },
  { id: 2, name: "Sarah Connor", email: "sarah@creativebase.os", role: "Admin", status: "Active", lastActive: "2 hours ago", avatar: "SC" },
  { id: 3, name: "Mike Ross", email: "mike@agency.com", role: "Editor", status: "Active", lastActive: "1 day ago", avatar: "MR" },
  { id: 4, name: "Guest User", email: "guest@freelance.inc", role: "Viewer", status: "Invited", lastActive: "-", avatar: "GU" },
];

export default function TeamWorkspace() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Editor");

  return (
    <div className="max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] flex flex-col pt-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-indigo-400" />
            Team Workspace
          </h1>
          <p className="text-gray-400 mt-2">Manage your team members and their roles across your projects.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:scale-[1.02] transition-all"
        >
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      {/* Main Content */}
      <div className="rounded-2xl bg-[#0a0f1a] border border-white/5 shadow-xl flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white px-3 py-1 bg-white/10 rounded-lg border border-white/5">
              4 Members
            </span>
            <span className="text-sm text-gray-400 pl-2">
              (1 Seat Remaining)
            </span>
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search team..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-white/[0.01]">
                <th className="p-4 px-6 font-medium">Member</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {TEAM_MEMBERS.map(member => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-inner shrink-0">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">{member.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      {member.role === "Owner" && <Shield className="w-4 h-4 text-amber-500" />}
                      {member.role === "Admin" && <Shield className="w-4 h-4 text-indigo-400" />}
                      {member.role}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                      member.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {member.status === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{member.lastActive}</td>
                  <td className="p-4 text-right">
                    {member.role !== "Owner" && (
                      <button className="p-2 text-gray-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0a0f1a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-400" />
                Invite to Workspace
              </h2>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com" 
                  className="w-full px-4 py-2.5 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300">Select Role</label>
                
                <div 
                  onClick={() => setInviteRole("Admin")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    inviteRole === "Admin" ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]" : "bg-black/20 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${inviteRole === "Admin" ? "text-indigo-400" : "text-gray-200"}`}>Admin</span>
                    {inviteRole === "Admin" && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-gray-500">Can manage billing, invite users, and access all projects.</p>
                </div>

                <div 
                  onClick={() => setInviteRole("Editor")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    inviteRole === "Editor" ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]" : "bg-black/20 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${inviteRole === "Editor" ? "text-indigo-400" : "text-gray-200"}`}>Editor</span>
                    {inviteRole === "Editor" && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-gray-500">Can create and edit content, but cannot manage billing.</p>
                </div>

                <div 
                  onClick={() => setInviteRole("Viewer")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    inviteRole === "Viewer" ? "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.1)]" : "bg-black/20 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${inviteRole === "Viewer" ? "text-indigo-400" : "text-gray-200"}`}>Viewer</span>
                    {inviteRole === "Viewer" && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-xs text-gray-500">Can only view content and analytics.</p>
                </div>

              </div>
            </div>

            <div className="p-6 pt-0 flex gap-3">
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.4)]"
              >
                Send Invite
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
