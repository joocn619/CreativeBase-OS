"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";

export function useCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCredits = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Get the user's primary team first
      const { data: teamMember } = await supabase
        .from('team_members')
        .select('team_id')
        .eq('user_id', user.id)
        .limit(1)
        .single();

      if (teamMember) {
        // Call the API endpoint which uses the secure server functions
        const res = await fetch(`/api/credits?teamId=${teamMember.team_id}`);
        if (res.ok) {
          const data = await res.json();
          setCredits(data.balance);
        } else {
          setCredits(50); // Fallback to free tier amount
        }
      } else {
        setCredits(50);
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
      setCredits(100); // UI preview fallback — no backend required
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { credits, loading, refreshCredits: fetchCredits };
}
