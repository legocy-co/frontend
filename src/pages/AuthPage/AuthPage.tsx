import './AuthPage.scss';
import { useGate } from 'effector-react';
import * as model from './model';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/button.tsx';

export const AuthPage = () => {
  const navigate = useNavigate();
  useGate(model.Gate);

  return (
    <>
      <Header />
      <div className="banner">
        <h1>Sign Up</h1>
        <h2>Welcome back! To access your account, please sign in</h2>
        <Button
          className={'mt-0 mb-7 h-14'}
          onClick={() => navigate('/auth/sign-up')}
        >
          Sign Up
        </Button>
        <p>
          Already have an account? <a href="/auth/sign-in">Sign in here</a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
