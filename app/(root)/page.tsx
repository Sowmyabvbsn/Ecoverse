"use client";
import FeatureSection from "@/components/Home/FeatureSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Home/HeroSection";
import HomeSearch from "@/components/Home/HomeSearch";
import Header from "../../components/Header";
import { useAppSelector } from "@/hooks/useReduxHooks";

export default function Home() {
  const isMenuOpen = useAppSelector((state) => state.ui.isMenuOpen);
  return (
    <div>
      {isMenuOpen && (
        <div className='fixed inset-0 bg-black opacity-30 z-30'></div>
      )}

      <Header />
      <main className='flex-grow'>
        <HeroSection />
        <FeatureSection />
        <HomeSearch />
      </main>

      <Footer />
    </div>
  );
}
