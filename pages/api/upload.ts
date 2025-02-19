import { put } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const blob = await put(request.query.filename as string, request, {
    access: 'public',
  });
 
  return response.status(200).json(blob);
}
