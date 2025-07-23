import { getUserByEmail, getUserById, updateUser } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email provided" });
  }

  try {
    const user = await getUserByEmail(email);
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
    const existingUser = await getUserById(id);
    if (!existingUser) {
      console.error(`User with ID ${id} not found`);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();
    
    // Handle mobile number conversion
    if (
      data.mobile &&
      typeof data.mobile === "string" &&
      /^\d+$/.test(data.mobile)
    ) {
      data.mobile = parseInt(data.mobile, 10);
    }

    const updatedUser = await updateUser(id, data);

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
