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
import { MarketItemsFilter } from '../../features/market-item/filter';

export const gate = createGate();

const domain = createDomain();

export const marketItemsFilterModel = MarketItemsFilter.factory({
  domain,
});

const GetMarketItemsAuthorizedFx = createEffect(
  marketItemService.GetMarketItemsAuthorized
);

const GetMarketItemsFx = createEffect(marketItemService.GetMarketItems);

export const paginationModel = Pagination.factory({
  entities: $marketItemCells,
  domain,
  requestFx: authService.IsAuthorized()
    ? GetMarketItemsAuthorizedFx
    : GetMarketItemsFx,
  mapRequestResult: (done) => ({
    totalCount: done.meta.total ?? 0,
  }),
  key: 'market-items',
});

const GetMarketItemsPageFx = attach({
  source: {
    page: paginationModel.$page,
    pageSize: paginationModel.$pageSize,
    query: marketItemsFilterModel.$query,
  },
  effect: ({ page, pageSize, query }) =>
    authService.IsAuthorized()
      ? GetMarketItemsAuthorizedFx(
          stringifyParams(
            { limit: pageSize, offset: page * pageSize },
            true,
            query
              .split('+-')
              .join(',')
              .split('+')
              .join('%20')
              .split('%2Cloc')
              .join('&location__in=')
              .split('%2Cstate')
              .join('&set_state__in=')
              .split('%2Cser')
              .join('&lego_set[series_id__in]=')
              .split('%2Cset')
              .join('&set_id__in=')
              .split('%2Cyear')
              .join('&lego_set[release_year__in]=')
              .split('%5B')
              .join('[')
              .split('%5D')
              .join(']')
          )
        )
      : GetMarketItemsFx(
          stringifyParams(
            { limit: pageSize, offset: page * pageSize },
            true,
            query
              .split('%2Cloc')
              .join('&location__in=')
              .split('%2Cstate')
              .join('&set_state__in=')
              .split('%2Cyear')
              .join('&lego_set[release_year__in]=')
          )
        ),
});

sample({
  clock: [
    gate.open,
    paginationModel.$pageSize,
    paginationModel.$page,
    marketItemsFilterModel.filtersApplied,
  ],
  filter: gate.status,
  target: GetMarketItemsPageFx,
});

sample({
  clock: GetMarketItemsPageFx.doneData.map((data) => data.data),
  fn: toMarketItemCells,
  target: $marketItemCells,
});

sample({
  clock: GetMarketItemsPageFx.failData.map(() => []),
  fn: toMarketItemCells,
  target: $marketItemCells,
});

sample({
  clock: gate.close,
  target: $marketItemCells.reinit!,
});
