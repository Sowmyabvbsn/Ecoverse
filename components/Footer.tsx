import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className='bg-green-800 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>About EcoMart</h3>
            <p className='text-sm'>
              EcoMart is your one-stop shop for sustainable and eco-friendly
              products. Join us in making the world a greener place!
            </p>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/about' className='text-sm hover:underline'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm hover:underline'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='/faq' className='text-sm hover:underline'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href='/privacy' className='text-sm hover:underline'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Stay Connected</h3>
            <p className='text-sm mb-4'>
              Subscribe to our newsletter for the latest eco-friendly products
              and offers.
            </p>
            <form className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
              <Input
                type='email'
                placeholder='Your email'
                className='flex-grow placeholder:text-white'
              />
              <Button
                type='submit'
                className='bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto'
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className='mt-8 text-center text-sm'>
          <p>&copy; 2024 EcoMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
