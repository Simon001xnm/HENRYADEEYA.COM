
"use client"

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Cpu, Cloud, Globe, CheckCircle2 } from 'lucide-react';

export default function InterprintPage() {
  const imageUrl = "/62c93e366a8339b3f001a899543153c3.jpg";

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="max-w-4xl mb-24">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Venture 02 · IT Solutions</span>
          <h1 className="font-headline text-5xl md:text-8xl font-black text-foreground mb-8">
            Interprint <br /><span className="italic text-primary">Digital Systems</span>
          </h1>

          <div className="relative aspect-video w-full mb-12 overflow-hidden border border-primary/10">
            <Image 
              src={imageUrl} 
              alt="Interprint Digital Infrastructure" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 py-12 border-y border-primary/10 mb-12">
            <div className="space-y-4">
              <Cpu className="text-primary" size={24} />
              <h3 className="font-headline text-xl">Cloud Infrastructure</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Modernizing business backends with robust, scalable cloud architecture.</p>
            </div>
            <div className="space-y-4">
              <Cloud className="text-primary" size={24} />
              <h3 className="font-headline text-xl">System Integration</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Connecting fragmented workflows into a single cohesive digital ecosystem.</p>
            </div>
            <div className="space-y-4">
              <Globe className="text-primary" size={24} />
              <h3 className="font-headline text-xl">IT Consultancy</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Strategic roadmap development for digital transformation.</p>
            </div>
          </div>

          <div className="space-y-8 text-foreground/60 text-lg leading-relaxed">
            <p>
              In an era of rapid digital evolution, Interprint stands as a beacon of reliability for Nairobi's growing tech hub.
            </p>
          </div>
        </div>

        <section className="bg-primary/5 p-12 md:p-20 border border-primary/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Balanced Case Study</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Optimizing <span className="italic text-primary">Supply Chains</span></h2>
            </div>
            
            <div className="space-y-8 text-foreground/60 leading-relaxed">
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Challenge:</strong> A regional manufacturing firm was losing 15% of inventory due to fragmented manual tracking systems.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Solution:</strong> Interprint designed and deployed a custom cloud ERP integrated with real-time IoT sensors.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Outcome:</strong> Inventory loss dropped to near zero within 6 months, saving millions in operational overhead.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
