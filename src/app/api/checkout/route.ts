import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Plug your credentials below or use environment variables
// STRIPE_SECRET_KEY: Your Stripe Secret Key
// STRIPE_PRO_PRICE_ID: The Price ID for the $29/mo Pro plan
// STRIPE_ENTERPRISE_PRICE_ID: The Price ID for the $199/mo Enterprise plan

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'YOUR_STRIPE_SECRET_KEY_HERE';
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-04-22.dahlia' });

export async function POST(request: Request) {
  try {
    const { tier, userId, email } = await request.json();

    let priceId = '';
    if (tier === 'PRO') {
      priceId = process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder';
    } else if (tier === 'ENTERPRISE') {
      priceId = process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_ent_placeholder';
    } else {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Create a Stripe Checkout Session
    const origin = process.env.NEXT_PUBLIC_SITE_URL || request.headers.get('origin') || 'https://halaldata.com';
    
    // In a real app, ensure priceId is a valid Stripe Price ID
    // If it's a placeholder, we'll return a mock success url for testing
    if (priceId.includes('placeholder')) {
      console.warn("Using placeholder price ID. Redirecting to mock success.");
      return NextResponse.json({ url: `${origin}/dashboard?payment_success=true&mock_tier=${tier}` });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      customer_email: email,
      client_reference_id: userId, // Very important: this links the payment back to the Supabase user
      metadata: {
        userId,
        tier
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
