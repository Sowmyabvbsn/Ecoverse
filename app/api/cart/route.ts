import { 
  addToCart, 
  getCartByUserId, 
  updateCartQuantity, 
  deleteCartItem,
  getProductById 
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

/**
   @method DELETE 
   @param userId - ID of the user
   @param productId - ID of the product to add
   @param quantity - Amount to add or update (defaults to 1)
   @returns Updated cart item if successful, or missing error if the product is missing.
 */
export async function POST(req: NextRequest) {
  try {
    const { userId, productId, quantity = 1 } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "User ID and Product ID are required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product was not found!" },
        { status: 404 }
      );
    }

    const cartItem = await addToCart(userId, productId, quantity);

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

/** 
    @method GET 
    @param id - ID of the user
    @returns Return all carts for this user 
 */
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Provide User ID for user carts" },
        { status: 400 }
      );
    }

    const carts = await getCartByUserId(id);
    return NextResponse.json({ success: true, data: carts }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch the cart", error);
    return NextResponse.json(
      { error: "Failed to fetch the cart" },
      { status: 500 }
    );
  }
}

/** 
    @method PUT - Update the quantity value
    @param id - ID of the user
    @returns Return all carts for this user 
 */

export async function PUT(req: NextRequest) {
  try {
    const { id, quantity } = await req.json();

    if (!id || !quantity) {
      return NextResponse.json(
        { error: "Provide valid Cart ID and Quantity" },
        { status: 400 }
      );
    }

    const updateCartItem = await updateCartQuantity(id, quantity);

    return NextResponse.json(
      {
        success: true,
        data: updateCartItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update cart quantity", error);
    return NextResponse.json(
      { error: "Failed to update cart quantity" },
      { status: 500 }
    );
  }
}

/**
    @method DELETE 
    @param id - Cart ID  
*/
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Provide valid Cart ID" },
        { status: 400 }
      );
    }

    await deleteCartItem(id);

    return NextResponse.json(
      { success: true, message: "Item delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete cart", error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
