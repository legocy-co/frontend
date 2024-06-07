import CollectionList from '../../components/CollectionList';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { useNavigate } from 'react-router-dom';
import { $collectionTotals } from './model.ts';
import { Button } from '../../shared/ui/button.tsx';
import CalculationIcon from '../../assets/icons/calculation.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import HashIcon from '../../assets/icons/hash.svg?react';
import GraphIcon from '../../assets/icons/graph.svg?react';
import clsx from 'clsx';
import RingChart from '../../components/RingChart';

export const CollectionPage = () => {
  useGate(model.gate);

  const navigate = useNavigate();

  return (
    <>
      <PageHeading>Collection</PageHeading>
      <div className="flex flex-col items-center justify-start gap-4 w-full">
        <Button
          className="w-80 sm:w-[382px] h-[53px] rounded-[10px]"
          onClick={() => navigate('/collection/add/')}
        >
          Add Set to Collection
        </Button>
        <Totals />
        <RingChart />
      </div>
      <CollectionList />
    </>
  );
};

const Totals = () => {
  const totals = useUnit($collectionTotals);

  const setTwoDecimals = (value: number): number =>
    Math.floor(value * 100) / 100;

  return (
    <div className="w-[95%] iconstrokes text-2xl py-4 px-8 bg-pagesize dark:bg-dark flex flex-wrap items-center justify-between gap-10 rounded-lg">
      <div className="flex items-center gap-2">
        <CalculationIcon className="w-[22px] iconfills" />
        <p>Current value ($): {totals.total}</p>
      </div>
      <div className="flex items-center gap-2">
        <PlusIcon className="w-[18px] iconfills" />
        <p>Sets added: {totals.totalSets}</p>
      </div>
      <div className="flex items-center gap-2">
        <HashIcon className="w-[21px] iconfills" />
        <p>Sets valued: {totals.setsValuated}</p>
      </div>
      <div className="flex items-center gap-2">
        <GraphIcon className="w-[22px]" />
        <p>Overall P&L </p>
        <span
          className={clsx(
            {
              'text-[#78CA51]': totals.totalProfits.totalReturnUSD > 0,
            },
            { 'text-[#EE716C]': totals.totalProfits.totalReturnUSD < 0 }
          )}
        >
          {setTwoDecimals(totals.totalProfits.totalReturnUSD)}$ (
          {setTwoDecimals(totals.totalProfits.totalReturnPercentage)}
          %)
        </span>
      </div>
    </div>
  );
};
