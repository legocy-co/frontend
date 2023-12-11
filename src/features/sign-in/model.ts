import { createForm } from 'effector-forms';
import { attach, sample } from 'effector';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';

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

// toAPI
const signInFx = attach({
  source: form.$values,
  effect: (values) =>
    console.log({
      username: values.username,
      password: values.password,
    }),
});

sample({
  clock: form.formValidated,
  target: signInFx,
});
