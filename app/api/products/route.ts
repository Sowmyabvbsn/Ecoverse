import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { title, description, images, sellerId, category, price, stocks } =
      await req.json();

    if (
      !title ||
      !description ||
      !images ||
      !sellerId ||
      !category ||
      !price ||
      !stocks
    ) {
      return NextResponse.json({ error: "All fields are required" });
    }

    const newProduct = await db.product.create({
      data: {
        title,
        description,
        images,
        price,
        stocks,
        sellerId,
        category,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
};
