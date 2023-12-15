import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthRoute } from '../pages/AuthPage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';
import RootPage from '../pages/RootPage';
import { history } from './history.ts';
import { useEffect } from 'react';
import {
  locationChanged,
  navigateChanged,
} from '../shared/lib/react-router.ts';

const AppRouter = () => {
  const navigate = useNavigate();
  history.navigate = navigate;

  const location = useLocation();
  history.location = location;

  useEffect(() => {
    navigateChanged(navigate);
  }, [navigate]);

  useEffect(() => {
    locationChanged(location);
  }, [location]);

  return (
    <Routes>
      <Route path="/auth/" element={<AuthRoute />} />
      <Route path="/auth/sign-up" element={<SignUpPage />} />
      <Route path="/auth/sign-in" element={<SignInPage />} />
      <Route path="/" element={<RootPage />} />
    </Routes>
  );
};

export default AppRouter;
