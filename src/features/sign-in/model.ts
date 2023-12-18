import { createForm } from 'effector-forms';
import { attach, sample, createEvent } from 'effector';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { AuthService } from '../../services/AuthService.ts';

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
            .min(1, 'Missing E-mail address')
            .email('Invalid E-mail address'),
        }),
      ],
    },
    password: {
      init: '',
      rules: [
        createRule({
          name: 'password',
          schema: z.string().trim().min(1, 'Missing Password'),
        }),
      ],
    },
  },
});

// AuthService
const signInFx = attach({
  source: form.$values,
  effect: (values) =>
    AuthService.SignIn({
      email: values.email,
      password: values.password,
    }),
});

export const signedIn = createEvent();

sample({
  clock: form.formValidated,
  target: signInFx,
});

sample({
  clock: signInFx.fail,
  target: form.fields.email.addError.prepend(() => ({
    errorText: 'Invalid email or password',
    rule: 'email',
  })),
});

sample({
  clock: signInFx.fail,
  target: form.fields.password.addError.prepend(() => ({
    rule: 'password',
  })), // password red glow
});

sample({
  clock: signInFx.done,
  target: signedIn,
});
