import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('1d'),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  AI_PROVIDER: z.enum(['gemini', 'openai', 'mock']).default('mock'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEFAULT_LANGUAGE: z.enum(['en', 'hi']).default('en'),
});

export function validateConfig() {
  const parsed = envSchema.safeParse(process.env);
  
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    throw new Error('Invalid environment variables');
  }
  
  return parsed.data;
}

export const config = validateConfig();

export const frontendConfig = {
  NEXT_PUBLIC_APP_URL: config.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEFAULT_LANGUAGE: config.NEXT_PUBLIC_DEFAULT_LANGUAGE,
};
