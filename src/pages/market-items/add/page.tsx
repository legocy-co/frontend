import { PageHeading } from '../../../shared/ui/page-heading.tsx';

const AddMarketItemPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading to={'/profile'}>Add Market Item</PageHeading>
    </div>
  );
};

export default AddMarketItemPage;
