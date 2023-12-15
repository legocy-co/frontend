import { z } from 'zod';

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string().min(5).max(30),
});

export type SignInData = z.infer<typeof SignInSchema>;
