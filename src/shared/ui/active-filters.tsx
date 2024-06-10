import { MarketItemFilterModel } from '../../features/market-item/filter/model.ts';
import { LegoSetFilterModel } from '../../features/lego-set/filter/model.ts';
import { useUnit } from 'effector-react';
import CloseIcon from '../../assets/icons/close.svg?react';
import { EventPayload } from 'effector';
import TrashIcon from '../../assets/icons/trash.svg?react';

export const ActiveFilters = ({
  model,
}: {
  model: MarketItemFilterModel | LegoSetFilterModel;
}) => {
  const { $activeFilters, resetExactFilterTriggered, resetTriggered } = model;
  const activeFilters = useUnit($activeFilters);

  let count = 0;
  for (let i = 0; i < activeFilters.length; i++)
    activeFilters[i][1]['value'] && count++;

  if (!count) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-between space-x-5 mb-5 py-2">
      <div className="flex flex-wrap items-center gap-2 w-max-[1061px]">
        {activeFilters.map(
          ([name, value]) =>
            (value.value || value.value === 0) && (
              <div
                key={name}
                className="min-h-[37px] flex rounded-md items-center space-x-2 p-2 bg-pagesize text-darkfiltersborder dark:bg-dark dark:text-statevaluationchart"
              >
                <div className="flex space-x-1">
                  <span className="capitalize">{value.label}: </span>
                  <span className="capitalize">
                    {String(value.value).split('_').join(' ').toLowerCase()}
                  </span>
                </div>
                <CloseIcon
                  className="hover:brightness-90 cursor-pointer iconfills"
                  onClick={() =>
                    resetExactFilterTriggered(
                      name as EventPayload<
                        typeof resetExactFilterTriggered
                      > as never
                    )
                  }
                />
              </div>
            )
        )}
      </div>
      <button
        onClick={() => resetTriggered()}
        type="button"
        className="rounded-md min-w-[144px] h-[37px] bg-black bg-opacity-35 flex items-center justify-around dark:bg-white dark:bg-opacity-35 text-[#F9F9F9] hover:opacity-90 active:opacity-80 transition-opacity fillswhite"
      >
        Clear filters
        <TrashIcon />
      </button>
    </div>
  );
};
