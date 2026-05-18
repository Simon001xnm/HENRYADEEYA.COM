"use client"

import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen, BarChart2, Briefcase } from 'lucide-react';

export default function IloriePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <Link href="/#ventures" className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Portfolio
        </Link>

        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div>
            <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Venture 04 · Consultancy</span>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-foreground">
              Ilorie <br /><span className="italic text-primary">Consultancy</span>
            </h1>
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
              <p className="text-sm text-foreground/40 leading-relaxed">Navigating local and international tax laws with precision and ethical foresight.</p>
            </div>
            <div className="bg-card p-12 text-left space-y-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                <BarChart2 size={24} />
              </div>
              <h3 className="font-headline text-2xl">Financial Research</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Data-driven insights for organizational growth and market entry strategies.</p>
            </div>
            <div className="bg-card p-12 text-left space-y-6">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary">
                <Briefcase size={24} />
              </div>
              <h3 className="font-headline text-2xl">Audit Support</h3>
              <p className="text-sm text-foreground/40 leading-relaxed">Ensuring governance and compliance at every level of corporate structure.</p>
            </div>
            <div className="bg-primary text-background p-12 text-left space-y-6">
              <h3 className="font-headline text-2xl italic">"Excellence in every detail."</h3>
              <p className="text-sm text-background/80">Henry Adeeya leads Ilorie with a focus on servant-leadership consultancy — where the client's mission becomes our own.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
