import { attach, createStore, sample } from 'effector';
import { marketItemService } from '../../services/MarketItemService.ts';
import { createGate } from 'effector-react';
import { MarketItem, setStates } from '../../types/MarketItemType.ts';
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
  seller_username: string;
  seller_image?: string;
};

function toDetail(marketItem: MarketItem): MarketItemDetail {
  return {
    id: marketItem.id,
    images: marketItem.images
      .sort((current, next) => Number(current.is_main) - Number(next.is_main))
      .map((img) => img.image_url),
    set: marketItem.lego_set.name,
    condition: setStates[marketItem.set_state as keyof typeof setStates],
    series: marketItem.lego_set.series.name,
    location: marketItem.location,
    set_number: marketItem.lego_set.number,
    description: marketItem.description,
    price: marketItem.price,
    seller_username: marketItem.seller.username,
    seller_image: marketItem.seller.images[0]?.downloadURL,
  };
}

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
  seller_username: '',
  series: '',
  set: '',
  set_number: 0,
  seller_image: '',
});

const $marketItemId = gate.state.map(({ id }) => id);
const GetMarketItemFx = attach({
  source: $marketItemId,
  effect: (id) => {
    if (!id) throw new Error('No id provided');

    return marketItemService.GetMarketItem(id);
  },
});

sample({
  clock: gate.open,
  target: GetMarketItemFx,
});

sample({
  clock: GetMarketItemFx.doneData,
  fn: toDetail,
  target: $marketItemDetail,
});