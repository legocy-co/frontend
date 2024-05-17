import { createGate } from 'effector-react';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { MarketItem } from '../../../types/MarketItemType.ts';
import { userService } from '../../../services/UserService.ts';
import {
  $marketItemCells,
  toMarketItemCells,
} from '../../../components/MarketItemsList/model.ts';

export const gate = createGate();

export const $status = createStore<string>('ACTIVE');

export const $marketItems = createStore<MarketItem[]>([]);

export const statusChanged = createEvent<string>();

export const marketItemDeleted = createEvent();

const GetUserFX = createEffect(() => userService.GetUserProfilePage());

const fetchMarketItemsByStatusFX = attach({
  source: { marketItems: $marketItems, status: $status },
  effect: ({ marketItems, status }) =>
    marketItems.filter((item) => item.status === status),
});

sample({
  clock: [gate.open, marketItemDeleted],
  target: GetUserFX,
});

sample({
  source: GetUserFX.doneData,
  fn: (user) => user.marketItems,
  target: $marketItems,
});

sample({
  clock: [$marketItems, $status],
  target: fetchMarketItemsByStatusFX,
});

sample({
  source: fetchMarketItemsByStatusFX.doneData,
  fn: toMarketItemCells,
  target: $marketItemCells,
});

sample({
  source: statusChanged,
  target: $status,
});
