"use client";

import { closeMenu, toggleMenu } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Heart, Menu, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.ui.isMenuOpen);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(closeMenu());
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, dispatch]);

  return (
    <div>
      <header className='bg-green-50 py-4 relative z-20'>
        <div className='container mx-auto px-4 flex items-center justify-between'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-2xl font-bold text-green-600'>EcoMart</span>
          </Link>
          <nav className='hidden md:flex space-x-4'>
            <Link href='/' className='text-green-800 hover:text-green-600'>
              Home
            </Link>
            <Link
              href='/auctions'
              className='text-green-800 hover:text-green-600'
            >
              Auctions
            </Link>
            <Link
              href='/eco-sellers'
              className='text-green-800 hover:text-green-600'
            >
              Eco-Sellers
            </Link>
            <Link
              href='/subscriptions'
              className='text-green-800 hover:text-green-600'
            >
              Subscriptions
            </Link>
            <Link href='/about' className='text-green-800 hover:text-green-600'>
              About
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
              onClick={handleToggleMenu}
            >
              <Menu className='h-6 w-6' />
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-green-50 shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
        ref={menuRef}
      >
        <div className='flex justify-between items-center p-4 border-b border-green-200'>
          <span className='text-xl font-bold text-green-600'>Menu</span>
          <Button variant='ghost' onClick={handleToggleMenu}>
            <X className='h-6 w-6' />
          </Button>
        </div>
        <nav className='flex flex-col p-4'>
          <Link href='/' className='text-green-800 hover:text-green-600 py-2'>
            Home
          </Link>
          <Link
            href='/auctions'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Auctions
          </Link>
          <Link
            href='/eco-sellers'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Eco-Sellers
          </Link>
          <Link
            href='/subscriptions'
            className='text-green-800 hover:text-green-600 py-2'
          >
            Subscriptions
          </Link>
          <Link
            href='/about'
            className='text-green-800 hover:text-green-600 py-2'
          >
            About
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
