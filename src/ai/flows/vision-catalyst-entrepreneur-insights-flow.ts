'use server';
/**
 * @fileOverview This file implements a Genkit flow for the Vision Catalyst AI tool.
 * It provides tailored business strategy and leadership insights based on economic principles and servant leadership philosophy
 * for young entrepreneurs.
 *
 * - visionCatalystEntrepreneurInsights - A function that handles the generation of insights.
 * - VisionCatalystEntrepreneurInsightsInput - The input type for the visionCatalystEntrepreneurInsights function.
 * - VisionCatalystEntrepreneurInsightsOutput - The return type for the visionCatalystEntrepreneurInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VisionCatalystEntrepreneurInsightsInputSchema = z.object({
  businessIdeaOrChallenge: z.string().describe('A detailed description of the entrepreneur\'s business idea or challenge.'),
});
export type VisionCatalystEntrepreneurInsightsInput = z.infer<typeof VisionCatalystEntrepreneurInsightsInputSchema>;

const VisionCatalystEntrepreneurInsightsOutputSchema = z.object({
  businessStrategy: z.string().describe('Tailored business strategy insights based on economic principles.'),
  leadershipInsights: z.string().describe('Tailored leadership insights based on servant leadership philosophy.'),
});
export type VisionCatalystEntrepreneurInsightsOutput = z.infer<typeof VisionCatalystEntrepreneurInsightsOutputSchema>;

export async function visionCatalystEntrepreneurInsights(input: VisionCatalystEntrepreneurInsightsInput): Promise<VisionCatalystEntrepreneurInsightsOutput> {
  return visionCatalystEntrepreneurInsightsFlow(input);
}

const visionCatalystPrompt = ai.definePrompt({
  name: 'visionCatalystPrompt',
  input: { schema: VisionCatalystEntrepreneurInsightsInputSchema },
  output: { schema: VisionCatalystEntrepreneurInsightsOutputSchema },
  prompt: `You are a "Vision Catalyst" AI tool, an expert in economic principles and servant leadership philosophy.
Your goal is to provide tailored business strategy and leadership insights to young entrepreneurs.

Analyze the following business idea or challenge and provide actionable advice.

Business Idea or Challenge: {{{businessIdeaOrChallenge}}}

---

Based on the input, provide:

1.  **Business Strategy**: Practical, economically sound strategies to address the business idea or challenge.
2.  **Leadership Insights**: Guidance rooted in servant leadership philosophy, focusing on how the entrepreneur can lead effectively, serve their team, and impact their community.`,
});

const visionCatalystEntrepreneurInsightsFlow = ai.defineFlow(
  {
    name: 'visionCatalystEntrepreneurInsightsFlow',
    inputSchema: VisionCatalystEntrepreneurInsightsInputSchema,
    outputSchema: VisionCatalystEntrepreneurInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await visionCatalystPrompt(input);
    return output!;
  }
);
