import { lazy } from 'react';

const AuthPage = lazy(() =>
  import('./AuthPage').then((page) => ({ default: page.AuthPage })),
);

export const AuthRoute = () => <AuthPage />;
