"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HoveredLink, Menu as MenuComponent, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const LandingPageNavBar = ({ className }: Props) => {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className={cn("flex w-full justify-between items-center fixed top-10 inset-x-0 px-8 max-w-6xl mx-auto z-50", className)}>
      <div className="flex items-center gap-x-3">
        <Image alt="logo" src="/logo.png" width={59} height={59} className="rounded-full" />
        <span className="text-3xl font-semibold text-white">ClipSync</span>
      </div>
      <div className="hidden md:flex gap-x-6 text-white">
        <MenuComponent setActive={setActive}>
          <Link href="/">
            <MenuItem setActive={setActive} active={active} item="Home" />
          </Link>
          <Link href="/docs">
            <MenuItem setActive={setActive} active={active} item="Docs" />
          </Link>
          <Link href="/pricing">
            <MenuItem setActive={setActive} active={active} item="Pricing" />
          </Link>
          <Link href="/products">
            <MenuItem setActive={setActive} active={active} item="Products" />
          </Link>
          <Link href="/contact">
            <MenuItem setActive={setActive} active={active} item="Contact" />
          </Link>
        </MenuComponent>
      </div>
      <Link href="/auth/sign-in" className="hidden md:block">
        <Button className="text-base flex gap-x-2">
          <User fill="#000" />
          Login
        </Button>
      </Link>
      <button
        className="md:hidden text-gray-700 dark:text-gray-300"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-40 flex flex-col items-center justify-center space-y-8 text-white">
          <button className="absolute top-4 right-4 text-white" onClick={toggleMobileMenu}>
            <X size={32} />
          </button>
          <Link href="/" onClick={toggleMobileMenu}>
            <span className="text-2xl font-medium">Home</span>
          </Link>
          <Link href="/docs" onClick={toggleMobileMenu}>
            <span className="text-2xl font-medium">Docs</span>
          </Link>
          <Link href="/pricing" onClick={toggleMobileMenu}>
            <span className="text-2xl font-medium">Pricing</span>
          </Link>
          <Link href="/products" onClick={toggleMobileMenu}>
            <span className="text-2xl font-medium">Products</span>
          </Link>
          <Link href="/contact" onClick={toggleMobileMenu}>
            <span className="text-2xl font-medium">Contact</span>
          </Link>
          <Link href="/auth/sign-in" onClick={toggleMobileMenu}>
            <Button className="text-lg flex gap-x-2">
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
