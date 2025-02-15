import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { bookingFormSchema } from '@/lib/schema';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const booking = bookingFormSchema.parse(req.body);
    const { checkIn, checkOut, roomId } = booking;

    // Calculate the number of nights
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 
      (1000 * 60 * 60 * 24)
    );

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: nights * booking.price * 100, // Convert to cents
      currency: 'kes',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        roomId: roomId.toString(),
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests: booking.guests.toString(),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(400).json({
      message: 'Error creating payment intent',
    });
  }
}
