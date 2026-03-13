import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      
      // We expect the client to pass the team_id in client_reference_id
      const teamId = session.client_reference_id;
      if (!teamId) break;

      // Extract plan info from metadata
      // The exact logic depends on how you configure the Stripe Checkout Session
      // In this example, let's assume upgrading grants 1000 credits
      await supabaseAdmin
        .from('subscriptions')
        .upsert({
          team_id: teamId,
          stripe_subscription_id: session.subscription,
          plan: 'pro',
          credit_limit: 1000,
          status: 'active'
        }, {
          onConflict: 'team_id'
        });

      break;
    }
    
    case 'invoice.payment_succeeded': {
      // Logic for recurring payments to reset/add credits
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as any;
      // Handle subscription cancellation
      // Downgrade back to free
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
