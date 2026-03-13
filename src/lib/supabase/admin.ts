import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/database"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co"
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  "placeholder-key"

export const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

/**
 * Ensures a user and their default team exists in the database.
 * Used during auth callback or initial signup/login.
 */
export async function ensureUserAndTeam(userId: string, email: string, fullName?: string, minRole = 'owner') {
  try {
    // 1. Check if user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('id', userId)
      .maybeSingle()

    if (userError) throw userError;

    // 2. Create user if they don't exist
    if (!user) {
      await supabaseAdmin.from('users').insert({
        id: userId,
        email,
        full_name: fullName || email.split('@')[0],
        role: minRole
      })
    }

    // 3. Check for existing teams where user is owner
    const { data: teams, error: teamsError } = await supabaseAdmin
      .from('teams')
      .select('id')
      .eq('owner_id', userId)
      
    if (teamsError) throw teamsError;

    // 4. Create default team if none exists
    if (!teams || teams.length === 0) {
      const { data: newTeam, error: createTeamError } = await supabaseAdmin
        .from('teams')
        .insert({
          name: `${fullName || email.split('@')[0]}'s Workspace`,
          owner_id: userId,
        })
        .select('id')
        .single()
        
      if (createTeamError) throw createTeamError;
      
      // Add user as admin to their new team
      if (newTeam) {
        await supabaseAdmin.from('team_members').insert({
          team_id: String(newTeam.id),
          user_id: userId,
          role: 'admin'
        })
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error ensuring user/team:", error);
    return false;
  }
}
