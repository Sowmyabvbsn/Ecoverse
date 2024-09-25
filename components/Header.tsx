"use client";

import { Heart, Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

const Header = ({
  open,
  menuToggle,
}: {
  open: boolean;
  menuToggle: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <header className='bg-green-50 py-4 relative z-20'>
        <div className='container mx-auto px-4 flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-2xl font-bold text-green-600'>EcoMart</span>
          </Link>
          <nav className='hidden md:flex space-x-4'>
            <Link href='/' className='nav-link'>
              Home
            </Link>
            <Link href='/products' className='nav-link'>
              Products
            </Link>
            <Link href='/collections' className='nav-link'>
              Collections
            </Link>
            <Link href='/about' className='nav-link'>
              About
            </Link>
            <Link href='/contact' className='nav-link'>
              Contact
            </Link>
          </nav>
          <div className='flex items-center space-x-4'>
            <Link
              href='/signin'
              className='text-green-800 hover:text-green-600 hidden md:inline-block'
            >
              Sign In
            </Link>
            <Link
              href='/profile'
              className='text-green-800 hover:text-green-600'
            >
              <User className='h-6 w-6' />
            </Link>
            <Link
              href='/wishlist'
              className='text-green-800 hover:text-green-600'
            >
              <Heart className='h-6 w-6' />
            </Link>
            <Link href='/cart' className='text-green-800 hover:text-green-600'>
              <ShoppingCart className='h-6 w-6' />
            </Link>
            <Button
              variant='ghost'
              className='md:hidden'
              onClick={() => menuToggle(true)}
            >
              <Menu className='h-6 w-6' />
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-green-50 shadow-lg transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className='flex justify-between items-center p-4 border-b border-green-200'>
          <span className='text-xl font-bold text-green-600'>Menu</span>
          <Button variant='ghost' onClick={() => menuToggle(false)}>
            <X className='h-6 w-6' />
          </Button>
        </div>
        <nav className='flex flex-col p-4'>
          <Link href='/' className='text-green-800 hover:text-green-600 py-2'>
            Home
          </Link>
          <Link
            href='/products'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Products
          </Link>
          <Link
            href='/collections'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Collections
          </Link>
          <Link
            href='/about'
            className='text-green-800 hover:text-green-600 py-2'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Contact
          </Link>
          <Link
            href='/signin'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Sign In
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
