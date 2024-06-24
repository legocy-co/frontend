import { createEffect, createStore } from 'effector';
import { LegoSet } from '../../../types/LegoSetType.ts';
import { legoSetService } from '../../../services/LegoSetService.ts';
import { SelectFieldOption } from '../../../shared/ui/form-adapters.tsx';

type LegoSetOption = {
  id: string;
  number: number;
  name: string;
};

export const setReleaseYearOptions: SelectFieldOption[] = Array.from(
  { length: 15 },
  (_, i) => Object({ label: 2010 + i, value: 2010 + i })
);

export const $legoSetOptions = createStore<LegoSetOption[]>([]);

export const fetchLegoSetsFx = createEffect(() => legoSetService.GetLegoSets());

export function toOptions(legoSets: LegoSet[]): LegoSetOption[] {
  return legoSets.map((legoSet) => ({
    id: String(legoSet.id),
    number: legoSet.number,
    name: legoSet.name,
  }));
}
