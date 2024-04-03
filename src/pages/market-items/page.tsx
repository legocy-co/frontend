import * as model from './model.ts';
import { useGate } from 'effector-react';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import MarketItemsList from '../../components/MarketItemsList';
import { Pagination } from '../../shared/lib/pagination';
import { MarketItemsFilter } from '../../features/market-item/filter';
import { ActiveFilters } from '../../shared/lib/filters/active-filters.tsx';

export const CatalogPage = () => {
  useGate(model.gate);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading>Catalog</PageHeading>
      <div className="flex justify-end self-end pb-4">
        <MarketItemsFilter.View model={model.marketItemsFilterModel} />
      </div>
      <ActiveFilters model={model.marketItemsFilterModel} />
      <MarketItemsList />
      <Pagination.View model={model.paginationModel} />
    </div>
  );
};
