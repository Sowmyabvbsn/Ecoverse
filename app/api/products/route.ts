import { auth } from "@/auth";
import { db } from "@/lib/db";
import { productSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const validationFields = productSchema.safeParse(req.body);

    // if (!validationFields.success) {
    //   return { error: "Invalid Fields" };
    // }

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
}

export async function GET(req: NextRequest) {
  try {
    const sellerId = req.nextUrl.searchParams.get("sellerId"); // Get sellerId from query params if provided

    let products;
    if (sellerId) {
      products = await db.product.findMany({
        ...(sellerId && { where: { sellerId } }),
      });
    } else {
      products = await db.product.findMany();
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
