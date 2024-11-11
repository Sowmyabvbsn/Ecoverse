"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProduct } from "@/features/products/productSlice";
import useProduct from "@/hooks/useProducts";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const product = {
  id: 1,
  name: "Eco-Friendly Water Bottle",
  price: 25,
  rating: 4.5,
  numReviews: 120,
  description:
    "Stay hydrated sustainably with our eco-friendly water bottle. Made from recycled materials, this durable bottle keeps your drinks cold for hours while reducing plastic waste.",
  image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
  certifications: ["Recycled", "BPA-Free"],
  inStock: true,
  reviews: [
    {
      id: 1,
      user: "EcoWarrior",
      rating: 5,
      comment: "Love this bottle! It keeps my water cold all day.",
    },
    {
      id: 2,
      user: "GreenThumb",
      rating: 4,
      comment: "Great quality, but a bit pricey.",
    },
    {
      id: 3,
      user: "EarthLover",
      rating: 5,
      comment: "Excellent product, highly recommend!",
    },
  ],
};

export default function ProductDetailsPage() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const { getProductByID } = useProduct();
  const [productData, setProductData] = useState<IProduct>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you would typically send the rating to your backend
    console.log(`User rated the product: ${rating}`);
  };

  useEffect(() => {
    if (productId) {
      getProductByID(productId)
        .then((data) => setProductData(data))
        .catch((error) => setErrorMessage(error.error));
    }
  }, [productId]);

  if (!productData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        LOADING...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {errorMessage}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container px-4">
        <Link
          href="/products"
          className="flex items-center text-green-600 hover:text-green-800 mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image
              src={
                productData?.images[0] ||
                "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg"
              }
              alt={productData?.title}
              width={400}
              height={200}
              className="w-full h-[600px] rounded-lg shadow-lg object-cover"
            />
          </div>

          <div>
            <h1 className="page-heading">{productData.title}</h1>
            <p className="text-2xl text-green-700 font-bold mb-4">
              ₹{productData.price}
            </p>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(4)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-lg text-gray-600">
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {productData.category.map((cert, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded"
                >
                  {cert}
                </span>
              ))}
            </div>

            <p className="text-gray-600 mb-6">{productData.description}</p>
            <div className="flex items-center mb-6">
              <Label htmlFor="quantity" className="mr-4">
                Quantity:
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20"
              />
            </div>
            <Button className="w-full mb-4" disabled={!product.inStock}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>Rate this product</CardTitle>
                <CardDescription>Click on a star to rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer ${
                        star <= userRating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating(star)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Customer Reviews
          </h2>
          {product.reviews.map((review) => (
            <Card key={review.id} className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="mr-2">{review.user}</span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
