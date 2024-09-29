"use client";
import BidCard from "@/components/BidCard";
import SearchFilter from "@/components/SearchFilter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const auctions = [
  {
    id: 1,
    name: "Upcycled Denim Jacket",
    time: "2:15:30",
    currentBid: 45,
    buyNow: 80,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    category: "Fashion",
    badges: ["Upcycled", "Local Artisan"],
  },
  {
    id: 2,
    name: "Bamboo Cutlery Set",
    time: "1:30:45",
    currentBid: 15,
    buyNow: 30,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    category: "Home",
    badges: ["Zero Waste", "Carbon Neutral"],
  },
  {
    id: 3,
    name: "Solar-Powered Backpack",
    time: "3:45:00",
    currentBid: 75,
    buyNow: 120,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    category: "Tech",
    badges: ["Eco-Tech", "Energy Efficient"],
  },
  {
    id: 4,
    name: "Organic Cotton Bedding",
    time: "4:20:15",
    currentBid: 55,
    buyNow: 100,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    category: "Home",
    badges: ["Organic", "Fair Trade"],
  },
  {
    id: 5,
    name: "Recycled Plastic Watch",
    time: "0:45:30",
    currentBid: 30,
    buyNow: 60,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    category: "Fashion",
    badges: ["Recycled Materials", "Ocean Plastic"],
  },
  {
    id: 6,
    name: "Biodegradable Phone Case",
    time: "1:10:00",
    currentBid: 10,
    buyNow: 25,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    category: "Tech",
    badges: ["Biodegradable", "Plant-based"],
  },
];

export default function AuctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredAuctions =
    selectedCategory === "all"
      ? auctions
      : auctions.filter(
          (auction) => auction.category.toLowerCase() === selectedCategory
        );

  return (
    <div className='min-h-screen bg-green-50 py-8'>
      <div className='container px-4'>
        <h2 className='text-3xl font-bold text-green-800 mb-8'>
          Live Auctions
        </h2>

        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0'>
          <SearchFilter
            searchTerm={search}
            setSearchTerm={setSearch}
            onSubmit={() => {}}
            placeholder='Search auctions...'
          />

          <div className='flex items-center space-x-4'>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className='w-48 bg-white'>
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                <SelectContent>
                  {[
                    { name: "All Categories", value: "all" },
                    { name: "Fashion", value: "fashion" },
                    { name: "Home", value: "home" },
                    { name: "Tech", value: "tech" },
                  ].map((select, idx) => (
                    <SelectItem key={idx} value={select.value}>
                      {select.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredAuctions.map((data, idx) => (
            <BidCard key={idx} {...data} />
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <Button variant={"outline"} className='flex items-center space-x-2'>
            <span>Load More</span>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
