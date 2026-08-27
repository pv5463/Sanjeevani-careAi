import { AIProvider } from './ai-provider.interface';
import { ZodSchema } from 'zod';

export class MockProvider implements AIProvider {
  async generateStructuredOutput<T>(prompt: string, schema: ZodSchema<T>, systemPrompt?: string): Promise<T> {
    console.log('[MockProvider] generateStructuredOutput called');
    // Return dummy empty object matching the structure for SIH demo
    return {} as T;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    return 'Mock AI response';
  }

  async isAvailable(): Promise<boolean> {
    return true;
  }
}
