import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import React from 'react';
import { TextFieldAdapter } from '../../shared/ui/form-adapters.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { useForm } from 'effector-forms';
import PencilIcon from '../../assets/icons/pencil.svg?react';
import clsx from 'clsx';

export const UserProfilePageForm = () => {
  useGate(model.gate);

  const { fields, eachValid } = useForm(model.form);

  const isDirty = useUnit(model.form.$touched);

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    model.form.submit();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <TextFieldAdapter
          field={model.form.fields.username}
          labelText="Username"
          className="w-[386px] h-[48px] mb-6 bg-pagesize"
        />
        <PencilIcon className="absolute top-1/2 right-3 iconfills" />
      </div>
      <div className="relative">
        <TextFieldAdapter
          field={model.form.fields.email}
          labelText="Email address"
          className="w-[386px] h-[48px] mb-2 bg-pagesize"
        />
        <PencilIcon className="absolute top-1/2 right-3 iconfills" />
      </div>
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.username.errorText() || fields.email.errorText()}
          </FormError>
        )}
        <Button
          type="submit"
          className={clsx('mt-9 !w-[176px] !h-10 text-lg', {
            'bg-prevdark text-white pointer-events-none': !isDirty,
          })}
        >
          Save
        </Button>
      </div>
    </form>
  );
};
