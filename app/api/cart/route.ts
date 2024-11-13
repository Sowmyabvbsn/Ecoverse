import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, productId, quantity = 1 } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    const existingCartItem = await db.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    let cartItem;

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + quantity;

      if (newQuantity <= 0) {
        await db.cart.delete({
          where: {
            userId_productId: {
              userId,
              productId,
            },
          },
        });

        return NextResponse.json({
          success: true,
          message: "Item removed from cart",
        });
      } else {
        cartItem = await db.cart.update({
          where: {
            userId_productId: {
              userId,
              productId,
            },
          },
          data: {
            quantity: newQuantity,
          },
        });
      }
    } else if (quantity > 0) {
      // check product is present or not
      const product = await db.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          price: true,
        },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Product was not found!" },
          { status: 404 }
        );
      }

      cartItem = await db.cart.create({
        data: {
          userId,
          productId,
          quantity,
          price: product.price,
        },
      });
    } else {
      return NextResponse.json(
        {
          error:
            "Invalid Operation: Cannot increase or decrease quantity below 1 for non-existent item",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: cartItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update cart!", error);
    return NextResponse.json(
      { error: "Failed to update cart!" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
      const carts = await db.cart.findMany({ where: { userId: id } });
      return NextResponse.json({ success: true, data: carts }, { status: 200 });
    }

    return NextResponse.json(
      { error: "Provide User ID for user carts" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Failed to fetch the cart", error);
    return NextResponse.json(
      { error: "Failed to fetch the cart" },
      { status: 500 }
    );
  }
}
