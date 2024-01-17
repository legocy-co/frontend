import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import objectKeysToZodEnum from '../../shared/lib/zod.ts';
import { setStates } from '../../types/MarketItemType.ts';
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
            .refine((value) => value !== null, 'required field'),
        }),
      ],
    },
    set_state: {
      init: '',
      rules: [
        createRule({
          name: 'set_states',
          schema: objectKeysToZodEnum(setStates),
        }),
      ],
    },
    description: {
      init: '',
      rules: [
        createRule({
          name: 'description',
          schema: z.string().min(1, 'required field'),
        }),
      ],
    },
    location: {
      init: '',
      rules: [
        createRule({
          name: 'location',
          schema: z.string().min(1, 'required field'),
        }),
      ],
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
            .refine((value) => value !== null, 'required field'),
        }),
      ],
    },
  },
});
