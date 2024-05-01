import { FormEvent, useCallback, useEffect, useState } from 'react';
import * as model from './model.ts';
import { TextFieldAdapter } from '../../../shared/ui/form-adapters.tsx';
import { Button } from '../../../shared/ui/button.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';
import { useGate } from 'effector-react';
import { IResolveParams, LoginSocialGoogle } from 'reactjs-social-login';
import { authService } from '../../../services/AuthService.ts';

const REDIRECT_URI = window.location.href;

export const SignUp = () => {
  useGate(model.gate);

  const { fields, eachValid } = useForm(model.form);

  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  useEffect(() => {
    if (profile) {
      authService.SignUp({
        email: profile.email,
        password: profile.credential,
        username: profile.name,
      });
    }
  }, [profile]);

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
        client_id=""
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }: typeof IResolveParams) => {
          setProvider(provider);
          setProfile(data);
          console.log(data);
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
      >
        <Button>Login via Google</Button>
      </LoginSocialGoogle>
    </form>
  );
};
