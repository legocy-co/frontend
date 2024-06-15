import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { upp } from '../../pages/user-profile-pages/index.tsx';
import { createStore, sample } from 'effector';
import { createGate } from 'effector-react';

//TODO: add review effect

export const gate = createGate();

export const form = createForm({
  fields: {
    rating: {
      init: 0,
      rules: [
        createRule({
          name: 'rating',
          schema: z.number().min(1, 'Please fill in rating'),
        }),
      ],
    },
    message: {
      init: '',
      rules: [
        createRule({
          name: 'setState',
          schema: z.string().min(1, 'Please fill in message'),
        }),
      ],
    },
  },
});

export const $username = createStore('');

sample({
  source: upp.$user,
  fn: (user) => user.username,
  target: $username,
});

sample({
  clock: gate.close,
  target: form.reset,
});
