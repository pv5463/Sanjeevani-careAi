import { AIProvider } from './ai-provider.interface';
import OpenAI from 'openai';
import { ZodSchema } from 'zod';

export class OpenAIProvider implements AIProvider {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateStructuredOutput<T>(prompt: string, schema: ZodSchema<T>, systemPrompt?: string): Promise<T> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ]
    });
    
    const content = response.choices[0]?.message?.content || '{}';
    return schema.parse(JSON.parse(content));
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt || 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ]
    });
    return response.choices[0]?.message?.content || '';
  }

  async isAvailable(): Promise<boolean> {
    return !!process.env.OPENAI_API_KEY;
  }
}
