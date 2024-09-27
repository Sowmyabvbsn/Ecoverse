"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock product data
const product = {
  id: 1,
  name: "Eco-Friendly Water Bottle",
  price: 24.99,
  ecoRating: 5,
  inStock: true,
  description:
    "Our Eco-Friendly Water Bottle is designed with sustainability in mind. Made from 100% recycled materials, this bottle helps reduce plastic waste while keeping your drinks at the perfect temperature.",
  sustainabilityInfo:
    "This product is made from 100% recycled materials and is fully recyclable. By choosing this water bottle, you're helping to reduce plastic waste and minimize your environmental impact.",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  reviews: [
    {
      id: 1,
      user: "EcoWarrior",
      rating: 5,
      comment:
        "Love this bottle! It keeps my water cold all day and I feel good about using it.",
    },
    {
      id: 2,
      user: "GreenThumb",
      rating: 4,
      comment: "Great product, but I wish it came in more colors.",
    },
    {
      id: 3,
      user: "SustainableShopper",
      rating: 5,
      comment: "This is my go-to water bottle now. Highly recommend!",
    },
  ],
};

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} ${product.name}(s) to cart`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement submit review functionality
    console.log(
      `Submitted review: Rating ${reviewRating}, Comment: ${reviewComment}`
    );
    setReviewRating(5);
    setReviewComment("");
  };

  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Product Image Gallery */}
          <div>
            <div className='mb-4'>
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={400}
                className='w-full h-auto rounded-lg'
              />
            </div>
            <div className='grid grid-cols-4 gap-2'>
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  className={`w-full h-auto rounded-lg cursor-pointer ${
                    selectedImage === index ? "border-2 border-green-600" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div>
            <h1 className='text-3xl font-bold text-green-800 mb-2'>
              {product.name}
            </h1>
            <div className='flex items-center mb-2'>
              {Array.from({ length: product.ecoRating }).map((_, index) => (
                <Star
                  key={index}
                  className='w-5 h-5 fill-green-500 text-green-500'
                />
              ))}
              <span className='ml-2 text-sm text-gray-600'>Eco-Rating</span>
            </div>
            <p className='text-2xl font-bold text-green-600 mb-2'>
              ${product.price.toFixed(2)}
            </p>
            <p
              className={`text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              } mb-4`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className='text-gray-700 mb-4'>{product.description}</p>
            <div className='flex items-center space-x-4 mb-4'>
              <Input
                type='number'
                min='1'
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className='w-20'
              />
              <Button
                onClick={handleAddToCart}
                className='bg-green-600 hover:bg-green-700 text-white'
              >
                <ShoppingCart className='w-4 h-4 mr-2' />
                Add to Cart
              </Button>
            </div>
            <div className='bg-green-100 p-4 rounded-lg mb-4'>
              <h2 className='text-lg font-semibold text-green-800 mb-2'>
                Sustainability Information
              </h2>
              <p className='text-sm text-gray-700'>
                {product.sustainabilityInfo}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for Description and Reviews */}
        <Tabs defaultValue='description' className='mt-8'>
          <TabsList>
            <TabsTrigger value='description'>Description</TabsTrigger>
            <TabsTrigger value='reviews'>Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value='description'>
            <div className='bg-white p-4 rounded-lg'>
              <h2 className='text-xl font-semibold text-green-800 mb-2'>
                Product Description
              </h2>
              <p className='text-gray-700'>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value='reviews'>
            <div className='bg-white p-4 rounded-lg'>
              <h2 className='text-xl font-semibold text-green-800 mb-4'>
                Customer Reviews
              </h2>
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className='mb-4 pb-4 border-b last:border-b-0'
                >
                  <div className='flex items-center mb-2'>
                    <span className='font-semibold mr-2'>{review.user}</span>
                    <div className='flex'>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star
                          key={index}
                          className='w-4 h-4 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-700'>{review.comment}</p>
                </div>
              ))}
              <form onSubmit={handleSubmitReview} className='mt-6'>
                <h3 className='text-lg font-semibold text-green-800 mb-2'>
                  Leave a Review
                </h3>
                <div className='flex items-center mb-2'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-6 h-6 cursor-pointer ${
                        index < reviewRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => setReviewRating(index + 1)}
                    />
                  ))}
                </div>
                <Textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder='Write your review here...'
                  className='mb-2'
                />
                <Button
                  type='submit'
                  className='bg-green-600 hover:bg-green-700 text-white'
                >
                  Submit Review
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
