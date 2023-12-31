import { sample, createEffect, createStore } from 'effector';
import { createGate } from 'effector-react';
import { marketItemService } from '../../services/MarketItemService.ts';
import { MarketItem } from '../../types/MarketItemType.ts';
import { authService } from '../../services/AuthService.ts';

type MarketItemCell = {
  id: number;
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
    id: marketItem.id,
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
export const gate = createGate();

const GetMarketItemsFx = createEffect(() => marketItemService.GetMarketItems());
const GetMarketItemsAuthorizedFx = createEffect(() =>
  marketItemService.GetMarketItemsAuthorized()
);

sample({
  clock: gate.open,
  target: authService.IsAuthorized()
    ? GetMarketItemsAuthorizedFx
    : GetMarketItemsFx,
});

sample({
  clock: GetMarketItemsFx.doneData,
  fn: toCells,
  target: $marketItemCells,
});

sample({
  clock: GetMarketItemsAuthorizedFx.doneData,
  fn: toCells,
  target: $marketItemCells,
});
