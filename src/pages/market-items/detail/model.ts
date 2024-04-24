import { attach, createEffect, createStore, sample } from 'effector';
import { marketItemService } from '../../../services/MarketItemService.ts';
import { createGate } from 'effector-react';
import { MarketItem, setStates } from '../../../types/MarketItemType.ts';
import { NavigateFunction } from 'react-router-dom';
import { valuationService } from '../../../services/ValuationService.ts';
import { Valuation } from '../../../types/ValuationType.ts';

type MarketItemDetail = {
  avgRating?: number;
  state: string;
  description: string;
  id: number;
  images: string[];
  location: string;
  price: number;
  sellerID: number;
  sellerImage?: string;
  sellerUsername: string;
  series: string;
  set: string;
  setID: number;
  setNumber: number;
  totalReviews?: number;
  stateIcon: keyof typeof setStates;
  nPieces: number;
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

export const $marketItemDetail = createStore<MarketItemDetail>({
  avgRating: 0,
  state: '',
  description: '',
  id: 0,
  images: [],
  location: '',
  price: 0,
  sellerID: 0,
  sellerImage: '',
  sellerUsername: '',
  series: '',
  set: '',
  setID: 0,
  setNumber: 0,
  totalReviews: 0,
  stateIcon: 'BUILT_WITH_BOX',
  nPieces: 0,
});

export const $chartData = createStore<BarData[]>([]);

const GetMarketItemFx = attach({
  source: gate.state.map(({ id }) => id),
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return marketItemService.GetMarketItem(id);
  },
});

const fetchValuationsFX = createEffect(valuationService.GetValuations);

function toDetail(marketItem: MarketItem): MarketItemDetail {
  return {
    avgRating: marketItem.seller.reviewTotals?.avgRating,
    totalReviews: marketItem.seller.reviewTotals?.totalReviews,
    state: setStates[marketItem.setState as keyof typeof setStates],
    stateIcon: marketItem.setState,
    description: marketItem.description,
    id: marketItem.id,
    images: marketItem.images
      .sort((current, next) => Number(current.isMain) - Number(next.isMain))
      .map((img) => img.imageURL),
    location: marketItem.location,
    price: marketItem.price,
    sellerID: marketItem.seller.id,
    sellerImage: marketItem.seller.images[0]?.downloadURL,
    sellerUsername: marketItem.seller.username,
    series: marketItem.legoSet.series.name,
    set: marketItem.legoSet.name,
    setID: marketItem.legoSet.id,
    setNumber: marketItem.legoSet.number,
    nPieces: marketItem.legoSet.nPieces,
  };
}

function toChartData(valuations: Valuation[]): BarData[] {
  return valuations.map((val) =>
    Object({
      name: val.state,
      value: val.valuation,
      display: val.valuation + '$',
    })
  );
}

sample({
  clock: gate.open,
  target: GetMarketItemFx,
});

sample({
  clock: GetMarketItemFx.doneData,
  fn: toDetail,
  target: $marketItemDetail,
});

sample({
  clock: $marketItemDetail,
  fn: (detail) => detail.setID,
  target: fetchValuationsFX,
});

sample({
  source: fetchValuationsFX.doneData,
  fn: toChartData,
  target: $chartData,
});
