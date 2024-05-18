import { useGate, useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import * as model from './model.ts';
import React from 'react';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  SelectSearchAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';
import { lso } from '../../lego-set/options/index.ts';
import { Button } from '../../../shared/ui/button.tsx';
import { lo } from '../../location/options/index.ts';
import { sso } from '../../set-state/options/index.ts';
import ChevronUpIcon from '../../../assets/icons/chevron-up.svg?react';

export const MarketItemUpdateForm = () => {
  const params = useParams<'id'>();
  const navigateFn = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigateFn });

  const { fields, eachValid } = useForm(model.form);

  const legoSets = useUnit(lso.$legoSetOptions);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">Set name</p>
        <div className="relative w-80 sm:w-[468px]">
          <SelectSearchAdapter
            clientSideSearch
            field={model.form.fields.legoSetID}
            labelText=""
            options={legoSets.map((legoSet) => ({
              value: legoSet.id,
              label: `${legoSet.number} - ${legoSet.name}`,
            }))}
            className="!w-full !h-12 !rounded-lg !bg-pagesize dark:!bg-dark"
          />
          <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes" />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">
            Set state
          </p>
          <div className="relative w-[185] sm:w-[257px] styled-select">
            <SelectFieldAdapter
              field={model.form.fields.setState}
              options={sso.setStateOptions}
              defaultOptionValue=""
              className="!w-full !h-12 !rounded-lg !bg-pagesize dark:!bg-dark"
            />
            <ChevronUpIcon className="absolute rotate-180 opacity-50 top-5 right-4 iconstrokes" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl text-[#332929] dark:text-[#F9F9F9]">Price, $</p>
          <NumberFieldAdapter
            field={model.form.fields.price}
            labelText=""
            className="!w-[157px] !h-[44px] bg-pagesize"
          />
        </div>
      </div>

      <SelectFieldAdapter
        field={model.form.fields.country}
        options={lo.countryOptions}
        defaultOptionValue=""
      />
      <SelectFieldAdapter
        field={model.form.fields.city}
        options={lo.cityOptions(fields.country.value)}
        disabled={!fields.country.value}
        defaultOptionValue=""
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.legoSetID.errorText() ||
              fields.setState.errorText() ||
              fields.price.errorText() ||
              fields.country.errorText() ||
              fields.city.errorText()}
          </FormError>
        )}
        {params.id && (
          <Button type="submit" className="mt-20 !w-56">
            Update Market Item
          </Button>
        )}
      </div>
    </form>
  );
};
