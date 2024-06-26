import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import {
  attach,
  createDomain,
  createEffect,
  createStore,
  sample,
  StoreValue,
} from 'effector';
import { valuationService } from '../../../services/ValuationService.ts';
import { Valuation } from '../../../types/ValuationType.ts';
import { mipf } from '../primary/index.tsx';

export const form = createForm({
  fields: {
    city: {
      init: '',
      rules: [
        createRule({
          name: 'city',
          schema: z.string().min(1, 'Please fill in city'),
        }),
      ],
    },
    country: {
      init: '',
      rules: [
        createRule({
          name: 'country',
          schema: z.string().min(1, 'Please fill in country'),
        }),
      ],
    },
    price: {
      init: 100,
      rules: [
        createRule({
          name: 'price',
          schema: z
            .number()
            .max(999999)
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Please fill in price'),
        }),
      ],
    },
  },
});

export const $valuations = createStore<Valuation[]>([]);

export const $stateValuation = createStore<number>(0);

const domain = createDomain();

export const resetDomain = domain.createEvent();

const fetchValuationsFx = createEffect(valuationService.GetValuations);

const fetchStateValuationFx = attach({
  source: { valuations: $valuations, state: mipf.form.fields.setState.$value },
  effect: ({ valuations, state }) =>
    valuations.find((valuation) => valuation.state === state)?.valuation ?? 0,
});

export const $mappedValues = form.$values.map(mapFormToRequestBody);

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    location: `${values.city}, ${values.country}`,
    price: Math.floor(values.price * 100) / 100,
  };
}

domain.onCreateStore((store) => store.reset(resetDomain));

sample({
  clock: mipf.form.formValidated,
  source: mipf.form.fields.legoSetID.$value,
  target: fetchValuationsFx,
});

sample({
  source: fetchValuationsFx.doneData,
  target: $valuations,
});

sample({
  clock: $valuations,
  target: fetchStateValuationFx,
});

sample({
  source: fetchStateValuationFx.doneData,
  target: $stateValuation,
});

sample({
  clock: resetDomain,
  target: form.reset,
});
