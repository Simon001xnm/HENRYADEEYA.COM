
'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, updateDoc, increment, arrayUnion, arrayRemove, collection, addDoc, serverTimestamp, query, orderBy, deleteDoc } from 'firebase/firestore';
import { useFirestore, useDoc, useUser, useCollection } from '@/firebase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, Calendar, User, Share2, Heart, MessageSquare, Send, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.blogId as string;
  const db = useFirestore();
  const { user } = useUser();
  const router = useRouter();

  // Blog Data
  const blogRef = useMemo(() => {
    if (!db || !blogId) return null;
    return doc(db, 'blogs', blogId);
  }, [db, blogId]);
  const { data: blog, loading } = useDoc(blogRef);

  // Comments Data
  const commentsQuery = useMemo(() => {
    if (!db || !blogId) return null;
    return query(collection(db, 'blogs', blogId, 'comments'), orderBy('createdAt', 'desc'));
  }, [db, blogId]);
  const { data: comments, loading: commentsLoading } = useCollection(commentsQuery);

  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = user?.email === "henryadeeya@gmail.com";

  const handleLike = async () => {
    if (!user) {
      toast({ title: "Authentication Required", description: "Sign in to like this post." });
      return;
    }
    if (!blogRef || !blog) return;
    const isLiked = blog.likedBy?.includes(user.uid);
    updateDoc(blogRef, {
      likesCount: increment(isLiked ? -1 : 1),
      likedBy: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link Copied", description: "Ready to share with your network." });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db || !blogId || !commentText) return;
    setIsSubmitting(true);
    const commentData = {
      userName: commentName || (user?.displayName || "Anonymous Reader"),
      text: commentText,
      createdAt: serverTimestamp()
    };
    addDoc(collection(db, 'blogs', blogId, 'comments'), commentData)
      .then(() => {
        toast({ title: "Comment Shared", description: "Thank you for joining the conversation." });
        setCommentText('');
        setCommentName('');
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isAdmin || !blogId) return;
    deleteDoc(doc(db, 'blogs', blogId, 'comments', commentId))
      .then(() => toast({ title: "Comment Removed", description: "The comment has been deleted." }));
  };

  if (loading) return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </main>
  );

  if (!blog) return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-headline">Entry not found.</h1>
      <Button variant="outline" onClick={() => router.push('/blogs')}>Return to Blog</Button>
    </main>
  );

  const isLiked = user ? blog.likedBy?.includes(user.uid) : false;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-32 pb-24 px-6 md:px-20 max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Blog
        </button>

        <article className="space-y-12">
          <header className="space-y-8">
            <h1 className="font-headline text-4xl md:text-7xl font-bold leading-tight">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-primary/10">
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-foreground/40 font-bold">
                <Calendar size={14} className="text-primary" />
                {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'Recent'}
              </div>
              <div className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-foreground/40 font-bold">
                <User size={14} className="text-primary" />
                {blog.authorName || 'Henry Adeeya'}
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <button onClick={handleLike} className={`flex items-center gap-2 text-[0.6rem] uppercase tracking-widest font-bold transition-all ${isLiked ? 'text-primary' : 'text-foreground/40 hover:text-primary'}`}>
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> {blog.likesCount || 0}
                </button>
                <button onClick={handleShare} className="flex items-center gap-2 text-[0.6rem] uppercase tracking-widest text-foreground/40 hover:text-primary font-bold">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </header>

          <div className="relative aspect-[16/9] w-full overflow-hidden border border-primary/5">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-foreground/70 leading-[1.8] text-xl whitespace-pre-wrap font-body">{blog.content}</p>
          </div>

          {/* Comments Section */}
          <section className="pt-20 border-t border-primary/10 space-y-12">
            <div className="space-y-4">
              <h3 className="font-headline text-3xl flex items-center gap-2"><MessageSquare className="text-primary" /> Conversation</h3>
              <p className="text-foreground/40 text-sm">Join the dialogue on purpose and leadership.</p>
            </div>

            <form onSubmit={handleCommentSubmit} className="bg-card p-8 border border-primary/5 space-y-4 shadow-xl">
              {!user && (
                <Input placeholder="Your Name" value={commentName} onChange={(e) => setCommentName(e.target.value)} className="rounded-none bg-background border-primary/5" />
              )}
              <Textarea required placeholder="Share your reflections..." value={commentText} onChange={(e) => setCommentText(e.target.value)} className="rounded-none bg-background border-primary/5 min-h-[100px]" />
              <Button type="submit" disabled={isSubmitting} className="w-full bg-primary text-background rounded-none font-bold uppercase tracking-widest text-xs">
                {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={14} className="mr-2" /> Post Reflection</>}
              </Button>
            </form>

            <div className="space-y-6">
              {commentsLoading ? <Loader2 className="animate-spin mx-auto" /> : comments.length === 0 ? (
                <p className="text-center text-foreground/20 italic font-accent">The conversation is waiting for your voice.</p>
              ) : comments.map((comment: any) => (
                <div key={comment.id} className="p-6 border border-primary/5 bg-secondary/10 relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-primary text-sm uppercase tracking-widest">{comment.userName}</h4>
                      <span className="text-[0.6rem] text-foreground/30 font-bold">{comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                    </div>
                    {isAdmin && (
                      <button onClick={() => handleDeleteComment(comment.id)} className="text-foreground/20 hover:text-destructive transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <p className="text-foreground/70 leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  );
}
