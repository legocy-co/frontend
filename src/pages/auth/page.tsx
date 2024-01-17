import './AuthPage.scss';
import { useGate } from 'effector-react';
import * as model from './model.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/button.tsx';

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useGate(model.gate);

  return (
    <div className="banner">
      <h1>Sign Up</h1>
      <h2>Welcome back! To access your account, please sign in</h2>
      <Button
        className={'mt-0 mb-7 h-14'}
        onClick={() =>
          navigate(`/auth/sign-up?from=${location.search.split('=')[1]}`)
        }
      >
        Sign Up
      </Button>
      <p>
        Already have an account?{' '}
        <a href={`/auth/sign-in?from=${location.search.split('=')[1]}`}>
          Sign in here
        </a>
      </p>
    </div>
  );
};

export default AuthPage;
