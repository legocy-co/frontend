import { useNavigate } from 'react-router-dom';
import BuyIcon from '../../../assets/icons/buy.svg?react';
import BagMoneyIcon from '../../../assets/icons/bag-money.svg?react';

export const CatalogSelectPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-w-96 w-[94%] p-12 bg-select bg-center bg-no-repeat bg-cover bg-step rounded-[22px] flex flex-col justify-between items-center gap-6">
      <p className="font-bold text-[2.5rem] text-condition">I am here to...</p>
      <p className="font-normal text-lg max-w-[360px] sm:max-w-[729px] text-white text-center">
        Our platform includes both functions: you can sell and buy sets. Choose
        an option below.
      </p>
      <div className="flex justify-center flex-wrap gap-6 mt-6 text-center">
        <div
          className="w-80 sm:w-[342px] aspect-[1.3] rounded-[10px] bg-white dark:bg-state flex flex-col items-center justify-center gap-6 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
          onClick={() => navigate('/catalog')}
        >
          <BuyIcon className="iconfills iconstrokes" />
          <p className="font-bold text-[2rem]">Buy</p>
          <p className="w-40">I want to buy a set from the marketplace</p>
        </div>
        <div
          className="w-80 sm:w-[342px] aspect-[1.3] iconfills rounded-[10px] bg-white dark:bg-state flex flex-col items-center justify-center gap-6 cursor-pointer transition-opacity hover:opacity-95 active:opacity-90"
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
