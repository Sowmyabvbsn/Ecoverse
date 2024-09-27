"use client";

import { useState } from "react";
import Pagination from "./Pagination";
import { ProductCard, ProductCardProps } from "./ProductCard";

const products: ProductCardProps[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Eco-Friendly Product ${i + 1}`,
  description: "A sustainable and environmentally conscious product.",
  price: 10,
  ecoRating: 3,
  category: ["Home", "Fashion", "Electronics", "Beauty"],
  image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
}));
const ProductLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  return (
    <div className='md:col-span-3'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        filteredProductsLength={10}
        productsPerPage={productsPerPage}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default ProductLists;
