import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { addDefaultSrc } from '../../services/utils.ts';
import MarketItemsList from '../../components/MarketItemsList';
import UserReviewsList from '../../components/UserReviewsList';

const UserProfilePage = () => {
  const params = useParams<'id'>();
  const userProfile = useUnit(model.$userProfilePage);

  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });
  console.log(userProfile);
  return (
    <>
      <PageHeading to="/">
        <img
          className="w-12 aspect-square rounded-full"
          src={userProfile.user_images[0] ? userProfile.user_images[0] : ''}
          onError={addDefaultSrc}
          alt=""
        />
        {userProfile.username}
      </PageHeading>
      <p className="my-10">Uploads</p>
      <MarketItemsList />
      <p className="my-10">Reviews</p>
      <UserReviewsList />
    </>
  );
};

export default UserProfilePage;
