"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Fallback for browsers that block autoplay
      });
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-background">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-20 pt-32 pb-20 z-10 bg-background/60 backdrop-blur-md md:bg-transparent md:backdrop-blur-none transition-all duration-1000">
        <div className={cn("reveal-up transition-all duration-1000", mounted && "visible")}>
          <span className="text-primary text-[0.7rem] tracking-[0.3em] uppercase font-bold mb-8 block opacity-80">
            Economist · Entrepreneur · Servant Leader
          </span>
          <h1 className="font-headline text-6xl md:text-9xl font-black leading-[0.9] text-foreground mb-6 tracking-tighter">
            Henry <br />
            <span className="italic text-primary drop-shadow-[0_2px_10px_rgba(207,172,76,0.2)]">Adeeya</span>
          </h1>
          <p className="font-accent text-2xl md:text-3xl text-foreground/50 italic mb-14 max-w-lg leading-relaxed">
            Building Businesses <span className="text-primary/40 not-italic mx-3">·</span> 
            Shaping Leaders <span className="text-primary/40 not-italic mx-3">·</span> 
            Serving Communities
          </p>
          
          <div className="flex flex-wrap gap-6 mb-24">
            <Link href="/#ventures" className="bg-primary text-background px-12 py-5 text-[0.7rem] uppercase tracking-[0.3em] font-black hover:bg-primary/90 transition-all hover:-translate-y-2 shadow-xl shadow-primary/10">
              Explore Ventures
            </Link>
            <Link href="/#about" className="border border-foreground/10 text-foreground px-12 py-5 text-[0.7rem] uppercase tracking-[0.3em] font-bold hover:border-primary hover:text-primary transition-all backdrop-blur-sm">
              The Mission
            </Link>
          </div>

          <div className="flex items-center gap-6 text-foreground/20 text-[0.6rem] tracking-[0.4em] uppercase font-bold">
            <div className="w-16 h-px bg-primary/30" />
            <span>Scroll to unveil the vision</span>
          </div>
        </div>
      </div>

      {/* Right Visuals - Continuous Cinematic Video */}
      <div className="flex-1 relative min-h-[50vh] md:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-background z-10" />
        
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale-[0.2] brightness-75 contrast-125"
          >
            <source src="/fghjkjhgf.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Initials Overlay - Refined Opacity */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none z-0">
          <span className="font-headline text-[35vw] font-black tracking-tighter text-foreground">HA</span>
        </div>

        {/* Floating Stats - Polished UX */}
        <div className={cn(
          "absolute bottom-12 right-6 left-6 md:left-auto md:right-12 z-20 flex justify-between md:justify-start gap-12 bg-background/80 backdrop-blur-2xl border border-primary/10 p-8 md:p-12 reveal-up stagger-3 shadow-2xl",
          mounted && "visible"
        )}>
          <div className="text-center group">
            <span className="block font-headline text-3xl md:text-5xl font-black text-primary mb-1 transition-transform group-hover:scale-110">4+</span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-foreground/40 font-bold">Ventures</span>
          </div>
          <div className="text-center border-x border-primary/5 px-8 md:px-16 group">
            <span className="block font-headline text-3xl md:text-5xl font-black text-primary mb-1 transition-transform group-hover:scale-110">5+</span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-foreground/40 font-bold">Yrs Leading</span>
          </div>
          <div className="text-center group">
            <span className="block font-headline text-3xl md:text-5xl font-black text-primary mb-1 transition-transform group-hover:scale-110">NBO</span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em] text-foreground/40 font-bold">Kenya</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:hidden animate-bounce text-primary/50 z-20">
        <ArrowDown size={28} />
      </div>
    </section>
  );
}
