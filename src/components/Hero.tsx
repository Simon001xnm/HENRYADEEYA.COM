
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
      <div className="flex-1 flex flex-col justify-center px-6 md:px-20 pt-32 pb-20 z-10 bg-background/40 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
        <div className={cn("reveal-up", mounted && "visible")}>
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-6 block">
            Economist · Entrepreneur · Servant Leader
          </span>
          <h1 className="font-headline text-5xl md:text-8xl font-black leading-[1] text-foreground mb-4">
            Henry <br />
            <span className="italic text-primary">Adeeya</span>
          </h1>
          <p className="font-accent text-xl md:text-2xl text-foreground/50 italic mb-12 max-w-lg">
            Building Businesses <span className="text-primary/70 not-italic mx-2">·</span> 
            Shaping Leaders <span className="text-primary/70 not-italic mx-2">·</span> 
            Serving Communities
          </p>
          
          <div className="flex flex-wrap gap-4 mb-20">
            <Link href="/#ventures" className="bg-primary text-background px-10 py-4 text-[0.75rem] uppercase tracking-widest font-bold hover:bg-primary/90 transition-all hover:-translate-y-1">
              Explore Ventures
            </Link>
            <Link href="/#about" className="border border-foreground/20 text-foreground px-10 py-4 text-[0.75rem] uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
              The Mission
            </Link>
          </div>

          <div className="flex items-center gap-4 text-foreground/30 text-[0.65rem] tracking-[0.2em] uppercase">
            <div className="w-12 h-[1px] bg-primary/50" />
            <span>Scroll to unveil the vision</span>
          </div>
        </div>
      </div>

      {/* Right Visuals - Continuous Cinematic Video */}
      <div className="flex-1 relative min-h-[40vh] md:min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-l md:from-transparent md:via-transparent md:to-background z-10" />
        
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/fghjkjhgf.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Initials Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
          <span className="font-headline text-[25vw] font-black tracking-tighter text-foreground">HA</span>
        </div>

        {/* Floating Stats */}
        <div className={cn(
          "absolute bottom-12 right-6 left-6 md:left-auto md:right-12 z-20 flex justify-between md:justify-start gap-6 md:gap-12 bg-background/80 backdrop-blur-xl border border-primary/10 p-6 md:p-10 reveal-up stagger-3",
          mounted && "visible"
        )}>
          <div className="text-center">
            <span className="block font-headline text-2xl md:text-3xl font-bold text-primary">4+</span>
            <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest text-foreground/40">Ventures</span>
          </div>
          <div className="text-center border-x border-primary/10 px-6 md:px-12">
            <span className="block font-headline text-2xl md:text-3xl font-bold text-primary">5+</span>
            <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest text-foreground/40">Yrs Leading</span>
          </div>
          <div className="text-center">
            <span className="block font-headline text-2xl md:text-3xl font-bold text-primary">NBO</span>
            <span className="text-[0.5rem] md:text-[0.6rem] uppercase tracking-widest text-foreground/40">Kenya</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden animate-bounce text-primary z-20">
        <ArrowDown size={24} />
      </div>
    </section>
  );
}
