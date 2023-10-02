// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { timeout } from '@/lib/utils';
import { articles } from '@/lib/data';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {slug} = req.query;
  await timeout(2000);
  const shortData = articles.find((article) => article.slug === slug);
  res.status(200).json(shortData)
}
