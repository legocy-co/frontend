import { useGate } from 'effector-react';
import { useParams } from 'react-router-dom';
import * as model from './model';
import { FormEvent } from 'react';
import {
  NumberFieldAdapter,
  SelectFieldAdapter,
  TextareaFieldAdapter,
  TextFieldAdapter,
} from '../../shared/ui/form-adapters.tsx';
import * as lib from './lib';
import { Button } from '../../shared/ui/button.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';

export const MarketItemForm = () => {
  const params = useParams<'id'>();
  useGate(model.Gate, { id: params.id ?? null });

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
        field={model.form.fields.condition}
        options={lib.CONDITIONS}
        defaultOptionValue=""
      />
      <TextareaFieldAdapter
        field={model.form.fields.description}
        labelText="Description"
      />
      <NumberFieldAdapter field={model.form.fields.price} labelText="Price" />
      <TextFieldAdapter
        field={model.form.fields.location}
        labelText="Location"
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.lego_set_id.errorText() ||
              fields.condition.errorText() ||
              fields.price.errorText()}
          </FormError>
        )}
        <Button className={'mt-14'} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
