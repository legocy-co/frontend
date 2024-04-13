import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { collectionService } from '../../services/CollectionService.ts';
import {
  CollectionCell,
  toCollectionCells,
} from '../../components/CollectionList/model.ts';

import { Totals } from '../../types/CollectionType.ts';

export const gate = createGate();

export const collectionSetDeleted = createEvent();
export const $collectionCells = createStore<CollectionCell[]>([]);

export const $collectionTotals = createStore<Totals>({
  sets_valuated: 0,
  total: 0,
  total_profits: {
    total_return_usd: 0,
    total_return_percentage: 0,
  },
  total_sets: 0,
});

const GetCollectionFx = createEffect(collectionService.GetCollection);

sample({
  clock: [gate.open, collectionSetDeleted],
  target: GetCollectionFx,
});

sample({
  clock: GetCollectionFx.doneData.map((data) => data.collection_sets),
  fn: toCollectionCells,
  target: $collectionCells,
});

sample({
  clock: GetCollectionFx.doneData.map((data) => data.totals),
  target: $collectionTotals,
});
