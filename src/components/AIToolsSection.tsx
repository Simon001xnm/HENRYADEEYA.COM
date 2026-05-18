"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Sparkles, Loader2, Quote } from 'lucide-react';
import { visionCatalystEntrepreneurInsights, VisionCatalystEntrepreneurInsightsOutput } from '@/ai/flows/vision-catalyst-entrepreneur-insights-flow';
import { thoughtweaverDailyMission, ThoughtweaverDailyMissionOutput } from '@/ai/flows/thoughtweaver-daily-mission';

export function AIToolsSection() {
  const [loading, setLoading] = useState(false);
  
  // Vision Catalyst State
  const [challenge, setChallenge] = useState("");
  const [visionOutput, setVisionOutput] = useState<VisionCatalystEntrepreneurInsightsOutput | null>(null);

  // Thoughtweaver State
  const [econNotes, setEconNotes] = useState("");
  const [theoRef, setTheoRef] = useState("");
  const [missionOutput, setMissionOutput] = useState<ThoughtweaverDailyMissionOutput | null>(null);

  const handleVisionCatalyst = async () => {
    if (!challenge) return;
    setLoading(true);
    try {
      const result = await visionCatalystEntrepreneurInsights({ businessIdeaOrChallenge: challenge });
      setVisionOutput(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleThoughtweaver = async () => {
    if (!econNotes || !theoRef) return;
    setLoading(true);
    try {
      const result = await thoughtweaverDailyMission({ 
        weeklyEconomicNotes: econNotes, 
        theologicalReflections: theoRef 
      });
      setMissionOutput(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-tools" className="py-24 px-6 md:px-20 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-[0.7rem] tracking-[0.25em] uppercase font-medium mb-4 block">Interactive Intellect</span>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-foreground mb-4">
            AI <span className="italic text-primary">Nexus</span>
          </h2>
          <p className="text-foreground/40 max-w-lg mx-auto">Leveraging tailored AI algorithms to bridge economic insights and leadership wisdom.</p>
        </div>

        <Tabs defaultValue="vision" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card h-14 border border-primary/10 rounded-none p-1">
            <TabsTrigger value="vision" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background text-[0.7rem] uppercase tracking-widest">Vision Catalyst</TabsTrigger>
            <TabsTrigger value="thought" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-background text-[0.7rem] uppercase tracking-widest">Thoughtweaver</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vision" className="mt-8 space-y-6">
            <Card className="bg-card border-primary/10 rounded-none overflow-hidden">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-3">
                  <BrainCircuit className="text-primary" /> Strategy Engine
                </CardTitle>
                <CardDescription className="text-foreground/40 italic">Input your business challenge to receive servant-leadership based strategy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Describe your current business bottleneck or a new venture idea..."
                  className="bg-background border-primary/5 min-h-[120px] focus:border-primary transition-colors"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                />
                <Button 
                  onClick={handleVisionCatalyst} 
                  disabled={loading || !challenge}
                  className="w-full bg-primary text-background hover:bg-primary/90 font-bold tracking-widest py-6 rounded-none uppercase text-[0.7rem]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="mr-2 h-4 w-4" /> Generate Insights</>}
                </Button>

                {visionOutput && (
                  <div className="mt-8 grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 bg-primary/5 border border-primary/10">
                      <h4 className="font-headline text-lg text-primary mb-3">Business Strategy</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">{visionOutput.businessStrategy}</p>
                    </div>
                    <div className="p-6 bg-accent/5 border border-accent/10">
                      <h4 className="font-headline text-lg text-accent mb-3">Leadership Wisdom</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">{visionOutput.leadershipInsights}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="thought" className="mt-8 space-y-6">
            <Card className="bg-card border-primary/10 rounded-none">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-3">
                  <Quote className="text-primary" /> Mission Architect
                </CardTitle>
                <CardDescription className="text-foreground/40 italic">Synthesize market observations with theological reflections.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Textarea 
                    placeholder="Weekly Economic Notes..."
                    className="bg-background border-primary/5 min-h-[100px]"
                    value={econNotes}
                    onChange={(e) => setEconNotes(e.target.value)}
                  />
                  <Textarea 
                    placeholder="Theological Reflections..."
                    className="bg-background border-primary/5 min-h-[100px]"
                    value={theoRef}
                    onChange={(e) => setTheoRef(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleThoughtweaver} 
                  disabled={loading || !econNotes || !theoRef}
                  className="w-full bg-primary text-background hover:bg-primary/90 font-bold tracking-widest py-6 rounded-none uppercase text-[0.7rem]"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="mr-2 h-4 w-4" /> Synthesize Mission</>}
                </Button>

                {missionOutput && (
                  <div className="mt-8 p-10 bg-primary/5 border border-primary/20 text-center animate-in zoom-in-95 duration-500">
                    <span className="text-[0.6rem] text-primary uppercase tracking-[0.3em] mb-4 block">Today's Daily Mission</span>
                    <p className="font-headline text-2xl md:text-3xl text-foreground italic leading-relaxed">
                      "{missionOutput.dailyMissionStatement}"
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
