import { useGate } from 'effector-react';
import * as model from './model.ts';
import React from 'react';
import { TextFieldAdapter } from '../../shared/ui/form-adapters.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { useForm } from 'effector-forms';

export const UserProfileForm = () => {
  useGate(model.gate);

  const { fields, eachValid } = useForm(model.form);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit} className="mt-10">
      <TextFieldAdapter
        field={model.form.fields.username}
        labelText="Username"
      />
      <TextFieldAdapter
        field={model.form.fields.email}
        labelText="E-mail address"
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.username.errorText() || fields.email.errorText()}
          </FormError>
        )}
        <Button type="submit" className="mt-14">
          Save
        </Button>
      </div>
    </form>
  );
};
