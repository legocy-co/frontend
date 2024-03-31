import { MarketItem, setStates } from '../../types/MarketItemType.ts';
import { createStore } from 'effector';

export type MarketItemCell = {
  id: number;
  location: string;
  images: string[];
  set: string;
  price: number;
  series: string;
  condition_icon: string;
  condition: string;
  set_number: number;
  seller_id: number;
  set_id: number;
};

export const $marketItemCells = createStore<MarketItemCell[]>([]);

export function toMarketItemCells(marketItems: MarketItem[]): MarketItemCell[] {
  return marketItems.map((marketItem) => ({
    id: marketItem.id,
    location: marketItem.location,
    images: marketItem.images
      .sort((current, next) => Number(current.is_main) - Number(next.is_main))
      .map((img) => img.image_url),
    set: marketItem.lego_set.name,
    price: marketItem.price,
    series: marketItem.lego_set.series.name,
    condition_icon: marketItem.set_state,
    condition: setStates[marketItem.set_state as keyof typeof setStates],
    set_number: marketItem.lego_set.number,
    seller_id: marketItem.seller?.id,
    set_id: marketItem.lego_set.id,
  }));
}
