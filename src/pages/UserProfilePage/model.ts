import { createGate } from 'effector-react';
import { attach, createStore, sample } from 'effector';
import { NavigateFunction } from 'react-router-dom';
import { userService } from '../../services/UserService.ts';
import { UserProfile } from '../../types/UserProfileType.ts';

type UserProfilePage = {
  id: number;
  user_images: string[];
  username: string;
  uploads: object[];
  reviews: object[];
};

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const $userProfilePage = createStore<UserProfilePage>({
  id: 0,
  user_images: [],
  username: '',
  uploads: [],
  reviews: [],
});

const GetUserProfilePageFx = attach({
  source: gate.state.map(({ id }) => id),
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return userService.GetUserProfilePage(id);
  },
});

function toPage(userProfile: UserProfile): UserProfilePage {
  return {
    id: userProfile.user.id,
    user_images: userProfile.user.images.map(
      (img) => 'https://' + img.downloadURL
    ),
    username: userProfile.user.username,
    uploads: userProfile.market_items,
    reviews: userProfile.user_reviews,
  };
}

sample({
  clock: gate.open,
  target: GetUserProfilePageFx,
});

sample({
  clock: GetUserProfilePageFx.doneData,
  fn: toPage,
  target: $userProfilePage,
});
