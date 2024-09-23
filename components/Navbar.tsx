import { Heart, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./Search";

const Navbar = () => {
  return (
    <div className='bg-[#F0F2F3]'>
      <div className='block sm:flex items-center justify-between w-8/12 mx-auto py-2'>
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
            <div className='nav-btn'>
              <div className='flex items-center justify-between gap-2'>
                <ShoppingCart />
                Cart
                <span className='bg-[#007580] rounded-full w-5 h-5 text-white flex items-center justify-center'>
                  1
                </span>
              </div>
            </div>
            <div className='nav-btn'>
              <Heart />
            </div>
            <div className='nav-btn'>
              <UserRound />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
