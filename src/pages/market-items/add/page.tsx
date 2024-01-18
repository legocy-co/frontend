import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MarketItemForm } from '../../../features/market-item/publish';

const AddMarketItemPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/profile'}>Add market item</PageHeading>
      <MarketItemForm />
    </div>
  );
};

export default AddMarketItemPage;
