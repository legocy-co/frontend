import { FormEvent } from 'react';
import * as model from './model.ts';
import { TextFieldAdapter } from '../../../shared/ui/form-adapters.tsx';
import { Button } from '../../../shared/ui/button.tsx';
import { FormError } from '../../../shared/ui/form-error.tsx';
import { useForm } from 'effector-forms';
import { useGate } from 'effector-react';
import GoogleIcon from '../../../assets/icons/google.svg?react';
import FacebookIcon from '../../../assets/icons/facebook.svg?react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
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
      <div className="flex items-center justify-center gap-6">
        <div className="bg-step flex justify-center items-center w-[52px] h-[52px] rounded-full cursor-pointer transition-opacity hover:opacity-95 active:opacity-90">
          <GoogleIcon />
        </div>
        <div className="bg-step flex justify-center items-center w-[52px] h-[52px] rounded-full cursor-pointer transition-opacity hover:opacity-95 active:opacity-90">
          <FacebookIcon />
        </div>
      </div>
      <h1 className="font-bold text-bh">Sign Up</h1>
      <div className="flex flex-col gap-4 !w-80 sm:!w-[343px]">
        <TextFieldAdapter
          field={model.form.fields.username}
          labelText="Username"
          className="w-full !h-[44px] bg-pagesize dark:bg-white dark:!text-black"
        />
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
        <TextFieldAdapter
          field={model.form.fields.passwordConfirm}
          labelText="Confirm password"
          type="password"
          className="w-full !h-[44px] bg-pagesize dark:bg-white dark:!text-black"
        />
      </div>
      <div className="flex justify-center mt-[-15px]">
        {!eachValid && (
          <FormError>
            {fields.username.errorText() ||
              fields.email.errorText() ||
              fields.password.errorText() ||
              fields.passwordConfirm.errorText()}
          </FormError>
        )}
        <Button className="mt-10 rounded-xl h-[54px] w-[242px]" type="submit">
          Sign Up
        </Button>
      </div>
      <p className="text-xl">
        Already have an account?{' '}
        <span
          onClick={() =>
            navigate(`/auth/sign-in${from ? '?from=' + from : ''}`)
          }
          className="underline underline-offset-4 cursor-pointer"
        >
          Sign in here
        </span>
      </p>
    </form>
  );
};
