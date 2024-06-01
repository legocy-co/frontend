import { MarketItem, setStates, statuses } from '../../types/MarketItemType.ts';
import { createEvent, createStore } from 'effector';

export type MarketItemCell = {
  condition: string;
  condition_icon: keyof typeof setStates;
  id: number;
  images: string[];
  is_liked: boolean;
  location: string;
  price: number;
  seller_id: number;
  series: string;
  set: string;
  status: (typeof statuses)[number];
};

export const marketItemUnliked = createEvent<number>();

export const $marketItemCells = createStore<MarketItemCell[]>([]);

export const $marketItemCell = createStore<MarketItemCell>({
  condition: '',
  condition_icon: 'BUILT_WITHOUT_BOX',
  id: 0,
  images: [],
  is_liked: false,
  location: '',
  price: 0,
  seller_id: 0,
  series: '',
  set: '',
  status: 'ACTIVE',
});

export function toMarketItemCells(marketItems: MarketItem[]): MarketItemCell[] {
  return marketItems.map((marketItem) => ({
    condition: setStates[marketItem.setState as keyof typeof setStates],
    condition_icon: marketItem.setState,
    id: marketItem.id,
    images: marketItem.images
      .sort(
        (current, next) => Number(current.sortIndex) + Number(next.sortIndex)
      )
      .map((img) => img.imageURL),
    is_liked: marketItem.isLiked,
    location: marketItem.location,
    price: marketItem.price,
    seller_id: marketItem.seller?.id,
    series: marketItem.legoSet.series.name,
    set: marketItem.legoSet.name,
    status: marketItem.status ?? '',
  }));
}
