import Filters from "@/components/Products/Filters";
import SearchProducts from "@/components/Products/SearchProducts";
import React from "react";

const Products = () => {
  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container px-4'>
        <h1 className='text-3xl font-bold text-green-800 mb-8'>Our Products</h1>
        <SearchProducts />

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {/* Filters */}
          <Filters />
        </div>
      </div>
    </div>
  );
};

export default Products;
