// pages/api/userByEmail.ts
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email provided" });
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        address: true,
        Product: true,
        Review: true,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id || id !== "string") {
    return NextResponse.json({ error: "Invalid user id" });
  }

  try {
    const data = await req.json();
    const updateUser = await db.user.update({
      where: { id },
      data,
    });

    return NextResponse.json({ updateUser });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" });
  }
}
