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
import cities from '../../../../data/cities.json';
import { setStates } from '../../../types/MarketItemType.ts';
import { lso } from '../../lego-set/options/index.ts';
import { Button } from '../../../shared/ui/button.tsx';

export const MarketItemInfoForm = () => {
  const legoSets = useUnit(lso.$legoSetOptions);
  const navigateFn = useNavigate();
  const params = useParams<'id'>();
  useGate(model.gate, { id: params.id ?? null, navigateFn });

  const { fields, eachValid } = useForm(model.form);
  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit}>
      <SelectSearchAdapter
        clientSideSearch
        field={model.form.fields.lego_set_id}
        labelText="Lego set"
        options={legoSets.map((legoSet) => ({
          value: legoSet.id,
          label: `${legoSet.number} - ${legoSet.name}`,
        }))}
      />
      <SelectFieldAdapter
        field={model.form.fields.set_state}
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
      <TextareaFieldAdapter
        field={model.form.fields.description}
        labelText="Description"
      />
      <NumberFieldAdapter field={model.form.fields.price} labelText="Price" />
      <SelectFieldAdapter
        field={model.form.fields.country}
        options={[
          {
            value: '',
            label: 'Select country',
          },
          ...[...new Set(cities.map((city) => city.country))].map(
            (country) => ({ label: country, value: country })
          ),
        ]}
        defaultOptionValue=""
      />
      <SelectFieldAdapter
        field={model.form.fields.city}
        options={[
          { value: '', label: 'Select city' },
          ...cities
            .filter((city) => city.country === fields.country.value)
            .map((city) => city.name)
            .sort()
            .map((city) => ({ label: city, value: city })),
        ]}
        disabled={fields.country.value === ''}
        defaultOptionValue=""
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.lego_set_id.errorText() ||
              fields.set_state.errorText() ||
              fields.price.errorText() ||
              fields.country.errorText() ||
              fields.city.errorText()}
          </FormError>
        )}
      </div>
      {params.id && (
        <Button type="submit" className="mt-20">
          Update Market Item
        </Button>
      )}
    </form>
  );
};
