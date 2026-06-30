"use client"

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ventures = [
  {
    id: "01",
    name: "Yedna",
    tag: "Fintech",
    href: "/ventures/yedna",
    desc: "Redefining capital accessibility through robust financial technology and transparent grassroots credit systems."
  },
  {
    id: "02",
    name: "Interprint",
    tag: "IT Solutions",
    href: "/ventures/interprint",
    desc: "Architecting cloud infrastructure and digital ecosystems for enterprise-level operational efficiency."
  },
  {
    id: "03",
    name: "Terraflux",
    tag: "Engineering",
    href: "/ventures/terraflux",
    desc: "Sustainable engineering focusing on renewable energy networks and regional infrastructure development."
  },
  {
    id: "04",
    name: "Ilorie",
    tag: "Consultancy",
    href: "/ventures/ilorie",
    desc: "High-precision tax advisory and strategic financial research for complex organizational navigation."
  }
];

export function VenturesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="ventures" className="py-32 px-6 md:px-20 bg-background relative">
      <div 
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto reveal-up",
          isVisible && "visible"
        )}
      >
        <div className="mb-24">
          <span className="text-primary text-[0.7rem] tracking-[0.4em] uppercase font-black mb-6 block opacity-70">Strategic Portfolio</span>
          <h2 className="font-headline text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Ventures Built <br /><span className="italic text-primary drop-shadow-sm">With Vision</span>
          </h2>
          <div className="w-20 h-1 bg-primary mt-10 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10 shadow-2xl overflow-hidden">
          {ventures.map((v) => (
            <Link key={v.id} href={v.href} className="bg-background group relative p-14 overflow-hidden hover:bg-card transition-all duration-500 flex flex-col justify-between min-h-[480px]">
              {/* Massive background ID for visual depth */}
              <span className="absolute -top-10 -right-10 font-headline text-[12rem] font-black text-primary opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none select-none">
                {v.id}
              </span>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[0.6rem] uppercase tracking-[0.25em] font-black rounded-none border border-primary/10 group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                    {v.tag}
                  </span>
                </div>
                <h3 className="font-headline text-3xl text-foreground mb-6 tracking-tight group-hover:text-primary transition-colors">{v.name}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed font-medium group-hover:text-foreground/60 transition-colors">{v.desc}</p>
              </div>
              
              <div className="relative z-10 mt-12 flex items-center gap-3 text-primary text-[0.65rem] uppercase tracking-[0.3em] font-black opacity-40 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                Unveil Strategy <ExternalLink size={14} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>

              {/* Animated Progress-like Border */}
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-primary group-hover:w-full transition-all duration-1000 ease-out" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
