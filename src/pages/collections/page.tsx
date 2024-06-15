import CollectionList from '../../components/CollectionList';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { Button } from '../../shared/ui/button.tsx';
import CalculationIcon from '../../assets/icons/calculation.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import HashIcon from '../../assets/icons/hash.svg?react';
import GraphIcon from '../../assets/icons/graph.svg?react';
import SlidersIcon from '../../assets/icons/sliders.svg?react';
import ChevronUpIcon from '../../assets/icons/chevron-up.svg?react';
import ArrowIcon from '../../assets/icons/arrow.svg?react';
import clsx from 'clsx';
import RingChart from '../../components/RingChart';
import { setTwoDecimals } from '../../services/utils.ts';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../../components/ConfirmationModal';
import { CollectionSetForm, csf } from '../../features/collection';

export const CollectionPage = () => {
  useGate(model.gate);

  const [showAdd, setShowAdd] = useState(false);

  const totals = useUnit(model.$collectionTotals);
  const pnlData = useUnit(model.$pnlData);
  const seriesData = useUnit(model.$seriesChartData);
  const formClosed = useUnit(csf.$formClosed);
  const sorting = useUnit(model.$collectionSorting);

  function handleSort() {
    switch (sorting) {
      case 'asc':
        model.collectionSortingChanged('desc');
        return;
      case 'desc':
        model.collectionSortingChanged('');
        return;
      default:
        model.collectionSortingChanged('asc');
    }
  }

  useEffect(() => {
    if (formClosed) setShowAdd(false);
  }, [formClosed]);

  return (
    <div className="flex flex-col items-center min-w-80 w-[95%]">
      <PageHeading>Collection</PageHeading>
      <div className="flex flex-col max-w-full flex-grow items-center gap-4">
        <Button
          className="w-80 sm:w-[382px] h-[53px] rounded-[10px]"
          onClick={() => setShowAdd(true)}
        >
          Add Set to Collection
        </Button>
        <Totals />
        <div className="w-full flex items-center justify-around flex-grow flex-wrap gap-5">
          {totals.setsValuated > 0 && (
            <RingChart
              data={pnlData}
              total={totals.setsValuated}
              label="Profits Overview"
              hideExpand
              customUnits={['sets', 'set']}
              className="!max-w-[556px]"
            />
          )}
          <RingChart
            data={seriesData}
            total={totals.totalSets}
            label="Themes Overview"
            legendPercentage={totals.totalSets < 6}
            gluedHeader={totals.totalSets < 6}
          />
        </div>
        <div className="w-full flex justify-between items-center mt-8">
          <div>
            Sort by:{' '}
            <span
              onClick={handleSort}
              className="inline-flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90 active:opacity-80"
            >
              Profit
              <ArrowIcon
                width={16}
                className={clsx(
                  '[&>path]:fill-black iconfills transition-all',
                  {
                    'rotate-[270deg]': sorting === 'asc',
                    'rotate-[90deg]': sorting === 'desc',
                    hidden: sorting === '',
                  }
                )}
              />
            </span>
          </div>
          <Button className="!bg-pagesize dark:!bg-dark dark:!text-[#F9F9F9] rounded-md !text-sm w-36 max-w-32 h-9 flex items-center justify-around">
            <SlidersIcon className="iconstrokes" />
            <span className="text-primary text-base">Filters</span>
            <ChevronUpIcon
              // className={clsx(
              //   'transition-all mt-px -translate-y-[2px] iconstrokes',
              //   {
              //     'rotate-180': !isOpen,
              //   }
              // )}
              className="iconstrokes rotate-180"
            />
          </Button>
        </div>
      </div>
      <CollectionList />
      {showAdd && (
        <ConfirmationModal
          className="!p-10 dark:!bg-dark max-h-[80vh] !top-12 overflow-auto"
          show={showAdd}
          onClose={() => setShowAdd(false)}
          showYes={false}
        >
          <CollectionSetForm />
        </ConfirmationModal>
      )}
    </div>
  );
};

const Totals = () => {
  const totals = useUnit(model.$collectionTotals);

  return (
    <div className="w-full iconstrokes text-2xl py-4 px-8 bg-pagesize dark:bg-dark flex flex-wrap items-center justify-between gap-10 rounded-lg">
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
