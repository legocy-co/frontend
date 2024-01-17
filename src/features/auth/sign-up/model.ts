import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import { attach, sample } from 'effector';
import { authService } from '../../../services/AuthService.ts';
import { signedIn } from '../sign-in/model.ts';

export const form = createForm({
  fields: {
    username: {
      init: '',
      rules: [
        createRule({
          name: 'username',
          schema: z.string().trim().min(1, 'Missing username'),
        }),
      ],
    },
    email: {
      init: '',
      rules: [
        createRule({
          name: 'email',
          schema: z
            .string()
            .trim()
            .min(1, 'Missing email')
            .email('Invalid email'),
        }),
      ],
    },
    password: {
      init: '',
      rules: [
        createRule({
          name: 'password',
          schema: z
            .string()
            .trim()
            .min(1, 'Missing password')
            .min(5, 'The password must be at least 5 characters long')
            .max(30, 'The password must be a maximum 30 characters')
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{5,}$/,
              'The password must contain a lowercase, uppercase, digit and a special character'
            ),
        }),
        {
          name: 'passwords-equal',
          validator: (value: string, { passwordConfirm }) => {
            return value === passwordConfirm;
          }, // isInvalid red glow
          errorText: 'Passwords do not match',
        },
      ],
    },
    passwordConfirm: {
      init: '',
      rules: [
        createRule({
          name: 'passwordConfirm',
          schema: z.string().trim().min(1, 'Missing password confirmation'),
        }),
        {
          name: 'passwords-equal',
          validator: (value: string, { password }) => {
            return value === password;
          },
          errorText: 'Passwords do not match',
        },
      ],
    },
  },
});

// AuthService
const signUpFx = attach({
  source: form.$values,
  effect: (values) =>
    authService.SignUp({
      username: values.username,
      email: values.email,
      password: values.password,
    }),
});

sample({
  clock: form.formValidated,
  target: signUpFx,
});

sample({
  clock: signUpFx.done,
  target: signedIn,
});
