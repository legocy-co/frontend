import { SignUp } from '../../../features/auth/sign-up';
import { useGate } from 'effector-react';
import * as model from '../model.ts';

export const SignUpPage = () => {
  useGate(model.gate);

  return (
    <div className="w-[1208px] h-[634px] bg-sign-up rounded-3xl flex flex-col justify-center items-center text-white">
      <p className="font-bold text-bh mb-8">Sign Up</p>
      <SignUp />
    </div>
  );
};
