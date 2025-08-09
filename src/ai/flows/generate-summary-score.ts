'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a summary score for a resume based on AI analysis.
 *
 * - generateSummaryScore - A function that triggers the resume summary score generation flow.
 * - GenerateSummaryScoreInput - The input type for the generateSummaryScore function.
 * - GenerateSummaryScoreOutput - The return type for the generateSummaryScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSummaryScoreInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be analyzed.'),
  analysisResult: z.string().describe('AI analysis result to be summarized.'),
});
export type GenerateSummaryScoreInput = z.infer<
  typeof GenerateSummaryScoreInputSchema
>;

const GenerateSummaryScoreOutputSchema = z.object({
  summaryScore: z
    .number()
    .describe(
      'A summary score (out of 100) representing the overall quality of the resume.'
    ),
  breakdown: z
    .string()
    .describe(
      'A breakdown of the score, highlighting areas of strength and weakness.'
    ),
});
export type GenerateSummaryScoreOutput = z.infer<
  typeof GenerateSummaryScoreOutputSchema
>;

export async function generateSummaryScore(
  input: GenerateSummaryScoreInput
): Promise<GenerateSummaryScoreOutput> {
  return generateSummaryScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSummaryScorePrompt',
  input: {schema: GenerateSummaryScoreInputSchema},
  output: {schema: GenerateSummaryScoreOutputSchema},
  prompt: `You are an AI resume expert. Analyze the following resume analysis and generate a summary score out of 100, along with a breakdown of the score.

Resume Analysis: {{{analysisResult}}}

Consider the following criteria when generating the score:
* Content quality
* Structure and formatting
* Relevance to job market
* Overall presentation

Ensure the summary score and breakdown are clear and concise. The summary score must be a number between 0 and 100. The breakdown should concisely explain how the score was determined.

Output a score and a breakdown.`,
});

const generateSummaryScoreFlow = ai.defineFlow(
  {
    name: 'generateSummaryScoreFlow',
    inputSchema: GenerateSummaryScoreInputSchema,
    outputSchema: GenerateSummaryScoreOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
