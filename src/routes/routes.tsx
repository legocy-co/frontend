import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { history } from './history';
import { useEffect } from 'react';
import { locationChanged, navigateChanged } from '../shared/lib/react-router';
import RootPage from '../pages/RootPage';
import BlankPage from "../pages/BlankPage";

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
        <Route
          path="/"
          element={<RootPage />}
        />
        <Route
          path="/blank-page"
          element={<BlankPage />}
        ></Route>
      </Routes>
  )
}

export default AppRouter;