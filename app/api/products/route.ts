import { db } from "@/lib/db";
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
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
    const search = req.nextUrl.searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const products = await db.product.findMany({
      where: {
        ...(sellerId && { sellerId }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } }, // Search in name
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            }, // Search in description
          ],
        }),
      },
      skip,
      take: limit,
    });

    const totalItem = await db.product.count({
      where: {
        ...(sellerId && { sellerId }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } }, // Search in name
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            }, // Search in description
          ],
        }),
      },
    });
    const totalPage = Math.ceil(totalItem / limit);

    return NextResponse.json({
      success: true,
      data: products,
      totalPage,
      totalItem,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
