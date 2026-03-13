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

    const { context, platform, includeHashtags } = await req.json();

    if (!context || !platform) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: teamMember } = await supabase
      .from('team_members')
      .select('team_id')
      .eq('user_id', session.user.id)
      .limit(1)
      .single();

    if (!teamMember) {
      return NextResponse.json({ error: 'No associated team found.' }, { status: 403 });
    }

    const teamId = teamMember.team_id;
    const creditsRequired = 1; // Captions cost 1 credit

    const hasCredits = await CreditSystem.deduct(
      teamId, 
      'caption_generator', 
      creditsRequired, 
      session.user.id
    );

    if (!hasCredits) {
      return NextResponse.json({ error: 'Insufficient credits. Cost: 1 credit.' }, { status: 402 });
    }

    const hashtagInstruction = includeHashtags 
      ? `Include 3-5 highly relevant, high-reach hashtags at the end.` 
      : `Do NOT include any hashtags.`;

    const systemPrompt = `You are an expert Social Media Manager for ${platform}.
    Write a highly engaging, converting caption based on the user's context.
    The caption must be perfectly optimized for ${platform}'s algorithm and formatting style.
    ${hashtagInstruction}`;
      
    const result = await generateText(context, systemPrompt);

    return NextResponse.json({ 
      success: true, 
      result, 
      creditsCharged: creditsRequired 
    });

  } catch (error: any) {
    console.error("Caption Generation Error:", error);
    return NextResponse.json({ error: 'Failed to generate caption.' }, { status: 500 });
  }
}
