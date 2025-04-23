import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { withAuth } from '../middleware';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { className, schedule } = req.body;

    try {
      const newSchedule = await prisma.classSchedule.create({
        data: {
          className,
          schedule,
        },
      });
      res.status(201).json(newSchedule);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create class schedule' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
