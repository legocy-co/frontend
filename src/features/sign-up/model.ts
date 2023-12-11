import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { attach, sample } from 'effector';

export const form = createForm({
  fields: {
    username: {
      init: '',
      rules: [
        createRule({
          name: 'username',
          schema: z.string().trim().min(1, 'Missing Username'),
        }),
      ],
    },
    email: {
      init: '',
      rules: [
        createRule({
          name: 'email',
          schema: z.string().trim().min(1, 'Missing E-mail address'),
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
    passwordConfirm: {
      init: '',
      rules: [
        createRule({
          name: 'passwordConfirm',
          schema: z.string().trim().min(1, 'Missing Password confirmation'),
        }),
      ],
    },
  },
});

// AuthService
const signInFx = attach({
  source: form.$values,
  effect: (values) =>
    console.log({
      username: values.username,
      email: values.email,
      password: values.password,
    }),
});

sample({
  clock: form.formValidated,
  target: signInFx,
});
