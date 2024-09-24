import { Heart, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./Search";
import { Button } from "./ui/button";
import MobileHeader from "./MobileHeader";

const Navbar = () => {
  return (
    <div className='bg-[#F0F2F3]'>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-2 lg:w-8/12 mx-auto py-2 px-2'>
        <Link href={"/"}>
          <Image
            src={"assets/logo.svg"}
            alt='EcoBid'
            width={300}
            height={300}
            className='w-40 rounded-full'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </Link>
        <div>
          <SearchInput />
        </div>

        <div className='hidden lg:block'>
          <div className='flex items-center justify-between gap-2'>
            <Button variant={"outline"} className='nav-btn'>
              <div className='flex items-center justify-between gap-2'>
                <ShoppingCart />
                Cart
                <span className='bg-[#007580] rounded-full w-5 h-5 text-white flex items-center justify-center'>
                  1
                </span>
              </div>
            </Button>
            <Button variant={"outline"} className='nav-btn'>
              <Heart />
            </Button>
            <Button variant={"outline"} className='nav-btn'>
              <UserRound />
            </Button>
          </div>
        </div>

        <div className='lg:hidden'>
          <MobileHeader />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
