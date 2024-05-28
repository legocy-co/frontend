import { lazy, Suspense } from 'react';
import Loader from '../../../../../shared/ui/loader.tsx';

export { LegoSetDetailValuations } from './page.tsx';
export * as lsv from './model.ts';

const LegoSetDetailValuations = lazy(() =>
  import('./page.tsx').then((page) => ({
    default: page.LegoSetDetailValuations,
  }))
);

export const LegoSetDetailValuationsRoute = () => (
  <Suspense fallback={<Loader />}>
    <LegoSetDetailValuations />
  </Suspense>
);
