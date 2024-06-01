import { PageHeading } from '../../../shared/ui/page-heading.tsx';
import { MarketItemUpdateForm } from '../../../features/market-item/update';
import NoneIcon from '../../../assets/icons/none.svg?react';

export const UpdateMarketItemPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <PageHeading>Update Listing</PageHeading>
      <div className="flex items-center justify-evenly gap-5 px-4 py-2.5 rounded-md mb-12 max-w-[823px] border border-solid border-legocy bg-updatewarn bg-opacity-20">
        <NoneIcon className="iconfills min-w-4" />
        <p className="text-xl">
          After editing set information except price and location, the listing
          will go to moderation.
        </p>
      </div>
      <MarketItemUpdateForm />
    </div>
  );
};
