import { CollectionSetForm } from '../../../features/collection';
import { useGate } from 'effector-react';
import * as model from './model';
import { useNavigate } from 'react-router-dom';

export const AddCollectionSetPage = () => {
  const navigate = useNavigate();
  useGate(model.gate, { navigate });

  return <CollectionSetForm />;
};
