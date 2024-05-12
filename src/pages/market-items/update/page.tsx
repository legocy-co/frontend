import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MarketItemUpdateForm } from '../../../features/market-item/update';

export const UpdateMarketItemPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/profile'}>Update market item</PageHeading>
      <MarketItemUpdateForm />
    </div>
  );
};
