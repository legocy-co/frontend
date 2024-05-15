import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import {
  StoreValue,
  createDomain,
  sample,
  attach,
  createEvent,
  EventPayload,
  split,
} from 'effector';
import { MarketItem, setStates } from '../../../types/MarketItemType.ts';
import {
  $legoSetOptions,
  fetchLegoSetsFx,
  toOptions,
} from '../../lego-set/options/model.ts';
import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router-dom';
import { marketItemService } from '../../../services/MarketItemService.ts';

export const gate = createGate<{
  id: string | null;
  navigateFn: NavigateFunction;
}>();

export const form = createForm({
  fields: {
    legoSetID: {
      init: '',
      rules: [
        createRule({
          name: 'legoSetID',
          schema: z.string().min(1, 'Missing Lego set'),
        }),
      ],
    },
    setState: {
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

const $itemId = gate.state.map(({ id }) => id);
const $isEditing = $itemId.map((id) => id !== null);

const fetchMarketItemFx = attach({
  source: {
    id: $itemId,
  },
  effect: ({ id }) => {
    if (!id) throw new Error('Market item not found');
    return marketItemService.GetMarketItem(id!);
  },
});

export const setForm = domain.createEvent<MarketItem>();

export const createFormInfo = domain.createEvent();

const updateFormInfo = domain.createEvent();

export const resetDomain = domain.createEvent();

export const $mappedValues = form.$values.map(mapFormToRequestBody);

const setMarketItem = createEvent<MarketItem>();

const updateMarketItemFx = attach({
  source: {
    id: $itemId,
    data: $mappedValues,
  },
  effect: ({ id, data }) => marketItemService.UpdateMarketItem(id!, data),
});

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    legoSetID: Number(values.legoSetID),
    location: `${values.city}, ${values.country}`,
    price: Math.floor(values.price * 100) / 100,
    setState: values.setState,
    description: values.description,
  };
}

function toForm(values: MarketItem): EventPayload<typeof form.setForm> {
  const locationMap = values.location.split(', ');

  return {
    legoSetID: String(values.legoSet.id),
    country: locationMap[1],
    city: locationMap[0],
    price: values.price,
    setState: values.setState,
    description: values.description,
  };
}

const uploadsRedirectFX = attach({
  source: gate.state,
  effect: ({ navigateFn }) => navigateFn('/profile/my/uploads'),
});

domain.onCreateStore((store) => store.reset(resetDomain));

sample({
  clock: gate.open,
  target: fetchLegoSetsFx,
});

sample({
  clock: $itemId,
  target: fetchMarketItemFx,
});

sample({
  clock: fetchMarketItemFx.doneData,
  target: setMarketItem,
});

sample({
  clock: setMarketItem,
  target: setForm,
});

sample({
  clock: setForm,
  fn: toForm,
  target: form.setForm,
});

sample({
  clock: fetchLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

split({
  source: form.formValidated,
  match: $isEditing.map(String),
  cases: {
    true: updateFormInfo,
    false: createFormInfo,
  },
});

sample({
  clock: updateFormInfo,
  target: updateMarketItemFx,
});

sample({
  clock: updateMarketItemFx.done,
  target: uploadsRedirectFX,
});

sample({
  clock: resetDomain,
  target: form.reset,
});