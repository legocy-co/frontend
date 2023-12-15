import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(5).max(30),
});

export type SignInData = z.infer<typeof SignInSchema>;
