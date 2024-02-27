import { createGate } from 'effector-react';
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { collectionService } from '../../services/CollectionService.ts';
import { toCollectionCells } from '../../components/CollectionList/model.ts';
import { CollectionSet } from '../../types/CollectionSetType.ts';
import { Valuation } from '../../types/ValuationType.ts';

export const gate = createGate();

export const collectionSetDeleted = createEvent();

const $collectionSets = createStore<CollectionSet[]>([]);

const $valuations = createStore<Valuation[]>([]);

export const $collectionCells = combine(
  $collectionSets,
  $valuations,
  toCollectionCells
);

const GetCollectionFx = createEffect(collectionService.GetCollection);

sample({
  clock: [gate.open, collectionSetDeleted],
  target: GetCollectionFx,
});

sample({
  clock: GetCollectionFx.doneData,
  fn: (data) => data.collection_sets,
  target: $collectionSets,
});
