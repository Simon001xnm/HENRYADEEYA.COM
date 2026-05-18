'use server';
/**
 * @fileOverview A GenAI tool that synthesizes weekly economic notes and theological reflections
 *               into concise, actionable daily mission statements.
 *
 * - thoughtweaverDailyMission - A function that handles the generation of a daily mission statement.
 * - ThoughtweaverDailyMissionInput - The input type for the thoughtweaverDailyMission function.
 * - ThoughtweaverDailyMissionOutput - The return type for the thoughtweaverDailyMission function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThoughtweaverDailyMissionInputSchema = z.object({
  weeklyEconomicNotes: z
    .string()
    .describe('Weekly economic notes provided by the user.'),
  theologicalReflections: z
    .string()
    .describe('Theological reflections provided by the user.'),
});
export type ThoughtweaverDailyMissionInput = z.infer<
  typeof ThoughtweaverDailyMissionInputSchema
>;

const ThoughtweaverDailyMissionOutputSchema = z.object({
  dailyMissionStatement: z
    .string()
    .describe(
      'A concise, actionable daily mission statement derived from economic notes and theological reflections.'
    ),
});
export type ThoughtweaverDailyMissionOutput = z.infer<
  typeof ThoughtweaverDailyMissionOutputSchema
>;

export async function thoughtweaverDailyMission(
  input: ThoughtweaverDailyMissionInput
): Promise<ThoughtweaverDailyMissionOutput> {
  return thoughtweaverDailyMissionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'thoughtweaverDailyMissionPrompt',
  input: {schema: ThoughtweaverDailyMissionInputSchema},
  output: {schema: ThoughtweaverDailyMissionOutputSchema},
  prompt: `As an AI assistant named "Thoughtweaver", your goal is to synthesize the provided weekly economic notes and theological reflections into a concise and actionable daily mission statement.

The mission statement should be inspiring, practical, and integrate themes from both the economic and theological inputs.

Weekly Economic Notes: {{{weeklyEconomicNotes}}}

Theological Reflections: {{{theologicalReflections}}}

Based on these inputs, provide a single, actionable daily mission statement.`,
});

const thoughtweaverDailyMissionFlow = ai.defineFlow(
  {
    name: 'thoughtweaverDailyMissionFlow',
    inputSchema: ThoughtweaverDailyMissionInputSchema,
    outputSchema: ThoughtweaverDailyMissionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
