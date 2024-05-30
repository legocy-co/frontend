import { lazy, Suspense } from 'react';
import Loader from '../../shared/ui/loader.tsx';

export * as auth from './model.ts';

const SignInPage = lazy(() =>
  import('./sign-in/page.tsx').then((page) => ({ default: page.SignInPage }))
);

export const AuthRoute = () => (
  <Suspense fallback={<Loader />}>
    <SignInPage />
  </Suspense>
);
