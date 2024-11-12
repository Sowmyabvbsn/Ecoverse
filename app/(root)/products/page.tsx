"use client";

import ProductCard from "@/components/Product/ProductCard";
import ProductFilters from "@/components/Product/ProductFilters";
import SearchFilter from "@/components/SearchFilter";
import { setSearchTerm } from "@/features/products/productSlice";
import useProduct from "@/hooks/useProducts";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { useEffect } from "react";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { getProducts } = useProduct();
  const { searchTerm } = useAppSelector((state) => state.products);
  const products = useAppSelector((state) => state.products.products);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="container">
        <h1 className="page-heading">Eco-Friendly Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters />

          <div className="w-full lg:w-3/4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start mb-8 space-y-4 md:space-y-0 ">
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <SearchFilter
                  placeholder="Search products..."
                  searchTerm={searchTerm}
                  setSearchTerm={handleSearch}
                  onSubmit={() => {}}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
