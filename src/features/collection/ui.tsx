import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'effector-forms';
import React from 'react';
import {
  NumberFieldAdapter,
  SelectMenuAdapter,
  SelectSearchAdapter,
} from '../../shared/ui/form-adapters.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { lso } from '../lego-set/options/index.ts';
import { Button } from '../../shared/ui/button.tsx';
import { setStates } from '../../types/MarketItemType.ts';
import { sso } from '../set-state/options/index.ts';

interface Props {
  id?: number;
}

// TODO: common setStates field
export const CollectionSetForm = ({ id }: Props) => {
  const { fields, eachValid } = useForm(model.form);

  const legoSets = useUnit(lso.$legoSetOptions);

  const navigateFn = useNavigate();

  useGate(model.gate, { id: id ? id : null, navigateFn });

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-5 text-lg font-medium w-80 sm:w-[470px]"
    >
      <h1 className="text-[2rem] font-bold mb-5">
        {id ? 'Edit' : 'Add Collection'} Set
      </h1>
      <SelectSearchAdapter
        clientSideSearch
        field={model.form.fields.legoSetID}
        labelText="Lego set"
        className="!w-80 sm:!w-[470px] h-[48px] font-normal !bg-pagesize !text-black"
        options={legoSets.map((legoSet) => ({
          value: legoSet.id,
          label: `${legoSet.number} - ${legoSet.name}`,
        }))}
      />
      <NumberFieldAdapter
        field={model.form.fields.buyPrice}
        labelText="Buy price, $"
        className="!w-80 sm:!w-[470px] h-[48px] font-normal !bg-pagesize !text-black"
      />
      <SelectMenuAdapter
        label="Set state"
        description="Choose a condition that best describes your set"
        options={sso.setStateOptions.slice(1)}
        field={model.form.fields.state}
        icons={Object.keys(setStates)}
        className="mb-[-10px] [&>]:!bg-legocy"
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.buyPrice.errorText() ||
              fields.legoSetID.errorText() ||
              fields.state.errorText()}
          </FormError>
        )}
        <Button type="submit" className="w-64 mt-14">
          {id ? 'Update collection set' : 'Add collection set'}
        </Button>
      </div>
    </form>
  );
};
