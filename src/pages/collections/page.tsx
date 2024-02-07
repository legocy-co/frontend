import CollectionList from '../../components/CollectionList';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';

export const CollectionPage = () => {
  useGate(model.gate);

  const totalValuation = useUnit(model.$totalValuation);

  return (
    <>
      <PageHeading>
        Total: {totalValuation ? `${totalValuation} $` : 'Not estimated'}
      </PageHeading>
      <CollectionList />
    </>
  );
};
