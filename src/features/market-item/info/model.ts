import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import { createGate } from 'effector-react';
import { StoreValue, createDomain, sample } from 'effector';
import { setStates } from '../../../types/MarketItemType.ts';
import {
  $legoSetOptions,
  GetLegoSetsFx,
  toOptions,
} from '../../common/legoset-options/model.ts';

export const form = createForm({
  fields: {
    lego_set_id: {
      init: '',
      rules: [
        createRule({
          name: 'lego_set_id',
          schema: z.string().min(1, 'Missing Lego set'),
        }),
      ],
    },
    set_state: {
      init: '' as keyof typeof setStates,
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
            .max(999999)
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Missing price'),
        }),
      ],
    },
    country: {
      init: '',
      rules: [
        createRule({
          name: 'country',
          schema: z.string().min(1, 'Missing country'),
        }),
      ],
    },
    city: {
      init: '',
      rules: [
        createRule({
          name: 'city',
          schema: z.string().min(1, 'Missing city'),
        }),
      ],
    },
  },
});

const domain = createDomain();

export const gate = createGate<{ id: string | null }>();

export const createFormInfo = domain.createEvent();

export const resetDomain = domain.createEvent();

export const $mappedValues = form.$values.map(mapFormToRequestBody);

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    lego_set_id: Number(values.lego_set_id),
    location: `${values.city}, ${values.country}`,
    price: Math.floor(values.price * 100) / 100,
    set_state: values.set_state,
    description: values.description,
  };
}

domain.onCreateStore((store) => store.reset(resetDomain));

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
  target: createFormInfo,
});

sample({
  clock: resetDomain,
  target: form.reset,
});
