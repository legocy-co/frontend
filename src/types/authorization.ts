import { z } from 'zod';
import { Form } from 'effector-forms';

export type FacebookAuthData = {
  email: string;
  facebook_id: string;
  username: string;
};

export type GoogleAuthData = { token: string };

export type SignInData = z.infer<typeof SignInSchema>;

export type SignUpData = z.infer<typeof SignUpSchema>;

export type SignInForm = Form<{ email: string; password: string }>;

export type SignUpForm = Form<{
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}>;

export const SignInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export const SignUpSchema = z.object({
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(5)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/!@#$%^&`*|()_+{}\[\]:;<>',.?~\\-]).{5,}$/,
    ),
});
