import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { setStates } from '../../types/MarketItemType.ts';
import { createGate } from 'effector-react';
import { attach, sample } from 'effector';
import {
  $legoSetOptions,
  GetLegoSetsFx,
  toOptions,
} from '../lego-set/options/model.ts';
import { collectionService } from '../../services/CollectionService.ts';
import { NavigateFunction } from 'react-router-dom';

export const gate = createGate<{
  navigateFn: NavigateFunction;
}>();

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

const AddCollectionSetFx = attach({
  source: form.$values,
  effect: (values) =>
    collectionService.AddCollectionSet({
      buy_price: values.buy_price,
      lego_set_id: Number(values.lego_set_id),
      state: values.state,
    }),
});

const collectionRedirectFx = attach({
  source: gate.state,
  effect: ({ navigateFn }) => navigateFn('/collection/'),
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

sample({
  clock: form.formValidated,
  target: AddCollectionSetFx,
});

sample({
  clock: AddCollectionSetFx.done,
  target: collectionRedirectFx,
});

sample({
  clock: gate.close,
  target: form.reset,
});
