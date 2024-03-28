import * as model from './model.ts';
import { useGate } from 'effector-react';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import MarketItemsList from '../../components/MarketItemsList';
import { Pagination } from '../../shared/lib/pagination';

export const CatalogPage = () => {
  useGate(model.gate);
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading>Catalog</PageHeading>
      <MarketItemsList />
      <Pagination.View model={model.paginationModel} />
    </div>
  );
};
