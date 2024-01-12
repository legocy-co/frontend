import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const params = useParams<'id'>();
  const userProfilePage = useUnit(model.$userProfilePage);

  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });
  console.log(userProfilePage);
  return <></>;
};

export default UserProfilePage;
