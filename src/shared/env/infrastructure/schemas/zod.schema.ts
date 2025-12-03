import z from 'zod';
import { Env } from '../../domain/env.interface';

const validateNumber = (val: string) => (typeof val === 'string' && /^[0-9]+$/.test(val) ? Number(val) : val);
const replace = (val: string) => val.replaceAll('[', '').replaceAll(']', '').replaceAll(' ', '');
const validateStringArray = (val: string | string[]) => (typeof val == 'string' ? replace(val).split(',') : val);

export const ZodEnvSchema: z.ZodType<Env> = z.object({
  PORT: z.preprocess(
    validateNumber,
    z
      .number({ error: 'PORT must be a number' })
      .min(1000, { message: 'PORT must be greater than 1000' })
      .max(65535, { message: 'PORT must be less than 65535' }),
  ),
  NODE_ENV: z
    .enum(['development', 'production', 'test'], { error: `NODE_ENV must be a 'development' | 'production' | 'test'` })
    .default('development'),
  CORS_ORIGIN: z.preprocess(
    validateStringArray,
    z.array(z.url({ message: 'CORS_ORIGIN must be a valid URL' }), { error: 'CORS_ORIGIN must by an array of valid URLs' }),
  ),
  DB_TYPE: z.enum(['postgresql', 'sqlserver', 'mysql'], { error: `DB_TYPE must be a 'postgresql' | 'sqlserver' | 'mysql'` }).default('postgresql'),
  DB_HOST: z.string({ error: 'DB_HOST must be a string' }).nonempty({ message: 'DB_HOST is no empty' }).nonoptional({
    message: 'DB_HOST is required',
  }),
  DB_NAME: z.string({ error: 'DB_NAME must be a string' }).nonempty({ message: 'DB_NAME is no empty' }).nonoptional({
    message: 'DB_NAME is required',
  }),
  DB_USERNAME: z.string({ error: 'DB_USERNAME must be a string' }).nonempty({ message: 'DB_USERNAME is no empty' }).nonoptional({
    message: 'DB_USERNAME is required',
  }),
  DB_PASSWORD: z.string({ error: 'DB_PASSWORD must be a string' }).nonoptional({
    message: 'DB_USERNAME is required',
  }),
  DB_PORT: z.preprocess(
    validateNumber,
    z
      .number({ error: 'DB_PORT must be a number' })
      .min(1000, { message: 'DB_PORT must be greater than 1000' })
      .max(65535, { message: 'DB_PORT must be less than 65535' }),
  ),
});
