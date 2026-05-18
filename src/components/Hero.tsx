
"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));
  const profileImage = PlaceHolderImages.find(img => img.id === 'profile-signature');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-20 pt-32 pb-20 z-10">
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
            <Link href="#ventures" className="bg-primary text-background px-10 py-4 text-[0.75rem] uppercase tracking-widest font-bold hover:bg-primary/90 transition-all hover:-translate-y-1">
              Explore Ventures
            </Link>
            <Link href="#about" className="border border-foreground/20 text-foreground px-10 py-4 text-[0.75rem] uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
              The Mission
            </Link>
          </div>

          <div className="flex items-center gap-4 text-foreground/30 text-[0.65rem] tracking-[0.2em] uppercase">
            <div className="w-12 h-[1px] bg-primary/50" />
            <span>Scroll to unveil the vision</span>
          </div>
        </div>
      </div>

      {/* Right Visuals - Slide Motion */}
      <div className="hidden md:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-primary to-transparent z-10" />
        
        <Carousel 
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{
            loop: true,
            duration: 60,
          }}
        >
          <CarouselContent className="h-screen ml-0">
            {heroImages.map((img, index) => (
              <CarouselItem key={index} className="pl-0 h-full relative">
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
                  <Image 
                    src={img.imageUrl} 
                    alt={img.description}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                    data-ai-hint={img.imageHint}
                  />
                  <div className="absolute inset-0 bg-background/20" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Initials Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none z-0">
          <span className="font-headline text-[25vw] font-black tracking-tighter">HA</span>
        </div>

        {/* Floating Stats */}
        <div className={cn(
          "absolute bottom-12 right-12 z-20 flex gap-12 bg-background/80 backdrop-blur-xl border border-primary/10 p-10 reveal-up stagger-3",
          mounted && "visible"
        )}>
          <div className="text-center">
            <span className="block font-headline text-3xl font-bold text-primary">4+</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-foreground/40">Ventures</span>
          </div>
          <div className="text-center border-x border-primary/10 px-12">
            <span className="block font-headline text-3xl font-bold text-primary">5+</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-foreground/40">Yrs Leading</span>
          </div>
          <div className="text-center">
            <span className="block font-headline text-3xl font-bold text-primary">NBO</span>
            <span className="text-[0.6rem] uppercase tracking-widest text-foreground/40">Kenya</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden animate-bounce text-primary">
        <ArrowDown size={24} />
      </div>
    </section>
  );
}
