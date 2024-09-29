import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Facebook } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='bg-green-800 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4'>About EcoMart</h3>
            <p className='text-sm'>
              EcoBid is your platform for discovering and bidding on
              sustainable, eco-friendly products. Join us in making the world a
              greener place through conscious consumption!
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
                <Link href='/how-it-works' className='text-sm hover:underline'>
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href='/sustainability'
                  className='text-sm hover:underline'
                >
                  Our Sustainability Commitment
                </Link>
              </li>
              <li>
                <Link href='/contact' className='text-sm hover:underline'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4'>Connected With Us</h3>
            <div className='flex space-x-4'>
              <Link href={"#"} className='text-white hover:text-green-200 '>
                <Facebook className='h-6 w-6' />
              </Link>
              <Link href={"#"} className='text-white hover:text-green-200'>
                <InstagramLogoIcon className=' h-6 w-6' />
              </Link>
              <Link href={"#"} className='text-white hover:text-green-200'>
                <TwitterLogoIcon className='h-6 w-6' />
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-8 text-center text-sm'>
          <p>&copy; 2024 EcoBid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
