
'use client';

import React, { useState } from 'react';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2, Plus, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// SPECIFIC ADMIN EMAIL (Change this to your actual email)
const ADMIN_EMAIL = "henryadeeya@gmail.com"; 

export default function AdminPage() {
  const { user, loading: userLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);

  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: ''
  });

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast({ variant: "destructive", title: "Login Failed" });
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;
    
    setLoading(true);
    try {
      await addDoc(collection(db, 'videos'), {
        ...videoData,
        likesCount: 0,
        likedBy: [],
        createdAt: serverTimestamp(),
        authorId: user.uid
      });
      
      toast({ title: "Message Published", description: "The video is now live on your platform." });
      setVideoData({ title: '', description: '', videoUrl: '', thumbnailUrl: '' });
    } catch (error) {
      toast({ variant: "destructive", title: "Publishing Error" });
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) return null;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-4xl mx-auto">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
            <ShieldCheck size={64} className="text-primary/20" />
            <div>
              <h1 className="font-headline text-4xl mb-4">Ministry Dashboard</h1>
              <p className="text-foreground/40 max-w-sm">Please authenticate to manage your visual messages.</p>
            </div>
            <Button onClick={handleLogin} className="bg-primary text-background rounded-none px-10 h-14 uppercase tracking-widest font-bold">
              Sign in with Google
            </Button>
          </div>
        ) : user.email !== ADMIN_EMAIL ? (
          <div className="text-center py-20 space-y-6">
            <h1 className="text-2xl text-destructive font-bold">Access Restricted</h1>
            <p className="text-foreground/50">This dashboard is reserved for the primary administrator.</p>
            <Button variant="outline" onClick={() => signOut(auth)}>Log Out</Button>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="flex items-center justify-between border-b border-primary/10 pb-8">
              <div>
                <h1 className="font-headline text-4xl">Admin <span className="text-primary italic">Nexus</span></h1>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/30 mt-2">Welcome, {user.displayName}</p>
              </div>
              <Button variant="ghost" onClick={() => signOut(auth)} className="text-foreground/40 hover:text-destructive">
                <LogOut className="mr-2" size={16} /> Log Out
              </Button>
            </div>

            <Card className="bg-card border-primary/10 rounded-none shadow-2xl">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Publish New Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Title</label>
                    <Input 
                      required
                      placeholder="e.g. The Power of Servant Leadership"
                      value={videoData.title}
                      onChange={(e) => setVideoData({...videoData, title: e.target.value})}
                      className="rounded-none bg-background border-primary/5 focus:border-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Video URL (MP4)</label>
                    <Input 
                      required
                      placeholder="https://example.com/video.mp4"
                      value={videoData.videoUrl}
                      onChange={(e) => setVideoData({...videoData, videoUrl: e.target.value})}
                      className="rounded-none bg-background border-primary/5 focus:border-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Thumbnail Image URL</label>
                    <Input 
                      required
                      placeholder="https://example.com/thumb.jpg"
                      value={videoData.thumbnailUrl}
                      onChange={(e) => setVideoData({...videoData, thumbnailUrl: e.target.value})}
                      className="rounded-none bg-background border-primary/5 focus:border-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Description</label>
                    <Textarea 
                      required
                      placeholder="Synthesize the core message..."
                      value={videoData.description}
                      onChange={(e) => setVideoData({...videoData, description: e.target.value})}
                      className="rounded-none bg-background border-primary/5 focus:border-primary min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-primary text-background hover:bg-primary/90 rounded-none h-14 uppercase tracking-[0.3em] text-[0.7rem] font-bold">
                    {loading ? <Loader2 className="animate-spin" /> : <><Plus className="mr-2 h-4 w-4" /> Publish Video</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
