
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';

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
    { label: 'Impact', href: '/#impact' },
    { label: 'Contact', href: '/#contact' },
  ];

  if (user?.email === "henryadeeya@gmail.com") {
    navItems.push({ label: 'Admin', href: '/admin' });
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 md:px-12",
      isScrolled ? "premium-blur border-b border-primary/10 py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-headline text-xl font-bold tracking-tight text-foreground group">
          Henry <span className="text-primary italic group-hover:pl-1 transition-all">Adeeya</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className={cn(
                "text-[0.7rem] uppercase tracking-[0.2em] transition-colors",
                pathname === item.href ? "text-primary" : "text-foreground/70 hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background text-[0.7rem] tracking-widest uppercase rounded-none px-6" asChild>
            <Link href="/#contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 premium-blur border-b border-primary/10 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-sm uppercase tracking-widest text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button className="w-full rounded-none" onClick={() => setIsMenuOpen(false)} asChild>
            <Link href="/#contact">Contact Henry</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
