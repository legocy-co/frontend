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
  fetchLegoSetsFx,
  toOptions,
} from '../lego-set/options/model.ts';
import { collectionService } from '../../services/CollectionService.ts';
import { NavigateFunction } from 'react-router-dom';
import { CollectionSet } from '../../types/CollectionType.ts';

export const gate = createGate<{
  id: number | null;
  navigateFn: NavigateFunction;
}>();

export const form = createForm({
  fields: {
    buyPrice: {
      init: null as unknown as number,
      rules: [
        createRule({
          name: 'buyPrice',
          schema: z
            .number()
            .min(0.01)
            .max(999999)
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Missing buy price'),
        }),
      ],
    },
    legoSetID: {
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
          name: 'state',
          schema: z.string().min(1, 'Missing condition'),
        }),
      ],
    },
  },
});

const domain = createDomain();

export const setForm = domain.createEvent<CollectionSet>();

export const collectionUpdated = createEvent();

export const formClosed = createEvent();

export const $formClosed = createStore(false);

const $collectionSets = createStore<CollectionSet[]>([]);

const $setID = gate.state.map(({ id }) => id);

const $isEditing = $setID.map((id) => id !== null);

const GetCollectionFx = createEffect(() => collectionService.GetCollection());

const fetchCollectionSetFx = attach({
  source: {
    collectionSets: $collectionSets,
    setId: $setID,
  },
  effect: ({ collectionSets, setId }) => {
    const collectionSet = collectionSets.find((set) => set.id === setId);
    if (!collectionSet) throw new Error('Collection set not found');
    return collectionSet;
  },
});

const addCollectionSetFx = attach({
  source: form.$values,
  effect: (values) =>
    collectionService.AddCollectionSet({
      buyPrice: values.buyPrice,
      legoSetID: Number(values.legoSetID),
      state: values.state,
    }),
});

const updateCollectionSetFx = attach({
  source: {
    id: $setID,
    data: form.$values,
  },
  effect: ({ id, data }) =>
    collectionService.UpdateCollectionSet(id!, {
      buyPrice: data.buyPrice,
      state: data.state,
      legoSetID: Number(data.legoSetID),
    }),
});

function toForm(values: CollectionSet): EventPayload<typeof form.setForm> {
  return {
    buyPrice: values.buyPrice,
    state: values.state,
    legoSetID: String(values.legoSet.id),
  };
}

sample({
  clock: gate.open,
  target: fetchLegoSetsFx,
});

sample({
  clock: gate.open,
  filter: $isEditing,
  target: GetCollectionFx,
});

sample({
  source: fetchLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

sample({
  clock: GetCollectionFx.doneData,
  fn: (data) => data.collectionSets,
  target: $collectionSets,
});

sample({
  clock: $collectionSets,
  target: fetchCollectionSetFx,
});

sample({
  clock: fetchCollectionSetFx.doneData,
  target: setForm,
});

sample({
  clock: setForm,
  fn: toForm,
  target: form.setForm,
});

sample({
  clock: formClosed,
  fn: () => true,
  target: $formClosed,
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
  clock: addCollectionSetFx.done,
  fn: () => true,
  target: [$formClosed, collectionUpdated],
});

sample({
  clock: updateCollectionSetFx.done,
  fn: () => true,
  target: [$formClosed, collectionUpdated],
});

sample({
  clock: gate.close,
  target: [form.reset, $formClosed.reinit!],
});
