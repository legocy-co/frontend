import { z } from 'zod';
import { Form } from 'effector-forms';

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type SignInData = z.infer<typeof SignInSchema>;

export type SignInForm = Form<{ email: string; password: string }>;
