import { FormEvent } from 'react';
import * as model from './model';
import { TextFieldAdapter } from '../../shared/ui/form-adapters.tsx';

export const SignIn = () => {
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
    </form>
  );
};
