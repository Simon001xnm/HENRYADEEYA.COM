"use client"

import React from 'react';
import { BarChart3, Rocket, Sprout, Heart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pillars = [
  {
    icon: <BarChart3 className="text-primary" size={32} />,
    title: "The Economist",
    desc: "Analytical precision driving strategic organizational decisions with foresight."
  },
  {
    icon: <Rocket className="text-primary" size={32} />,
    title: "The Entrepreneur",
    desc: "Architect of four high-impact ventures across Fintech and Engineering sectors."
  },
  {
    icon: <Sprout className="text-primary" size={32} />,
    title: "The Leader",
    desc: "Cultivating leadership ecosystems and managing multi-disciplinary governance teams."
  },
  {
    icon: <Heart className="text-primary" size={32} />,
    title: "The Servant",
    desc: "Dedicated ministry service, focused on nurturing the next generation's spirit."
  }
];

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  const mainImage = PlaceHolderImages.find(img => img.id === 'man-of-purpose');

  return (
    <section id="about" className="py-32 px-6 md:px-20 bg-secondary/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div 
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start reveal-up",
          isVisible && "visible"
        )}
      >
        <div className="space-y-12">
          <div>
            <span className="text-primary text-[0.7rem] tracking-[0.4em] uppercase font-black mb-6 block opacity-70">Heritage & Vision</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold text-foreground leading-[1.1]">
              A Man of <br /><span className="italic text-primary drop-shadow-sm">Purpose</span>
            </h2>
            <div className="w-20 h-1 bg-primary mt-10 rounded-full" />
          </div>
          
          <div className="space-y-8 text-foreground/60 text-xl leading-relaxed">
            <p className="font-accent italic text-2xl text-foreground/80">
              "Henry Adeeya is an entrepreneur who believes that the true measure of success is the value returned to one's community."
            </p>
            <p>
              Based in Nairobi, Henry bridges the gap between <strong className="text-foreground">economic principles and servant leadership</strong>, building a legacy through strategic ventures and humble service.
            </p>
            <div className="relative w-full aspect-[4/5] rounded-none overflow-hidden border border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
              {mainImage?.imageUrl && (
                <Image 
                  src={mainImage.imageUrl}
                  alt={mainImage.description}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  quality={100}
                  priority
                  data-ai-hint={mainImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <p>
              His multi-disciplinary approach has birthed a portfolio that serves both the <strong className="text-primary">market and the soul</strong>.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-primary/10 border border-primary/10 shadow-2xl">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-card p-12 hover:bg-primary/[0.03] transition-all group relative overflow-hidden">
              <div className="mb-8 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110">
                {pillar.icon}
              </div>
              <h3 className="font-headline text-2xl text-foreground mb-4 tracking-tight">{pillar.title}</h3>
              <p className="text-sm text-foreground/40 leading-relaxed font-medium">{pillar.desc}</p>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
