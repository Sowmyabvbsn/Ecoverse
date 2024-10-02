import React from "react";

import BidCard from "../BidCard";

export interface ICard {
  id?: number;
  name: string;
  time: string;
  currentBid: number;
  buyNow: number;
  image: string;
  badges: string[];
}

const data: ICard[] = [
  {
    name: "Upcycled Denim Jacket",
    time: "2:15:30",
    currentBid: 45,
    buyNow: 80,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Upcycled", "Local Artisan"],
  },
  {
    name: "Bamboo Cutlery Set",
    time: "1:30:45",
    currentBid: 15,
    buyNow: 30,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Zero Waste", "Carbon Neutral"],
  },
  {
    name: "Solar-Powered Backpack",
    time: "3:45:00",
    currentBid: 75,
    buyNow: 120,
    image: "https://g-aeaz6ajxyxp.vusercontent.net/placeholder.svg",
    badges: ["Eco-Tech", "Energy Efficient"],
  },
];

const FeatureSection = () => {
  return (
    <section className='py-12 md:py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center'>
          Featured Auctions
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
          {data.map((data, idx) => (
            <BidCard key={idx} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
