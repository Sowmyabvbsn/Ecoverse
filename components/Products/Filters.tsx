"use client";

import { useState } from "react";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

const Filters = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-semibold mb-2'>Price Range</h2>
        <Slider
          defaultValue={[priceRange[0]]}
          max={100}
          step={1}
          onValueChange={setPriceRange}
          className='w-full'
        />
        <div className='flex justify-between mt-2'>
          <span>${priceRange[0]}</span>
          {/* <span>${priceRange[1]}</span> */}
        </div>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Category</h2>
        <Select>
          <SelectTrigger className='bg-white'>
            <SelectValue placeholder='Select category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='all'>All Categories</SelectItem>
              <SelectItem value='Home'>Home</SelectItem>
              <SelectItem value='Fashion'>Fashion</SelectItem>
              <SelectItem value='Electronics'>Electronics</SelectItem>
              <SelectItem value='Beauty'>Beauty</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className='text-lg font-semibold mb-2'>Eco-Rating</h2>
        <Select
        // value={selectedEcoRating}
        // onValueChange={setSelectedEcoRating}
        >
          <SelectTrigger className='bg-white'>
            <SelectValue placeholder='Select eco-rating' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Ratings</SelectItem>
            <SelectItem value='1'>1+ Star</SelectItem>
            <SelectItem value='2'>2+ Stars</SelectItem>
            <SelectItem value='3'>3+ Stars</SelectItem>
            <SelectItem value='4'>4+ Stars</SelectItem>
            <SelectItem value='5'>5 Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex items-center space-x-2'>
        <Checkbox
          id='inStock'
          // checked={inStock} onCheckedChange={setInStock}
          className='bg-white'
        />
        <label
          htmlFor='inStock'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default Filters;
