import { lazy, Suspense } from 'react';
import Loader from '../../shared/ui/loader.tsx';

const SignInPage = lazy(() =>
  import('./sign-in').then((page) => ({ default: page.SignInPage }))
);

export const AuthRoute = () => (
  <Suspense fallback={<Loader />}>
    <SignInPage />
  </Suspense>
);
