import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateText } from '@/lib/ai/openai';
import { CreditSystem } from '@/lib/credits/creditSystem';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { topic, platform, tone } = await req.json();

    if (!topic || !platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get the user's primary team (for a real app, they might select it in the UI)
    const { data: teamMember } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', session.user.id)
      .limit(1)
      .single();

    if (!teamMember) {
      return NextResponse.json({ error: 'No associated team found. Please contact support.' }, { status: 403 });
    }

    const teamId = teamMember.team_id;
    const creditsRequired = 2; // Hooks cost 2 credits

    // 2. Check and Deduct Credits
    const hasCredits = await CreditSystem.deduct(
      teamId, 
      'hook_generator', 
      creditsRequired, 
      session.user.id
    );

    if (!hasCredits) {
      return NextResponse.json({ error: 'Insufficient credits. Please upgrade your plan.' }, { status: 402 });
    }

    // 3. Generate Content
    const systemPrompt = `You are a viral content consultant specializing in ${platform}. 
      Generate 3 highly engaging, scroll-stopping hooks about the user's topic. 
      The tone should be ${tone || 'engaging and professional'}.
      Format the output as a clean, numbered list without any extra markdown formatting or pleasantries.`;
      
    const result = await generateText(topic, systemPrompt);

    return NextResponse.json({ 
      success: true, 
      result, 
      creditsCharged: creditsRequired 
    });

  } catch (error: any) {
    console.error("Hook Generation Error:", error);
    return NextResponse.json({ error: 'Failed to generate hooks. Please try again later.' }, { status: 500 });
  }
}
