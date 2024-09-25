import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const FeatureSection = () => {
  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center'>
          Featured Categories
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {[
            {
              name: "Clothing",
              image:
                "https://plus.unsplash.com/premium_photo-1673356302439-fa5252f45abb?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Home Goods",
              image:
                "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?q=80&w=2585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Electronics",
              image:
                "https://plus.unsplash.com/premium_photo-1723662147247-0ac250fabce1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Personal Care",
              image:
                "https://images.unsplash.com/photo-1501959915551-4e8d30928317?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((category) => (
            <div
              key={category.name}
              className='relative bg-cover bg-center rounded-lg shadow-md p-6 text-center'
              style={{
                backgroundImage: `url(${category.image})`,
                minHeight: "300px",
              }}
            >
              {/* Overlay for darkening the background image */}
              <div className='absolute inset-0 bg-black opacity-30 rounded-lg'></div>

              <div className='relative z-10 flex flex-col justify-center h-full'>
                <h3 className='text-xl font-semibold text-white mb-4'>
                  {category.name}
                </h3>
                <Button
                  variant='outline'
                  className='bg-transparent border-white text-white hover:bg-green-50 w-full'
                >
                  <Link
                    href={`/products?category=${category.name.toLowerCase()}`}
                  >
                    Explore {category.name}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
