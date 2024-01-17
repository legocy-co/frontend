import { lazy, Suspense } from 'react';
import Loader from '../../shared/ui/loader.tsx';

const AuthPage = lazy(() =>
  import('./page.tsx').then((page) => ({ default: page.AuthPage }))
);

export const AuthRoute = () => (
  <Suspense fallback={<Loader />}>
    <AuthPage />
  </Suspense>
);