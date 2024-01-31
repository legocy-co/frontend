import { createGate } from 'effector-react';
import { attach, combine, createDomain, sample } from 'effector';
import { createColumnControlModel } from '../../shared/lib/column-control';
import { columns, SetRow, toSetRows } from './lib.ts';
import { createEffect } from 'effector/compat';
import { legoSetService } from '../../services/LegoSetService.ts';
import { Pagination } from '../../shared/lib/pagination';
import { stringifyParams } from '../../services/utils.ts';

export const gate = createGate();

const domain = createDomain();

export const setToggled = domain.createEvent<number>();

export const toggleAll = domain.createEvent();

export const columnControlModel = createColumnControlModel({
  key: 'sets',
  columns: columns.map((col) => ({
    id: col.id,
    title: col.title,
    size: col.size,
  })),
});

export const $sets = domain.createStore<SetRow[]>([]);

export const $selectedSets = domain.createStore<number[]>([]);

export const $allSelected = combine(
  $sets,
  $selectedSets,
  (sets, selected) => sets.length === selected.length
);

const GetLegoSetsPageBaseFx = createEffect(legoSetService.GetLegoSetsPage);

export const paginationModel = Pagination.factory({
  entities: $sets,
  domain,
  requestFx: GetLegoSetsPageBaseFx,
  mapRequestResult: (data) => ({ totalCount: data.meta?.total ?? 0 }),
  key: 'sets',
});

export const $isEmpty = combine($sets, (sets) => sets.length === 0);

const GetLegoSetsPageFx = attach({
  source: {
    page: paginationModel.$page,
    pageSize: paginationModel.$pageSize,
  },
  effect: ({ page, pageSize }) =>
    GetLegoSetsPageBaseFx(
      stringifyParams({ limit: pageSize, offset: page * pageSize }, true)
    ),
});

sample({
  clock: [gate.open, paginationModel.$pageSize, paginationModel.$page],
  filter: gate.status,
  target: GetLegoSetsPageFx,
});

sample({
  clock: setToggled,
  source: $selectedSets,
  fn: (selected, id) =>
    selected.includes(id)
      ? selected.filter((set) => set !== id)
      : [...selected, id],
  target: $selectedSets,
});

sample({
  clock: GetLegoSetsPageFx.doneData,
  fn: toSetRows,
  target: $sets,
});

sample({
  clock: toggleAll,
  source: { allSelected: $allSelected, sets: $sets },
  fn: ({ allSelected, sets }) => (allSelected ? [] : sets.map((set) => set.id)),
  target: $selectedSets,
});
