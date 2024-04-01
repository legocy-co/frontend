import { legoSetFilterFactory } from './model.ts';
import { LegoSetsFilter as View } from './ui';
import { ActiveFilters } from '../../../shared/lib/filter/active-filters.tsx';

export const LegoSetsFilter = {
  factory: legoSetFilterFactory,
  View,
  ActiveFilters,
};
