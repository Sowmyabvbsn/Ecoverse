import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const SearchProduct = () => {
  return (
    <section className='bg-green-50 py-12 md:py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center'>
          Find Your Eco-Friendly Products
        </h2>
        <div className='max-w-md mx-auto flex'>
          <Input
            type='search'
            placeholder='Search for products...'
            className='flex-grow'
          />
          <Button
            type='submit'
            className='ml-2 bg-green-600 hover:bg-green-700 text-white'
          >
            <Search className='h-4 w-4' />
            <span className='sr-only'>Search</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SearchProduct;
