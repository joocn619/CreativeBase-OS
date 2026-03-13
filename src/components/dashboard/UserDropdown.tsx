"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";

export function UserDropdown() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative group">
      <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors overflow-hidden">
        {user?.user_metadata?.avatar_url ? (
          <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <UserIcon className="w-4 h-4 text-gray-300" />
        )}
      </button>

      {/* Basic Dropdown - Will be upgraded with shadcn/ui Menu later */}
      <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#0a101d] border border-white/10 shadow-xl opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all z-50">
        <div className="px-4 py-3 border-b border-white/5 text-sm">
          <p className="font-medium text-white truncate">{user?.user_metadata?.full_name || "User"}</p>
          <p className="text-gray-500 text-xs truncate">{user?.email}</p>
        </div>
        <div className="py-1">
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
