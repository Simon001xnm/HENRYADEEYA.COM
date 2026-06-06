
'use client';

import React, { useMemo } from 'react';
import { collection, query, orderBy, limit, doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useFirestore, useCollection, useUser } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function VideoFeedSection() {
  const db = useFirestore();
  const { user } = useUser();

  const videosQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'videos'), orderBy('createdAt', 'desc'), limit(12));
  }, [db]);

  const { data: videos, loading } = useCollection(videosQuery);

  const handleLike = (videoId: string, isLiked: boolean) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to interact with videos.",
      });
      return;
    }

    const videoRef = doc(db, 'videos', videoId);
    updateDoc(videoRef, {
      likesCount: increment(isLiked ? -1 : 1),
      likedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
    });
  };

  const handleShare = (videoId: string) => {
    const shareUrl = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Video link ready to share.",
    });
  };

  if (loading) return null;

  return (
    <section id="ministry-videos" className="py-24 px-6 md:px-20 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Visual Ministry</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground">
            Messages of <br /><span className="italic text-primary">Purpose</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video: any) => {
            const isLiked = user ? video.likedBy?.includes(user.uid) : false;

            return (
              <Card key={video.id} className="bg-card border-primary/10 rounded-none overflow-hidden group">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full border-2 border-white text-white">
                      <Play fill="white" size={32} />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <CardTitle className="font-headline text-xl line-clamp-1">{video.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 pt-0 space-y-4">
                  <p className="text-sm text-foreground/50 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/5">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(video.id, isLiked)}
                        className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold transition-colors ${isLiked ? 'text-primary' : 'text-foreground/40 hover:text-primary'}`}
                      >
                        <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                        {video.likesCount || 0}
                      </button>
                      <button 
                        onClick={() => handleShare(video.id)}
                        className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-foreground/40 hover:text-primary transition-colors"
                      >
                        <Share2 size={14} />
                        Share
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-20 bg-card border border-dashed border-primary/20">
            <p className="text-foreground/30 italic">No messages shared yet. Stay tuned.</p>
          </div>
        )}
      </div>
    </section>
  );
}
