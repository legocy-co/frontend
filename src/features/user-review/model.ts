import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';

export const form = createForm({
  fields: {
    rating: {
      init: null as unknown as number,
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
