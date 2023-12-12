import { FormEvent } from 'react';
import * as model from './model';
import { TextFieldAdapter } from '../../shared/ui/form-adapters.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { Error } from '../../shared/ui/error.tsx';
import { useForm } from 'effector-forms';

export const SignIn = () => {
  const { fields, eachValid } = useForm(model.form);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  return (
    <form onSubmit={onSubmit}>
      <TextFieldAdapter
        field={model.form.fields.username}
        labelText="Username"
      />
      <TextFieldAdapter
        field={model.form.fields.password}
        labelText="Password"
        type="password"
      />
      <div className="flex justify-center">
        {!eachValid && (
          <Error>
            {fields.username.errorText() || fields.password.errorText()}
          </Error>
        )}
        <Button className={'mt-14'} type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};
