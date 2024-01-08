import { SignUp } from '../../features/sign-up/ui.tsx';
import { useGate } from 'effector-react';
import * as model from '../AuthPage/model.ts';

const SignUpPage = () => {
  useGate(model.gate);

  return (
    <div className="w-[1208px] h-[634px] bg-sign-up rounded-3xl flex flex-col justify-center items-center text-white">
      <p className="font-bold text-bh mb-8">Sign Up</p>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
