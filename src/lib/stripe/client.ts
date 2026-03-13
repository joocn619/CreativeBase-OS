import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Missing STRIPE_SECRET_KEY in environment variables. Using placeholder for build.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  appInfo: {
    name: "CreativeBase OS",
    version: "1.0.0",
  },
});

export const STRIPE_PLANS = {
  FREE: {
    name: 'Free',
    priceId: null,
    credits: 50,
  },
  PRO: {
    name: 'Pro',
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    credits: 1000,
  },
  AGENCY: {
    name: 'Agency',
    priceId: process.env.STRIPE_AGENCY_PRICE_ID,
    credits: 5000,
  }
};
