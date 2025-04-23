import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { withAuth } from '../middleware';

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { className, timetable } = req.body;

    try {
      const newTimetable = await prisma.timetable.create({
        data: {
          className,
          timetable,
        },
      });
      res.status(201).json(newTimetable);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create timetable' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
