
'use client';

import React, { useMemo } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function MessagesGalleryPage() {
  const db = useFirestore();

  const videosQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: videos, loading } = useCollection(videosQuery);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Visual Ministry</span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground">
            The Message <br /><span className="italic text-primary">Archive</span>
          </h1>
          <div className="w-16 h-1 bg-primary mt-6" />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video: any) => (
              <Link key={video.id} href={`/video/${video.id}`} className="group">
                <Card className="bg-card border-primary/10 rounded-none overflow-hidden h-full flex flex-col transition-all hover:border-primary/30">
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center text-white">
                        <Play fill="white" size={32} />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-6">
                    <CardTitle className="font-headline text-xl line-clamp-2 leading-tight">
                      {video.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0 mt-auto">
                    <p className="text-sm text-foreground/40 line-clamp-2 leading-relaxed mb-4">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                      <span className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">
                        Watch Message
                      </span>
                      <span className="text-[0.6rem] uppercase tracking-widest text-foreground/30">
                        {video.likesCount || 0} Likes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {videos.length === 0 && (
              <div className="col-span-full text-center py-32 border border-dashed border-primary/20">
                <p className="text-foreground/30 italic font-accent text-2xl">The archive is currently being prepared.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
