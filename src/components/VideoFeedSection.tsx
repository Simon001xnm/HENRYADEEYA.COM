
'use client';

import React, { useMemo } from 'react';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function VideoFeedSection() {
  const db = useFirestore();

  const videosQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'videos'), orderBy('createdAt', 'desc'), limit(3));
  }, [db]);

  const { data: videos, loading } = useCollection(videosQuery);

  if (loading) return null;

  return (
    <section id="ministry-videos" className="py-24 px-6 md:px-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Visual Ministry</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
            Latest <br /><span className="italic text-primary">Messages</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                  <CardTitle className="font-headline text-xl line-clamp-1">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 mt-auto">
                  <p className="text-sm text-foreground/40 line-clamp-2 leading-relaxed mb-4">
                    {video.description}
                  </p>
                  <span className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Watch Now</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {videos.length > 0 ? (
          <div className="text-center">
            <Button variant="outline" className="rounded-none px-10 h-14 uppercase tracking-widest font-bold border-primary text-primary hover:bg-primary hover:text-background" asChild>
              <Link href="/messages">
                View All Messages <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-20 bg-card border border-dashed border-primary/20">
            <p className="text-foreground/30 italic font-accent text-xl">New messages are being prepared.</p>
          </div>
        )}
      </div>
    </section>
  );
}
