import { createGate } from 'effector-react';
import { combine, createEffect, createStore, sample } from 'effector';
import { collectionService } from '../../services/CollectionService.ts';
import { toCollectionCells } from '../../components/CollectionList/model.ts';
import { CollectionSet } from '../../types/CollectionSetType.ts';
import { Valuation } from '../../types/ValuationType.ts';

export const gate = createGate();

const $collectionSets = createStore<CollectionSet[]>([]);

const $valuations = createStore<Valuation[]>([]);

export const $collectionCells = combine(
  $collectionSets,
  $valuations,
  toCollectionCells
);

const GetCollectionFx = createEffect(collectionService.GetCollection);

const GetCollectionValuationsFx = createEffect(
  collectionService.GetCollectionValuation
);

sample({
  clock: gate.open,
  target: [GetCollectionFx, GetCollectionValuationsFx],
});

sample({
  clock: GetCollectionFx.doneData,
  fn: (data) => data.collection_sets,
  target: $collectionSets,
});

sample({
  clock: GetCollectionValuationsFx.doneData,
  fn: (data) => data.valuations,
  target: $valuations,
});
