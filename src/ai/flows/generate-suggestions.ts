// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating suggestions to improve a resume.
 *
 * - `generateSuggestions` - A function that takes resume content as input and returns AI-generated suggestions for improvement.
 * - `GenerateSuggestionsInput` - The input type for the `generateSuggestions` function.
 * - `GenerateSuggestionsOutput` - The output type for the `generateSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSuggestionsInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume to be analyzed and improved.'),
});
export type GenerateSuggestionsInput = z.infer<typeof GenerateSuggestionsInputSchema>;

const GenerateSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-generated suggestions for improving the resume content and structure.'),
});
export type GenerateSuggestionsOutput = z.infer<typeof GenerateSuggestionsOutputSchema>;

export async function generateSuggestions(input: GenerateSuggestionsInput): Promise<GenerateSuggestionsOutput> {
  return generateSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSuggestionsPrompt',
  input: {schema: GenerateSuggestionsInputSchema},
  output: {schema: GenerateSuggestionsOutputSchema},
  prompt: `You are an AI resume expert. Analyze the following resume content and provide actionable suggestions for improvement.

Resume Content:
{{{resumeContent}}}

Suggestions:
`,
});

const generateSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateSuggestionsFlow',
    inputSchema: GenerateSuggestionsInputSchema,
    outputSchema: GenerateSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
