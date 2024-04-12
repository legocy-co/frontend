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
      .sort((current, next) => Number(current.isMain) - Number(next.isMain))
      .map((img) => img.imageURL),
    set: marketItem.legoSet.name,
    price: marketItem.price,
    series: marketItem.legoSet.series.name,
    condition_icon: marketItem.setState,
    condition: setStates[marketItem.setState as keyof typeof setStates],
    set_number: marketItem.legoSet.number,
    seller_id: marketItem.seller?.id,
    set_id: marketItem.legoSet.id,
  }));
}
