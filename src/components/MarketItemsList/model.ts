import { MarketItem, setStates } from '../../types/MarketItemType.ts';
import { createStore } from 'effector';

export type MarketItemCell = {
  condition: string;
  condition_icon: string;
  id: number;
  images: string[];
  is_liked: boolean;
  location: string;
  price: number;
  seller_id: number;
  series: string;
  set: string;
  set_id: number;
  set_number: number;
};

export const $marketItemCells = createStore<MarketItemCell[]>([]);

export function toMarketItemCells(marketItems: MarketItem[]): MarketItemCell[] {
  return marketItems.map((marketItem) => ({
    condition: setStates[marketItem.set_state as keyof typeof setStates],
    condition_icon: marketItem.set_state,
    id: marketItem.id,
    images: marketItem.images
      .sort((current, next) => Number(current.is_main) - Number(next.is_main))
      .map((img) => img.image_url),
    is_liked: marketItem.is_liked,
    location: marketItem.location,
    price: marketItem.price,
    seller_id: marketItem.seller.id,
    series: marketItem.lego_set.series.name,
    set: marketItem.lego_set.name,
    set_id: marketItem.lego_set.id,
    set_number: marketItem.lego_set.number,
  }));
}
