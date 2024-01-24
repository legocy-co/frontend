import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { addDefaultSrc } from '../../services/utils.ts';
import MarketItemsList from '../../components/MarketItemsList';
import UserReviewsList from '../../components/UserReviewsList';
import { MenuButton } from '../../shared/ui/menu-button.tsx';
import React, { useState } from 'react';

import { authService } from '../../services/AuthService.ts';
import GalleryModal from '../../components/GalleryModal';
import { userService } from '../../services/UserService.ts';

const UserProfilePage = () => {
  const params = useParams<'id'>();
  const navigate = useNavigate();
  useGate(model.gate, { id: params.id ?? null, navigate });

  const [showReviews, setShowReviews] = useState(false);
  const contentElement = !showReviews ? (
    <>
      <p className="my-10 text-bh font-bold">Uploads</p>
      {authService.GetUserId() === Number(params.id) && (
        <div className="w-full flex items-center justify-center gap-5 mb-7">
          <MenuButton>Edit</MenuButton>
          <MenuButton onClick={() => navigate('/catalog/add')}>
            Add new
          </MenuButton>
        </div>
      )}
      <MarketItemsList />
    </>
  ) : (
    <>
      <p className="my-10 text-bh font-bold">Reviews</p>
      <UserReviewsList />
    </>
  );

  const userProfile = useUnit(model.$userProfilePage);
  const [showGallery, setShowGallery] = useState<number>(-1);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.[0]) {
      const data = new FormData();
      data.append('file', e.currentTarget.files?.[0]);
      userService.UploadUserImage(data, String(authService.GetUserId()));
    }
  };

  return (
    <>
      <PageHeading to="/">
        <div className="relative">
          <img
            className="w-12 aspect-square rounded-full object-cover cursor-pointer transition-all hover:brightness-95 active:brightness-90"
            src={userProfile.user_images[0] ? userProfile.user_images[0] : ''}
            onError={addDefaultSrc}
            alt=""
            onClick={() => setShowGallery(0)}
          />

          {authService.GetUserId() == Number(params.id) && (
            <div>
              <input
                accept=".jpg, .jpeg, .png"
                className="hidden"
                type="file"
                id="input_avatar"
                name="input_avatar"
                onChange={handleUpload}
              />
              <label
                htmlFor="input_avatar"
                className="absolute w-4 h-4 rounded-full bottom-0 right-0 bg-legocy cursor-pointer transition-opacity hover:opacity-90 active:opacity-80 text-xs text-center"
              >
                +
              </label>
            </div>
          )}
        </div>

        {userProfile.username}
      </PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        <MenuButton
          onClick={() => setShowReviews(false)}
          disabled={!showReviews}
        >
          Uploads
        </MenuButton>
        <MenuButton onClick={() => setShowReviews(true)} disabled={showReviews}>
          Reviews
        </MenuButton>
      </div>
      {contentElement}
      {showGallery > -1 && (
        <GalleryModal
          list={userProfile.user_images}
          i={showGallery}
          onClose={() => setShowGallery(-1)}
        />
      )}
    </>
  );
};

export default UserProfilePage;
