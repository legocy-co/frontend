import {
  combine,
  createDomain,
  createEffect,
  createEvent,
  Domain,
  sample,
  StoreValue,
} from 'effector';
import { createGate } from 'effector-react';
import { createDisclosure } from '../../../shared/lib/disclosure.ts';
import { createForm } from 'effector-forms';
import { stringifyParams } from '../../../services/utils.ts';
import { persist } from 'effector-storage/local';
import { legoSeriesService } from '../../../services/LegoSeriesService.ts';
import { SelectSearchOption } from '../../../shared/ui/select-search.tsx';
import { searchFactory } from '../../../shared/lib/filter/search-factory.ts';

export type LegoSetFilterModel = ReturnType<typeof legoSetFilterFactory>;

export const legoSetFilterFactory = (options: { domain?: Domain }) => {
  const domain = options.domain ?? createDomain();

  const gate = createGate();

  const disclosure = createDisclosure();
  const form = createForm({
    fields: {
      name: {
        init: '',
      },
      min_pieces: {
        init: null as unknown as number,
      },
      max_pieces: {
        init: null as unknown as number,
      },
      series_ids: {
        init: '',
      },
      set_number: {
        init: null as unknown as number,
      },
      releaseYears: {
        init: [] as string[],
      },
    },
  });

  const filtersApplied = createEvent();
  const cancelTriggered = createEvent();
  const resetTriggered = createEvent();

  const resetExactFilterTriggered =
    createEvent<keyof StoreValue<typeof form.$values>>();

  const $filtersSnapshot = domain.createStore<StoreValue<
    typeof form.$values
  > | null>(null);

  const fetchSeriesFx = createEffect(({ id }: { id: string }) =>
    legoSeriesService.GetLegoSeries(id)
  );

  const fetchSeriesListFx = createEffect((_: { query: string }) =>
    legoSeriesService.GetLegoSeriesList()
  );

  const seriesListSearch = searchFactory({
    $selected: form.fields.series_ids.$value,
    domain,
    fetchEntityFx: fetchSeriesFx,
    key: 'series_id__in',
    mapEntityToMap: (response) => ({
      [response.id!]: response.name,
    }),
    mapEntityToOption: (response) => ({
      label: response.name,
      value: response.id!.toString(),
    }),
    requestFx: fetchSeriesListFx,
    mapToMap: (response) =>
      Object.fromEntries(response.map((ser) => [ser.id!, ser.name])),
    mapToOptions: (response) =>
      response.map(
        (ser): SelectSearchOption => ({
          label: ser.name,
          value: ser.id!.toString(),
        })
      ),
  });

  const $query = $filtersSnapshot.map((snapshot) =>
    stringifyParams(
      {
        name__ilike: snapshot?.name,
        npieces_gte: snapshot?.min_pieces,
        npieces_lte: snapshot?.max_pieces,
        series_id__in: snapshot?.series_ids.split(',').join(',ser'),
        set_number__in: snapshot?.set_number,
        release_year__in: snapshot?.releaseYears?.join(',year'),
      },
      false
    )
  );

  const $activeFilters = combine(
    $filtersSnapshot,
    seriesListSearch.$map,
    (filters, seriesListMap) => {
      const allFilters = {
        name: {
          value: filters?.name,
          show: !!filters?.name,
          label: 'Name',
        },
        min_pieces: {
          value: filters?.min_pieces,
          show: !!filters?.min_pieces,
          label: 'Min pieces',
        },
        max_pieces: {
          value: filters?.max_pieces,
          show: !!filters?.max_pieces,
          label: 'Max pieces',
        },
        series_ids: {
          value: filters?.series_ids
            .split(',')
            .map((id) => seriesListMap[id])
            .join(','),
          show: !!filters?.series_ids,
          label: 'Series',
        },
        set_number: {
          value: filters?.set_number,
          show: !!filters?.set_number,
          label: 'Set number',
        },
        releaseYears: {
          value: filters?.releaseYears,
          show: !!filters?.releaseYears,
          label: 'Release years',
        },
      };

      return Object.entries(allFilters).filter(([, value]) => Boolean(value));
    }
  );

  sample({
    clock: form.formValidated,
    source: form.$values,
    target: [$filtersSnapshot, disclosure.close, filtersApplied],
  });

  sample({
    clock: gate.open,
    target: seriesListSearch.fetchEntitiesFx,
  });

  sample({
    clock: [cancelTriggered, resetTriggered],
    target: disclosure.close,
  });

  sample({
    clock: cancelTriggered,
    source: $filtersSnapshot,
    filter: Boolean,
    target: form.setForm,
  });

  sample({
    clock: disclosure.open,
    target: form.reset,
  });

  sample({
    clock: resetTriggered,
    target: [form.reset, filtersApplied, $filtersSnapshot.reinit!],
  });

  sample({
    clock: resetExactFilterTriggered,
    source: form.$values,
    fn: (values, field) => ({
      ...values,
      [field]: typeof values[field] === 'string' ? '' : null,
    }),
    target: [form.setForm, filtersApplied, $filtersSnapshot],
  });

  persist({
    store: $filtersSnapshot,
    key: 'sets_filters',
  });

  return {
    form,

    filtersApplied,
    cancelTriggered,
    $query,

    disclosure,
    seriesListSearch,

    gate,

    $activeFilters,

    resetExactFilterTriggered,
    resetTriggered,
  };
};
