import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { createGate } from 'effector-react';

export const Gate = createGate<{ id: string | null }>();

export const form = createForm({
  fields: {
    lego_set_id: {
      init: null as null | number,
      rules: [
        createRule({
          name: 'lego_set_id',
          schema: z
            .number()
            .int()
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Missing lego set ID'),
        }),
      ],
    },
    condition: {
      init: '',
      rules: [
        createRule({
          name: 'set_states',
          schema: z.string().min(1, 'Missing condition'),
        }),
      ],
    },
    description: {
      init: '',
    },
    location: {
      init: '',
    },
    price: {
      init: null as null | number,
      rules: [
        createRule({
          name: 'price',
          schema: z
            .number()
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Missing price'),
        }),
      ],
    },
  },
});
