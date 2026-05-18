"use client"

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Zap, Droplets, Leaf } from 'lucide-react';

export default function TerrafluxPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1 space-y-10">
            <div>
              <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Venture 03 · Engineering</span>
              <h1 className="font-headline text-5xl md:text-7xl font-black mb-6">
                Terraflux <br /><span className="italic text-primary">Solutions</span>
              </h1>
              <p className="text-2xl text-foreground/40 font-accent italic">
                Sustainable Infrastructure for the African Century.
              </p>
            </div>

            <div className="space-y-6 text-foreground/60 text-lg leading-relaxed">
              <p>
                Terraflux Solutions was founded on the belief that Africa's infrastructure must be built with the future in mind. We provide high-end engineering services focused on renewable energy and water management systems.
              </p>
              <p>
                From solar-powered irrigation to urban energy grids, our projects are designed to provide maximum impact with minimal environmental footprint.
              </p>
            </div>

            <div className="flex gap-12 pt-8">
              <div className="text-center">
                <span className="block font-headline text-4xl font-bold text-primary">15+</span>
                <span className="text-[0.6rem] uppercase tracking-widest text-foreground/40">Projects</span>
              </div>
              <div className="text-center">
                <span className="block font-headline text-4xl font-bold text-primary">3</span>
                <span className="text-[0.6rem] uppercase tracking-widest text-foreground/40">Countries</span>
              </div>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-card p-12 border border-primary/5 flex flex-col items-center justify-center text-center gap-4">
              <Zap className="text-primary" size={40} />
              <h3 className="font-headline text-xl">Energy</h3>
            </div>
            <div className="bg-primary/5 p-12 border border-primary/10 flex flex-col items-center justify-center text-center gap-4">
              <Droplets className="text-primary" size={40} />
              <h3 className="font-headline text-xl">Water</h3>
            </div>
            <div className="bg-primary/10 p-12 border border-primary/20 flex flex-col items-center justify-center text-center gap-4 col-span-2">
              <Leaf className="text-primary" size={40} />
              <h3 className="font-headline text-xl">Sustainability First</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
