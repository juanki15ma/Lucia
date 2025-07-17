'use server';

/**
 * @fileOverview AI-powered Love Note Generator for personalized compliments.
 *
 * - generateLoveNote - A function that generates sweet compliments about Lucia.
 * - GenerateLoveNoteInput - The input type for the generateLoveNote function.
 * - GenerateLoveNoteOutput - The return type for the generateLoveNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveNoteInputSchema = z.object({
  personName: z.string().describe('The name of the person to compliment.'),
  relationship: z
    .string()
    .describe('Your relationship with the person (e.g., girlfriend, wife).'),
  occasion: z
    .string()
    .describe('The occasion for the love note (e.g., date proposal, anniversary).'),
  aspects: z
    .string()
    .describe(
      'Specific aspects or qualities you love about the person (e.g., her smile, her kindness).'
    ),
});
export type GenerateLoveNoteInput = z.infer<typeof GenerateLoveNoteInputSchema>;

const GenerateLoveNoteOutputSchema = z.object({
  loveNote: z.string().describe('A sweet, personalized love note.'),
});
export type GenerateLoveNoteOutput = z.infer<typeof GenerateLoveNoteOutputSchema>;

export async function generateLoveNote(input: GenerateLoveNoteInput): Promise<GenerateLoveNoteOutput> {
  return generateLoveNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLoveNotePrompt',
  input: {schema: GenerateLoveNoteInputSchema},
  output: {schema: GenerateLoveNoteOutputSchema},
  prompt: `You are a professional love note writer. Create a heartfelt and sweet love note for {{personName}}, my {{relationship}}, for our {{occasion}}. Focus on the following aspects: {{aspects}}.`,
});

const generateLoveNoteFlow = ai.defineFlow(
  {
    name: 'generateLoveNoteFlow',
    inputSchema: GenerateLoveNoteInputSchema,
    outputSchema: GenerateLoveNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
