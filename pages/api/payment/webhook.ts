
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { sql } from '@vercel/postgres';
import { bookings } from '@/lib/schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      webhookSecret
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      await sql`
        UPDATE ${bookings}
        SET status = 'confirmed'
        WHERE room_id = ${parseInt(paymentIntent.metadata.roomId)}
        AND check_in = ${paymentIntent.metadata.checkIn}::timestamp
        AND check_out = ${paymentIntent.metadata.checkOut}::timestamp
      `;
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(400).json({ message: 'Webhook error' });
  }
}
