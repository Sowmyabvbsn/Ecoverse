"use client";
import { useState } from "react";
import Header from "../../components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import SearchProduct from "@/components/SearchProduct";
import Footer from "@/components/Footer";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      {isMenuOpen && (
        <div className='fixed inset-0 bg-black opacity-30 z-30'></div>
      )}

      <Header open={isMenuOpen} menuToggle={setIsMenuOpen} />

      <main className='flex-grow'>
        <HeroSection />
        <FeatureSection />
        <SearchProduct />
      </main>

      <Footer />
    </div>
  );
}
