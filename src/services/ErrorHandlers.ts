import axios, { AxiosError } from 'axios';
import { SignInForm, SignUpForm } from '../types/authorization.ts';
import { ZodError } from 'zod';
import toaster from '../shared/lib/react-toastify';
import { MarketItemForm } from '../types/MarketItemType.ts';
import { UserProfileForm } from '../types/UserProfileType.ts';
import { CollectionSetForm } from '../types/CollectionType.ts';
import { UserReviewForm } from '../types/UserReviewType.ts';
import { history } from '../routes/history.ts';
import { si } from '../features/auth/sign-in/index.tsx';

const handleIncorrectParse = (
  e: ZodError,
  consolePrefix: string,
  toasterMessage: string
): Promise<never> => {
  console.error(consolePrefix + ': cannot parse incoming data:', e);
  toaster.showToastError(toasterMessage + ': incorrect incoming data');
  return Promise.reject(e.format());
};

const handleAxiosError = (e: AxiosError, consolePrefix: string) => {
  const errorMessage = (e.response?.data as any)?.error ?? e.message;

  console.error(
    `${consolePrefix}: code = ${e.response?.status}, msg = ${errorMessage}`
  );

  return errorMessage;
};

const handleUserError = (
  e: unknown,
  consolePrefix: string,
  form: SignInForm | SignUpForm | UserProfileForm
): Promise<never> => {
  if (axios.isAxiosError(e)) {
    const errorMessage = handleAxiosError(e, consolePrefix);

    form.fields.email.addError({
      rule: '',
      errorText: errorMessage,
    });

    return Promise.reject(errorMessage);
  }

  console.error(`${consolePrefix}: undefined error: `, e);
  return Promise.reject(e);
};

const handleSetError = (
  e: unknown,
  consolePrefix: string,
  form: MarketItemForm | CollectionSetForm
): Promise<never> => {
  if (axios.isAxiosError(e)) {
    const errorMessage = handleAxiosError(e, consolePrefix);

    form.fields.legoSetID.addError({
      rule: '',
      errorText: errorMessage,
    });

    return Promise.reject(errorMessage);
  }

  console.error(`${consolePrefix}: undefined error: `, e);
  return Promise.reject(e);
};

const handleReviewError = (
  e: unknown,
  consolePrefix: string,
  form: UserReviewForm
): Promise<never> => {
  if (axios.isAxiosError(e)) {
    const errorMessage = handleAxiosError(e, consolePrefix);

    form.fields.rating.addError({
      rule: '',
      errorText: errorMessage,
    });

    return Promise.reject(errorMessage);
  }

  console.error(`${consolePrefix}: undefined error: `, e);
  return Promise.reject(e);
};

const handleSocialError = (err: unknown, prefix: string) => {
  if ((err as AxiosError).response!.status === 409)
    history.navigate('auth/sign-in');
  return handleUserError(err, prefix, si.form);
};

export {
  handleIncorrectParse,
  handleUserError,
  handleSetError,
  handleReviewError,
  handleSocialError,
};
