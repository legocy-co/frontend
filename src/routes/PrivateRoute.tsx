import { JSX, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService.tsx';

type ProtectedRouteType = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: ProtectedRouteType) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    !AuthService.IsAuthorized() && navigate(`/auth?from=${location.pathname}`);
  }, []);

  return children;
};

export default PrivateRoute;
