import { JSX, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/AuthService.ts';

type ProtectedRouteType = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: ProtectedRouteType) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    !authService.IsAuthorized() && navigate(`/auth?from=${location.pathname}`);
  }, []);

  return children;
};

export default PrivateRoute;
