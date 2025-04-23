import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, userType } = body;

    if (!username || !password || !userType) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists.' }, { status: 400 });
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

    return NextResponse.json({ message: 'User registered successfully.', user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
  
}
