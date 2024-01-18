import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import * as model from './model';
import { FormEvent } from 'react';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  TextareaFieldAdapter,
} from '../../shared/ui/form-adapters.tsx';
import * as lib from './lib';
import { Button } from '../../shared/ui/button.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';
import cities from '../../../data/cities.json';

export const MarketItemForm = () => {
  const legoSets = useUnit(model.$legoSetOptions);
  const params = useParams<'id'>();

  useGate(model.gate, { id: params.id ?? null });
  console.log(legoSets);

  const { fields, eachValid } = useForm(model.form);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  return (
    <form onSubmit={onSubmit}>
      <NumberFieldAdapter
        field={model.form.fields.lego_set_id}
        labelText="Lego set ID"
      />
      <SelectFieldAdapter
        field={model.form.fields.set_state}
        options={lib.CONDITIONS}
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
        <Button className={'mt-14'} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
