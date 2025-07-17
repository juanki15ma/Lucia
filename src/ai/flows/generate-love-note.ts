'use server';

/**
 * @fileOverview AI-powered Love Note Generator for personalized compliments.
 *
 * - generateLoveNote - A function that generates sweet compliments about Lucia.
 * - GenerateLoveNoteOutput - The return type for the generateLoveNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// No input is needed anymore as the details are hardcoded in the prompt.
export type GenerateLoveNoteInput = void;

const GenerateLoveNoteOutputSchema = z.object({
  loveNote: z.string().describe('A sweet, personalized love note.'),
});
export type GenerateLoveNoteOutput = z.infer<typeof GenerateLoveNoteOutputSchema>;

export async function generateLoveNote(input: GenerateLoveNoteInput): Promise<GenerateLoveNoteOutput> {
  return generateLoveNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLoveNotePrompt',
  output: {schema: GenerateLoveNoteOutputSchema},
  prompt: `Eres un escritor de notas de amor con mucho ingenio. Crea un piropo o una nota corta, sentida y dulce para Lucia.

Aquí tienes algunos detalles sobre ella para que te inspires:
- Es guapa, inteligente, ingeniera y valiente.
- Le encanta leer, la música rock y viajar.
- Tiene un gato que se llama Tejón.
- Le apasionan las motos, admira a Valentino Rossi y a Lewis Hamilton de la F1.

Usa uno o varios de estos detalles para crear un mensaje original y cariñoso. Sé creativo y romántico.`,
});

const generateLoveNoteFlow = ai.defineFlow(
  {
    name: 'generateLoveNoteFlow',
    outputSchema: GenerateLoveNoteOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
