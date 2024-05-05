import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'effector-forms';
import React from 'react';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  SelectSearchAdapter,
} from '../../shared/ui/form-adapters.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { lso } from '../lego-set/options/index.ts';
import { setStates } from '../../types/MarketItemType.ts';
import { Button } from '../../shared/ui/button.tsx';

export const CollectionSetForm = () => {
  const params = useParams<'id'>();

  const legoSets = useUnit(lso.$legoSetOptions);
  const navigateFn = useNavigate();

  useGate(model.gate, { id: params.id ?? null, navigateFn });

  const { fields, eachValid } = useForm(model.form);
  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit}>
      <NumberFieldAdapter
        field={model.form.fields.buy_price}
        labelText="Buy price"
        className="w-[343px] h-[44px] mb-3 bg-pagesize"
      />
      <SelectSearchAdapter
        clientSideSearch
        field={model.form.fields.lego_set_id}
        labelText="Lego set"
        className="w-[343px] h-[44px] mb-3 bg-pagesize"
        options={legoSets.map((legoSet) => ({
          value: legoSet.id,
          label: `${legoSet.number} - ${legoSet.name}`,
        }))}
      />
      <SelectFieldAdapter
        field={model.form.fields.state}
        options={[
          {
            value: '',
            label: 'Select condition',
          },
          ...Object.entries(setStates).map((state) => ({
            label: state[1],
            value: state[0],
          })),
        ]}
        defaultOptionValue=""
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.buy_price.errorText() ||
              fields.lego_set_id.errorText() ||
              fields.state.errorText()}
          </FormError>
        )}
        <Button type="submit" className="mt-14 w-64">
          {params.id ? 'Update collection set' : 'Add collection set'}
        </Button>
      </div>
    </form>
  );
};
