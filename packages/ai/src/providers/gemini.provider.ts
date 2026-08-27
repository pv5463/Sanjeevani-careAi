import { AIProvider } from './ai-provider.interface';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ZodSchema } from 'zod';

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async generateStructuredOutput<T>(prompt: string, schema: ZodSchema<T>, systemPrompt?: string): Promise<T> {
    let attempts = 0;
    const maxRetries = 3;
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    while (attempts < maxRetries) {
      try {
        const fullPrompt = `${systemPrompt ? systemPrompt + '\n' : ''}Please provide a JSON output matching this schema.\nPrompt: ${prompt}`;
        const result = await model.generateContent(fullPrompt);
        const text = result.response.text();
        
        // Extract JSON if wrapped in markdown blocks
        let jsonStr = text;
        if (text.includes('```json')) {
          jsonStr = text.split('```json')[1].split('```')[0].trim();
        } else if (text.includes('```')) {
          jsonStr = text.split('```')[1].split('```')[0].trim();
        }

        const parsed = JSON.parse(jsonStr);
        return schema.parse(parsed);
      } catch (e) {
        attempts++;
        if (attempts >= maxRetries) throw e;
      }
    }
    throw new Error('Failed to generate structured output after retries');
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const fullPrompt = systemPrompt ? `${systemPrompt}\n${prompt}` : prompt;
    const result = await model.generateContent(fullPrompt);
    return result.response.text();
  }

  async isAvailable(): Promise<boolean> {
    return !!process.env.GEMINI_API_KEY;
  }
}
