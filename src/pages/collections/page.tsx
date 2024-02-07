import CollectionList from '../../components/CollectionList';
import { useGate, useUnit } from 'effector-react';
import * as model from './model.ts';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { MenuButton } from '../../shared/ui/menu-button.tsx';
import { useNavigate } from 'react-router-dom';

export const CollectionPage = () => {
  useGate(model.gate);

  const totalValuation = useUnit(model.$totalValuation);
  const navigate = useNavigate();

  return (
    <>
      <PageHeading>
        Total: {totalValuation ? `${totalValuation} $` : 'Not estimated'}
      </PageHeading>
      <MenuButton onClick={() => navigate('/collection/add/')}>Add</MenuButton>
      <CollectionList />
    </>
  );
};
