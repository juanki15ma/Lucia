
'use server';

import { generateLoveNote, GenerateLoveNoteInput } from '@/ai/flows/generate-love-note';

export async function handleGenerateLoveNote(input: GenerateLoveNoteInput) {
  try {
    const result = await generateLoveNote(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error generating love note:", error);
    return { success: false, error: 'Tuve un problema para inspirarme... Inténtalo de nuevo.' };
  }
}
