import CollectionList from '../../components/CollectionList';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/button.tsx';
import CalculationIcon from '../../assets/icons/calculation.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import HashIcon from '../../assets/icons/hash.svg?react';
import GraphIcon from '../../assets/icons/graph.svg?react';
import clsx from 'clsx';
import RingChart from '../../components/RingChart';
import { setTwoDecimals } from '../../services/utils.ts';

export const CollectionPage = () => {
  useGate(model.gate);

  const totals = useUnit(model.$collectionTotals);
  const pnlData = useUnit(model.$pnlData);
  const seriesData = useUnit(model.$seriesChartData);

  const navigate = useNavigate();

  return (
    <>
      <PageHeading>Collection</PageHeading>
      <div className="flex flex-col items-center justify-start gap-4 min-w-80 w-[95%]">
        <Button
          className="w-80 sm:w-[382px] h-[53px] rounded-[10px]"
          onClick={() => navigate('/collection/add/')}
        >
          Add Set to Collection
        </Button>
        <Totals />
        <div className="w-full flex items-center justify-around flex-wrap gap-5">
          {totals.setsValuated > 0 && (
            <RingChart
              data={pnlData}
              total={totals.setsValuated}
              label="Profits Overview"
              hideExpand
              customUnits="sets"
              className="!max-w-[556px]"
            />
          )}
          <RingChart
            data={seriesData}
            total={totals.totalSets}
            label={
              totals.totalSets < 6 ? 'Series statistics' : 'Themes overview'
            }
            legendPercentage={totals.totalSets < 6}
            gluedHeader={totals.totalSets < 6}
          />
        </div>
      </div>
      <CollectionList />
    </>
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
