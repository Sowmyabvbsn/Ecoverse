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

  // Validate the `id` parameter
  if (!id || typeof id !== "string") {
    console.error("Invalid or missing 'id' in query params:", id);
    return NextResponse.json(
      { error: "Invalid user id provided" },
      { status: 400 }
    );
  }

  try {
    let data = await req.json();

    if (
      data.mobile &&
      typeof data.mobile === "string" &&
      /^\d+$/.test(data.mobile)
    ) {
      data.mobile = parseInt(data.mobile, 10);
    }

    // Verify user existence
    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) {
      console.error(`User with ID ${id} not found`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare nested data update for `address`, if provided
    const updateData = {
      ...data,
      ...(data.address && {
        address: {
          upsert: {
            create: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
              zipCode: data.address.zipCode,
            },
            update: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              country: data.address.country,
              zipCode: data.address.zipCode,
            },
          },
        },
      }),
    };

    // Update user data
    const updatedUser = await db.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
