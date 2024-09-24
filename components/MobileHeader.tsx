"use client";

/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "./Header";
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { Separator } from "./ui/separator";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function MobileHeader() {
  const path = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline'>
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className='py-4'>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col items-start gap-2'>
              <Button variant={"outline"} className='nav-btn'>
                <Heart /> Wishlist
              </Button>
              <Button variant={"outline"} className='nav-btn'>
                <UserRound /> Profile
              </Button>
              <Button variant={"outline"} className='nav-btn'>
                <div className='flex items-center justify-between gap-2'>
                  <ShoppingCart /> Cart
                  <span className='bg-[#007580] rounded-full w-5 h-5 text-white flex items-center justify-center'>
                    1
                  </span>
                </div>
              </Button>
            </div>
          </div>

          <Separator className='my-2 bg-gray-100' />
          <div className='flex flex-col items-center gap-4'>
            <Button variant={"outline"}>All Categories</Button>
            <ul className='flex flex-col items-center gap-4'>
              {links.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className={cn(
                      "text-gray-700 hover:text-[#007580]",
                      path === item.link && "text-[#007580]"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='absolute bottom-4 w-full mx-auto'>
            <p className='sm:text-center text-sm gap-2'>
              <span>Contact: </span>
              <Link href={"tel:8085550111"} className='font-bold'>
                (808) 555-0111
              </Link>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
