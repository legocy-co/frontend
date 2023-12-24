import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type SignInData = z.infer<typeof SignInSchema>;
