import { Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom';
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
import PrivateRoute from './PrivateRoute.tsx';
import PrivatePage from '../pages/PrivatePage';
import MarketItemCardPage from '../pages/MarketItemCardPage';
import CatalogPage from '../pages/CatalogPage';

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
      <Route path="auth/" element={<AuthRoute />} />
      <Route path="auth/sign-up" element={<SignUpPage />} />
      <Route path="auth/sign-in" element={<SignInPage />} />
      <Route path="catalog" element={<Outlet />}>
        <Route index element={<CatalogPage />} />
        <Route path=":id" element={<MarketItemCardPage />} />
      </Route>
      <Route path="/" element={<RootPage />} />
      <Route
        path="private"
        element={
          <PrivateRoute>
            <PrivatePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
