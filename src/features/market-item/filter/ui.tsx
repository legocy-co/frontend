import * as Popover from '@radix-ui/react-popover';
import { useGate, useStoreMap, useUnit } from 'effector-react';
import React, { useState } from 'react';
import { Button } from '../../../shared/ui/button.tsx';
import clsx from 'clsx';
import { MarketItemFilterModel } from './model.ts';
import { setStates } from '../../../types/MarketItemType.ts';
import cities from '../../../../data/cities.json';
import RangeSlider from 'react-range-slider-input';
import './price-slider.scss';
import SlidersIcon from '../../../assets/icons/sliders.svg?react';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import { EventPayload } from 'effector';
import CloseIcon from '../../../assets/icons/close.svg?react';
import TrashIcon from '../../../assets/icons/trash.svg?react';

export const MarketItemsFilter = ({
  model,
}: {
  model: MarketItemFilterModel;
}) => {
  const { gate, disclosure, form } = model;
  useGate(gate);

  const [isOpen] = useUnit([disclosure.$isOpen]);

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    form.submit();
  };

  const [priceRange, setPriceRange] = useState([10, 3200]);

  const touched = useUnit(model.form.$touched);

  function handlePriceChange() {
    model.form.fields.min_price.onChange(priceRange[0]);
    model.form.fields.max_price.onChange(priceRange[1]);
  }

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          model.cancelTriggered();
        } else {
          model.disclosure.open();
          setPriceRange([10, 3200]);
        }
      }}
    >
      <Popover.Trigger asChild>
        <Button className="!bg-pagesize dark:!bg-darkfilters dark:!text-darkfilterstext rounded-md !text-sm w-36 max-w-32 h-9 flex items-center justify-around">
          <SlidersIcon className="iconstrokes" />
          <span className="text-primary text-base">Filters</span>
          <ChevronUpIcon
            className={clsx(
              'transition-all mt-px -translate-y-[2px] iconstrokes',
              {
                'rotate-180': !isOpen,
              }
            )}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded-md w-[378px] styled-select bg-pagesize text-filterstext dark:text-darkfilterstext p-4 mt-4 dark:bg-darkfiltersbg z-20 border dark:border-solid dark:border-px dark:border-darkfiltersborder">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 justify-between w-[340px]"
          >
            <SetState model={model} />
            <Location model={model} />
            <div>
              <p>Price, $</p>
              <RangeSlider
                min={10}
                max={3200}
                value={priceRange}
                onInput={setPriceRange}
                onThumbDragEnd={handlePriceChange}
                onRangeDragEnd={handlePriceChange}
                className="my-5"
              />
              <div className="flex w-full justify-between text-xs text-filtersprice dark:text-darkfiltersprice">
                <p>{priceRange[0]}$</p> <p>{priceRange[1]}$</p>
              </div>
            </div>
            <div className="flex gap-5 justify-center">
              <Button
                className="!h-[39px] !w-40 text-[16px]"
                type="submit"
                disabled={!touched}
              >
                Apply
              </Button>
              <Button
                className="!h-[39px] !w-40 text-[16px] bg-white hover:!bg-gray-300"
                disabled={!touched}
                onClick={() => model.cancelTriggered()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const SetState = ({ model }: { model: MarketItemFilterModel }) => {
  const { form, setStateOptions } = model;
  const value = useStoreMap(
    form.fields.set_states.$value,
    (value) => value?.split(',').filter(Boolean) ?? []
  );

  const options = setStateOptions.filter(
    (state) => !value.includes(state.value)
  );

  return (
    <div className="flex flex-col space-y-2">
      <p>Set state</p>
      <div className="relative">
        <select
          value=""
          onChange={(ev) =>
            form.fields.set_states.onChange(
              value.concat(ev.currentTarget.value).join(',')
            )
          }
          className="h-[35px] w-[340px] bg-white dark:bg-darkfilters rounded-md !dark:text-charcoal indent-3 pr-10 outline-0 mb-1 cursor-pointer"
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronUpIcon className="absolute iconstrokes pointer-events-none top-3 right-3 rotate-180" />
      </div>
      {value.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap cursor-pointer">
          {value.map((state) => (
            <div
              key={state}
              aria-hidden
              onClick={() =>
                form.fields.set_states.onChange(
                  value.filter((s) => s !== state).join(',')
                )
              }
              className="bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 hover:bg-opacity-10 px-1.5 py-0.5 rounded-full"
            >
              <span className="text-xs font-medium">
                {setStates[state as keyof typeof setStates]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Location = ({ model }: { model: MarketItemFilterModel }) => {
  const { form, countryOptions } = model;
  const value = useStoreMap(
    form.fields.locations.$value,
    (value) => value?.split(',').filter(Boolean) ?? []
  );

  const options = countryOptions.filter(
    (country) => !value.includes(country.value)
  );

  const [country, setCountry] = useState('');

  return (
    <div className="flex flex-col space-y-2">
      <p>Location</p>
      <div className="flex justify-between space-x-3">
        <div className="relative">
          <select
            value={country}
            onChange={(ev) => setCountry(ev.currentTarget.value)}
            className="h-[35px] w-[160px] rounded-md bg-white text-filterstext dark:text-darkfilterstext indent-3 pr-10 outline-0 mb-1 dark:bg-darkfilters cursor-pointer"
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronUpIcon className="absolute iconstrokes pointer-events-none top-3 right-3 rotate-180" />
        </div>
        <div className="relative">
          <select
            value=""
            onChange={(ev) =>
              form.fields.locations.onChange(
                value.concat(`${ev.currentTarget.value} - ${country}`).join(',')
              )
            }
            disabled={!country}
            className={clsx(
              'h-[35px] w-[160px] rounded-md bg-white text-filterstext dark:text-darkfilterstext indent-3 pr-10 outline-0 mb-1 dark:bg-darkfilters cursor-pointer',
              { 'cursor-default': !country }
            )}
          >
            {[
              {
                label: 'City',
                value: '',
              },
            ]
              .concat(
                ...cities
                  .filter((city) => city.country === country)
                  .map((city) => city.name)
                  .sort()
                  .map((city) => ({ label: city, value: city }))
              )
              .map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
          </select>
          <ChevronUpIcon className="absolute iconstrokes pointer-events-none top-3 right-3 rotate-180" />
        </div>
      </div>
      {value.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap cursor-pointer">
          {value.map((loc) => (
            <div
              key={loc}
              aria-hidden
              onClick={() =>
                form.fields.locations.onChange(
                  value.filter((x) => x !== loc).join(',')
                )
              }
              className="bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 hover:bg-opacity-10 px-1.5 py-0.5 rounded-full"
            >
              <span className="text-xs font-medium">{loc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ActiveFilters = ({ model }: { model: MarketItemFilterModel }) => {
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
      <div className="grid md:flex items-center gap-2">
        {activeFilters.map(
          ([name, value]) =>
            value.value && (
              <div
                key={name}
                className="w-max h-[37px] flex rounded-md items-center space-x-2 px-2 bg-pagesize text-activefilterstext dark:bg-darkfilters dark:text-darkactivefilterstext"
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
                      name as EventPayload<typeof resetExactFilterTriggered>
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
        className="rounded-md w-[134px] h-[37px] bg-black bg-opacity-35 flex items-center justify-around dark:bg-white dark:bg-opacity-35 text-darkfilterstext hover:opacity-90 active:opacity-80 transition-opacity"
      >
        Clear filters
        <TrashIcon />
      </button>
    </div>
  );
};
