"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const LandingPageNavBar = ({ className }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className={cn("flex w-full justify-between items-center fixed top-6 inset-x-0 px-8 py-3 max-w-5xl mx-auto z-50 bg-[#09090b]/80 backdrop-blur-md border border-neutral-900 rounded-full shadow-lg", className)}>
      <div className="flex items-center gap-x-3">
        <Image alt="logo" src="/logo.png" width={34} height={34} className="rounded-full" />
        <span className="text-xl font-bold text-white tracking-tight">ClipSync</span>
      </div>
      
      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-x-8 text-neutral-400 text-sm font-semibold">
        <Link href="/" className="hover:text-white transition-colors duration-200">
          Home
        </Link>
        <Link href="/docs" className="hover:text-white transition-colors duration-200">
          Docs
        </Link>
        <Link href="/pricing" className="hover:text-white transition-colors duration-200">
          Pricing
        </Link>
        <Link href="/products" className="hover:text-white transition-colors duration-200">
          Products
        </Link>
        <Link href="/contact" className="hover:text-white transition-colors duration-200">
          Contact
        </Link>
      </div>

      <Link href="/auth/sign-in" className="hidden md:block">
        <Button className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5 py-2 flex gap-x-2 font-bold transition">
          <User size={14} className="text-indigo-200" />
          Login
        </Button>
      </Link>
      
      <button
        className="md:hidden text-gray-400 hover:text-white transition-colors"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 text-white">
          <button className="absolute top-6 right-6 text-neutral-400 hover:text-white" onClick={toggleMobileMenu}>
            <X size={32} />
          </button>
          <Link href="/" onClick={toggleMobileMenu} className="text-2xl font-semibold hover:text-indigo-400 transition">
            Home
          </Link>
          <Link href="/docs" onClick={toggleMobileMenu} className="text-2xl font-semibold hover:text-indigo-400 transition">
            Docs
          </Link>
          <Link href="/pricing" onClick={toggleMobileMenu} className="text-2xl font-semibold hover:text-indigo-400 transition">
            Pricing
          </Link>
          <Link href="/products" onClick={toggleMobileMenu} className="text-2xl font-semibold hover:text-indigo-400 transition">
            Products
          </Link>
          <Link href="/contact" onClick={toggleMobileMenu} className="text-2xl font-semibold hover:text-indigo-400 transition">
            Contact
          </Link>
          <Link href="/auth/sign-in" onClick={toggleMobileMenu}>
            <Button className="text-lg bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-3 flex gap-x-2 font-bold">
              <User fill="#fff" />
              Login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LandingPageNavBar;
