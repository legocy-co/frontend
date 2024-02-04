import { SignIn } from '../../../features/auth/sign-in';
import { useGate } from 'effector-react';
import * as model from '../model.ts';

const SignInPage = () => {
  useGate(model.gate);

  return (
    <div className="w-[1213px] h-[544px] bg-cover bg-center bg-no-repeat bg-sign-in bg-amber-300 rounded-2xl flex flex-col justify-center items-center text-white">
      <h1 className="font-bold text-bh mb-5">Sign In</h1>
      <p className="text-xl text-center w-80 mb-8">
        Welcome back! To access your account, please sign in
      </p>
      <SignIn />
    </div>
  );
};

export default SignInPage;
