import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email().min(1),
  password: z
    .string()
    .min(5)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
    ),
});

export type SignInData = z.infer<typeof SignInSchema>;
