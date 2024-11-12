import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative  bg-cover bg-center bg-no-repeat py-20 md:py-40">
      {/* Background Image */}
      <Image
        src="/assets/eco-bid-banner.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority
      />
      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-70 "></div>

      <div className="relative container mx-auto px-4 text-center ">
        <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
          Bid for a Sustainable Future
        </h1>
        <p className="text-lg md:text-xl text-green-700 mb-8">
          Discover and bid on eco-friendly products from certified sustainable
          sellers.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
            <Link href="/auctions">Explore Auctions</Link>
          </Button>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 w-full md:w-auto"
          >
            <Link href="/products" className="flex items-center gap-2">
              <span>Browse Products</span>
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
