import { FormEvent } from 'react';
import { useForm } from 'effector-forms';
import { useGate } from 'effector-react';
import { useNavigate } from 'react-router-dom';
import * as model from './model';
import { TextFieldAdapter } from '../../../shared/ui/form-adapters';
import { Button } from '../../../shared/ui/button';
import { FormError } from '../../../shared/ui/form-error';
import { SocialAuth } from '../../../entities/auth/social';

export const SignIn = () => {
  useGate(model.gate);

  const navigate = useNavigate();

  const { fields, eachValid } = useForm(model.form);

  const from = location.search.split('=')[1];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    model.form.submit();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 items-center">
      <SocialAuth />
      <h1 className="font-bold text-bh">Sign In</h1>
      <p className="text-xl text-center w-[301px]">
        Welcome back! To access your account, please sign in
      </p>
      <div className="flex flex-col gap-4 !w-80 sm:!w-[343px]">
        <TextFieldAdapter
          field={model.form.fields.email}
          labelText="E-mail address"
          type="email"
          className="w-full !h-[44px] bg-pagesize dark:bg-white dark:!text-black"
        />
        <TextFieldAdapter
          field={model.form.fields.password}
          labelText="Password"
          type="password"
          className="w-full !h-[44px] bg-pagesize dark:bg-white dark:!text-black"
        />
      </div>
      <div className="flex justify-center mt-[-15px]">
        {!eachValid && (
          <FormError className="max-w-[50%]">
            {fields.email.errorText() || fields.password.errorText()}
          </FormError>
        )}
        <Button type="submit" className="mt-12 rounded-xl h-[54px] w-[242px]">
          Sign In
        </Button>
      </div>
      <p className="text-xl text-center">
        Don’t have an account?{' '}
        <span
          onClick={() =>
            navigate(`/auth/sign-up${from ? '?from=' + from : ''}`)
          }
          className="underline underline-offset-4 cursor-pointer"
        >
          Sign up here
        </span>
      </p>
    </form>
  );
};
