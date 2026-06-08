
'use client';

import React, { useState } from 'react';
import { useUser, useFirestore, useAuth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, LogOut, ShieldCheck, Mail, Lock, CheckCircle, AlertCircle, Video, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// SPECIFIC ADMIN EMAIL
const ADMIN_EMAIL = "henryadeeya@gmail.com"; 

export default function AdminPage() {
  const { user, loading: userLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Video Upload State
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: ''
  });

  // Blog Upload State
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    videoUrl: ''
  });

  const handleGoogleLogin = async () => {
    setLoginLoading(true);
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setLoginError(error.message || "Google authentication was unsuccessful.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Welcome back", description: "You have successfully authenticated." });
    } catch (error: any) {
      console.error(error);
      let msg = "Please verify your credentials.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        msg = "Account not found or password incorrect. Ensure you have created this user in the Firebase Console.";
      }
      setLoginError(msg);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleUploadVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;
    
    setLoading(true);
    const dataToSave = {
      ...videoData,
      likesCount: 0,
      likedBy: [],
      createdAt: serverTimestamp(),
      authorId: user.uid
    };

    const videosRef = collection(db, 'videos');
    addDoc(videosRef, dataToSave)
      .then(() => {
        toast({ title: "Message Published", description: "The video is now live on your platform." });
        setVideoData({ title: '', description: '', videoUrl: '', thumbnailUrl: '' });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'videos',
          operation: 'create',
          requestResourceData: dataToSave,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUploadBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.email !== ADMIN_EMAIL) return;
    
    setLoading(true);
    const dataToSave = {
      ...blogData,
      authorName: "Henry Adeeya",
      createdAt: serverTimestamp(),
      published: true,
      authorId: user.uid
    };

    const blogsRef = collection(db, 'blogs');
    addDoc(blogsRef, dataToSave)
      .then(() => {
        toast({ title: "Journal Posted", description: "Your new blog post is now live." });
        setBlogData({ title: '', content: '', imageUrl: '', videoUrl: '' });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'blogs',
          operation: 'create',
          requestResourceData: dataToSave,
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (userLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-4xl mx-auto">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-12">
            <div className="text-center space-y-4">
              <ShieldCheck size={64} className="text-primary/20 mx-auto" />
              <h1 className="font-headline text-4xl">Ministry <span className="text-primary italic">Dashboard</span></h1>
              <p className="text-foreground/40 max-w-sm mx-auto">Authenticate to manage your visual and written messages.</p>
            </div>

            <Card className="w-full max-w-md bg-card border-primary/10 rounded-none shadow-2xl">
              <CardContent className="pt-8 space-y-6">
                {loginError && (
                  <Alert variant="destructive" className="rounded-none bg-destructive/10 border-destructive/20 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className="text-xs">
                      {loginError}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                      <Input 
                        type="email"
                        required
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 rounded-none bg-background border-primary/5 focus:border-primary h-12"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Secret Key</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                      <Input 
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 rounded-none bg-background border-primary/5 focus:border-primary h-12"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={loginLoading} 
                    className="w-full bg-primary text-background hover:bg-primary/90 rounded-none h-14 uppercase tracking-widest font-bold transition-all"
                  >
                    {loginLoading ? <Loader2 className="animate-spin" /> : "Sign In to Dashboard"}
                  </Button>
                </form>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-primary/5"></div>
                  <span className="flex-shrink mx-4 text-[0.6rem] uppercase tracking-widest text-foreground/30">Or use Google</span>
                  <div className="flex-grow border-t border-primary/5"></div>
                </div>

                <Button 
                  onClick={handleGoogleLogin} 
                  variant="outline"
                  disabled={loginLoading}
                  className="w-full border-primary/20 rounded-none h-14 uppercase tracking-widest text-[0.7rem] font-bold"
                >
                  Authorize with Google
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : user.email !== ADMIN_EMAIL ? (
          <div className="text-center py-20 space-y-6 animate-in fade-in duration-500">
            <ShieldCheck size={48} className="text-destructive mx-auto" />
            <h1 className="text-2xl text-destructive font-bold">Access Restricted</h1>
            <p className="text-foreground/50">This dashboard is reserved for the primary administrator: <br/><span className="text-primary">{ADMIN_EMAIL}</span></p>
            <Button variant="outline" className="rounded-none border-primary/20" onClick={() => signOut(auth)}>Log Out</Button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b border-primary/10 pb-8">
              <div>
                <h1 className="font-headline text-4xl">Admin <span className="text-primary italic">Nexus</span></h1>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-foreground/30 mt-2 font-bold flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" /> Authenticated: {user.email}
                </p>
              </div>
              <Button variant="ghost" onClick={() => signOut(auth)} className="text-foreground/40 hover:text-destructive rounded-none">
                <LogOut className="mr-2" size={16} /> Log Out
              </Button>
            </div>

            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 bg-card border border-primary/10 rounded-none p-1 mb-8">
                <TabsTrigger value="videos" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background uppercase tracking-widest text-xs flex gap-2">
                  <Video size={16} /> Visual Messages
                </TabsTrigger>
                <TabsTrigger value="blogs" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background uppercase tracking-widest text-xs flex gap-2">
                  <FileText size={16} /> Written Journal
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos">
                <Card className="bg-card border-primary/10 rounded-none shadow-2xl">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">Publish New Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUploadVideo} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Video Title</label>
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
                        <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Short Description</label>
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
              </TabsContent>

              <TabsContent value="blogs">
                <Card className="bg-card border-primary/10 rounded-none shadow-2xl">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">New Journal Entry</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUploadBlog} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Article Title</label>
                        <Input 
                          required
                          placeholder="e.g. Reflections on Faith in Business"
                          value={blogData.title}
                          onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                          className="rounded-none bg-background border-primary/5 focus:border-primary h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Cover Image URL</label>
                        <Input 
                          required
                          placeholder="https://example.com/cover.jpg"
                          value={blogData.imageUrl}
                          onChange={(e) => setBlogData({...blogData, imageUrl: e.target.value})}
                          className="rounded-none bg-background border-primary/5 focus:border-primary h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Optional Video URL</label>
                        <Input 
                          placeholder="https://example.com/embed.mp4"
                          value={blogData.videoUrl}
                          onChange={(e) => setBlogData({...blogData, videoUrl: e.target.value})}
                          className="rounded-none bg-background border-primary/5 focus:border-primary h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Article Content</label>
                        <Textarea 
                          required
                          placeholder="Pen your reflections here..."
                          value={blogData.content}
                          onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                          className="rounded-none bg-background border-primary/5 focus:border-primary min-h-[300px]"
                        />
                      </div>
                      <Button type="submit" disabled={loading} className="w-full bg-primary text-background hover:bg-primary/90 rounded-none h-14 uppercase tracking-[0.3em] text-[0.7rem] font-bold">
                        {loading ? <Loader2 className="animate-spin" /> : <><Plus className="mr-2 h-4 w-4" /> Post Journal Entry</>}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
