import { createEffect, createStore, sample } from 'effector';
import { setStates } from '../../types/MarketItemType';
import { valuationService } from '../../services/ValuationService';
import { Valuation } from '../../types/ValuationType';

type BarData = {
  name: keyof typeof setStates;
  value: number;
  display: string;
};

export const $chartData = createStore<BarData[]>([]);
export const fetchValuationsFX = createEffect(valuationService.GetValuations);

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
  source: fetchValuationsFX.doneData,
  fn: toChartData,
  target: $chartData,
});
