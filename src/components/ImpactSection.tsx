"use client"

import React from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const impactPoints = [
  {
    role: "Intern Pastor",
    org: "RJM Church Kikuyu",
    details: "Leading Youth & Children Ministry, nurturing the next generation through practical discipleship."
  },
  {
    role: "Board Member",
    org: "LCF (Leaders Community Forum)",
    details: "Contributing strategic oversight and community governance within regional leadership structures."
  },
  {
    role: "Impact Trainer",
    org: "Social Entrepreneurship Initiative",
    details: "Empowering young founders with the tools of ethical commerce and servant leadership."
  }
];

export function ImpactSection() {
  const impactImg = PlaceHolderImages.find(img => img.id === 'grounded-impact');

  return (
    <section id="impact" className="py-24 px-6 md:px-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 relative h-[600px] w-full group">
          <div className="absolute inset-0 border border-primary/20 translate-x-6 translate-y-6 -z-10 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
          <div className="relative h-full w-full overflow-hidden">
            {impactImg?.imageUrl && (
              <Image 
                src={impactImg.imageUrl} 
                alt="Grounded In Purpose Impact" 
                fill 
                className="object-cover"
                quality={100}
                data-ai-hint={impactImg.imageHint}
              />
            )}
          </div>
        </div>

        <div className="order-1 md:order-2 space-y-12">
          <div>
            <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Ministry & Impact</span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
              Grounded <br /><span className="italic text-primary">In Purpose</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-6" />
          </div>

          <div className="space-y-10">
            {impactPoints.map((item, idx) => (
              <div key={idx} className="relative pl-10 border-l border-primary/20 hover:border-primary transition-colors py-2">
                <div className="absolute left-[-5px] top-4 w-[10px] h-[10px] bg-primary rounded-full shadow-[0_0_10px_rgba(207,172,76,0.5)]" />
                <span className="text-[0.6rem] text-primary uppercase tracking-widest mb-1 block">{item.org}</span>
                <h3 className="font-headline text-xl text-foreground mb-2">{item.role}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-md">{item.details}</p>
              </div>
            ))}
          </div>

          <blockquote className="font-accent text-2xl text-foreground/40 italic border-l-4 border-accent pl-8 py-4">
            "Whoever wants to be great among you must be your servant."
            <footer className="text-[0.7rem] uppercase tracking-widest mt-4 not-italic text-accent">— Matthew 20:26</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
