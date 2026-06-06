
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useFirestore, useDoc, useUser } from '@/firebase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Heart, Share2, ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function VideoWatchPage() {
  const params = useParams();
  const videoId = params.videoId as string;
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();

  const videoRef = React.useMemo(() => {
    if (!db || !videoId) return null;
    return doc(db, 'videos', videoId);
  }, [db, videoId]);

  const { data: video, loading } = useDoc(videoRef);

  const handleLike = () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to interact with this message." });
      return;
    }
    if (!videoRef || !video) return;

    const isLiked = video.likedBy?.includes(user.uid);
    updateDoc(videoRef, {
      likesCount: increment(isLiked ? -1 : 1),
      likedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
    });
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast({ title: "Link Copied", description: "Message link ready to share." });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </main>
    );
  }

  if (!video) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
        <h1 className="text-2xl font-headline">Message not found.</h1>
        <Button variant="outline" onClick={() => router.push('/messages')}>Return to Archive</Button>
      </main>
    );
  }

  const isLiked = user ? video.likedBy?.includes(user.uid) : false;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="space-y-10">
          <div className="relative aspect-video w-full bg-black border border-primary/10 shadow-2xl">
            <video 
              src={video.videoUrl} 
              controls 
              controlsList="nodownload" 
              className="w-full h-full object-contain"
              poster={video.thumbnailUrl}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
                {video.title}
              </h1>
              <div className="flex items-center gap-6 py-4 border-y border-primary/5">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold transition-all ${isLiked ? 'text-primary' : 'text-foreground/40 hover:text-primary'}`}
                >
                  <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                  {video.likesCount || 0} Likes
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-foreground/40 hover:text-primary transition-all"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground/60 leading-relaxed text-lg whitespace-pre-wrap">
                  {video.description}
                </p>
              </div>
            </div>

            <div className="bg-card border border-primary/10 p-8 h-fit">
              <h3 className="font-headline text-xl mb-4">Ministry Details</h3>
              <p className="text-xs uppercase tracking-widest text-foreground/30 mb-6">
                Published on {video.createdAt?.toDate ? video.createdAt.toDate().toLocaleDateString() : 'Recent'}
              </p>
              <div className="space-y-4">
                <p className="text-sm text-foreground/50 leading-relaxed italic">
                  "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven."
                </p>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-primary block">— Matt 5:16</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
