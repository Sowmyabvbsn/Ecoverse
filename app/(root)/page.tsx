"use client";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/Home/FeatureSection";
import HeroSection from "@/components/Home/HeroSection";
import WhyChooseEcoBid from "@/components/Home/WhyChooseEcoBid";
import { useAppSelector } from "@/hooks/useReduxHooks";
import Header from "../../components/Header";
import CategoryList from "@/components/Home/CategoryList";
import JoinUS from "@/components/Home/JoinUS";

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
        {/* <HomeSearch /> */}
        <WhyChooseEcoBid />
        <CategoryList />
        <JoinUS />
      </main>

      <Footer />
    </div>
  );
}
