import { createGate } from 'effector-react';
import { createEffect, sample } from 'effector';
import { collectionService } from '../../services/CollectionService.ts';
// import {
//   $collectionCells,
//   toCollectionCells,
// } from '../../components/CollectionList/model.ts';

export const gate = createGate();

const GetCollectionFx = createEffect(collectionService.GetCollection);

const GetCollectionValuationsFx = createEffect(
  collectionService.GetCollectionValuation
);

sample({
  clock: gate.open,
  target: [GetCollectionFx, GetCollectionValuationsFx],
});

// sample({
//   clock: [
//     GetCollectionFx.doneData.map((data) => data.collection_sets),
//     GetCollectionValuationsFx.doneData.map((data) => data.valuations),
//   ],
//   fn: toCollectionCells,
//   target: $collectionCells,
// });
