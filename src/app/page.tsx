import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { VenturesSection } from '@/components/VenturesSection';
import { ImpactSection } from '@/components/ImpactSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Navigation />
      <Hero />
      <AboutSection />
      <VenturesSection />
      <ImpactSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </main>
  );
}
