
'use client';

import React, { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BlogGalleryPage() {
  const db = useFirestore();

  const blogsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: blogs, loading } = useCollection(blogsQuery);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Written Ministry</span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground">
            The Journal <br /><span className="italic text-primary">of Faith</span>
          </h1>
          <div className="w-16 h-1 bg-primary mt-6" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog: any) => (
              <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
                <article className="h-full flex flex-col space-y-6">
                  <div className="relative aspect-[4/5] overflow-hidden border border-primary/10">
                    <img 
                      src={blog.imageUrl} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-[0.6rem] uppercase tracking-widest text-foreground/30 font-bold">
                      <Calendar size={12} className="text-primary" />
                      {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </div>
                    <h2 className="font-headline text-2xl group-hover:text-primary transition-colors leading-tight">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-foreground/40 line-clamp-3 leading-relaxed">
                      {blog.content}
                    </p>
                    <div className="pt-4 flex items-center gap-2 text-primary text-[0.6rem] uppercase tracking-[0.2em] font-bold">
                      Read Entry <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-full text-center py-32 border border-dashed border-primary/20">
                <p className="text-foreground/30 italic font-accent text-2xl">The journal is waiting for its first entry.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
