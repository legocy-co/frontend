import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'effector-forms';
import React from 'react';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  SelectSearchAdapter,
} from '../../shared/ui/form-adapters.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { lso } from '../lego-set/options/index.ts';
import { Button } from '../../shared/ui/button.tsx';
import { sso } from '../set-state/options/index.ts';

interface Props {
  id?: number;
}

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
    <form onSubmit={handleSubmit}>
      <NumberFieldAdapter
        field={model.form.fields.buyPrice}
        labelText="Buy price"
        className="w-[343px] h-[44px] mb-3 bg-pagesize"
      />
      <SelectSearchAdapter
        clientSideSearch
        field={model.form.fields.legoSetID}
        labelText="Lego set"
        className="w-[343px] h-[44px] mb-3 bg-pagesize relative"
        options={legoSets.map((legoSet) => ({
          value: legoSet.id,
          label: `${legoSet.number} - ${legoSet.name}`,
        }))}
      />
      <SelectFieldAdapter
        field={model.form.fields.state}
        options={sso.setStateOptions}
        defaultOptionValue=""
      />
      <div className="flex justify-center mt-14">
        {!eachValid && (
          <FormError>
            {fields.buyPrice.errorText() ||
              fields.legoSetID.errorText() ||
              fields.state.errorText()}
          </FormError>
        )}
        <Button type="submit" className="mt-14 w-64">
          {id ? 'Update collection set' : 'Add collection set'}
        </Button>
      </div>
    </form>
  );
};
