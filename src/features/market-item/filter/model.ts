import {
  combine,
  createDomain,
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

export type MarketItemFilterModel = ReturnType<typeof marketItemFilterFactory>;

export const marketItemFilterFactory = (options: { domain?: Domain }) => {
  const domain = options.domain ?? createDomain();

  const gate = createGate();

  const disclosure = createDisclosure();

  const form = createForm({
    fields: {
      locations: {
        init: '',
      },
      min_price: {
        init: null as unknown as number,
      },
      max_price: {
        init: null as unknown as number,
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

  const $query = $filtersSnapshot.map((snapshot) =>
    stringifyParams(
      {
        location__in: snapshot?.locations.split(',').join(',loc'),
        price_gte: snapshot?.min_price,
        price_lte: snapshot?.max_price,
        set_state__in: snapshot?.set_states.split(',').join(',state'),
      },
      false
    )
  );

  const $activeFilters = combine($filtersSnapshot, (filters) => {
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
        label: 'Condition',
      },
    };

    return Object.entries(allFilters).filter(([, value]) => Boolean(value));
  });

  sample({
    clock: form.formValidated,
    source: form.$values,
    target: [$filtersSnapshot, disclosure.close, filtersApplied],
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
    $query,

    disclosure,

    gate,

    $activeFilters,

    resetExactFilterTriggered,
    resetTriggered,
  };
};
