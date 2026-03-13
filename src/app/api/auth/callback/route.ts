import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ensureUserAndTeam } from '@/lib/supabase/admin'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session?.user) {
      // Ensure the user and their default team exist in our custom tables
      const user = session.user;
      
      // We pass the full_name from metadata if it exists (set during signup)
      await ensureUserAndTeam(
        user.id, 
        user.email || '', 
        user.user_metadata?.full_name
      );

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`)
}
