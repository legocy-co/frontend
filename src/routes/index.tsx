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
import MarketItemDetailPage from '../pages/market-items/detail';
import CatalogPage from '../pages/market-items';
import UserProfilePage from '../pages/UserProfilePage';
import AddMarketItemPage from '../pages/market-items/add';
import LegoSetsPage from '../pages/lego-sets';
import LegoSetDetailPage from '../pages/lego-sets/detail';
import CollectionPage from '../pages/collections';
import CollectionsIntroPage from '../pages/collections/intro';
import { AddCollectionSetPage } from '../pages/collections/add/page.tsx';
import UpdateCollectionSetPage from '../pages/collections/update/index.tsx';
import UpdateMarketItemPage from '../pages/market-items/update/index.tsx';
import ChatPage from '../pages/ChatPage';
import CatalogSelectPage from '../pages/market-items/select/index.tsx';

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
        <Route index element={<Navigate to="/catalog/select" />} />

        <Route path="auth" element={<AuthRoute />} />
        <Route path="auth/sign-up" element={<SignUpPage />} />
        <Route path="auth/sign-in" element={<SignInPage />} />

        <Route path="catalog" element={<Outlet />}>
          <Route index element={<CatalogPage />} />
          <Route path="select" element={<CatalogSelectPage />} />
          <Route path=":id" element={<MarketItemDetailPage />} />
          <Route path="add" element={<AddMarketItemPage />} />
          <Route path="update/:id" element={<UpdateMarketItemPage />} />
        </Route>

        <Route path="profile" element={<Navigate to="my" />} />
        <Route
          path="profile/:id"
          element={<UserProfilePage key={history.location.pathname} />}
        />

        <Route path="wiki" element={<Navigate to="sets" />} />
        <Route path="wiki/sets" element={<Outlet />}>
          <Route index element={<LegoSetsPage />} />
          <Route path=":id" element={<LegoSetDetailPage />} />
        </Route>

        <Route path="collection" element={<Outlet />}>
          <Route index element={<CollectionPage />} />
          <Route path="intro" element={<CollectionsIntroPage />} />
          <Route path="add" element={<AddCollectionSetPage />} />
          <Route path="update/:id" element={<UpdateCollectionSetPage />} />
        </Route>

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
