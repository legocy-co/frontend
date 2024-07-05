import { SignIn } from '../../../features/auth/sign-in';
import { useGate } from 'effector-react';
import * as model from '../model.ts';

export const SignInPage = () => {
  useGate(model.gate);
  return (
    <div className="min-w-96 w-[62%] p-12 rounded-3xl bg-white dark:bg-dark flex flex-col justify-center gap-7 items-center">
      <SignIn />
    </div>
  );
};
