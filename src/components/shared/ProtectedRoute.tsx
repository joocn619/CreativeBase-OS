"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // TEMPORARY BYPASS FOR LOCAL PREVIEW
    // if (!loading && !user) {
    //   router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    // }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020811]">
        <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  // TEMPORARY BYPASS FOR LOCAL PREVIEW
  // if (!user) {
  //   return null;
  // }

  return <>{children}</>;
}
