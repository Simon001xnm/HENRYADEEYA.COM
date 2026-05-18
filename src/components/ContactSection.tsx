"use client"

import React from 'react';
import { Linkedin, Facebook, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Transmitted",
      description: "Henry's team will review your outreach shortly.",
    });
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-20 bg-secondary/10 relative overflow-hidden">
      {/* Background Initials */}
      <div className="absolute right-[-10vw] bottom-[-5vw] font-headline text-[30vw] font-black opacity-[0.02] select-none pointer-events-none">
        HA
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div>
            <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Global Outreach</span>
            <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
              Let's Connect <br /><span className="italic text-primary">In Vision</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-6" />
          </div>

          <p className="text-foreground/50 text-lg leading-relaxed max-w-md">
            Whether exploring a venture partnership, seeking leadership mentorship, or inquiring about ministry collaboration — my door is always open.
          </p>

          <div className="space-y-6">
            <a href="https://linkedin.com" target="_blank" className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Linkedin size={18} />
              </div>
              <span className="text-sm uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">Henry Adeeya on LinkedIn</span>
            </a>
            <a href="https://facebook.com" target="_blank" className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all">
                <Facebook size={18} />
              </div>
              <span className="text-sm uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">Munavo Adeeya on Facebook</span>
            </a>
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-primary/20 flex items-center justify-center text-primary">
                <MapPin size={18} />
              </div>
              <span className="text-sm uppercase tracking-widest text-foreground/60">P.O. Box 30197, Nairobi, Kenya</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-primary/10 p-12 relative z-10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Your Identity</label>
              <Input placeholder="e.g. Jane Mwangi" className="rounded-none bg-background border-primary/5 focus:border-primary h-12" required />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Email Channel</label>
              <Input type="email" placeholder="jane@example.com" className="rounded-none bg-background border-primary/5 focus:border-primary h-12" required />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Inquiry Motif</label>
              <Input placeholder="Venture Partnership, Mentorship..." className="rounded-none bg-background border-primary/5 focus:border-primary h-12" required />
            </div>
            <div className="space-y-2">
              <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Detailed Outreach</label>
              <Textarea placeholder="Write your message here..." className="rounded-none bg-background border-primary/5 focus:border-primary min-h-[150px]" required />
            </div>
            <Button type="submit" className="w-full bg-primary text-background hover:bg-primary/90 rounded-none h-14 uppercase tracking-[0.3em] text-[0.7rem] font-bold">
              Transmit Message <Send className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
