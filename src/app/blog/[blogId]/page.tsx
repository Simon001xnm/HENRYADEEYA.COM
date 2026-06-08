
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Calendar, User, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.blogId as string;
  const db = useFirestore();
  const router = useRouter();

  const blogRef = React.useMemo(() => {
    if (!db || !blogId) return null;
    return doc(db, 'blogs', blogId);
  }, [db, blogId]);

  const { data: blog, loading } = useDoc(blogRef);

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link Copied", description: "Journal entry link ready to share." });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <h1 className="text-2xl font-headline">Entry not found.</h1>
        <Button variant="outline" onClick={() => router.push('/blogs')}>Return to Journal</Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Back to Journal
        </button>

        <article className="space-y-12">
          <header className="space-y-8">
            <h1 className="font-headline text-4xl md:text-7xl font-bold leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-primary/10">
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-foreground/40 font-bold">
                <Calendar size={14} className="text-primary" />
                {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'Recent'}
              </div>
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-foreground/40 font-bold">
                <User size={14} className="text-primary" />
                {blog.authorName || 'Henry Adeeya'}
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-foreground/40 hover:text-primary font-bold transition-all ml-auto"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full overflow-hidden border border-primary/5">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {blog.videoUrl && (
            <div className="relative aspect-video w-full bg-black border border-primary/10">
              <video 
                src={blog.videoUrl} 
                controls 
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-foreground/70 leading-[1.8] text-xl whitespace-pre-wrap font-body">
              {blog.content}
            </p>
          </div>

          <div className="pt-20 border-t border-primary/10">
            <div className="bg-card p-10 text-center space-y-4">
              <p className="font-accent text-2xl italic text-foreground/50">
                "Writing is the geometry of the soul."
              </p>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary block">— Journal Entry Reflections</span>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
