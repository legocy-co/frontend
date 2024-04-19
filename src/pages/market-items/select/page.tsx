import { useNavigate } from 'react-router-dom';
import BuyIcon from '../../../assets/icons/buy.svg?react';
import BagMoneyIcon from '../../../assets/icons/bag-money.svg?react';

export const CatalogSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold text-[2.5rem] dark:color-condition">
        I am here to...
      </p>
      <p className="font-normal text-lg max-w-[360px] sm:max-w-[729px] dark:color-white">
        Our platform includes both functions: you can sell and buy sets. Choose
        an option below.
      </p>
      <div className="flex justify-center flex-wrap gap-6 text-center text-white">
        <div
          className="w-[342px] h-[262px] rounded-[10px] bg-buy flex flex-col items-center justify-center gap-6 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
          onClick={() => navigate('/catalog')}
        >
          <BuyIcon />
          <p className="font-bold text-[2rem]">Buy</p>
          <p className="w-40">I want to buy a set from the marketplace</p>
        </div>
        <div
          className="w-[342px] h-[262px] rounded-[10px] bg-sell flex flex-col items-center justify-center gap-6 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
          onClick={() => navigate('/catalog/add')}
        >
          <BagMoneyIcon />
          <p className="font-bold text-[2rem]">Sell</p>
          <p className="w-40">I want to upload a set to the marketplace</p>
        </div>
      </div>
    </div>
  );
};
