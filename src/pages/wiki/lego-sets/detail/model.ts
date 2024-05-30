import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router-dom';
import { attach, createEffect, createStore, sample } from 'effector';
import { LegoSet } from '../../../../types/LegoSetType.ts';
import { legoSetService } from '../../../../services/LegoSetService.ts';
import { valuationService } from '../../../../services/ValuationService.ts';
import { Valuation } from '../../../../types/ValuationType.ts';
import { setStates } from '../../../../types/MarketItemType.ts';

type LegoSetDetail = {
  id: number;
  images?: string[];
  pieces: number;
  name: string;
  number: number;
  series: string;
};

type BarData = {
  name: keyof typeof setStates;
  value: number;
  display: string;
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
});

export const $chartData = createStore<BarData[]>([]);

const $id = gate.state.map(({ id }) => id!);

const GetLegoSetFX = createEffect(legoSetService.GetLegoSet);

const setsRedirectFX = createEffect((navigate: NavigateFunction) =>
  navigate('/wiki/sets')
);

const fetchValuationsFX = attach({
  source: $id,
  effect: (id) => {
    return valuationService.GetValuations(id);
  },
});

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
  };
}

function toChartData(valuations: Valuation[]): BarData[] {
  return valuations
    .sort((a, b) => b.valuation - a.valuation)
    .map((val) =>
      Object({
        name: val.state,
        value: val.valuation,
        display: val.valuation + '$',
      })
    );
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
  clock: GetLegoSetFX.done,
  target: fetchValuationsFX,
});

sample({
  clock: fetchValuationsFX.doneData,
  fn: toChartData,
  target: $chartData,
});
