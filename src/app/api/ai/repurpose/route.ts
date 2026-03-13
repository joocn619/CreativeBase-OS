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

    const { sourceContent, outputFormats } = await req.json();

    if (!sourceContent || !outputFormats || outputFormats.length === 0) {
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
    // Base cost 3 credits. Add 1 credit per requested format
    const creditsRequired = 3 + outputFormats.length;

    const hasCredits = await CreditSystem.deduct(
      teamId, 
      'content_repurposer', 
      creditsRequired, 
      session.user.id
    );

    if (!hasCredits) {
      return NextResponse.json({ error: `Insufficient credits. Cost: ${creditsRequired} credits.` }, { status: 402 });
    }

    const systemPrompt = `You are an expert Content Repurposing Engine.
    Take the user's source content (likely a video transcript, blog post, or long text) and flawlessly repurpose it into the following formats:
    
    ${outputFormats.join(", ")}
    
    CRITICAL RULES:
    1. Tailor the formatting, length, and tone perfectly to each requested platform.
    2. Maintain the core message and value of the original text.
    3. Separate each platform's output clearly using exactly this format:
    
    === [PLATFORM NAME] ===
    [Repurposed Content]
    
    Do not add extra conversational filler.`;
      
    const result = await generateText(sourceContent, systemPrompt);

    return NextResponse.json({ 
      success: true, 
      result, 
      creditsCharged: creditsRequired 
    });

  } catch (error: any) {
    console.error("Repurpose Error:", error);
    return NextResponse.json({ error: 'Failed to repurpose content.' }, { status: 500 });
  }
}
