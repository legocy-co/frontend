import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MarketItemInfoForm } from '../../../features/market-item/info';

export const UpdateMarketItemPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/profile'}>Update market item</PageHeading>
      <MarketItemInfoForm />
    </div>
  );
};
