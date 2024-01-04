import { FormEvent } from 'react';
import * as model from './model';
import { TextFieldAdapter } from '../../shared/ui/form-adapters.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { FormError } from '../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';

export const SignIn = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  const { fields, eachValid } = useForm(model.form);
  return (
    <form onSubmit={onSubmit}>
      <TextFieldAdapter
        field={model.form.fields.email}
        labelText="E-mail address"
        type="email"
      />
      <TextFieldAdapter
        field={model.form.fields.password}
        labelText="Password"
        type="password"
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.email.errorText() || fields.password.errorText()}
          </FormError>
        )}
        <Button className={'mt-14'} type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};
