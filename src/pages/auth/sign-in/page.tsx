import { SignIn } from '../../../features/auth/sign-in';
import { useGate } from 'effector-react';
import * as model from '../model.ts';

export const SignInPage = () => {
  useGate(model.gate);

  return (
    <div className="w-[804px] h-[572px] rounded-3xl bg-cover bg-center bg-no-repeat bg-white dark:bg-dark flex flex-col justify-center items-center">
      <h1 className="font-bold text-bh mb-5">Sign In</h1>
      <p className="text-xl text-center w-80 mb-8">
        Welcome back! To access your account, please sign in
      </p>
      <SignIn />
    </div>
  );
};
