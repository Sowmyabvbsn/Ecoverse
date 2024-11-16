"use client";

import { IProduct } from "@/features/products/productSlice";
import { Star } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ProductCard = ({
  id,
  title,
  images,
  price,
  category,
  rating,
}: IProduct) => {
  const router = useRouter();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Image
          src={images[0]}
          alt={title}
          width={400}
          height={200}
          loading="lazy"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <p className="text-green-700 font-bold mb-2">${price}</p>
        <div className="flex items-center mb-2">
          {rating &&
            [...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          <span className="ml-2 text-xs text-gray-600">
            {/* {rating.toFixed(1)} ({numReviews} reviews) */}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {category.map((cert, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded"
            >
              {cert}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          onClick={() => router.push(`/products/${id}`)}
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
