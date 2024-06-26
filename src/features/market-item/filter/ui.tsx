import * as Popover from '@radix-ui/react-popover';
import { useGate, useStoreMap, useUnit } from 'effector-react';
import React, { useState } from 'react';
import { Button } from '../../../shared/ui/button.tsx';
import clsx from 'clsx';
import { MarketItemFilterModel } from './model.ts';
import { setStates } from '../../../types/MarketItemType.ts';
import RangeSlider from 'react-range-slider-input';
import './price-slider.scss';
import SlidersIcon from '../../../assets/icons/sliders.svg?react';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import { SelectSearch } from '../../../shared/ui/select-search.tsx';
import { SearchModel } from '../../../shared/lib/filter/search-factory.ts';
import {
  MultiCheckboxAdapter,
  NumberFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { lo } from '../../location/options/index.ts';
import { mio } from '../options/index.ts';
import { lso } from '../../lego-set/options/index.ts';

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

  const [priceRange, setPriceRange] = useState([10, 6000]);

  const seriesDirty = useUnit(model.form.fields.series_ids.$isDirty);
  const setDirty = useUnit(model.form.fields.set_ids.$isDirty);
  const touched = useUnit(model.form.$touched);

  const buttonsDisabled = !seriesDirty && !setDirty && !touched;

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
          setPriceRange([10, 6000]);
        }
      }}
    >
      <Popover.Trigger asChild>
        <Button className="!bg-pagesize dark:!bg-dark dark:!text-[#F9F9F9] rounded-md !text-sm w-36 max-w-32 h-9 flex items-center justify-around">
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
        <Popover.Content className="rounded-md w-[378px] styled-select bg-pagesize text-tab dark:text-[#F9F9F9] p-4 mt-4 dark:bg-celllink z-20 border dark:border-solid dark:border-px dark:border-darkfiltersborder">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 justify-between w-[340px]"
          >
            <Search model={model.setsSearch} label="Set name" />
            <Search model={model.seriesListSearch} label="Set theme" />
            <div className="flex justify-between">
              <SetState model={model} />
              <div className="flex flex-col gap-1 mt-[3px]">
                <NumberFieldAdapter
                  field={model.form.fields.set_number}
                  labelText="Set number"
                  placeholder="76053"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-1 mt-[-13px]">
                <NumberFieldAdapter
                  field={model.form.fields.min_pieces}
                  labelText="Amount of pieces"
                  placeholder="Min. amount"
                />
              </div>
              <NumberFieldAdapter
                field={model.form.fields.max_pieces}
                labelText=""
                placeholder="Max. amount"
                className="mt-[6px]"
              />
            </div>
            <Location model={model} />
            <MultiCheckboxAdapter
              field={model.form.fields.releaseYears}
              label="Set release year"
              options={lso.setReleaseYearOptions}
            />
            <div>
              <p>Price, $</p>
              <RangeSlider
                min={10}
                max={6000}
                value={priceRange}
                onInput={setPriceRange}
                onThumbDragEnd={handlePriceChange}
                onRangeDragEnd={handlePriceChange}
                className="mt-5 mb-1"
              />
              <div className="flex w-full px-2 justify-between text-xs text-darkfiltersborder dark:text-[#F9F9F9] dark:text-opacity-70">
                <label
                  className="input-sizer bg-white dark:bg-transparent"
                  data-value={priceRange[0] ? priceRange[0] : ''}
                >
                  <input
                    size={1}
                    value={priceRange[0] ? priceRange[0] + '$' : '$'}
                    onInput={(e) => {
                      e.currentTarget.value.concat(' $');
                      setPriceRange([
                        Number(e.currentTarget.value.replace('$', '')),
                        priceRange[1],
                      ]);
                    }}
                    onChange={(e) =>
                      form.fields.min_price.onChange(
                        Number(e.currentTarget.value.replace('$', ''))
                      )
                    }
                  />
                </label>
                <label
                  className="input-sizer bg-white dark:bg-transparent"
                  data-value={priceRange[1] ? priceRange[1] : ''}
                >
                  <input
                    size={1}
                    value={priceRange[1] ? priceRange[1] + '$' : '$'}
                    onInput={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number(e.currentTarget.value.replace('$', '')),
                      ])
                    }
                    onChange={(e) =>
                      form.fields.max_price.onChange(
                        Number(e.currentTarget.value.replace('$', ''))
                      )
                    }
                  />
                </label>
              </div>
            </div>
            <div className="flex w-full justify-between">
              <Button
                className="!h-[39px] !w-40 text-[16px]"
                type="submit"
                disabled={buttonsDisabled}
              >
                Apply
              </Button>
              <Button
                className="!h-[39px] !w-40 text-[16px] bg-white "
                disabled={buttonsDisabled}
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
  const { form } = model;
  const value = useStoreMap(
    form.fields.set_states.$value,
    (value) => value?.split(',').filter(Boolean) ?? []
  );

  const options = mio.setStateOptions.filter(
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
          className="h-[35px] w-[160px] relative bg-white dark:bg-dark rounded-md !dark:text-confirmmodal indent-3 pr-10 outline-0 mb-1 cursor-pointer"
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
        <div className="flex items-center w-[160px] gap-2 flex-wrap cursor-pointer">
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
  const { form } = model;

  const value = useStoreMap(
    form.fields.locations.$value,
    (value) => value?.split(',').filter(Boolean) ?? []
  );

  const [country, setCountry] = useState('');

  const cityOptions = lo
    .cityOptions(country)
    .filter((city) => !value.includes(`${city.value} - ${country}`));

  return (
    <div className="flex flex-col gap-2 mt-[-1rem]">
      <p>Location</p>
      <div className="flex justify-between space-x-3">
        <div className="relative">
          <select
            value={country}
            onChange={(ev) => setCountry(ev.currentTarget.value)}
            className="h-[35px] w-[160px] rounded-md bg-white text-tab dark:text-[#F9F9F9] indent-3 pr-10 outline-0 mb-1 dark:bg-dark cursor-pointer"
          >
            {lo.countryOptions.map(({ value, label }) => (
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
              'h-[35px] w-[160px] rounded-md bg-white text-tab dark:text-[#F9F9F9] indent-3 pr-10 outline-0 mb-1 dark:bg-dark cursor-pointer',
              { '!cursor-default': !country }
            )}
          >
            {cityOptions.map(({ value, label }) => (
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

const Search = ({ model, label }: { model: SearchModel; label: string }) => {
  const [options, value, selectedWithNames] = useUnit([
    model.$filteredOptions,
    model.$search,
    model.$selectedWithNames,
  ]);

  return (
    <div className="flex flex-col space-y-1 mb-[-10px]">
      <p>{label}</p>
      <div className="relative">
        <SelectSearch
          clientSideSearch
          labelText=""
          onChange={(option) => {
            model.selected(option);
          }}
          onInputChange={(search) => {
            model.searchChanged(search);
          }}
          value={value}
          options={options}
          placeholder={''}
          className="!w-[340px]"
        />
        <ChevronUpIcon className="absolute iconstrokes pointer-events-none top-4 right-3 rotate-180" />
      </div>
      <div className="flex flex-wrap gap-1 top-0">
        {selectedWithNames.map((selected) => (
          <div
            key={selected.id}
            aria-hidden
            onClick={() => model.removed(selected.id)}
            className="bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 hover:bg-opacity-10 px-1.5 py-0.5 rounded-full cursor-pointer"
          >
            <span className="text-xs">{selected.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
