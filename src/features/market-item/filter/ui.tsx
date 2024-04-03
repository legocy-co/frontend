import * as Popover from '@radix-ui/react-popover';
import { useGate, useStoreMap, useUnit } from 'effector-react';
import React, { useState } from 'react';
import { Button } from '../../../shared/ui/button.tsx';
import { BsChevronDown } from 'react-icons/bs';
import clsx from 'clsx';
import { MarketItemFilterModel } from './model.ts';
import { setStates } from '../../../types/MarketItemType.ts';
import cities from '../../../../data/cities.json';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

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
        <Button className="w-32 max-w-32 h-9 flex items-center justify-around">
          <span className="text-primary text-base">Filters</span>
          <BsChevronDown
            className={clsx('transition-all mt-px -translate-y-[2px]', {
              'rotate-180': isOpen,
            })}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded w-96 bg-white dark:text-white p-4 mt-2 dark:bg-slate shadow-md z-20">
          <p className="text-xl">Filters</p>
          <form onSubmit={onSubmit} className="flex flex-col mt-5">
            <SetState model={model} />
            <Location model={model} />
            <RangeSlider
              min={10}
              max={3200}
              value={priceRange}
              onInput={setPriceRange}
              onThumbDragEnd={handlePriceChange}
              onRangeDragEnd={handlePriceChange}
              className="my-5"
            />
            {priceRange.join(', ')}
            <div className="flex gap-5 justify-center mt-3.5">
              <Button type="submit">Apply</Button>
              <Button onClick={() => model.cancelTriggered()}>Cancel</Button>
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
      <select
        value=""
        onChange={(ev) =>
          form.fields.set_states.onChange(
            value.concat(ev.currentTarget.value).join(',')
          )
        }
        className="h-[44px] dark:bg-dark border border-solid border-slate rounded-xl !dark:text-charcoal indent-3 pr-10 outline-0 mb-1"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

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
              className="bg-white bg-opacity-5 hover:bg-opacity-10 px-1.5 py-0.5 rounded-full"
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
      <div className="flex space-x-2">
        <select
          value={country}
          onChange={(ev) => setCountry(ev.currentTarget.value)}
          className="h-[44px] w-40 mt-3.5 dark:bg-dark border border-solid border-slate rounded-xl !dark:text-charcoal indent-3 pr-10 outline-0 mb-1"
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value=""
          onChange={(ev) =>
            form.fields.locations.onChange(
              value.concat(`${ev.currentTarget.value} - ${country}`).join(',')
            )
          }
          disabled={!country}
          className="h-[44px] w-40 mt-3.5 dark:bg-dark border border-solid border-slate rounded-xl !dark:text-charcoal indent-3 pr-10 outline-0 mb-1"
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
              className="bg-white bg-opacity-5 hover:bg-opacity-10 px-1.5 py-0.5 rounded-full"
            >
              <span className="text-xs font-medium">{loc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
