import { lazy, Suspense } from 'react';
import Loader from '../../../shared/ui/loader.tsx';

export { LegoSetInfo } from './page.tsx';
export * as lsf from './model.ts';

const LegoSetInfo = lazy(() =>
  import('./page.tsx').then((page) => ({ default: page.LegoSetInfo }))
);

export const LegoSetInfoRoute = () => (
  <Suspense fallback={<Loader />}>
    <LegoSetInfo />
  </Suspense>
);
