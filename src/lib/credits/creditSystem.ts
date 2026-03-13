import { supabaseAdmin } from "@/lib/supabase/admin";

export class CreditSystem {
  static async getBalance(teamId: string): Promise<number> {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select('credit_limit, credits_used')
      .eq('team_id', teamId)
      .single();

    if (error || !data) {
      // Default free tier fallback
      return 50;
    }

    return Math.max(0, data.credit_limit - data.credits_used);
  }

  static async deduct(teamId: string, feature: string, amount: number, userId: string): Promise<boolean> {
    const currentBalance = await this.getBalance(teamId);
    
    if (currentBalance < amount) {
      return false; // Insufficient credits
    }

    // Wrap in a transaction-like flow or RPC if exact concurrency is needed
    // For now, sequentially log request and update subscription
    
    try {
      // 1. Log the usage
      await supabaseAdmin.from('ai_requests').insert({
        team_id: teamId,
        user_id: userId,
        feature: feature,
        credits_used: amount,
      });

      // 2. We need to increment credits_used atomically
      // Supabase RPC is best here, but as a fallback, fetch-then-add can work
      // Let's use RPC if available, or just standard update for now
      const { data: sub } = await supabaseAdmin
        .from('subscriptions')
        .select('credits_used')
        .eq('team_id', teamId)
        .single();
        
      if (sub) {
        await supabaseAdmin
          .from('subscriptions')
          .update({ credits_used: sub.credits_used + amount })
          .eq('team_id', teamId);
      } else {
        // Create default tracking if it didn't exist
        await supabaseAdmin
          .from('subscriptions')
          .insert({
            team_id: teamId,
            credits_used: amount,
            credit_limit: 50 // New free user
          });
      }

      return true;
    } catch (error) {
      console.error("Credit deduction failed:", error);
      return false;
    }
  }
}
