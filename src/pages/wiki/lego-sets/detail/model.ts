import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router-dom';
import { createEffect, createStore, sample } from 'effector';
import { LegoSet } from '../../../../types/LegoSetType.ts';
import { legoSetService } from '../../../../services/LegoSetService.ts';
import { valuationChartModel } from '../../../../components/ValuationChart/index.tsx';

type LegoSetDetail = {
  id: number;
  images?: string[];
  pieces: number;
  name: string;
  number: number;
  series: string;
  year?: number;
};

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const $legoSetDetail = createStore<LegoSetDetail>({
  id: 0,
  images: [],
  name: '',
  number: 0,
  pieces: 0,
  series: '',
  year: undefined,
});

const $id = gate.state.map(({ id }) => id!);
const GetLegoSetFX = createEffect(legoSetService.GetLegoSet);

const setsRedirectFX = createEffect((navigate: NavigateFunction) =>
  navigate('/wiki/sets')
);

function toDetail(set: LegoSet): LegoSetDetail {
  return {
    id: set.id,
    images: set.images
      ?.sort((current, next) => Number(current.isMain) - Number(next.isMain))
      .map((img) => img.imageURL),
    name: set.name,
    number: set.number,
    pieces: set.nPieces,
    series: set.series.name,
    year: set.releaseYear ?? undefined,
  };
}

sample({
  source: $id,
  target: GetLegoSetFX,
});

sample({
  clock: GetLegoSetFX.fail,
  source: gate.state.map(({ navigate }) => navigate),
  target: setsRedirectFX,
});

sample({
  source: GetLegoSetFX.doneData,
  fn: toDetail,
  target: $legoSetDetail,
});

sample({
  source: $legoSetDetail,
  fn: (detail) => detail.id,
  target: valuationChartModel.fetchValuationsFX,
});
