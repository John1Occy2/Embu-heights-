import { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'
import { bookings, bookingFormSchema } from '@/lib/schema'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const booking = bookingFormSchema.parse(req.body)
      const result = await sql`
        INSERT INTO ${bookings} (
          room_id, name, email, check_in, check_out, 
          guests, status
        ) VALUES (
          ${booking.roomId}, ${booking.name}, ${booking.email},
          ${booking.checkIn}, ${booking.checkOut}, ${booking.guests},
          'pending'
        )
        RETURNING *
      `
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(400).json({ message: 'Invalid booking data' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
