import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// STRIPE_SECRET_KEY — plug in here
// STRIPE_WEBHOOK_SECRET — plug in here
// SUPABASE_URL — plug in here
// SUPABASE_ANON_KEY — plug in here

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY_HERE';
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'YOUR_STRIPE_WEBHOOK_SECRET_HERE';
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE'; // Needed to bypass RLS

const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-04-22.dahlia' });
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Retrieve metadata we passed during checkout creation
    const userId = session.client_reference_id || session.metadata?.userId;
    const tier = session.metadata?.tier;

    if (userId && tier) {
      // Update user tier in Supabase
      const { error } = await supabaseAdmin
        .from('users')
        .update({ tier: tier })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user tier:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
      
      console.log(`Successfully upgraded user ${userId} to ${tier}`);
    }
  }

  return NextResponse.json({ received: true });
}
