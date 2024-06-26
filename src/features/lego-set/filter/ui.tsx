import * as Popover from '@radix-ui/react-popover';
import { useGate, useUnit } from 'effector-react';
import React from 'react';
import { Button } from '../../../shared/ui/button.tsx';
import {
  MultiCheckboxAdapter,
  NumberFieldAdapter,
  TextFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { LegoSetFilterModel } from './model.ts';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';
import SlidersIcon from '../../../assets/icons/sliders.svg?react';
import clsx from 'clsx';
import { SelectSearch } from '../../../shared/ui/select-search.tsx';
import { SearchModel } from '../../../shared/lib/filter/search-factory.ts';
import { lso } from '../options/index.ts';

export const LegoSetsFilter = ({ model }: { model: LegoSetFilterModel }) => {
  const { gate, disclosure, form } = model;
  useGate(gate);

  const seriesDirty = useUnit(model.form.fields.series_ids.$isDirty);
  const touched = useUnit(model.form.$touched);

  const buttonsDisabled = !seriesDirty && !touched;

  const [isOpen] = useUnit([disclosure.$isOpen]);
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    form.submit();
  };

  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          model.cancelTriggered();
        } else {
          model.disclosure.open();
        }
      }}
    >
      <Popover.Trigger asChild>
        <Button className="!bg-pagesize dark:!bg-dark dark:!text-[#F9F9F9] rounded-md !w-36 h-9 flex items-center justify-center gap-4">
          <SlidersIcon className="iconstrokes" />
          <span className="text-primary text-base">Filters</span>
          <ChevronUpIcon
            className={clsx(
              'transition-all mt-1 w-4 -translate-y-[2px] iconstrokes',
              {
                'rotate-180': !isOpen,
              }
            )}
          />
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="rounded-md w-[378px] bg-pagesize text-tab dark:text-white mt-5 dark:bg-celllink">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-10 py-5"
          >
            <div className="flex flex-col gap-1 text-left text-sm w-[332px]">
              <TextFieldAdapter
                field={form.fields.name}
                labelText="Set name"
                className="w-full h-[34px] mb-3"
              />
              <Search label="Set theme" model={model.seriesListSearch} />
              <NumberFieldAdapter
                placeholder="76053"
                field={model.form.fields.set_number}
                labelText="Set number"
                className="w-full h-[34px] mb-3 placeholder:text-xs placeholder:text-[#C8C7C7] dark:placeholder:text-[#767676]"
              />
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <NumberFieldAdapter
                    placeholder="Min. amount"
                    field={form.fields.min_pieces}
                    labelText="Amount of pieces"
                    className="h-[34px] mb-3 placeholder:text-xs placeholder:text-[#C8C7C7] dark:placeholder:text-[#767676]"
                  />
                </div>
                <NumberFieldAdapter
                  placeholder="Max. amount"
                  field={form.fields.max_pieces}
                  labelText=""
                  className="h-[34px] mt-5 placeholder:text-xs placeholder:text-[#C8C7C7] dark:placeholder:text-[#767676]"
                />
              </div>
              <MultiCheckboxAdapter
                field={form.fields.releaseYears}
                options={lso.setReleaseYearOptions}
                label="Set release year"
              />
            </div>
            <div className="w-[332px] flex justify-between text-celllink text-opacity-75">
              <Button
                disabled={buttonsDisabled}
                className="!h-[39px] !w-40 text-[16px] bg-white dark:bg-darkmenuborder"
                onClick={() => model.cancelTriggered()}
              >
                Cancel
              </Button>
              <Button
                disabled={buttonsDisabled}
                className="!h-[39px] !w-40 text-[16px]"
                type="submit"
              >
                Apply
              </Button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

const Search = ({ model, label }: { model: SearchModel; label: string }) => {
  const [options, value, selectedWithNames] = useUnit([
    model.$filteredOptions,
    model.$search,
    model.$selectedWithNames,
  ]);

  return (
    <div className="flex flex-col space-y-1 mb-3">
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
          className="w-full !h-[34px]"
        />
        <ChevronUpIcon className="absolute dark:opacity-25 iconstrokes w-[14px] pointer-events-none top-4 right-3 rotate-180" />
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
