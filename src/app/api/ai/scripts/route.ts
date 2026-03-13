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

    const { videoTopic, targetLength, tone } = await req.json();

    if (!videoTopic) {
      return NextResponse.json({ error: 'Missing topic' }, { status: 400 });
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
    const creditsRequired = 5; // Scripts are more expensive

    const hasCredits = await CreditSystem.deduct(
      teamId, 
      'script_generator', 
      creditsRequired, 
      session.user.id
    );

    if (!hasCredits) {
      return NextResponse.json({ error: 'Insufficient credits. Cost: 5 credits.' }, { status: 402 });
    }

    const systemPrompt = `You are an expert YouTube/Video scriptwriter.
    Create a highly engaging script about the user's topic.
    Target length: ${targetLength || 'Around 3-5 minutes'}
    Tone: ${tone || 'Engaging'}
    Format with clear [INTRO], [BODY PARAGRAPHS], and [OUTRO/CTA] sections. Do not use markdown bolding (**), just use capital letters for section headers.`;
      
    const result = await generateText(videoTopic, systemPrompt);

    return NextResponse.json({ 
      success: true, 
      result, 
      creditsCharged: creditsRequired 
    });

  } catch (error: any) {
    console.error("Script Generation Error:", error);
    return NextResponse.json({ error: 'Failed to generate script.' }, { status: 500 });
  }
}
