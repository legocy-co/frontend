import { attach, createEffect, createStore, sample } from 'effector';
import { marketItemService } from '../../../services/MarketItemService.ts';
import { createGate } from 'effector-react';
import {
  MarketItem,
  setStates,
  statuses,
} from '../../../types/MarketItemType.ts';
import { NavigateFunction } from 'react-router-dom';
import { valuationService } from '../../../services/ValuationService.ts';
import { Valuation } from '../../../types/ValuationType.ts';
import {
  MarketItemCell,
  toMarketItemCells,
} from '../../../components/MarketItemsList/model.ts';
import { navigateFx } from '../../../shared/lib/react-router.ts';
import { AxiosError } from 'axios';

type MarketItemDetail = {
  avgRating?: number;
  description: string;
  id: number;
  images: string[];
  location: string;
  nPieces: number;
  price: number;
  sellerID: number;
  sellerImage?: string;
  sellerUsername: string;
  series: string;
  seriesID: number;
  set: string;
  setID: number;
  setNumber: number;
  state: string;
  stateIcon: keyof typeof setStates;
  status: (typeof statuses)[number];
  totalReviews?: number;
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
  description: '',
  id: 0,
  images: [],
  location: '',
  nPieces: 0,
  price: 0,
  sellerID: 0,
  sellerImage: '',
  sellerUsername: '',
  series: '',
  seriesID: 0,
  set: '',
  setID: 0,
  setNumber: 0,
  state: '',
  stateIcon: 'BUILT_WITH_BOX',
  status: 'ACTIVE',
  totalReviews: 0,
});

export const $chartData = createStore<BarData[]>([]);

export const $recommendations = createStore<MarketItemCell[]>([]);

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
    description: marketItem.description,
    id: marketItem.id,
    images: marketItem.images
      .sort((current, next) => Number(current.sortIndex) + Number(next.sortIndex))
      .map((img) => img.imageURL),
    location: marketItem.location,
    nPieces: marketItem.legoSet.nPieces,
    price: marketItem.price,
    sellerID: marketItem.seller.id,
    sellerImage: marketItem.seller.images[0]?.downloadURL,
    sellerUsername: marketItem.seller.username,
    series: marketItem.legoSet.series.name,
    seriesID: marketItem.legoSet.series.id,
    set: marketItem.legoSet.name,
    setID: marketItem.legoSet.id,
    setNumber: marketItem.legoSet.number,
    state: setStates[marketItem.setState as keyof typeof setStates],
    status: marketItem.status,
    stateIcon: marketItem.setState,
    totalReviews: marketItem.seller.reviewTotals?.totalReviews,
  };
}

const fetchMarketItemsFX = createEffect(
  marketItemService.GetMarketItemsAuthorized
);

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
  clock: [gate.open, gate.state.map(({ id }) => id)],
  target: GetMarketItemFx,
});

sample({
  source: GetMarketItemFx.doneData,
  fn: toDetail,
  target: $marketItemDetail,
});

sample({
  clock: GetMarketItemFx.failData,
  filter: (error) => {
    const axiosError = error as AxiosError;
    return axiosError.response!.status === 404;
  },
  fn: () => '/catalog',
  target: navigateFx,
});

sample({
  source: $marketItemDetail,
  fn: (detail) => detail.setID,
  target: fetchValuationsFX,
});

sample({
  source: $marketItemDetail,
  fn: (detail) => `?lego_set[series_id__in]=${detail.seriesID}`,
  target: fetchMarketItemsFX,
});

sample({
  source: fetchValuationsFX.doneData,
  fn: toChartData,
  target: $chartData,
});

sample({
  source: fetchMarketItemsFX.doneData.map((data) =>
    data.data.filter(
      (cell) => cell.id !== Number(location.pathname.split('/')[2])
    )
  ),
  fn: toMarketItemCells,
  target: $recommendations,
});

sample({
  clock: gate.close,
  target: $recommendations.reinit!,
});
