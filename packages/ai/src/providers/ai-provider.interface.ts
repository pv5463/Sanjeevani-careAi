import { ZodSchema } from 'zod';

export interface AIProvider {
  generateStructuredOutput<T>(prompt: string, schema: ZodSchema<T>, systemPrompt?: string): Promise<T>;
  generateText(prompt: string, systemPrompt?: string): Promise<string>;
  isAvailable(): Promise<boolean>;
}
