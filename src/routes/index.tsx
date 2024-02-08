import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { AuthRoute } from '../pages/auth';
import SignUpPage from '../pages/auth/sign-up';
import SignInPage from '../pages/auth/sign-in';
import RootPage from '../pages/RootPage';
import { history } from './history.ts';
import { useEffect } from 'react';
import {
  locationChanged,
  navigateChanged,
} from '../shared/lib/react-router.ts';
import PrivateRoute from './PrivateRoute.tsx';
import PrivatePage from '../pages/PrivatePage';
import MarketItemDetailPage from '../pages/market-items/detail';
import CatalogPage from '../pages/market-items';
import UserProfilePage from '../pages/UserProfilePage';
import AddMarketItemPage from '../pages/market-items/add';
import { authService } from '../services/AuthService.ts';
import LegoSetsPage from '../pages/lego-sets';
import LegoSetDetailPage from '../pages/lego-sets/detail';
import CollectionPage from '../pages/collections';
import CollectionsIntroPage from '../pages/collections/intro';
import { AddCollectionSetPage } from '../pages/collections/add/page.tsx';
import UpdateCollectionSetPage from '../pages/collections/update';

const AppRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigateChanged(navigate);
  }, [navigate]);

  useEffect(() => {
    locationChanged(location);
  }, [location]);

  history.navigate = navigate;
  history.location = location;

  return (
    <Routes>
      <Route path="/" element={<RootPage />}>
        <Route index element={<Navigate to="/catalog" />} />

        <Route path="auth" element={<AuthRoute />} />
        <Route path="auth/sign-up" element={<SignUpPage />} />
        <Route path="auth/sign-in" element={<SignInPage />} />

        <Route path="catalog" element={<Outlet />}>
          <Route index element={<CatalogPage />} />
          <Route path=":id" element={<MarketItemDetailPage />} />
          <Route path="add" element={<AddMarketItemPage />} />
        </Route>

        <Route path="/profile" element={<Outlet />}>
          <Route
            index
            element={
              <Navigate
                to={
                  authService.IsAuthorized()
                    ? '/profile/' + authService.GetUserId()
                    : '/'
                }
              />
            }
          />
          <Route
            path=":id"
            element={<UserProfilePage key={history.location.pathname} />}
          />
        </Route>

        <Route path="wiki/sets" element={<Outlet />}>
          <Route index element={<LegoSetsPage />} />
          <Route path=":id" element={<LegoSetDetailPage />} />
        </Route>

        <Route path="collection" element={<Outlet />}>
          <Route index element={<CollectionPage />} />
          <Route path="intro" element={<CollectionsIntroPage />} />
          <Route path="add" element={<AddCollectionSetPage />} />
          <Route path=":id" element={<UpdateCollectionSetPage />} />
        </Route>

        <Route
          path="private"
          element={
            <PrivateRoute>
              <PrivatePage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
