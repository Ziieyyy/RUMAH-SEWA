"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, X, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const waLink = "https://wa.me/60166798900?text=Hi,%20saya%20berminat%20mencari%20bilik%20sewa%20di%20Sepang.%20Boleh%20bantu%20saya?";

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        (isScrolled || !isHomePage) 
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className={`text-2xl font-bold tracking-tight flex items-center gap-2 transition-colors ${
          (isScrolled || !isHomePage) ? "text-primary" : "text-white"
        }`}>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xl">S</span>
          Sepang<span className={`${(isScrolled || !isHomePage) ? "text-secondary" : "text-accent"} font-light`}>Rooms</span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors ${
                (isScrolled || !isHomePage) ? "text-foreground hover:text-primary" : "text-white/90 hover:text-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-0.5 rounded-full px-6">
            <Link href={waLink} target="_blank">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Sekarang
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className={`w-6 h-6 ${(isScrolled || !isHomePage) ? "text-foreground" : "text-white"}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-foreground font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full">
              <Link href={waLink} target="_blank">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Sekarang
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
