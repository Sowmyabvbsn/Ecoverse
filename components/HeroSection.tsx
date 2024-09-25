import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className='bg-green-100 py-20 md:py-40'>
      <div className='container mx-auto px-4 text-center'>
        <h1 className='text-3xl md:text-5xl font-bold text-green-800 mb-4'>
          Sustainable Shopping for a Greener Future
        </h1>
        <p className='text-lg md:text-xl text-green-700 mb-8'>
          Discover eco-friendly products that make a difference.
        </p>
        <div className='flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4'>
          <Button className='bg-green-600 hover:bg-green-700 text-white w-full md:w-auto'>
            <Link href='/products'>Shop Now</Link>
          </Button>
          <Button
            variant='outline'
            className='border-green-600 text-green-600 hover:bg-green-50 w-full md:w-auto'
          >
            <Link href='/collections'>Browse Collections</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
