import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { createGate } from 'effector-react';
import { attach, sample } from 'effector';
import { marketItemService } from '../../services/MarketItemService.ts';

export const Gate = createGate<{ id: string | null }>();

export const form = createForm({
  fields: {
    lego_set_id: {
      init: null as unknown as number,
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
    set_state: {
      init: '' as
        | 'BRAND_NEW'
        | 'BOX_OPENED'
        | 'BAGS_OPENED'
        | 'BUILT_WITH_BOX'
        | 'BUILT_WITHOUT_BOX'
        | 'BUILT_PIECES_LOST',
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
    price: {
      init: null as unknown as number,
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
    location: {
      init: '',
    },
  },
});

const addMarketItemFx = attach({
  source: form.$values,
  effect: (values) =>
    marketItemService.CreateMarketItem({
      lego_set_id: values.lego_set_id,
      location: values.location,
      price: values.price,
      set_state: values.set_state,
      description: values.description,
    }),
});

sample({
  clock: form.formValidated,
  target: addMarketItemFx,
});
