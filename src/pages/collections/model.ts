import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { collectionService } from '../../services/CollectionService.ts';
import {
  CollectionCell,
  toCollectionCells,
} from '../../components/CollectionList/model.ts';
import { Totals } from '../../types/TotalsType.ts';

export const gate = createGate();

export const collectionSetDeleted = createEvent();
export const $collectionCells = createStore<CollectionCell[]>([]);

export const $collectionTotals = createStore<Totals>({
  setsValuated: 0,
  total: 0,
  totalProfits: {
    totalReturnUSD: 0,
    totalReturnPercentage: 0,
  },
  totalSets: 0,
});

const GetCollectionFx = createEffect(collectionService.GetCollection);

sample({
  clock: [gate.open, collectionSetDeleted],
  target: GetCollectionFx,
});

sample({
  clock: GetCollectionFx.doneData.map((data) => data.collectionSets),
  fn: toCollectionCells,
  target: $collectionCells,
});

sample({
  clock: GetCollectionFx.doneData.map((data) => data.totals),
  target: $collectionTotals,
});
