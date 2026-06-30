
'use client';

import React, { useState, useMemo } from 'react';
import { useUser, useFirestore, useAuth, useCollection } from '@/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, LogOut, ShieldCheck, Mail, Lock, CheckCircle, AlertCircle, Video, FileText, Settings, Heart, MessageSquare, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ADMIN_EMAIL = "henryadeeya@gmail.com"; 

export default function AdminPage() {
  const { user, loading: userLoading } = useUser();
  const auth = useAuth();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Content States
  const [videoData, setVideoData] = useState({ title: '', description: '', videoUrl: '', thumbnailUrl: '' });
  const [blogData, setBlogData] = useState({ title: '', content: '', imageUrl: '', videoUrl: '' });

  // Management State
  const blogsQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
  }, [db]);
  const { data: blogs, loading: blogsLoading } = useCollection(blogsQuery);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Authorized", description: "Welcome to the Ministry Dashboard." });
    } catch (error: any) {
      let msg = "Authentication failed. Please check your credentials.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
        msg = "Invalid account or password.";
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
    const dataToSave = { ...videoData, likesCount: 0, likedBy: [], createdAt: serverTimestamp() };
    addDoc(collection(db, 'videos'), dataToSave)
      .then(() => {
        toast({ title: "Video Published", description: "Message is now live." });
        setVideoData({ title: '', description: '', videoUrl: '', thumbnailUrl: '' });
      })
      .catch(async () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: 'videos', operation: 'create', requestResourceData: dataToSave }));
      })
      .finally(() => setLoading(false));
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
      likesCount: 0,
      likedBy: []
    };
    addDoc(collection(db, 'blogs'), dataToSave)
      .then(() => {
        toast({ title: "Blog Posted", description: "Journal entry is now live." });
        setBlogData({ title: '', content: '', imageUrl: '', videoUrl: '' });
      })
      .catch(async () => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({ path: 'blogs', operation: 'create', requestResourceData: dataToSave }));
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    deleteDoc(doc(db, 'blogs', blogId))
      .then(() => toast({ title: "Entry Deleted", description: "The blog post has been removed." }))
      .catch(() => toast({ variant: "destructive", title: "Delete Failed", description: "Could not remove entry." }));
  };

  if (userLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-5xl mx-auto">
        {!user ? (
          <div className="flex flex-col items-center justify-center space-y-12 py-10">
            <div className="text-center space-y-4">
              <ShieldCheck size={64} className="text-primary/20 mx-auto" />
              <h1 className="font-headline text-4xl">Admin <span className="text-primary italic">Nexus</span></h1>
              <p className="text-foreground/40 max-w-sm mx-auto">Authenticate to manage your ministry media.</p>
            </div>
            <Card className="w-full max-w-md bg-card border-primary/10 rounded-none shadow-2xl">
              <CardContent className="pt-8 space-y-6">
                {loginError && (
                  <Alert variant="destructive" className="rounded-none bg-destructive/10 border-destructive/20 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className="text-xs">{loginError}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Admin Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                      <Input type="email" required placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 rounded-none bg-background border-primary/5 focus:border-primary h-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[0.6rem] uppercase tracking-widest text-primary font-bold">Secret Key</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" size={16} />
                      <Input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 rounded-none bg-background border-primary/5 focus:border-primary h-12" />
                    </div>
                  </div>
                  <Button type="submit" disabled={loginLoading} className="w-full bg-primary text-background hover:bg-primary/90 rounded-none h-14 uppercase tracking-widest font-bold">
                    {loginLoading ? <Loader2 className="animate-spin" /> : "Sign In to Dashboard"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : user.email !== ADMIN_EMAIL ? (
          <div className="text-center py-20 space-y-6">
            <ShieldCheck size={48} className="text-destructive mx-auto" />
            <h1 className="text-2xl text-destructive font-bold">Access Denied</h1>
            <Button variant="outline" className="rounded-none" onClick={() => signOut(auth)}>Log Out</Button>
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-500">
            <div className="flex items-center justify-between border-b border-primary/10 pb-8">
              <div>
                <h1 className="font-headline text-4xl">Admin <span className="text-primary italic">Nexus</span></h1>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-foreground/30 mt-2 font-bold flex items-center gap-2">
                  <CheckCircle size={12} className="text-green-500" /> Authorized: {user.email}
                </p>
              </div>
              <Button variant="ghost" onClick={() => signOut(auth)} className="text-foreground/40 hover:text-destructive rounded-none">
                <LogOut className="mr-2" size={16} /> Exit Nexus
              </Button>
            </div>

            <Tabs defaultValue="publish" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 bg-card border border-primary/10 rounded-none p-1 mb-8">
                <TabsTrigger value="publish" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background uppercase tracking-widest text-xs flex gap-2">
                  <Plus size={16} /> Publish Content
                </TabsTrigger>
                <TabsTrigger value="manage" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background uppercase tracking-widest text-xs flex gap-2">
                  <Settings size={16} /> Manage Records
                </TabsTrigger>
              </TabsList>

              <TabsContent value="publish">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-card border-primary/10 rounded-none shadow-xl">
                    <CardHeader><CardTitle className="font-headline text-xl flex gap-2 items-center"><Video className="text-primary" /> Visual Message</CardTitle></CardHeader>
                    <CardContent>
                      <form onSubmit={handleUploadVideo} className="space-y-4">
                        <Input required placeholder="Title" value={videoData.title} onChange={(e) => setVideoData({...videoData, title: e.target.value})} className="rounded-none bg-background border-primary/5 h-12" />
                        <Input required placeholder="Video URL (MP4)" value={videoData.videoUrl} onChange={(e) => setVideoData({...videoData, videoUrl: e.target.value})} className="rounded-none bg-background border-primary/5 h-12" />
                        <Input required placeholder="Thumbnail URL" value={videoData.thumbnailUrl} onChange={(e) => setVideoData({...videoData, thumbnailUrl: e.target.value})} className="rounded-none bg-background border-primary/5 h-12" />
                        <Textarea required placeholder="Description" value={videoData.description} onChange={(e) => setVideoData({...videoData, description: e.target.value})} className="rounded-none bg-background border-primary/5 min-h-[100px]" />
                        <Button type="submit" disabled={loading} className="w-full bg-primary text-background rounded-none">
                          {loading ? <Loader2 className="animate-spin" /> : "Publish Video"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-primary/10 rounded-none shadow-xl">
                    <CardHeader><CardTitle className="font-headline text-xl flex gap-2 items-center"><FileText className="text-primary" /> Blog Entry</CardTitle></CardHeader>
                    <CardContent>
                      <form onSubmit={handleUploadBlog} className="space-y-4">
                        <Input required placeholder="Blog Title" value={blogData.title} onChange={(e) => setBlogData({...blogData, title: e.target.value})} className="rounded-none bg-background border-primary/5 h-12" />
                        <Input required placeholder="Cover Image URL" value={blogData.imageUrl} onChange={(e) => setBlogData({...blogData, imageUrl: e.target.value})} className="rounded-none bg-background border-primary/5 h-12" />
                        <Textarea required placeholder="Reflections..." value={blogData.content} onChange={(e) => setBlogData({...blogData, content: e.target.value})} className="rounded-none bg-background border-primary/5 min-h-[220px]" />
                        <Button type="submit" disabled={loading} className="w-full bg-primary text-background rounded-none">
                          {loading ? <Loader2 className="animate-spin" /> : "Post Entry"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="manage">
                <Card className="bg-card border-primary/10 rounded-none shadow-xl">
                  <CardHeader><CardTitle className="font-headline text-2xl">Journal Analytics</CardTitle></CardHeader>
                  <CardContent>
                    {blogsLoading ? <Loader2 className="animate-spin mx-auto" /> : (
                      <div className="space-y-4">
                        {blogs.map((blog: any) => (
                          <div key={blog.id} className="flex items-center justify-between p-4 border border-primary/5 bg-background hover:border-primary/20 transition-all group">
                            <div className="space-y-1">
                              <h4 className="font-bold text-lg">{blog.title}</h4>
                              <div className="flex gap-4 text-[0.6rem] uppercase tracking-widest text-foreground/40 font-bold">
                                <span className="flex items-center gap-1"><Heart size={10} className="text-primary" /> {blog.likesCount || 0} Likes</span>
                                <span className="flex items-center gap-1"><MessageSquare size={10} className="text-primary" /> View Site to Manage Comments</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteBlog(blog.id)} className="text-foreground/20 hover:text-destructive transition-colors">
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
