"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const links = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Product", link: "/product" },
    { name: "Pages", link: "/pages" },
    { name: "About", link: "/about" },
  ];

  return (
    <div className='border-b'>
      <div className='container flex items-center justify-between py-4'>
        <div className='flex items-center gap-4'>
          <Button variant={"outline"}>All Categories</Button>
          <ul className='flex items-center gap-4'>
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

        <div>
          <p className='flex items-center gap-2'>
            <span>Contact:</span>
            <span className='font-bold'>(808) 555-0111</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
