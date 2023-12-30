import { sample, createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { marketItemService } from '../../services/MarketItemService.ts';
import { MarketItem } from '../../types/MarketItemType.ts';
import { AuthService } from '../../services/AuthService.ts';

type MarketItemCell = {
  location: string;
  images: string[];
  set: string;
  price: number;
  series: string;
  condition: string;
  set_number: number;
};

function toCells(marketItems: MarketItem[]): MarketItemCell[] {
  return marketItems.map((marketItem) => ({
    location: marketItem.location,
    images: marketItem.images.map((image) => image.image_url),
    set: marketItem.lego_set.name,
    price: marketItem.price,
    series: marketItem.lego_set.series.name,
    condition: marketItem.set_state,
    set_number: marketItem.lego_set.number,
  }));
}

export const $marketItemCells = createStore<MarketItemCell[]>([]);
export const Gate = createGate();

const getMarketItemsFx = createEffect(() => marketItemService.GetMarketItems());
const getMarketItemsAuthorizedFx = createEffect(() =>
  marketItemService.GetMarketItemsAuthorized()
);

sample({
  clock: Gate.open,
  target: AuthService.IsAuthorized()
    ? getMarketItemsAuthorizedFx
    : getMarketItemsFx,
});

sample({
  clock: getMarketItemsFx.doneData,
  fn: toCells,
  target: $marketItemCells,
});

sample({
  clock: getMarketItemsAuthorizedFx.doneData,
  fn: toCells,
  target: $marketItemCells,
});
