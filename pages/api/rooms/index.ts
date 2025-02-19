import { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { rooms } from '@/lib/schema'

const db = drizzle(sql)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const result = await db.select().from(rooms)
      res.status(200).json(result)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      res.status(500).json({ message: 'Error fetching rooms' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}