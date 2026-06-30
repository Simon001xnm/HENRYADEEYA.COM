
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';

// REPLACE THIS WITH YOUR EMAIL
const ADMIN_EMAIL = "your-email@example.com"; 

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '/#about' },
    { label: 'Messages', href: '/messages' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Impact', href: '/#impact' },
    { label: 'Contact', href: '/#contact' },
  ];

  if (user?.email === ADMIN_EMAIL) {
    navItems.push({ label: 'Dashboard', href: '/admin' });
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 md:px-12",
      isScrolled ? "premium-blur border-b border-primary/10 py-4 shadow-xl" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold tracking-tighter text-foreground group">
          Henry <span className="text-primary italic transition-all group-hover:tracking-normal">Adeeya</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className={cn(
                "relative text-[0.65rem] uppercase tracking-[0.25em] transition-all duration-300 font-bold",
                pathname === item.href 
                  ? "text-primary after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-primary" 
                  : "text-foreground/60 hover:text-primary hover:tracking-[0.3em]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary hover:text-background text-[0.65rem] tracking-[0.2em] uppercase rounded-none px-8 h-10 transition-all duration-500" asChild>
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground p-2 hover:bg-white/5 transition-colors rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 premium-blur border-b border-primary/10 p-10 flex flex-col gap-8 animate-in slide-in-from-top-4 duration-500 shadow-2xl">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className={cn(
                "text-lg font-headline tracking-widest transition-all",
                pathname === item.href ? "text-primary pl-4 border-l-2 border-primary" : "text-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button className="w-full rounded-none h-14 uppercase tracking-[0.3em] text-xs font-bold" onClick={() => setIsMenuOpen(false)} asChild>
            <Link href="/#contact">Contact Henry</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
