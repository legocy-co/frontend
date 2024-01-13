import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { addDefaultSrc } from '../../services/utils.ts';
import MarketItemsList from '../../components/MarketItemsList';
import UserReviewsList from '../../components/UserReviewsList';
import { MenuButton } from '../../shared/ui/menu-button.tsx';
import { useState } from 'react';

const UserProfilePage = () => {
  const params = useParams<'id'>();

  const userProfile = useUnit(model.$userProfilePage);
  const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });

  const content = !showReviews ? (
    <>
      <p className="my-10 text-bh font-bold">{`${userProfile.username}'s uploads`}</p>
      <MarketItemsList />
    </>
  ) : (
    <>
      <p className="my-10 text-bh font-bold">{`${userProfile.username}'s reviews`}</p>
      <UserReviewsList />
    </>
  );

  return (
    <>
      <PageHeading to="/">
        <img
          className="w-12 aspect-square rounded-full object-cover"
          src={userProfile.user_images[0] ? userProfile.user_images[0] : ''}
          onError={addDefaultSrc}
          alt=""
        />
        {userProfile.username}
      </PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton
          onClick={() => setShowReviews(false)}
          disabled={!showReviews}
        >{`${userProfile.username}'s uploads`}</MenuButton>
        <MenuButton
          onClick={() => setShowReviews(true)}
          disabled={showReviews}
        >{`${userProfile.username}'s reviews`}</MenuButton>
      </div>
      {content}
    </>
  );
};

export default UserProfilePage;
