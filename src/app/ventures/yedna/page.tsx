"use client"

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Wallet, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function YednaPage() {
  const ventureImg = PlaceHolderImages.find(img => img.id === 'venture-img-1');
  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="grid md:grid-cols-2 gap-20 mb-24">
          <div className="space-y-8">
            <div>
              <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Venture 01 · Fintech</span>
              <h1 className="font-headline text-5xl md:text-7xl font-black text-foreground mb-6">
                Yedna <br /><span className="italic text-primary">Financial</span>
              </h1>
              <p className="text-xl text-foreground/60 leading-relaxed italic">
                "Democratizing wealth creation through technological transparency and ethical finance."
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden border border-primary/10">
              {ventureImg?.imageUrl && (
                <Image 
                  src={ventureImg.imageUrl} 
                  alt="Yedna Vision" 
                  fill 
                  className="object-cover"
                  data-ai-hint={ventureImg.imageHint}
                />
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-8">
              <div className="p-8 border border-primary/10 bg-card">
                <Wallet className="text-primary mb-4" size={32} />
                <h3 className="font-headline text-xl mb-2">Micro-Capital</h3>
                <p className="text-sm text-foreground/40">Providing essential funding for grassroots innovation.</p>
              </div>
              <div className="p-8 border border-primary/10 bg-card">
                <TrendingUp className="text-primary mb-4" size={32} />
                <h3 className="font-headline text-xl mb-2">Wealth Growth</h3>
                <p className="text-sm text-foreground/40">Tailored investment strategies for long-term security.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-0" />
            <div className="relative z-10 p-12 border border-primary/20 bg-background/50 backdrop-blur-xl space-y-12 h-full">
              <h2 className="font-headline text-3xl">Strategic Pillars</h2>
              <ul className="space-y-8">
                <li className="flex gap-6">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 uppercase tracking-widest text-[0.7rem]">Absolute Integrity</h4>
                    <p className="text-sm text-foreground/50">Full transparency in every transaction and fee structure.</p>
                  </div>
                </li>
              </ul>
              
              <div className="pt-12 border-t border-primary/10">
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-primary mb-4">Venture Status</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Currently Scaling across East Africa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-secondary/20 p-12 md:p-20 border border-primary/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Balanced Case Study</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Bridging the <span className="italic text-primary">Capital Gap</span></h2>
            </div>
            
            <div className="space-y-8 text-foreground/60 leading-relaxed">
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Challenge:</strong> Small-scale artisans in Nairobi lacked access to formal credit, limiting their ability to scale production for export.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Solution:</strong> Yedna implemented a peer-trust credit system that evaluated risk based on community standing and transaction history.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Outcome:</strong> Over 1,200 artisans secured funding within the first year, resulting in a 40% average increase in household income.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
