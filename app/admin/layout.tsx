"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { LayoutDashboard, BedDouble, Building2, CalendarCheck, Users, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Rooms", href: "/admin/rooms", icon: BedDouble },
  { name: "Properties", href: "/admin/properties", icon: Building2 },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Leads", href: "/admin/leads", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="flex items-center justify-between p-4 border-b bg-background md:hidden sticky top-0 z-50">
        <h2 className="font-bold text-lg text-primary">Admin System</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-20 animate-in fade-in zoom-in-95 duration-200">
          <nav className="p-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 text-lg font-medium rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors border"
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
            <Button variant="ghost" className="w-full justify-start gap-4 text-destructive px-4 py-6 text-lg border-destructive/20 border">
              <LogOut className="w-5 h-5" />
              Log out
            </Button>
          </nav>
        </div>
      )}

      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r bg-background hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg text-primary">Admin System</h2>
          <p className="text-xs text-muted-foreground">Owner Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        {children}
        <Toaster />
      </main>
    </div>
  );
}
