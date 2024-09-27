"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  ecoRating: number;
  category: string[];
  image: string;
}

export type Product = {
  product: ProductCardProps;
};

export function ProductCard({ product }: Product) {
  console.log(product);

  return (
    <Card className='shadow-md'>
      <CardHeader className='p-0'>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className='w-full h-48 object-cover rounded-t-lg'
        />
      </CardHeader>
      <CardContent className='p-4'>
        <CardTitle className='text-lg font-semibold mb-2'>
          {product.name}
        </CardTitle>
        <CardDescription className='text-sm text-gray-600 mb-2'>
          {product.description}
        </CardDescription>
        <div className='flex items-center mb-2'>
          {Array.from({ length: product.ecoRating }).map((_, index) => (
            <Star
              key={index}
              className='w-4 h-4 fill-green-500 text-green-500'
            />
          ))}
        </div>
        <div className='text-lg font-bold'>${product.price}</div>
      </CardContent>
      <CardFooter className='p-4 flex items-center justify-between'>
        <Button
          size='sm'
          className='bg-green-600 hover:bg-green-700 text-white'
        >
          <ShoppingCart className='w-4 h-4 mr-2' />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
