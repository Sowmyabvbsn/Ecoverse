"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Leaf, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

const initialCartItems = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    price: 25,
    quantity: 2,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
  },
  {
    id: 2,
    name: "Bamboo Toothbrush Set",
    price: 15,
    quantity: 1,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
  },
  {
    id: 3,
    name: "Reusable Produce Bags",
    price: 10,
    quantity: 3,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [carbonOffset, setCarbonOffset] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subTotal + carbonOffset;

  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container px-4'>
        <h1 className='page-heading'>Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className='pt-6 text-center'>
              <p className='text-gray-600 mb-4'>Your cart is empty.</p>
              <Button asChild>
                <Link href={"/products"}>Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='md:col-span-2'>
              {cartItems.map((item) => (
                <Card key={item.id} className='mb-4'>
                  <CardContent className='p-4'>
                    <div className='flex items-center'>
                      <Image
                        src={item.image}
                        width={80}
                        height={80}
                        alt={item.name}
                        className='rounded-md mr-4'
                      />

                      <div className='flex-grow'>
                        <h3 className='font-bold'>{item.name}</h3>
                        <p className='text-green-600'>
                          {item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className='flex items-center space-x-2'>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className='h-4 w-4' />
                        </Button>

                        <Input
                          type='number'
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className='w-16 text-center'
                        />

                        <Button
                          variant={"outline"}
                          size={"icon"}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className='w-4 h-4' />
                        </Button>
                      </div>

                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className='ml-4 text-red-500'
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className='w-5 h-5' />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span>SubTotal</span>
                      <span>${subTotal.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className='flex justify-between font-semibold'>
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className='flex flex-col items-stretch'>
                  <Button className='w-full mb-4 bg-green-600 hover:bg-green-700 text-white'>
                    Proceed to Checkout
                  </Button>
                  <Link href={"/products"}>
                    <Button variant={"outline"} className='w-full'>
                      Continue Shopping
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className='mt-4'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Leaf className='mr-2 h-5 w-5 text-green-600' />
                    Carbon offset Donation
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className='text-sm text-gray-600 mb-4'>
                    Contribute to environmental causes and offset the carbon
                    footprint of your purchase.
                  </p>

                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Label htmlFor='carbonOffset'>Donation Amount</Label>
                      <Input
                        id='carbonOffset'
                        type='number'
                        value={carbonOffset}
                        onChange={(e) =>
                          setCarbonOffset(Math.max(0, parseInt(e.target.value)))
                        }
                        className='w-24 text-right'
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
