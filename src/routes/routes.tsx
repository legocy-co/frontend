import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { history } from './history';
import { useEffect } from 'react';
import { locationChanged, navigateChanged } from '../shared/lib/react-router';
import RootPage from '../pages/RootPage';
import AuthPage from "../pages/AuthPage";

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
        <Route path="/" element={<RootPage />} />
      </Routes>
  )
}

export default AppRouter;