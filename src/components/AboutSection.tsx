"use client"

import React from 'react';
import { BarChart3, Rocket, Sprout, Heart } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pillars = [
  {
    icon: <BarChart3 className="text-primary" size={28} />,
    title: "The Economist",
    desc: "Trained in economic analysis, finance, and data — driving decisions with insight and precision."
  },
  {
    icon: <Rocket className="text-primary" size={28} />,
    title: "The Entrepreneur",
    desc: "Founder of four ventures across fintech, engineering, IT, and financial consultancy."
  },
  {
    icon: <Sprout className="text-primary" size={28} />,
    title: "The Leader",
    desc: "Training social entrepreneurs, managing diverse teams, and sitting on governance boards."
  },
  {
    icon: <Heart className="text-primary" size={28} />,
    title: "The Servant",
    desc: "Intern pastor at RJM Church Kikuyu, serving youth and children with humility and heart."
  }
];

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  const mainImage = PlaceHolderImages.find(img => img.id === 'man-of-purpose');

  return (
    <section id="about" className="py-24 px-6 md:px-20 bg-secondary/30">
      <div 
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start reveal-up",
          isVisible && "visible"
        )}
      >
        <div className="space-y-8">
          <div>
            <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">About</span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
              A Man of <br /><span className="italic text-primary">Purpose</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-6" />
          </div>
          
          <div className="space-y-6 text-foreground/60 text-lg leading-relaxed">
            <p>
              Henry Adeeya is a <strong className="text-foreground">Nairobi-based entrepreneur, leader, and servant</strong> with a deeply held conviction that business, leadership, and faith are not separate callings.
            </p>
            <div className="relative w-full aspect-[4/5] my-8 overflow-hidden border border-primary/20 shadow-2xl">
              {mainImage?.imageUrl && (
                <Image 
                  src={mainImage.imageUrl}
                  alt={mainImage.description}
                  fill
                  className="object-cover"
                  quality={100}
                  priority
                  data-ai-hint={mainImage.imageHint}
                />
              )}
            </div>
            <p>
              He has built a portfolio of ventures spanning fintech, engineering, IT solutions, and financial consultancy — driven by a belief that <strong className="text-primary">enterprise is most powerful when it uplifts communities</strong>.
            </p>
          </div>
        </div>

        <div id="pillar-library" className="grid sm:grid-cols-2 gap-1">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-card p-10 border-t-2 border-transparent hover:border-primary transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500">
                {pillar.icon}
              </div>
              <h3 className="font-headline text-xl text-foreground mb-3">{pillar.title}</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
