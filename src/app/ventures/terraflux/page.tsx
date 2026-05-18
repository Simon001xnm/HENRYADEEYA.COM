"use client"

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Zap, Droplets, Leaf, CheckCircle2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TerrafluxPage() {
  const ventureImg = PlaceHolderImages.find(img => img.id === 'venture-img-1');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="flex flex-col md:flex-row gap-20 items-center mb-24">
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

            <div className="relative aspect-video w-full overflow-hidden border border-primary/10">
              {ventureImg?.imageUrl && (
                <Image 
                  src={ventureImg.imageUrl} 
                  alt="Terraflux Engineering Solutions" 
                  fill 
                  className="object-cover"
                  data-ai-hint={ventureImg.imageHint}
                />
              )}
            </div>

            <div className="space-y-6 text-foreground/60 text-lg leading-relaxed">
              <p>
                Terraflux Solutions provides high-end engineering services focused on renewable energy and water management systems.
              </p>
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
          </div>
        </div>

        <section className="bg-accent/5 p-12 md:p-20 border border-accent/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Balanced Case Study</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Empowering <span className="italic text-primary">Rural Agriculture</span></h2>
            </div>
            
            <div className="space-y-8 text-foreground/60 leading-relaxed">
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Challenge:</strong> Smallholder farmers in semi-arid regions were limited to one crop cycle per year.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Solution:</strong> Terraflux engineered a localized solar-powered irrigation network.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Outcome:</strong> Farmers transitioned to three cycles annually, tripling food security for 500 households.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
