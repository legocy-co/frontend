import { MarketItemsFilter as View } from './ui';
import { ActiveFilters } from '../../../shared/lib/filter/active-filters.tsx';
import { marketItemFilterFactory } from './model.ts';

export const MarketItemsFilter = {
  factory: marketItemFilterFactory,
  View,
  ActiveFilters,
};
