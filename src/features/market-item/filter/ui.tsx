import * as Popover from '@radix-ui/react-popover';
import { useGate, useUnit } from 'effector-react';
import React from 'react';
import { Button } from '../../../shared/ui/button.tsx';
import {
  NumberFieldAdapter,
  TextFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { BsChevronDown } from 'react-icons/bs';
import clsx from 'clsx';
import { MarketItemFilterModel } from './model.ts';

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
            <TextFieldAdapter
              labelText="Location"
              field={form.fields.locations}
            />
            <NumberFieldAdapter
              field={form.fields.min_price}
              labelText="Min price"
            />
            <NumberFieldAdapter
              field={form.fields.max_price}
              labelText="Max price"
            />
            <TextFieldAdapter
              labelText="Condition"
              field={form.fields.set_states}
            />
            <div className="flex gap-5 justify-center">
              <Button onClick={() => model.cancelTriggered()}>Cancel</Button>
              <Button type="submit">Apply</Button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
