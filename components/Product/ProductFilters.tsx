"use client";

import { AccordionItem } from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionTrigger } from "../ui/accordion";
import { Checkbox } from "../ui/checkbox";

import {
  FilterType,
  updateFilter,
  updateMaxPrice,
} from "@/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Slider } from "../ui/slider";

const ProductFilters = () => {
  const dispatch = useAppDispatch();
  const { filters, maxPrice } = useAppSelector((state) => state.products);

  const handleFilterChange = (filterType: FilterType, value: string) => {
    dispatch(updateFilter({ filterType, value }));
  };

  const handleMaxPriceChange = (value: number[]) => {
    if (value.length > 0) {
      dispatch(updateMaxPrice(value[0]));
    }
  };

  return (
    <div className='w-full lg:w-1/4'>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='sustainability' className='border-b'>
          <AccordionTrigger>Sustainability</AccordionTrigger>
          <AccordionContent>
            {["Eco-Friendly", "Recycled", "Carbon Neutral"].map((badge) => (
              <div key={badge} className='flex items-center space-x-2 mb-2'>
                <Checkbox
                  id={badge}
                  checked={filters.sustainability.includes(badge)}
                  onCheckedChange={() =>
                    handleFilterChange("sustainability", badge)
                  }
                />
                <label
                  htmlFor={badge}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {badge}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='category' className='border-b'>
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            {["Fashion", "Home", "Tech", "Beauty"].map((category) => (
              <div key={category} className='flex items-center space-x-2 mb-2'>
                <Checkbox
                  id={category}
                  checked={filters.category.includes(category)}
                  onCheckedChange={() =>
                    handleFilterChange("category", category)
                  }
                />
                <label
                  htmlFor={category}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {category}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='seller' className='border-b'>
          <AccordionTrigger>Seller</AccordionTrigger>
          <AccordionContent>
            {["Local Artisan", "Eco Brand"].map((seller) => (
              <div key={seller} className='flex items-center space-x-2 mb-2'>
                <Checkbox
                  id={seller}
                  checked={filters.seller.includes(seller)}
                  onCheckedChange={() => handleFilterChange("seller", seller)}
                />
                <label
                  htmlFor={seller}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {seller}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='maxPrice' className='border-b'>
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent className='pt-4'>
            <Slider
              value={[maxPrice]}
              onValueChange={handleMaxPriceChange}
              min={0}
              max={10000}
              step={10}
              className='w-full'
            />
            <div className='flex justify-between mt-2'>
              <span>${maxPrice}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
