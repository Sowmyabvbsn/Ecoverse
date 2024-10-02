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
import { ArrowLeft, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const product = {
  id: 1,
  name: "Vintage Solar-Powered Radio",
  currentBid: 75,
  buyNowPrice: 150,
  rating: 4.7,
  numReviews: 89,
  description:
    "This vintage solar-powered radio combines retro aesthetics with eco-friendly technology. Perfect for outdoor enthusiasts and collectors alike.",
  image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
  certifications: ["Energy Efficient", "Recycled Materials"],
  endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  reviews: [
    {
      id: 1,
      user: "RetroLover",
      rating: 5,
      comment: "Amazing find! Works perfectly and looks great.",
    },
    {
      id: 2,
      user: "SolarEnthusiast",
      rating: 4,
      comment: "Good sound quality and love the solar feature.",
    },
    {
      id: 3,
      user: "VintageCollector",
      rating: 5,
      comment: "A true gem for any collection!",
    },
  ],
};

export default function AuctionDetailsPage() {
  const [timeLeft, setTimeLeft] = useState("");
  const [bidAmount, setBidAmount] = useState(product.currentBid + 1);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = product.endTime.getTime() - now.getTime();

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("Auction Ended");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setBidAmount(
      isNaN(value) || value <= product.currentBid
        ? product.currentBid + 1
        : value
    );
  };

  const handleBid = () => {
    // Here you would typically send the bid to your backend
    console.log(`User placed a bid of $${bidAmount}`);
  };

  const handleBuyNow = () => {
    // Here you would typically process the buy now purchase
    console.log(
      `User purchased the item at the buy now price of $${product.buyNowPrice}`
    );
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
    // Here you would typically send the rating to your backend
    console.log(`User rated the product: ${rating}`);
  };
  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container px-4'>
        <Link
          href='/products'
          className='flex items-center text-green-600 hover:text-green-800 mb-4'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Products
        </Link>

        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={200}
              className='w-full rounded-lg shadow-lg'
            />
          </div>

          <div>
            <h1 className='page-heading'>{product.name}</h1>
            <div className='flex items-center mb-4'>
              <Clock className='mr-2 h-5 w-5 text-green-600' />
              <span className='text-lg font-semibold text-green-600'>
                {timeLeft}
              </span>
            </div>

            <div className='flex items-center mb-4'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className='ml-2 text-lg text-gray-600'>
                {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </span>
            </div>

            <div className='flex flex-wrap gap-2 mb-4'>
              {product.certifications.map((cert, index) => (
                <span
                  key={index}
                  className='bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded'
                >
                  {cert}
                </span>
              ))}
            </div>

            <p className='text-gray-600 mb-6'>{product.description}</p>
            <div className='mb-6'>
              <p className='text-xl font-semibold mb-2'>
                Current Bid: ${product.currentBid}
              </p>
              <div className='flex items-center mb-2'>
                <Label htmlFor='bidAmount' className='mr-4'>
                  Your Bid:
                </Label>
                <Input
                  id='bidAmount'
                  type='number'
                  min={product.currentBid + 1}
                  step='0.01'
                  value={bidAmount}
                  onChange={handleBidChange}
                  className='w-32'
                />
              </div>
              <Button onClick={handleBid} className='w-full mb-2'>
                Place Bid
              </Button>
            </div>

            <div className='mb-6'>
              <p className='text-xl font-semibold mb-2'>
                Buy Now Price: ${product.buyNowPrice}
              </p>
              <Button
                onClick={handleBuyNow}
                variant='outline'
                className='w-full'
              >
                Buy Now
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Rate this product</CardTitle>
                <CardDescription>Click on a star to rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex items-center'>
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

        <div className='mt-12'>
          <h2 className='text-2xl font-bold text-green-800 mb-4'>
            Customer Reviews
          </h2>
          {product.reviews.map((review) => (
            <Card key={review.id} className='mb-4'>
              <CardHeader>
                <CardTitle className='flex items-center'>
                  <span className='mr-2'>{review.user}</span>
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
