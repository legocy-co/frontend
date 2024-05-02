import { FormEvent, useCallback } from 'react';
import * as model from './model.ts';
import { TextFieldAdapter } from '../../../shared/ui/form-adapters.tsx';
import { Button } from '../../../shared/ui/button.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';
import { useGate } from 'effector-react';
import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';

const REDIRECT_URI = window.location.href;

export const SignUp = () => {
  useGate(model.gate);

  const { fields, eachValid } = useForm(model.form);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  function handleSocialResolve({
    provider,
    data,
  }: typeof IResolveParams): void {
    if (provider === 'google') {
      fields.username.onChange(data.name);
      fields.email.onChange(data.email);
      console.log(data);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <TextFieldAdapter
        field={model.form.fields.username}
        labelText="Username"
      />
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
      <TextFieldAdapter
        field={model.form.fields.passwordConfirm}
        labelText="Confirm password"
        type="password"
      />
      <div className="flex justify-center">
        {!eachValid && (
          <FormError>
            {fields.username.errorText() ||
              fields.email.errorText() ||
              fields.password.errorText() ||
              fields.passwordConfirm.errorText()}
          </FormError>
        )}
        <Button className={'mt-14'} type="submit">
          Sign Up
        </Button>
      </div>
      <LoginSocialGoogle
        redirect_uri={REDIRECT_URI}
        scope="email name picture"
        typeResponse="idToken"
        ux_mode="popup"
        client_id={import.meta.env.VITE_GG_APP_ID}
        onLoginStart={onLoginStart}
        onResolve={handleSocialResolve}
        onReject={console.log}
      >
        <Button>Login via Google</Button>
      </LoginSocialGoogle>
    </form>
  );
};
