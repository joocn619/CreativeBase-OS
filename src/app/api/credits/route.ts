import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreditSystem } from '@/lib/credits/creditSystem';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get('teamId');

  if (!teamId) {
    return NextResponse.json({ error: 'Missing teamId' }, { status: 400 });
  }

  // 1. Verify user is in this team
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: membership, error } = await supabase
    .from('team_members')
    .select('id')
    .eq('team_id', teamId)
    .eq('user_id', session.user.id)
    .single();

  if (error || !membership) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 2. Fetch the actual credit balance using admin permissions
  const balance = await CreditSystem.getBalance(teamId);

  return NextResponse.json({ balance });
}
