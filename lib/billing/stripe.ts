// Week 9: Stripe Payment Integration
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export const PRICING_TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    lessons_per_day: 5,
    ai_requests_per_day: 10,
  },
  PREMIUM: {
    name: 'Premium',
    price: 999, // $9.99 in cents
    priceId: 'price_premium',
    lessons_per_day: -1, // unlimited
    ai_requests_per_day: 100,
  },
  PRO: {
    name: 'Pro',
    price: 1999, // $19.99 in cents
    priceId: 'price_pro',
    lessons_per_day: -1,
    ai_requests_per_day: -1,
  },
};

export async function createCheckoutSession(userId: string, tier: 'PREMIUM' | 'PRO') {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: PRICING_TIERS[tier].priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/pricing`,
    client_reference_id: userId,
  });
  return session;
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.APP_URL}/account`,
  });
  return session;
}
