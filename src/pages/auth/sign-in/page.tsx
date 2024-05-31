import { SignIn } from '../../../features/auth/sign-in';
import { useGate } from 'effector-react';
import * as model from '../model.ts';

export const SignInPage = () => {
  useGate(model.gate);

  return (
    <div className="w-96 sm:w-[804px] py-10 rounded-3xl bg-cover bg-center bg-no-repeat bg-white dark:bg-dark flex flex-col justify-center gap-7 items-center">
      <SignIn />
    </div>
  );
};
