"use client";
import SellerCard from "@/components/EcoSellers/SellerCard";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useState } from "react";

export interface ISeller {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  badges: string[];
  description: string;
}

const sellers: ISeller[] = [
  {
    id: 1,
    name: "GreenCraft Co.",
    location: "Portland, OR",
    rating: 4.8,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Upcycling Expert", "Zero Waste"],
    description: "Specializing in upcycled furniture and home decor.",
  },
  {
    id: 2,
    name: "EcoTech Innovations",
    location: "San Francisco, CA",
    rating: 4.9,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Eco-Tech Pioneer", "Energy Efficient"],
    description: "Creating cutting-edge sustainable technology solutions.",
  },
  {
    id: 3,
    name: "Natural Threads",
    location: "Austin, TX",
    rating: 4.7,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Organic Textiles", "Fair Trade"],
    description:
      "Offering a wide range of organic and ethically-made clothing.",
  },
  {
    id: 4,
    name: "Sustainable Suds",
    location: "Seattle, WA",
    rating: 4.6,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Plastic-Free", "Cruelty-Free"],
    description: "Handcrafted, eco-friendly personal care products.",
  },
  {
    id: 5,
    name: "Green Thumb Gardens",
    location: "Denver, CO",
    rating: 4.8,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Organic Certified", "Local Produce"],
    description: "Supplying organic seeds, plants, and gardening supplies.",
  },
  {
    id: 6,
    name: "Eco Adventurer",
    location: "Boulder, CO",
    rating: 4.7,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Recycled Materials", "Carbon Neutral"],
    description: "Sustainable outdoor gear for the conscious adventurer.",
  },
];

export default function EcoSellerPage() {
  const [search, setSearch] = useState("");
  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='page-heading'>Eco-Certified Sellers</h1>

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0'>
          <SearchFilter
            searchTerm={search}
            setSearchTerm={setSearch}
            onSubmit={() => {}}
          />

          <div className='flex items-center space-x-4'>
            <Button variant={"outline"} className='flex items-center space-x-2'>
              <MapPin className='h-4 w-4' />
              <span>Filter by Location</span>
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sellers.map((seller, idx) => (
            <SellerCard key={idx} {...seller} />
          ))}
        </div>

        <div className='mt-8 text-center'>
          <Button variant='outline' className='bg-white'>
            Load More Sellers
          </Button>
        </div>
      </div>
    </div>
  );
}
