import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const productId = req.nextUrl.pathname.split("/").pop();

    if (!productId) {
      return NextResponse.json(
        {
          error: "Product ID is required",
        },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product) {
      return NextResponse.json({ error: "Product not found", status: 404 });
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const productId = req.nextUrl.pathname.split("/").pop();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deleteProduct = await db.product.delete({ where: { id: productId } });

    if (!deleteProduct) {
      return NextResponse.json(
        { error: "Product is not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error, message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
