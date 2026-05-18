import React from 'react';

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-20 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 items-center justify-between gap-8">
        <div className="font-headline text-2xl font-bold">
          Henry <span className="text-primary italic">Adeeya</span>
        </div>
        
        <div className="font-accent text-lg text-foreground/40 italic text-center">
          "I can do all things through Christ who strengthens me." <span className="text-primary/40 not-italic ml-2 text-[0.7rem] uppercase tracking-widest">— Phil 4:13</span>
        </div>

        <div className="text-[0.65rem] uppercase tracking-[0.15em] text-foreground/30 text-center md:text-right space-y-1">
          <p>Balanced Cases · Built for Purpose</p>
          <p>© 2026 Henry Adeeya · Nairobi, KE</p>
        </div>
      </div>
    </footer>
  );
}
