import { lazy, Suspense } from 'react';
import Loader from '../../shared/ui/loader.tsx';

export * as authPage from './model';

const SignInPage = lazy(() =>
  import('./sign-in').then((page) => ({ default: page.SignInPage }))
);

export const AuthRoute = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignInPage />
    </Suspense>
  );
};
