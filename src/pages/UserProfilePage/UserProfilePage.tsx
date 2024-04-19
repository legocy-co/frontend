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
import PencilIcon from '../../assets/icons/pencil.svg';
import BatmanPic from '../../assets/pics/batman.png';
import ChickenPic from '../../assets/pics/chicken.png';
import IndianajonesPic from '../../assets/pics/indianajones.png';
import GermionaPic from '../../assets/pics/germiona.png';
import IronmanPic from '../../assets/pics/ironman.png';
import JodaPic from '../../assets/pics/joda.png';
import LeaPic from '../../assets/pics/lea.png';
import { UserProfileForm } from '../../features/user-profile';
import toaster from '../../shared/lib/react-toastify.ts';

const DEFAULT_AVATARS = [
  BatmanPic,
  ChickenPic,
  IndianajonesPic,
  GermionaPic,
  IronmanPic,
  JodaPic,
  LeaPic,
];

const UserProfilePage = () => {
  const params = useParams<'id'>();
  const isPersonal = authService.GetUserId() === Number(params.id);
  const uploadsSelected = useUnit(model.$uploadsSelected);

  const [section, setSection] = useState(
    isPersonal && !uploadsSelected ? '' : 'uploads'
  );
  const navigate = useNavigate();
  const userProfile = useUnit(model.$userProfilePage);

  let contentElement;

  useGate(model.gate, { id: params.id ?? null, navigate });

  const [showGallery, setShowGallery] = useState<number>(-1);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.currentTarget.files?.[0];
    if (file) {
      if (file.size > 20000000) {
        toaster.showToastError('Maximum file size is 20MB');
        return;
      }
      const data = new FormData();
      data.append('file', file);
      await userService.UploadUserImage(data, authService.GetUserId());

      model.avatarChanged();
    }
  }

  switch (section) {
    case 'uploads': {
      contentElement = (
        <>
          <p className="my-10 text-bh font-bold">Uploads</p>
          {isPersonal && (
            <div className="w-full flex items-center justify-center gap-5 mb-7">
              <MenuButton onClick={() => navigate('/catalog/add')}>
                Add new
              </MenuButton>
            </div>
          )}
          <MarketItemsList />
        </>
      );
      break;
    }
    case 'reviews': {
      contentElement = (
        <>
          <p className="my-10 text-bh font-bold">Reviews</p>
          <UserReviewsList />
        </>
      );
      break;
    }
    default: {
      contentElement = (
        <>
          <p className="my-10 text-bh font-bold">General info</p>
          <UserProfileForm />
        </>
      );
    }
  }

  return (
    <>
      <PageHeading to="/" className="py-12">
        <div className="relative">
          <div className="w-24 aspect-square rounded-full bg-legocy cursor-pointer transition-all hover:brightness-90 active:brightness-80">
            {
              <img
                id="profile-avatar"
                className="w-24 aspect-square rounded-full drop-shadow-avatar object-cover object-bottom "
                src={
                  userProfile.user_images[0]
                    ? userProfile.user_images[0]
                    : DEFAULT_AVATARS[
                        Math.floor(Math.random() * DEFAULT_AVATARS.length)
                      ]
                }
                onError={addDefaultSrc}
                alt=""
                onClick={() => userProfile.user_images[0] && setShowGallery(0)}
              />
            }
          </div>

          {authService.IsAuthorized() &&
            authService.GetUserId() == Number(params.id) && (
              <div>
                <input
                  accept=".jpg, .jpeg, .png, .heic"
                  className="hidden"
                  type="file"
                  id="input_avatar"
                  name="input_avatar"
                  onChange={handleUpload}
                />
                <label
                  htmlFor="input_avatar"
                  className="absolute flex items-center justify-center w-8 h-8 p-1 rounded-full bottom-0 right-0 bg-legocy cursor-pointer transition-all hover:brightness-90 active:brightness-80 text-lg text-black text-center"
                >
                  {userProfile.user_images[0] ? (
                    <img src={PencilIcon} alt="" />
                  ) : (
                    '+'
                  )}
                </label>
              </div>
            )}
        </div>

        {userProfile.username}
      </PageHeading>
      <div className="w-full flex items-center justify-center gap-5 mb-7">
        {isPersonal && (
          <MenuButton onClick={() => setSection('')} disabled={!section}>
            General info
          </MenuButton>
        )}
        <MenuButton
          onClick={() => setSection('uploads')}
          disabled={section === 'uploads'}
        >
          Uploads
        </MenuButton>
        <MenuButton
          onClick={() => setSection('reviews')}
          disabled={section === 'reviews'}
        >
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
