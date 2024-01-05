import axios, { AxiosError } from 'axios';
import { SignInForm } from '../types/SignIn';
import { SignUpForm } from '../types/SignUp';
import { ZodError } from 'zod';
import toaster from '../shared/lib/react-toastify';

const handleIncorrectParse = (
  e: ZodError,
  consolePrefix: string,
  toasterMessage: string
): Promise<never> => {
  console.error(consolePrefix + ': cannot parse incoming data:', e);
  toaster.showToastError(toasterMessage + ': incorrect incoming data');
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
