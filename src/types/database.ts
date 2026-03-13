export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          created_at?: string | null
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          owner_id: string
          stripe_customer_id: string | null
          subscription_plan: string | null
          subscription_status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          owner_id: string
          stripe_customer_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          owner_id?: string
          stripe_customer_id?: string | null
          subscription_plan?: string | null
          subscription_status?: string | null
          created_at?: string | null
        }
      }
      team_members: {
        Row: {
          id: string
          team_id: string
          user_id: string
          role: string
          invited_at: string | null
        }
        Insert: {
          id?: string
          team_id: string
          user_id: string
          role?: string
          invited_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string
          role?: string
          invited_at?: string | null
        }
      }
      ai_requests: {
        Row: {
          id: string
          team_id: string
          user_id: string | null
          feature: string
          credits_used: number
          input_summary: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          team_id: string
          user_id?: string | null
          feature: string
          credits_used: number
          input_summary?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          user_id?: string | null
          feature?: string
          credits_used?: number
          input_summary?: string | null
          created_at?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          team_id: string
          stripe_subscription_id: string | null
          plan: string | null
          credit_limit: number | null
          credits_used: number | null
          period_start: string | null
          period_end: string | null
          status: string | null
        }
        Insert: {
          id?: string
          team_id: string
          stripe_subscription_id?: string | null
          plan?: string | null
          credit_limit?: number | null
          credits_used?: number | null
          period_start?: string | null
          period_end?: string | null
          status?: string | null
        }
        Update: {
          id?: string
          team_id?: string
          stripe_subscription_id?: string | null
          plan?: string | null
          credit_limit?: number | null
          credits_used?: number | null
          period_start?: string | null
          period_end?: string | null
          status?: string | null
        }
      }
    }
  }
}
