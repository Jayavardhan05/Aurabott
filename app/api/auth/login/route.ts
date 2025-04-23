import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, password, userType } = await req.json();

    if (!username || !password || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Check userType matches
    if (user.userType !== userType) {
      return NextResponse.json({ error: "User type mismatch" }, { status: 401 });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    // Authentication successful
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
