import { SignUp } from '../../../features/auth/sign-up';
import { useGate } from 'effector-react';
import * as model from '../model.ts';

export const SignUpPage = () => {
  useGate(model.gate);

  return (
    <div className="w-96 sm:w-[804px] py-10 rounded-3xl bg-white dark:bg-dark flex flex-col justify-center gap-7 items-center">
      <SignUp />
    </div>
  );
};
