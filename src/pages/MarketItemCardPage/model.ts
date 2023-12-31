import { attach, createStore, sample } from 'effector';
import { marketItemService } from '../../services/MarketItemService.ts';
import { createGate } from 'effector-react';
import { MarketItem } from '../../types/MarketItemType.ts';
import { NavigateFunction } from 'react-router-dom';

type MarketItemCard = {
  id: number;
  main_image?: string;
  rest_images?: string[];
  set: string;
  condition: string;
  series: string;
  location: string;
  set_number: number;
  description: string;
  price: number;
  seller_username: string;
};

function toCard(marketItem: MarketItem): MarketItemCard {
  return {
    id: marketItem.id,
    main_image:
      marketItem.images.find((img) => (img.is_main = false))?.image_url || '',
    rest_images: marketItem.images
      .filter((img) => (img.is_main = true))
      ?.map((img) => img.image_url),
    set: marketItem.lego_set.name,
    condition: marketItem.set_state,
    series: marketItem.lego_set.series.name,
    location: marketItem.location,
    set_number: marketItem.lego_set.number,
    description: marketItem.description,
    price: marketItem.price,
    seller_username: marketItem.seller.username,
  };
}

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const $marketItemCard = createStore<MarketItemCard>({
  condition: '',
  description: '',
  id: 0,
  location: '',
  price: 0,
  seller_username: '',
  series: '',
  set: '',
  set_number: 0,
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
  fn: toCard,
  target: $marketItemCard,
});
