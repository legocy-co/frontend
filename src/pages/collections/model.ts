import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { collectionService } from '../../services/CollectionService.ts';
import {
  CollectionCell,
  toCollectionCells,
} from '../../components/CollectionList/model.ts';
import { Totals } from '../../types/CollectionType.ts';
import { csf } from '../../features/collection/index.tsx';
import { persist } from 'effector-storage/local';

type ChartData = {
  name: string;
  value: number;
}[];

export const gate = createGate();

export const collectionSortingChanged = createEvent<'' | 'asc' | 'desc'>();

export const $collectionSorting = createStore<'' | 'asc' | 'desc'>('');

export const $collectionCells = createStore<CollectionCell[]>([]);

export const $collectionTotals = createStore<Totals>({
  setsValuated: 0,
  total: 0,
  totalProfits: {
    totalReturnUSD: 0,
    totalReturnPercentage: 0,
  },
  totalSets: 0,
});

export const $pnlData = createStore<ChartData>([]);

export const $seriesChartData = createStore<ChartData>([]);

const $initialCollection = createStore<CollectionCell[]>([]);

const GetCollectionFx = createEffect(collectionService.GetCollection);

function toChartData(names: string[]): ChartData {
  const data: ChartData = [];

  names
    .map((setName) => Object({ name: setName, value: 1 }))
    .forEach((item) => {
      const exist = data.find((t) => t.name == item.name);
      exist ? (exist.value += item.value) : data.push(item);
    });

  return data;
}

sample({
  clock: [gate.open, csf.collectionUpdated],
  target: GetCollectionFx,
});

sample({
  source: GetCollectionFx.doneData.map((data) => data.collectionSets),
  fn: toCollectionCells,
  target: $initialCollection,
});

sample({
  source: GetCollectionFx.doneData.map((data) => data.totals),
  target: $collectionTotals,
});

sample({
  source: GetCollectionFx.doneData.map((data) =>
    data.collectionSets
      .map((set) =>
        set.setProfits.totalReturnUSD
          ? set.setProfits.totalReturnUSD > 0
            ? 'Profit'
            : 'Loss'
          : 'NaN'
      )
      .filter((t) => t !== 'NaN')
  ),
  fn: toChartData,
  target: $pnlData,
});

sample({
  source: GetCollectionFx.doneData.map((data) =>
    data.collectionSets.map((set) => set.legoSet.series.name)
  ),
  fn: toChartData,
  target: $seriesChartData,
});

sample({
  clock: $initialCollection,
  source: $collectionSorting,
  target: collectionSortingChanged,
});

sample({
  source: collectionSortingChanged,
  target: $collectionSorting,
});

sample({
  clock: collectionSortingChanged,
  source: $initialCollection,
  filter: (_, sorting) => sorting !== '',
  fn: (cells, sorting) =>
    cells.sort((a, b) => {
      if (a.valuation === undefined) return 1;
      if (b.valuation === undefined) return -1;
      return sorting === 'asc'
        ? a.totalReturnUSD - b.totalReturnUSD
        : b.totalReturnUSD - a.totalReturnUSD;
    }),
  target: $collectionCells,
});

sample({
  clock: collectionSortingChanged,
  source: $initialCollection,
  filter: (_, sorting) => sorting === '',
  fn: (cells) => cells.sort((a, b) => b.id - a.id),
  target: $collectionCells,
});

persist({
  store: $collectionSorting,
  key: 'collectionSorting',
});
