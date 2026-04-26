import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sepang Room Rental | Premium Accommodations",
  description: "Find your perfect room in Sepang and KLIA area. We offer premium terrace houses, condominiums, and shoplot rooms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full scroll-smooth", "font-sans", geist.variable)}>
      <body className={`${inter.className} min-h-full bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
