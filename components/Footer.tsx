import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const waLink = "https://wa.me/60166798900?text=Hi,%20saya%20berminat%20mencari%20bilik%20sewa%20di%20Sepang.%20Boleh%20bantu%20saya?";

  return (
    <footer className="bg-[#2a1d17] text-primary-foreground pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="bg-white text-primary px-2 py-1 rounded-md text-xl">S</span>
              Sepang<span className="text-secondary font-light">Rooms</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Penyedia bilik sewa premium, selesa dan mampu milik di sekitar Sepang, KLIA dan Kota Warisan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/rooms" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Available Rooms</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/faq" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Service Areas</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" /> Kota Warisan
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" /> KLIA & KLIA2
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" /> Bandar Baru Salak Tinggi
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" /> Cyberjaya South
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li>
                <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary-foreground/80 hover:text-white transition-colors text-sm">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                  +60 16-679 8900
                </a>
              </li>
              <li>
                <a href="tel:+60166798900" className="flex items-center gap-3 text-primary-foreground/80 hover:text-white transition-colors text-sm">
                  <Phone className="w-5 h-5" />
                  Call Us
                </a>
              </li>
              <li>
                <a href="mailto:admin@sepangrooms.com" className="flex items-center gap-3 text-primary-foreground/80 hover:text-white transition-colors text-sm">
                  <Mail className="w-5 h-5" />
                  admin@sepangrooms.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60 text-center md:text-left">
            © {new Date().getFullYear()} Sepang Room Rental Management. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
