import { createForm } from 'effector-forms';
import { attach, sample, createEvent } from 'effector';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import { authService } from '../../../services/AuthService.ts';

export const form = createForm({
  fields: {
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
          schema: z.string().trim().min(1, 'Missing password'),
        }),
      ],
    },
  },
});

export const signedIn = createEvent();

// AuthService
const signInFx = attach({
  source: form.$values,
  effect: (values) =>
    authService.SignIn({
      email: values.email,
      password: values.password,
    }),
});

sample({
  clock: form.formValidated,
  target: signInFx,
});

sample({
  clock: signInFx.done,
  target: signedIn,
});
