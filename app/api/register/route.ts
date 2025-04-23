import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password, userType } = req.body;

    if (!username || !password || !userType) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // Check if the username already exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          userType,
        },
      });

      res.status(201).json({ message: 'User registered successfully.', user: newUser });
    } catch (error) {
      console.error('Error registering user:', error); // Log the error for debugging
      res.status(500).json({ error: 'Internal server error.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}