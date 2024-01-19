import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import { createGate } from 'effector-react';
import {
  StoreValue,
  createEffect,
  createStore,
  createDomain,
  sample,
} from 'effector';
import { legoSetService } from '../../../services/LegoSetService.ts';
import { LegoSet } from '../../../types/LegoSetType.ts';

export const gate = createGate<{ id: string | null }>();

export const $legoSetOptions = createStore<LegoSetOption[]>([]);

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

type LegoSetOption = {
  id: string;
  number: number;
  name: string;
};

const GetLegoSetsFx = createEffect(() => legoSetService.GetLegoSets());

function toOptions(legoSets: LegoSet[]): LegoSetOption[] {
  return legoSets.map((legoSet) => ({
    id: String(legoSet.id),
    number: legoSet.number,
    name: legoSet.name,
  }));
}

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    lego_set_id: Number(values.lego_set_id),
    location: `${values.city}, ${values.country}`,
    price: values.price,
    set_state: values.set_state,
    description: values.description,
  };
}

const domain = createDomain();

export const createFormDetails = domain.createEvent();

export const resetDomain = domain.createEvent();

export const $mappedValues = form.$values.map(mapFormToRequestBody);

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
  target: createFormDetails,
});

sample({
  clock: resetDomain,
  target: form.reset,
});
