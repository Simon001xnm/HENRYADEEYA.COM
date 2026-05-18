
"use client"

import React, { useRef, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen, BarChart2, CheckCircle2 } from 'lucide-react';

export default function IloriePage() {
  const videoUrl = "/fffdfdsersrestyuhibj.mp4";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle potential autoplay restrictions
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="max-w-4xl mx-auto text-center space-y-12 mb-24">
          <div>
            <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Venture 04 · Consultancy</span>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-foreground">
              Ilorie <br /><span className="italic text-primary">Consultancy</span>
            </h1>
          </div>

          <div className="relative aspect-video w-full overflow-hidden border border-primary/20 shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <p className="text-2xl text-foreground/60 leading-relaxed font-accent max-w-2xl mx-auto">
            Providing intellectual capital for complex financial navigation and strategic compliance.
          </p>

          <div className="grid md:grid-cols-2 gap-px bg-primary/10 border border-primary/10 mt-20">
            <div className="bg-card p-12 text-left space-y-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                <BookOpen size={24} />
              </div>
              <h3 className="font-headline text-2xl">Tax Advisory</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Navigating tax laws with precision and ethical foresight.</p>
            </div>
            <div className="bg-card p-12 text-left space-y-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                <BarChart2 size={24} />
              </div>
              <h3 className="font-headline text-2xl">Financial Research</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Data-driven insights for organizational growth.</p>
            </div>
          </div>
        </div>

        <section className="bg-secondary/20 p-12 md:p-20 border border-primary/10">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Balanced Case Study</span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold">Securing <span className="italic text-primary">Corporate Governance</span></h2>
            </div>
            
            <div className="space-y-8 text-foreground/60 leading-relaxed">
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Challenge:</strong> A mid-sized regional bank faced compliance hurdles threatening its expansion.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Solution:</strong> Ilorie performed a deep-dive audit and restructured their internal financial controls.</p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-primary flex-shrink-0" size={24} />
                <p><strong>The Outcome:</strong> The bank cleared regulatory hurdles and launched operations in three new countries.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
