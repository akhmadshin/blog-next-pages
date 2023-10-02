// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { timeout } from '@/lib/utils';
import { articles } from '@/lib/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[]>
) {
  await timeout(2000);
  const shortData = articles.map(({content, ...data}) => data);
  res.status(200).json(shortData)
}
