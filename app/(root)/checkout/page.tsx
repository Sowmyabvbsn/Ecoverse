"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Leaf, Truck } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const orderItems = [
  { id: 1, name: "Eco-Friendly Water Bottle", price: 25, quantity: 2 },
  { id: 2, name: "Bamboo Toothbrush Set", price: 15, quantity: 1 },
  { id: 3, name: "Reusable Produce Bags", price: 10, quantity: 3 },
];

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = shippingOption === "carbon-neutral" ? 10 : 5;
  const tax = subtotal * 0.1; // Assuming 10% tax
  const ecoLoyaltyDiscount = 5; // Mock discount from eco-loyalty points
  const total = subtotal + shippingCost + tax - ecoLoyaltyDiscount;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log(data);
    alert("Order placed successfully!");
  };

  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='page-heading'>Checkout</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        id='firstName'
                        {...register("firstName", { required: true })}
                      />
                      {errors.firstName && (
                        <span className='text-red-500 text-sm'>
                          This field is required
                        </span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        id='lastName'
                        {...register("lastName", { required: true })}
                      />
                      {errors.firstName && (
                        <span className='text-red-500 text-sm'>
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='address'>Address</Label>
                    <Input
                      id='address'
                      {...register("address", { required: true })}
                    />
                    {errors.firstName && (
                      <span className='text-red-500 text-sm'>
                        This field is required
                      </span>
                    )}
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='city'>City</Label>
                      <Input
                        id='city'
                        {...register("city", { required: true })}
                      />
                      {errors.city && (
                        <span className='text-red-500 text-sm'>
                          This field is required
                        </span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor='zipCode'>ZIP Code</Label>
                      <Input
                        id='zipCode'
                        {...register("zipCode", { required: true })}
                      />
                      {errors.zipCode && (
                        <span className='text-red-500 text-sm'>
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor='country'>Country</Label>
                    <Select onValueChange={(value) => console.log(value)}>
                      <SelectTrigger id='country'>
                        <SelectValue placeholder='Select a country' />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value='us'>United States</SelectItem>
                        <SelectItem value='ca'>Canada</SelectItem>
                        <SelectItem value='uk'>United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className='mt-8'>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>

              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className='space-y-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='credit-card' id='credit-card' />
                    <Label htmlFor='credit-card' className='flex items-center'>
                      <CreditCard className='h-4 w-4 mr-2' />
                      Credit Card
                    </Label>
                  </div>

                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='paypal' id='paypal' />
                    <Label htmlFor='paypal'>PayPal</Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className='mt-4 space-y-4'>
                    <div>
                      <Label htmlFor='cardNumber'>Card Number</Label>
                      <Input
                        id='cardNumber'
                        placeholder='1234 5678 9012 3456'
                      />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='expiryDate'>Expiry Date</Label>
                        <Input id='expiryDate' placeholder='MM/YY' />
                      </div>
                      <div>
                        <Label htmlFor='cvv'>CVV</Label>
                        <Input id='cvv' placeholder='123' />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {orderItems.map((item) => (
                  <div key={item.id} className='flex justify-between mb-2'>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <Separator className='my-4' />

                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-green-600'>
                    <span>Eco-Loyalty Discount</span>
                    <span>-${ecoLoyaltyDiscount.toFixed(2)}</span>
                  </div>
                  <Separator className='my-4' />
                  <div className='flex justify-between font-bold'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='mt-8'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <Truck className='w-5 h-5 mr-2' />
                  Eco-Aware Shipping Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={shippingOption}
                  onValueChange={setShippingOption}
                  className='space-y-4'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='standard' id='standard' />
                    <Label htmlFor='standard'>Standard Shipping ($5)</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      value='carbon-neutral'
                      id='carbon-neutral'
                    />
                    <Label
                      htmlFor='carbon-neutral'
                      className='flex items-center'
                    >
                      <Leaf className='w-4 h-4 mr-2 text-green-600' />
                      Carbon-Neutral Delivery ($10)
                    </Label>
                  </div>
                </RadioGroup>
                <p className='mt-4 text-sm text-gray-600'>
                  Choose carbon-neutral delivery to offset the environmental
                  impact of your shipment.
                </p>
              </CardContent>
              <CardFooter className='mt-8'>
                <Button
                  className='w-full bg-green-600 hover:bg-green-700 text-white'
                  onClick={handleSubmit(onSubmit)}
                >
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
