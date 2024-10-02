"use client";

import ProductCard from "@/components/Product/ProductCard";
import ProductFilters from "@/components/Product/ProductFilters";
import SearchFilter from "@/components/SearchFilter";
import { IProduct, setSearchTerm } from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

// Mock data for products
const allProducts: IProduct[] = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    price: 25,
    rating: 4.5,
    numReviews: 120,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    certifications: ["Recycled", "BPA-Free"],
  },
  {
    id: 2,
    name: "Bamboo Toothbrush Set",
    price: 15,
    rating: 4.2,
    numReviews: 85,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    certifications: ["Biodegradable"],
  },
  {
    id: 3,
    name: "Solar Power Bank",
    price: 40,
    rating: 4.8,
    numReviews: 200,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    certifications: ["Energy Efficient"],
  },
  {
    id: 4,
    name: "Reusable Produce Bags",
    price: 12,
    rating: 4.3,
    numReviews: 150,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    certifications: ["Organic", "Recycled"],
  },
  {
    id: 5,
    name: "Biodegradable Phone Case",
    price: 20,
    rating: 4.0,
    numReviews: 75,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    certifications: ["Biodegradable"],
  },
  {
    id: 6,
    name: "Recycled Paper Notebook",
    price: 8,
    rating: 4.6,
    numReviews: 180,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    certifications: ["Recycled"],
  },
];

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.products);

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container'>
        <h1 className='page-heading'>Eco-Friendly Products</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          <ProductFilters />

          <div className='w-full lg:w-3/4'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-start mb-8 space-y-4 md:space-y-0 '>
              <div className='flex items-center space-x-2 w-full md:w-auto'>
                <SearchFilter
                  placeholder='Search products...'
                  searchTerm={searchTerm}
                  setSearchTerm={handleSearch}
                  onSubmit={() => {}}
                />
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {allProducts.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
