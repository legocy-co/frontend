import CollectionList from '../../components/CollectionList';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { useNavigate } from 'react-router-dom';
import { $collectionTotals } from './model.ts';
import clsx from 'clsx';
import { Button } from '../../shared/ui/button.tsx';

export const CollectionPage = () => {
  useGate(model.gate);

  const totals = useUnit($collectionTotals);
  const navigate = useNavigate();

  return (
    <>
      <PageHeading>Collection</PageHeading>
      <div className="flex flex-col justify-around w-1/3 min-w-96 h-48 shadow-md rounded-xl font-medium bg-white dark:bg-dark py-4 px-3 text-md text-gray-500">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <p>Total Amount (USD)</p>
            <p className="text-lg dark:text-white text-black">
              ${totals.total}
            </p>
          </div>
          <div className="flex flex-col text-end gap-2">
            <p>Average P&L</p>
            <h1
              className={clsx(
                'text-lg',
                {
                  'text-green-400': totals.totalProfits.totalReturnUSD! > 0,
                },
                { 'text-red-400': totals.totalProfits.totalReturnUSD! < 0 }
              )}
            >{`${totals.totalProfits.totalReturnUSD}$(${
              Math.round(totals.totalProfits.totalReturnPercentage * 100) / 100
            }%)`}</h1>
          </div>
        </div>
        <div className="flex justify-between my-5">
          <p>Sets Valuated</p>
          <p className="dark:text-white text-black">
            {totals.setsValuated} / {totals.totalSets}
          </p>
        </div>
        <Button
          onClick={() => navigate('/collection/add/')}
          className="w-full rounded-sm text-lg h-11"
        >
          Add Collection Set
        </Button>
      </div>
      {/*<MenuButton onClick={() => navigate('/collection/add/')}>Add</MenuButton>*/}
      <CollectionList />
    </>
  );
};
