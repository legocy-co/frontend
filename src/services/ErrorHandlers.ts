import axios, { AxiosError } from 'axios';
import { SignInForm } from '../types/SignIn.ts';
import { SignUpForm } from '../types/SignUp.ts';
import { ZodError } from 'zod';

const handleIncorrectParse = (
  e: ZodError,
  consolePrefix: string
): Promise<never> => {
  console.error(consolePrefix + ': cannot parse incoming data:', e);
  return Promise.reject(e.format());
};

const handleAuthError = (
  e: unknown,
  consolePrefix: string,
  form: SignInForm | SignUpForm
): Promise<never> => {
  if (axios.isAxiosError(e)) {
    const err = e as AxiosError;
    const errorMessage = (err.response?.data as any)?.error ?? err.message;
    console.error(
      `${consolePrefix}: code = ${err.response?.status}, msg = ${errorMessage}`
    );

    form.fields.email.addError({
      rule: '',
      errorText: errorMessage,
    });

    form.fields.password.addError({
      rule: '',
      errorText: errorMessage,
    });

    return Promise.reject(err.message);
  }

  console.error(`${consolePrefix}: undefined error: `, e);
  return Promise.reject(e);
};

export { handleIncorrectParse, handleAuthError };
