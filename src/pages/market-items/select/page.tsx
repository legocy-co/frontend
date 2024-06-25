import BuyIcon from '../../../assets/icons/buy.svg?react';
import BagMoneyIcon from '../../../assets/icons/bag-money.svg?react';
import { SelectOption } from '../../../entities/market-item/select-option';

export const CatalogSelectPage = () => {
  return (
    <div className="min-w-96 w-[94%] p-12 bg-select bg-center bg-no-repeat bg-cover bg-step rounded-[22px] flex flex-col justify-between items-center gap-6">
      <p className="font-bold text-[2.5rem] text-condition">I am here to...</p>
      <p className="font-normal text-lg max-w-[360px] sm:max-w-[729px] text-white text-center">
        Our platform includes both functions: you can sell and buy sets. Choose
        an option below.
      </p>
      <div className="flex justify-center flex-wrap gap-6 mt-6 text-center">
        <SelectOption
          to="/catalog"
          label="Buy"
          description="I want to buy a set from the marketplace"
          icon={<BuyIcon className="iconfills iconstrokes" />}
        />
        <SelectOption
          to="/catalog/add"
          label="Sell"
          description="I want to upload a set to the marketplace"
          icon={<BagMoneyIcon className="iconfills" />}
        />
      </div>
    </div>
  );
};
