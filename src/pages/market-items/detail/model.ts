import { attach, createStore, sample } from 'effector';
import { marketItemService } from '../../../services/MarketItemService.ts';
import { createGate } from 'effector-react';
import { MarketItem, setStates } from '../../../types/MarketItemType.ts';
import { NavigateFunction } from 'react-router-dom';

type MarketItemDetail = {
  id: number;
  images: string[];
  set: string;
  condition: string;
  series: string;
  location: string;
  set_number: number;
  description: string;
  price: number;
  seller_id: number;
  seller_username: string;
  seller_image?: string;
  set_id: number;
};

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const $marketItemDetail = createStore<MarketItemDetail>({
  images: [],
  condition: '',
  description: '',
  id: 0,
  location: '',
  price: 0,
  seller_id: 0,
  seller_username: '',
  series: '',
  set: '',
  set_number: 0,
  seller_image: '',
  set_id: 0,
});

const GetMarketItemFx = attach({
  source: gate.state.map(({ id }) => id),
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return marketItemService.GetMarketItem(id);
  },
});

function toDetail(marketItem: MarketItem): MarketItemDetail {
  return {
    condition: setStates[marketItem.setState as keyof typeof setStates],
    description: marketItem.description,
    id: marketItem.id,
    images: marketItem.images
      .sort((current, next) => Number(current.isMain) - Number(next.isMain))
      .map((img) => img.imageURL),
    location: marketItem.location,
    price: marketItem.price,
    seller_id: marketItem.seller.id,
    seller_image: marketItem.seller.images[0]?.downloadURL,
    seller_username: marketItem.seller.username,
    series: marketItem.legoSet.series.name,
    set: marketItem.legoSet.name,
    set_id: marketItem.legoSet.id,
    set_number: marketItem.legoSet.number,
  };
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
