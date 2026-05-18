"use client"

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Cpu, Cloud, Globe } from 'lucide-react';

export default function InterprintPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="max-w-4xl">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Venture 02 · IT Solutions</span>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-foreground mb-8">
            Interprint <br /><span className="italic text-primary">Digital Systems</span>
          </h1>
          
          <div className="grid md:grid-cols-3 gap-8 py-12 border-y border-primary/10 mb-12">
            <div className="space-y-4">
              <Cpu className="text-primary" size={24} />
              <h3 className="font-headline text-xl">Cloud Infrastructure</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Modernizing business backends with robust, scalable cloud architecture.</p>
            </div>
            <div className="space-y-4">
              <Cloud className="text-primary" size={24} />
              <h3 className="font-headline text-xl">System Integration</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Connecting fragmented workflows into a single, cohesive digital ecosystem.</p>
            </div>
            <div className="space-y-4">
              <Globe className="text-primary" size={24} />
              <h3 className="font-headline text-xl">IT Consultancy</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Strategic roadmap development for digital transformation.</p>
            </div>
          </div>

          <div className="space-y-8 text-foreground/60 text-lg leading-relaxed">
            <p>
              In an era of rapid digital evolution, Interprint stands as a beacon of reliability for Nairobi's growing tech hub. We specialize in taking legacy operations and infusing them with modern IT capabilities.
            </p>
            <p>
              Our approach is not just about installing software; it's about understanding the human workflow and designing systems that serve the people using them.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
