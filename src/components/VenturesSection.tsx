"use client"

import React from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const ventures = [
  {
    id: "01",
    name: "Yedna",
    tag: "Fintech",
    href: "/ventures/yedna",
    desc: "Leveraging technology to democratize financial access and build smarter solutions for the modern economy."
  },
  {
    id: "02",
    name: "Interprint",
    tag: "IT Solutions",
    href: "/ventures/interprint",
    desc: "Delivering reliable, scalable technology solutions that empower businesses to operate with greater efficiency and clarity."
  },
  {
    id: "03",
    name: "Terraflux Solutions",
    tag: "Engineering",
    href: "/ventures/terraflux",
    desc: "Engineering sustainable futures through renewable energy innovation and infrastructure development across East Africa."
  },
  {
    id: "04",
    name: "Ilorie",
    tag: "Consultancy",
    href: "/ventures/ilorie",
    desc: "Expert tax advisory, audit, and financial research helping individuals and organizations navigate complexity."
  }
];

export function VenturesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="ventures" className="py-24 px-6 md:px-20">
      <div 
        ref={ref}
        className={cn(
          "max-w-7xl mx-auto reveal-up",
          isVisible && "visible"
        )}
      >
        <div className="mb-16">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Business Portfolio</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
            Ventures Built <br /><span className="italic text-primary">With Vision</span>
          </h2>
          <div className="w-16 h-1 bg-primary mt-6" />
        </div>

        <div className="grid md:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
          {ventures.map((v) => (
            <Link key={v.id} href={v.href} className="bg-background group relative p-12 overflow-hidden hover:bg-card transition-colors flex flex-col justify-between min-h-[400px]">
              <span className="absolute top-0 right-0 p-8 font-headline text-7xl font-black text-primary opacity-[0.03] group-hover:opacity-10 transition-opacity">
                {v.id}
              </span>
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[0.6rem] uppercase tracking-widest mb-6 rounded-sm">
                  {v.tag}
                </span>
                <h3 className="font-headline text-2xl text-foreground mb-4">{v.name}</h3>
                <p className="text-sm text-foreground/40 leading-relaxed">{v.desc}</p>
              </div>
              
              <div className="relative z-10 mt-8 flex items-center gap-2 text-primary text-[0.6rem] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                Unveil Details <ArrowRight size={14} />
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-700" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
