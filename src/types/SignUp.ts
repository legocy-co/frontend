import { z } from 'zod';
import { Form } from 'effector-forms';

export type SignUpData = z.infer<typeof SignUpSchema>;
export type SignUpForm = Form<{
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}>;

export const SignUpSchema = z.object({
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(5)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{5,}$/
    ),
});
