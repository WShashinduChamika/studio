// src/ai/flows/time-optimization-recommendations.ts
'use server';

/**
 * @fileOverview Provides AI-powered time optimization recommendations based on user's time logs.
 *
 * - getTimeOptimizationRecommendations - A function that generates time optimization recommendations.
 * - TimeOptimizationRecommendationsInput - The input type for the getTimeOptimizationRecommendations function.
 * - TimeOptimizationRecommendationsOutput - The return type for the getTimeOptimizationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TimeOptimizationRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  timeLogs: z.array(
    z.object({
      taskName: z.string().describe('The name of the task.'),
      startTime: z.string().describe('The start time of the task (ISO format).'),
      endTime: z.string().describe('The end time of the task (ISO format).'),
      duration: z.number().describe('The duration of the task in minutes.'),
    })
  ).describe('An array of time logs for the user.'),
});
export type TimeOptimizationRecommendationsInput = z.infer<typeof TimeOptimizationRecommendationsInputSchema>;

const TimeOptimizationRecommendationsOutputSchema = z.object({
  dailySummary: z.string().describe('A summary of total time spent daily.'),
  weeklySummary: z.string().describe('A summary of total time spent weekly.'),
  recommendations: z.string().describe('AI-powered recommendations for time optimization.'),
});
export type TimeOptimizationRecommendationsOutput = z.infer<typeof TimeOptimizationRecommendationsOutputSchema>;

export async function getTimeOptimizationRecommendations(input: TimeOptimizationRecommendationsInput): Promise<TimeOptimizationRecommendationsOutput> {
  return timeOptimizationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'timeOptimizationRecommendationsPrompt',
  input: {schema: TimeOptimizationRecommendationsInputSchema},
  output: {schema: TimeOptimizationRecommendationsOutputSchema},
  prompt: `You are a time management expert. Analyze the user's time logs and provide a daily summary, weekly summary, and recommendations for optimizing their time and workflows.

User ID: {{{userId}}}
Time Logs:
{{#each timeLogs}}
  Task: {{{taskName}}}, Start: {{{startTime}}}, End: {{{endTime}}}, Duration: {{{duration}}} minutes
{{/each}}

Daily Summary:
Weekly Summary:
Recommendations:`,
});

const timeOptimizationRecommendationsFlow = ai.defineFlow(
  {
    name: 'timeOptimizationRecommendationsFlow',
    inputSchema: TimeOptimizationRecommendationsInputSchema,
    outputSchema: TimeOptimizationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
