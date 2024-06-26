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
import UserProfilePage from '../pages/user-profile-pages';
import AddMarketItemPage from '../pages/market-items/add';
import LegoSetsPage from '../pages/wiki/lego-sets';
import LegoSetDetailPage from '../pages/wiki/lego-sets/detail';
import CollectionPage from '../pages/collections';
import CollectionsIntroPage from '../pages/collections/intro';
import { AddCollectionSetPage } from '../pages/collections/add/page.tsx';
import UpdateMarketItemPage from '../pages/market-items/update/index.tsx';
import ChatPage from '../pages/ChatPage';
import CatalogSelectPage from '../pages/market-items/select/index.tsx';
import MyUploadsPage from '../pages/user-profile-pages/uploads/page.tsx';
import WikiIntroPage from '../pages/wiki/intro';
import { RootNavigationPage } from '../pages/RootNavigationPage';
import { FaqPage } from '../pages/FAQ';
import { FaqPurchasesPage } from '../pages/FAQ/purchases';

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
        <Route index element={<RootNavigationPage />} />

        <Route path="auth" element={<Outlet />}>
          <Route index element={<AuthRoute />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="sign-in" element={<SignInPage />} />
        </Route>

        <Route path="catalog" element={<Outlet />}>
          <Route index element={<CatalogPage />} />
          <Route path="select" element={<CatalogSelectPage />} />
          <Route path=":id" element={<MarketItemDetailPage />} />
          <Route path="add" element={<AddMarketItemPage />} />
          <Route path="update/:id" element={<UpdateMarketItemPage />} />
        </Route>

        <Route path="profile" element={<Outlet />}>
          <Route index element={<Navigate to="my" />} />
          <Route
            path=":id"
            element={<UserProfilePage key={history.location.pathname} />}
          />
          <Route path="my/uploads" element={<MyUploadsPage />} />
        </Route>

        <Route
          path="wiki"
          element={
            <Navigate
              to={
                localStorage.getItem('wikiVisited') === 'true'
                  ? 'sets'
                  : 'intro'
              }
            />
          }
        />
        <Route path="wiki/intro" element={<WikiIntroPage />} />
        <Route path="wiki/sets" element={<Outlet />}>
          <Route index element={<LegoSetsPage />} />
          <Route path=":id" element={<LegoSetDetailPage />} />
        </Route>

        <Route path="collection" element={<Outlet />}>
          <Route index element={<CollectionPage />} />
          <Route path="intro" element={<CollectionsIntroPage />} />
          <Route path="add" element={<AddCollectionSetPage />} />
        </Route>

        <Route path="faq" element={<Outlet />}>
          <Route index element={<FaqPage />} />
          <Route path="purchases" element={<FaqPurchasesPage />} />
        </Route>

        <Route
          path="chat"
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
