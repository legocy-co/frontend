import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { setStates } from '../../types/MarketItemType.ts';
import { createGate } from 'effector-react';
import { sample } from 'effector';
import {
  $legoSetOptions,
  GetLegoSetsFx,
  toOptions,
} from '../common/legoset-options/model.ts';

export const gate = createGate<{ id: string | null }>();

export const form = createForm({
  fields: {
    buy_price: {
      init: null as unknown as number,
      rules: [
        createRule({
          name: 'buy_price',
          schema: z
            .number()
            .max(999999)
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Missing buy price'),
        }),
      ],
    },
    lego_set_id: {
      init: '',
      rules: [
        createRule({
          name: 'lego_set_id',
          schema: z.string().min(1, 'Missing Lego set'),
        }),
      ],
    },
    state: {
      init: '' as keyof typeof setStates,
      rules: [
        createRule({
          name: 'set_states',
          schema: z.string().min(1, 'Missing condition'),
        }),
      ],
    },
  },
});

sample({
  clock: gate.open,
  target: GetLegoSetsFx,
});

sample({
  clock: GetLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

// TODO: AddCollectionSetFx

// sample({
//   clock: form.formValidated,
//   target: ,
// });

sample({
  clock: gate.close,
  target: form.reset,
});
