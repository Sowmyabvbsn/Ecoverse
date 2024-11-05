"use client";

import { logout } from "@/app/(auth)/register/actions";
import { closeMenu, toggleMenu } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Heart, Leaf, Menu, ShoppingCart, User, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<string>();

  const dispatch = useAppDispatch();
  const { status } = useSession();
  const isMenuOpen = useAppSelector((state) => state.ui.isMenuOpen);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const fetchUserRole = async (email: string) => {
    try {
      const response = await fetch(`/api/user?email=${email}`);
      const data = await response.json();
      if (response.ok && data.role) setUserRole(data.role);
      else console.log("No role found:", data.error);
    } catch (error) {
      console.error("Failed to fetch user role:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) fetchUserRole(session.user.email);
  }, [session]);

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
      <header className="bg-green-50 py-4 relative z-20">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-600">EcoBid</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-green-800 hover:text-green-600">
              Home
            </Link>
            {/* <Link
              href="/auctions"
              className="text-green-800 hover:text-green-600"
            >
              Auctions
            </Link> */}
            <Link
              href="/eco-sellers"
              className="text-green-800 hover:text-green-600"
            >
              Eco-Sellers
            </Link>
            {/* <Link
              href="/subscriptions"
              className="text-green-800 hover:text-green-600"
            >
              Subscriptions
            </Link> */}
            <Link href="/about" className="text-green-800 hover:text-green-600">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {status === "authenticated" ? (
              <form
                action={async () => {
                  await logout();
                  window.location.assign(`${window.location.origin}/login`);
                }}
              >
                <Button type="submit">Logout</Button>
              </form>
            ) : (
              <Link
                href="/login"
                className="text-green-800 hover:text-green-600 hidden md:inline-block"
              >
                Sign In
              </Link>
            )}
            {status === "authenticated" && (
              <Link
                href={"/account"}
                className="text-green-800 hover:text-green-600"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
            <Link
              href="/wishlist"
              className="text-green-800 hover:text-green-600"
            >
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-green-800 hover:text-green-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={handleToggleMenu}
            >
              <Menu className="h-6 w-6" />
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
        <div className="flex justify-between items-center p-4 border-b border-green-200">
          <span className="text-xl font-bold text-green-600">Menu</span>
          <Button variant="ghost" onClick={handleToggleMenu}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="flex flex-col p-4">
          <Link href="/" className="text-green-800 hover:text-green-600 py-2">
            Home
          </Link>
          {/* <Link
            href="/auctions"
            className="text-green-800 hover:text-green-600 py-2"
          >
            Auctions
          </Link> */}
          <Link
            href="/eco-sellers"
            className="text-green-800 hover:text-green-600 py-2"
          >
            Eco-Sellers
          </Link>
          {/* <Link
            href="/subscriptions"
            className="text-green-800 hover:text-green-600 py-2"
          >
            Subscriptions
          </Link> */}
          <Link
            href="/about"
            className="text-green-800 hover:text-green-600 py-2"
          >
            About
          </Link>
          {status === "authenticated" ? (
            <form action={logout}>
              <Button type="submit">Logout</Button>
            </form>
          ) : (
            <Link
              href="/login"
              className="text-green-800 hover:text-green-600 "
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
