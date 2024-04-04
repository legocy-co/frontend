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
import { SelectFieldOption } from '../../../shared/ui/form-adapters.tsx';
import { setStates } from '../../../types/MarketItemType.ts';
import cities from '../../../../data/cities.json';
import { legoSeriesService } from '../../../services/LegoSeriesService.ts';
import { SelectSearchOption } from '../../../shared/ui/select-search.tsx';

import { searchFactory } from '../../../shared/lib/filter/search-factory.ts';
import { legoSetService } from '../../../services/LegoSetService.ts';

export type MarketItemFilterModel = ReturnType<typeof marketItemFilterFactory>;

const setStateOptions: SelectFieldOption[] = [
  {
    label: '',
    value: '',
  },
].concat(
  ...Object.entries(setStates).map((state) => ({
    label: state[1],
    value: state[0],
  }))
);

const countryOptions: SelectFieldOption[] = [
  {
    label: 'Country',
    value: '',
  },
].concat(
  ...[...new Set(cities.map((city) => city.country))].map((country) => ({
    label: country,
    value: country,
  }))
);

export const marketItemFilterFactory = (options: { domain?: Domain }) => {
  const domain = options.domain ?? createDomain();

  const gate = createGate();

  const disclosure = createDisclosure();

  const form = createForm({
    fields: {
      set_ids: {
        init: '',
      },
      series_ids: {
        init: '',
      },
      set_number: {
        init: null as unknown as number,
      },
      min_pieces: {
        init: null as unknown as number,
      },
      max_pieces: {
        init: null as unknown as number,
      },
      locations: {
        init: '',
      },
      min_price: {
        init: 10,
      },
      max_price: {
        init: 6000,
      },
      set_states: {
        init: '',
      },
    },
  });

  const filtersApplied = createEvent();
  const cancelTriggered = createEvent();
  const resetTriggered = createEvent();

  const resetExactFilterTriggered = createEvent<keyof StoreValue<any>>();

  const $filtersSnapshot = domain.createStore<StoreValue<
    typeof form.$values
  > | null>(null);

  const fetchSeriesFx = createEffect(({ id }: { id: string }) =>
    legoSeriesService.GetLegoSeries(id)
  );

  const fetchSeriesListFx = createEffect((_: { query: string }) =>
    legoSeriesService.GetLegoSeriesList()
  );

  const fetchSetFx = createEffect(({ id }: { id: string }) =>
    legoSetService.GetLegoSet(id)
  );

  const fetchSetsFx = createEffect((_: { query: string }) =>
    legoSetService.GetLegoSets()
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

  const setsSearch = searchFactory({
    $selected: form.fields.set_ids.$value,
    domain,
    fetchEntityFx: fetchSetFx,
    key: 'set_id__in',
    mapEntityToMap: (response) => ({
      [response.id!]: response.name,
    }),
    mapEntityToOption: (response) => ({
      label: response.name,
      value: response.id!.toString(),
    }),
    requestFx: fetchSetsFx,
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
        location__in: snapshot?.locations.split(',').join(',loc'),
        price_gte: snapshot?.min_price,
        price_lte: snapshot?.max_price,
        set_state__in: snapshot?.set_states.split(',').join(',state'),
        set_id__in: snapshot?.set_ids.split(',').join(',set'),
        series_id__in: snapshot?.series_ids.split(',').join(',ser'),
        set_number: snapshot?.set_number,
        min_pieces: snapshot?.min_pieces,
        max_pieces: snapshot?.max_pieces,
      },
      false
    )
  );

  const $activeFilters = combine(
    $filtersSnapshot,
    seriesListSearch.$map,
    setsSearch.$map,
    (filters, seriesListMap, setsMap) => {
      const allFilters = {
        locations: {
          value: filters?.locations.split(',').join(', '),
          show: !!filters?.locations,
          label: 'Location',
        },
        min_price: {
          value: filters?.min_price,
          show: !!filters?.min_price,
          label: 'Min price',
        },
        max_price: {
          value: filters?.max_price,
          show: !!filters?.max_price,
          label: 'Max price',
        },
        set_states: {
          value: filters?.set_states.split(',').join(', '),
          show: !!filters?.set_states,
          label: 'Set state',
        },
        set_ids: {
          value: filters?.set_ids
            .split(',')
            .map((id) => setsMap[id])
            .join(', '),
          show: !!filters?.set_ids,
          label: 'Set name',
        },
        series_ids: {
          value: filters?.series_ids
            .split(',')
            .map((id) => seriesListMap[id])
            .join(', '),
          show: !!filters?.series_ids,
          label: 'Set theme',
        },
        set_number: {
          value: filters?.set_number,
          show: !!filters?.set_number,
          label: 'Set number',
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
    target: [seriesListSearch.fetchEntitiesFx, setsSearch.fetchEntitiesFx],
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
    key: 'market-items_filters',
  });

  return {
    form,

    filtersApplied,
    cancelTriggered,
    seriesListSearch,
    setsSearch,
    $query,

    disclosure,
    gate,

    setStateOptions,
    countryOptions,
    $activeFilters,

    resetExactFilterTriggered,
    resetTriggered,
  };
};
