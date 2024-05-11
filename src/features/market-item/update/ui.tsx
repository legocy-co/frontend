import { useGate, useUnit } from 'effector-react';
import { useNavigate, useParams } from 'react-router-dom';
import * as model from './model.ts';
import React from 'react';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  SelectSearchAdapter,
  TextareaFieldAdapter,
} from '../../../shared/ui/form-adapters.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';
import { lso } from '../../lego-set/options/index.ts';
import { Button } from '../../../shared/ui/button.tsx';
import { lo } from '../../location/options/index.ts';
import { sso } from '../../set-state/options/index.ts';

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
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <SelectSearchAdapter
        clientSideSearch
        field={model.form.fields.legoSetID}
        labelText="Lego set"
        options={legoSets.map((legoSet) => ({
          value: legoSet.id,
          label: `${legoSet.number} - ${legoSet.name}`,
        }))}
        className="!w-[343px] !h-[44px] bg-pagesize"
      />
      <SelectFieldAdapter
        field={model.form.fields.setState}
        options={sso.setStateOptions}
        defaultOptionValue=""
      />
      <TextareaFieldAdapter
        field={model.form.fields.description}
        labelText="Description"
      />
      <NumberFieldAdapter
        field={model.form.fields.price}
        labelText="Price"
        className="!w-[343px] !h-[44px] bg-pagesize"
      />
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
