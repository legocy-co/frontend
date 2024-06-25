import { useGate, useUnit } from 'effector-react';
import * as model from './model';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeading } from '../../shared/ui/page-heading.tsx';
import { addDefaultSrc } from '../../services/utils.ts';
import MarketItemsList from '../../components/MarketItemsList';
import UserReviewsList from '../../components/UserReviewsList';
import { MenuButton } from '../../shared/ui/menu-button.tsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { authService } from '../../services/AuthService.ts';
import GalleryModal from '../../components/GalleryModal';
import { userService } from '../../services/UserService.ts';
import PencilIcon from '../../assets/icons/pencil.svg';
import ChevronUpIcon from '../../assets/icons/chevron-up.svg?react';
import StarIcon from '../../assets/icons/star.svg?react';
import BatmanPic from '../../assets/pics/batman.png';
import ChickenPic from '../../assets/pics/chicken.png';
import IndianajonesPic from '../../assets/pics/indianajones.png';
import GermionaPic from '../../assets/pics/germiona.png';
import IronmanPic from '../../assets/pics/ironman.png';
import JodaPic from '../../assets/pics/joda.png';
import LeaPic from '../../assets/pics/lea.png';
import { UserProfilePageForm } from '../../features/user-profile-page';
import toaster from '../../shared/lib/react-toastify.ts';
import { $userReviewCells } from '../../components/UserReviewsList/model.ts';
import { $marketItemCells } from '../../components/MarketItemsList/model.ts';
import clsx from 'clsx';
import Loader from '../../shared/ui/loader.tsx';
import { Button } from '../../shared/ui/button.tsx';
import { UserReviewForm } from '../../features/user-review';

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
  const navigate = useNavigate();
  const isPersonal = params.id === 'my';

  useGate(model.gate, { id: params.id ?? null, navigate });

  const section = useUnit(model.$section);
  const user = useUnit(model.$user);
  const reviews = useUnit($userReviewCells);
  const marketItems = useUnit($marketItemCells);
  const favoritesLength = useUnit(model.$favoritesLength);
  const isLoading = useUnit(model.$isLoading);

  const [contentElement, setContentElement] = useState<ReactElement>(<></>);
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

  useEffect(() => {
    switch (section) {
      case 'favorites': {
        onscroll = () => {
          function setPrecision(x: number) {
            return Math.floor(x / 10);
          }

          if (isLoading) return;

          if (
            setPrecision(window.scrollY + window.innerHeight) >
              setPrecision(document.body.scrollHeight - 500) &&
            favoritesLength !== marketItems.length
          )
            model.loadingStarted();
        };
        setContentElement(
          <div className="flex flex-col gap-2ß">
            <MarketItemsList />
            {isLoading > 0 && <Loader />}
            {/*<Button className="mt-10" onClick={() => model.loadingStarted()}>*/}
            {/*  Load more*/}
            {/*</Button>*/}
          </div>
        );
        break;
      }
      case 'uploads': {
        setContentElement(<MarketItemsList />);
        break;
      }
      case 'reviews': {
        onscroll = () => {};
        setContentElement(
          <UserReviewsContent
            userID={isPersonal ? -1 : Number(params.id)}
            onRate={() => model.sectionSelected('rate')}
          />
        );
        break;
      }
      case 'rate': {
        onscroll = () => {};
        setContentElement(
          <UserReviewForm onCancel={() => model.sectionSelected('reviews')} />
        );
        break;
      }
      default: {
        onscroll = () => {};
        setContentElement(<UserProfilePageForm />);
      }
    }
  }, [section, marketItems.length]);

  return (
    <>
      <PageHeading className="py-14">
        <div className="relative">
          <div
            className={clsx(
              'w-[82px] aspect-square rounded-full bg-legocy cursor-pointer transition-all hover:brightness-90 active:brightness-80',
              { '!w-[56px]': !isPersonal }
            )}
          >
            {
              <img
                id="profile-avatar"
                className={`w-full aspect-square rounded-full object-cover object-bottom`}
                src={
                  user.images[0]
                    ? user.images[0].downloadURL
                    : DEFAULT_AVATARS[
                        Math.floor(Math.random() * DEFAULT_AVATARS.length)
                      ]
                }
                onError={addDefaultSrc}
                alt=""
                onClick={() => user.images[0].downloadURL && setShowGallery(0)}
              />
            }
          </div>

          {isPersonal && (
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
                className="absolute flex items-center justify-center w-6 h-6 p-1 rounded-full bottom-0 right-0 bg-legocy cursor-pointer transition-all hover:brightness-90 active:brightness-80 text-lg text-black text-center"
              >
                {user.images[0] ? <img src={PencilIcon} alt="" /> : '+'}
              </label>
            </div>
          )}
        </div>
        {user.username}
        {!isPersonal && user.reviewTotals?.avgRating !== 0 && (
          <div className="h-[34px] bg-pagesize dark:bg-dark flex items-center gap-2 px-2 rounded-2xl mt-1">
            <p className="text-tab dark:text-white text-[16px] font-medium">
              {user.reviewTotals?.avgRating}
            </p>
            <StarIcon className="iconfills" width={18} />
          </div>
        )}
      </PageHeading>
      {section !== 'rate' && (
        <div className="w-full flex flex-wrap items-center justify-center gap-5 mb-7">
          {isPersonal && (
            <MenuButton
              onClick={() => model.sectionSelected('')}
              disabled={!section}
            >
              General info
            </MenuButton>
          )}
          {isPersonal ? (
            <MenuButton
              onClick={() => model.sectionSelected('favorites')}
              disabled={section === 'favorites'}
            >
              Favorites {favoritesLength}
            </MenuButton>
          ) : (
            <MenuButton
              onClick={() => model.sectionSelected('uploads')}
              disabled={section === 'uploads'}
            >
              Uploads {marketItems.length}
            </MenuButton>
          )}
          <MenuButton
            onClick={() => model.sectionSelected('reviews')}
            disabled={section === 'reviews'}
          >
            Reviews {reviews.length}
          </MenuButton>
        </div>
      )}
      {contentElement}
      {showGallery > -1 && (
        <GalleryModal
          list={user.images.map((img) => img.downloadURL!)}
          i={showGallery}
          onClose={() => setShowGallery(-1)}
        />
      )}
    </>
  );
};

interface Props {
  userID: number;
  onRate: () => void;
}

const UserReviewsContent = ({ userID, onRate }: Props) => {
  const sorting = useUnit(model.$userReviewsSorting);

  const sortedLast = sorting === 'Last';

  return (
    <>
      <div className="flex gap-5">
        {userID > -1 && (
          <Button
            onClick={onRate}
            className="!w-44 !h-9 flex items-center justify-center gap-2 text-[16px] relative bg-pagesize dark:bg-dark !text-[#201D1D] dark:!text-description"
          >
            Leave Review
          </Button>
        )}
        <Button
          onClick={() =>
            model.userReviewsSortingChanged(sortedLast ? 'First' : 'Last')
          }
          className="!w-[188px] !h-9 flex items-center justify-center gap-2 text-[16px] relative bg-pagesize dark:bg-dark !text-[#201D1D] dark:!text-description"
        >
          Sort by: {sorting} Added
          <ChevronUpIcon
            className={clsx('iconstrokes transition-all', {
              'rotate-180': sortedLast,
            })}
          />
        </Button>
      </div>
      <UserReviewsList />
    </>
  );
};

export default UserProfilePage;
