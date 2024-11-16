"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { Leaf, Minus, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function CartPage() {
  const { data: session } = useSession();

  const { getCarts, updateQuantity, deleteCart } = useCart();
  const carts = useAppSelector((state) => state.carts.cart);

  const [carbonOffset, setCarbonOffset] = useState(0);

  const handleIncrease = async (id: string, newQuantity: number) => {
    await updateQuantity(id, newQuantity, "INCREASE");
  };
  const handleDecrease = async (id: string, newQuantity: number) => {
    await updateQuantity(id, newQuantity, "DECREASE");
  };

  const removeItem = async (id: string) => {
    await deleteCart(id);
  };

  const subTotal = carts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
    0
  );

  const total = subTotal + carbonOffset;

  useEffect(() => {
    if (session?.user.id) {
      getCarts(session?.user.id);
    }
  }, [getCarts, session?.user.id]);

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container px-4">
        <h1 className="page-heading">Your Shopping Cart</h1>

        {carts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-600 mb-4">Your cart is empty.</p>
              <Button asChild>
                <Link href={"/products"}>Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {carts.map(
                (item) =>
                  item.product !== undefined && (
                    <Card key={item.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Image
                            src={item.product.images[0]}
                            width={100}
                            height={100}
                            priority
                            alt={item.product.title}
                            className="rounded-md mr-4 w-20 h-20 object-cover object-center"
                          />

                          <div className="flex-grow">
                            <h3 className="font-bold">{item.product.title}</h3>
                            <p className="text-green-600">
                              {item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant={"outline"}
                              size={"icon"}
                              onClick={() =>
                                handleDecrease(
                                  item.id,
                                  (item.quantity ?? 0) - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>

                            <Input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-16 text-center"
                            />

                            <Button
                              variant={"outline"}
                              size={"icon"}
                              onClick={() =>
                                handleIncrease(
                                  item.id,
                                  (item.quantity ?? 0) + 1
                                )
                              }
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="ml-4 text-red-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>SubTotal</span>
                      <span>${subTotal.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-stretch">
                  <Button className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white">
                    Proceed to Checkout
                  </Button>
                  <Link href={"/products"}>
                    <Button variant={"outline"} className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-green-600" />
                    Carbon offset Donation
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Contribute to environmental causes and offset the carbon
                    footprint of your purchase.
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="carbonOffset">Donation Amount</Label>
                      <Input
                        id="carbonOffset"
                        type="number"
                        value={carbonOffset}
                        onChange={(e) =>
                          setCarbonOffset(Math.max(0, parseInt(e.target.value)))
                        }
                        className="w-24 text-right"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
