import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import { createGate } from 'effector-react';
import { sample } from 'effector';
import { auth } from '..';
import { authService } from '../../../services/AuthService.ts';

export const gate = createGate();

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

// TODO: refactor redirect back

sample({
  clock: gate.open,
  filter: () => authService.IsAuthorized(),
  target: auth.redirectBackFX,
});

sample({
  source: form.formValidated,
  target: auth.signInFx,
});

sample({
  clock: gate.close,
  target: form.reset,
});
