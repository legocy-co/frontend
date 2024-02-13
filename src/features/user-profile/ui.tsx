import { useNavigate, useParams } from 'react-router-dom';
import { useGate } from 'effector-react';
import * as model from './model.ts';

export const UserProfileForm = () => {
  const params = useParams<'id'>();
  const navigateFn = useNavigate();
  useGate(model.gate, { id: params.id, navigateFn });
};
