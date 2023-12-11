import { FormEvent } from 'react';
import * as model from './model';
import { TextFieldAdapter } from '../../shared/ui/form-adapters.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { Error } from '../../shared/ui/error.tsx';

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
      <div className="flex justify-center">
        {<Error>Missing something</Error>}
        <Button type="submit">Sign In</Button>
      </div>
    </form>
  );
};
