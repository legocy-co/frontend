import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { setStates } from '../../types/MarketItemType.ts';
import { createGate } from 'effector-react';
import {
  attach,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  EventPayload,
  sample,
  split,
} from 'effector';
import {
  $legoSetOptions,
  GetLegoSetsFx,
  toOptions,
} from '../lego-set/options/model.ts';
import { collectionService } from '../../services/CollectionService.ts';
import { NavigateFunction } from 'react-router-dom';
import { CollectionSet } from '../../types/CollectionSetType.ts';

export const gate = createGate<{
  id: string | null;
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

const domain = createDomain();

export const setForm = domain.createEvent<CollectionSet>();

const $collectionSets = createStore<CollectionSet[]>([]);

const $setId = gate.state.map(({ id }) => id);
const $isEditing = $setId.map((id) => id !== null);

const setCollectionSet = createEvent<CollectionSet>();

const GetCollectionFx = createEffect(() => collectionService.GetCollection());

const fetchCollectionSetFx = attach({
  source: {
    collectionSets: $collectionSets,
    setId: $setId,
  },
  effect: ({ collectionSets, setId }) => {
    const collectionSet = collectionSets.find(
      (set) => String(set.id) === setId
    );

    if (!collectionSet) throw new Error('Collection set not found');
    return collectionSet;
  },
});

const addCollectionSetFx = attach({
  source: form.$values,
  effect: (values) =>
    collectionService.AddCollectionSet({
      buy_price: values.buy_price,
      lego_set_id: Number(values.lego_set_id),
      state: values.state,
    }),
});

const updateCollectionSetFx = attach({
  source: {
    id: $setId,
    data: form.$values,
  },
  effect: ({ id, data }) =>
    collectionService.UpdateCollectionSet(id!, {
      buy_price: data.buy_price,
      state: data.state,
      lego_set_id: Number(data.lego_set_id),
    }),
});

const collectionRedirectFx = attach({
  source: gate.state,
  effect: ({ navigateFn }) => navigateFn('/collection/'),
});

function toForm(values: CollectionSet): EventPayload<typeof form.setForm> {
  return {
    buy_price: values.buy_price,
    state: values.state,
    lego_set_id: String(values.lego_set.id),
  };
}

sample({
  clock: gate.open,
  target: [GetLegoSetsFx, GetCollectionFx],
});

sample({
  clock: GetLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

sample({
  clock: GetCollectionFx.doneData,
  fn: (data) => data.collection_sets,
  target: $collectionSets,
});

sample({
  clock: $collectionSets,
  target: fetchCollectionSetFx,
});

sample({
  clock: fetchCollectionSetFx.doneData,
  target: setCollectionSet,
});

sample({
  clock: setCollectionSet,
  target: setForm,
});

sample({
  clock: setForm,
  fn: toForm,
  target: form.setForm,
});

split({
  source: form.formValidated,
  match: $isEditing.map(String),
  cases: {
    true: updateCollectionSetFx,
    false: addCollectionSetFx,
  },
});

sample({
  clock: [addCollectionSetFx.done, updateCollectionSetFx.done],
  target: collectionRedirectFx,
});

sample({
  clock: gate.close,
  target: form.reset,
});
