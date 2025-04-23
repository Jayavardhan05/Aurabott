import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { withAuth } from '../middleware';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { studentId, result } = req.body;

    try {
      const newResult = await prisma.result.create({
        data: {
          studentId,
          result,
        },
      });
      res.status(201).json(newResult);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create result' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
