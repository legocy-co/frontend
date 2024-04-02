import { LegoSetFilterModel } from '../../../features/lego-set/filter/model.ts';
import { useUnit } from 'effector-react';
import { EventPayload } from 'effector';
import { MarketItemFilterModel } from '../../../features/market-item/filter/model.ts';

export const ActiveFilters = ({
  model,
}: {
  model: LegoSetFilterModel | MarketItemFilterModel;
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
    <div className="w-full flex items-center justify-between space-x-5 mb-5 border-b border-b-gray-600 border-solid py-2">
      <div className="grid md:flex items-center gap-2">
        {activeFilters.map(
          ([name, value]) =>
            value.value && (
              <div
                key={name}
                className="w-max flex rounded-full items-center space-x-2 px-2 py-1.5 bg-silver dark:bg-dark"
              >
                <button
                  type="button"
                  onClick={() =>
                    resetExactFilterTriggered(
                      name as EventPayload<
                        typeof resetExactFilterTriggered
                      > as never
                    )
                  }
                  className="rounded-full py-1 px-2 bg-ghost dark:bg-slate hover:brightness-90 active:brightness-80 transition-all"
                >
                  x
                </button>
                <div className="text-neutral-30 text-sm flex space-x-1">
                  <span className="capitalize">{value.label}</span>
                  <span>|</span>
                  <span className="!text-slate dark:!text-white">
                    {value.value}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
      <button
        onClick={() => resetTriggered()}
        type="button"
        className="rounded text-sm p-2 text-black bg-ghost hover:opacity-90 active:opacity-80 transition-opacity"
      >
        Clear filters
      </button>
    </div>
  );
};
