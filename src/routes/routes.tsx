import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { history } from './history';
import { useEffect } from 'react';
import { locationChanged, navigateChanged } from '../shared/lib/react-router';
import AuthPage from '../pages/AuthPage';
import SignUpPage from '../pages/SignUpPage';
import RootPage from '../pages/RootPage';

const AppRouter = () => {
  const
      navigate = useNavigate(),
      location = useLocation();

  history.navigate = navigate;
  history.location = location;

  useEffect(() => {
    navigateChanged(navigate)
  }, [navigate]);

  useEffect(() => {
    locationChanged(location);
  }, [location]);

  return (
      <Routes>
        <Route path="/auth/" element={<AuthPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage/>} />
        <Route path="/" element={<RootPage />} />
      </Routes>
  )
}

export default AppRouter;