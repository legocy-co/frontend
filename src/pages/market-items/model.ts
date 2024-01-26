import { sample, createEffect, createDomain } from 'effector';
import { createGate } from 'effector-react';
import { marketItemService } from '../../services/MarketItemService.ts';
import { authService } from '../../services/AuthService.ts';
import {
  $marketItemCells,
  toMarketItemCells,
} from '../../components/MarketItemsList/model.ts';
import { Pagination } from '../../shared/lib/pagination';
import { attach } from 'effector/compat';
import { stringifyParams } from '../../services/utils.ts';

export const gate = createGate();

const domain = createDomain();

const GetMarketItemsAuthorizedFx = createEffect(
  marketItemService.GetMarketItemsAuthorized
);

const GetMarketItemsFx = createEffect(marketItemService.GetMarketItems);

const chooseFx = authService.IsAuthorized()
  ? GetMarketItemsAuthorizedFx
  : GetMarketItemsFx;

export const paginationModel = Pagination.factory({
  entities: $marketItemCells,
  domain,
  requestFx: chooseFx,
  mapRequestResult: (done) => ({
    totalCount: done.meta.total ?? 0,
  }),
  key: 'market-items',
});

const GetMarketItemsPageFx = attach({
  source: {
    page: paginationModel.$page,
    pageSize: paginationModel.$pageSize,
  },
  effect: ({ page, pageSize }) =>
    chooseFx(
      stringifyParams({ limit: pageSize, offset: page * pageSize }, true)
    ),
});

sample({
  clock: [gate.open, paginationModel.$pageSize, paginationModel.$page],
  filter: gate.status,
  target: GetMarketItemsPageFx,
});

sample({
  clock: GetMarketItemsPageFx.doneData.map((data) => data.data),
  fn: toMarketItemCells,
  target: $marketItemCells,
});
