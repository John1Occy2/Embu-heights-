import { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'
import { rooms } from '@/lib/schema'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const result = await sql`
        SELECT * FROM ${rooms} 
        WHERE id = ${Number(id)}
      `
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Room not found' })
      }
      
      res.status(200).json(result.rows[0])
    } catch (error) {
      res.status(500).json({ message: 'Error fetching room' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
