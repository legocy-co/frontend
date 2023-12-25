import axios, { AxiosError } from 'axios';
import { SignInForm } from '../types/SignIn.ts';
import { SignUpForm } from '../types/SignUp.ts';

export const handleAuthError = (
  e: unknown,
  consolePrefix: string,
  form: SignInForm | SignUpForm
): Promise<never> => {
  if (axios.isAxiosError(e)) {
    const err = e as AxiosError;

    console.error(
      `${consolePrefix}: code = ${err.response?.status}, msg = ${
        (err.response?.data as any)?.error ?? err.message
      }`
    );

    form.fields.email.addError({
      rule: '',
      errorText: (err.response?.data as any)?.error ?? err.message,
    });

    form.fields.password.addError({
      rule: '',
      errorText: (err.response?.data as any)?.error ?? err.message,
    });

    return Promise.reject(err.message);
  }

  // processing unspecified error
  console.error(`${consolePrefix}: undefined error: `, e);
  return Promise.reject(e);
};
