import { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'
import { contacts, insertContactSchema } from '@/lib/schema'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const contact = insertContactSchema.parse(req.body)
      const result = await sql`
        INSERT INTO ${contacts} (
          name, email, message
        ) VALUES (
          ${contact.name}, ${contact.email}, ${contact.message}
        )
        RETURNING *
      `
      res.status(201).json(result.rows[0])
    } catch (error) {
      res.status(400).json({ message: 'Invalid contact data' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
