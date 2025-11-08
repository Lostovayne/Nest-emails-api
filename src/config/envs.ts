import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z
  .object({
    PORT: z.string().min(1, 'PORT is required').transform(Number),
  })
  .loose();

const envParsed = envSchema.safeParse(process.env);

if (!envParsed.success) {
  console.error('❌ Invalid environment variables:', envParsed.error.format());
  throw new Error('Invalid environment variables');
}

export const envs = {
  port: envParsed.data.PORT,
};
