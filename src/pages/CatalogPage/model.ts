import { sample, createEffect } from 'effector';
import { createGate } from 'effector-react';
import { marketItemService } from '../../services/MarketItemService.ts';
import { authService } from '../../services/AuthService.ts';
import {
  $marketItemCells,
  toCells,
} from '../../components/MarketItemsList/model.ts';

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
