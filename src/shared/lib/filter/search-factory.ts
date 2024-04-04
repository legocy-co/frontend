import {
  attach,
  combine,
  createEvent,
  Domain,
  Effect,
  sample,
  Store,
} from 'effector';
import { SelectSearchOption } from '../../ui/select-search.tsx';
import { stringifyParams } from '../../../services/utils.ts';
import { debounce, spread } from 'patronum';

export type SearchModel = ReturnType<typeof searchFactory>;

export function searchFactory<Done, EntityDone>({
  domain,
  mapToOptions,
  mapToMap,
  requestFx,
  key,
  $selected,
  fetchEntityFx,
  mapEntityToMap,
  mapEntityToOption,
}: {
  domain: Domain;
  key: string;
  mapToOptions: (response: Done) => SelectSearchOption[];
  mapToMap: (response: Done) => Record<string, string>;
  requestFx: Effect<
    {
      query: string;
    },
    Done
  >;
  $selected: Store<string>;

  fetchEntityFx: Effect<
    {
      id: string;
    },
    EntityDone
  >;

  mapEntityToOption: (response: EntityDone) => SelectSearchOption;
  mapEntityToMap: (response: EntityDone) => Record<string, string>;
}) {
  const selected = createEvent<SelectSearchOption>();
  const searchChanged = createEvent<string>();
  const removed = createEvent<string>();

  const $search = domain.createStore('');
  const $options = domain.createStore<SelectSearchOption[]>([]);
  const $map = domain.createStore<Record<string, string>>({});
  const $selectedArray = $selected.map((value) =>
    value.split(',').filter(Boolean)
  );

  const $selectedWithNames = combine($selectedArray, $map, (ids, map) =>
    ids.map((id) => ({
      id,
      name: map[id],
    }))
  );

  const $filteredOptions = combine(
    $options,
    $selectedArray,
    (options, selected) => {
      const selectedSet = new Set(selected);
      return options.filter((option) => !selectedSet.has(option.value));
    }
  );

  const searchFx = attach({
    source: $search,
    effect: requestFx,
    mapParams: (_: void, search) => ({
      query: stringifyParams({
        limit: 20,
        [key]: search,
      }),
    }),
  });

  const fetchEntitiesFx = attach({
    source: { map: $map, ids: $selectedArray },
    effect: ({ ids, map }) => {
      if (ids.length > 0) {
        ids.filter((id) => !map[id]).forEach((id) => fetchEntityFx({ id }));
      }
    },
  });

  sample({
    clock: searchChanged,
    target: $search,
  });

  sample({
    clock: debounce({
      source: searchChanged,
      timeout: 500,
    }),
    target: searchFx,
  });

  sample({
    clock: searchFx.doneData,
    source: $map,
    fn: (map, response) => ({
      options: mapToOptions(response),
      map: { ...map, ...mapToMap(response) },
    }),
    target: spread({
      targets: {
        options: $options,
        map: $map,
      },
    }),
  });

  sample({
    clock: selected,
    source: $selectedArray,
    fn: (selected, option) => ({
      label: option.label,
      value: selected.concat(option.value).join(','),
    }),
    target: [
      spread({
        targets: {
          value: $selected,
          label: $search,
        },
      }),
      $search.reinit!,
    ],
  });

  sample({
    clock: fetchEntityFx.doneData,
    source: $map,
    fn: (map, response) =>
      response
        ? {
            ...map,
            ...mapEntityToMap(response),
          }
        : map,
    target: $map,
  });

  sample({
    clock: fetchEntityFx.doneData,
    source: $options,
    fn: (options, response) =>
      response ? [mapEntityToOption(response)] : options,
    target: $options,
  });

  sample({
    clock: removed,
    source: $selectedArray,
    fn: (selected, value) => selected.filter((id) => id !== value).join(','),
    target: $selected,
  });

  return {
    $filteredOptions,
    searchChanged,
    selected,
    $map,
    $search,
    $options,
    $selectedWithNames,

    fetchEntitiesFx,
    removed,
  };
}
