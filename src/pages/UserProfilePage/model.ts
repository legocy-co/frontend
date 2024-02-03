import { createGate } from 'effector-react';
import { attach, createEvent, createStore, sample } from 'effector';
import { NavigateFunction } from 'react-router-dom';
import { userService } from '../../services/UserService.ts';
import {
  $marketItemCells,
  toMarketItemCells,
} from '../../components/MarketItemsList/model.ts';
import { User } from '../../types/UserType.ts';
import {
  $userReviewCells,
  toUserReviewCells,
} from '../../components/UserReviewsList/model.ts';

type UserProfile = {
  id: number;
  user_images: string[];
  username: string;
};

export const avatarChanged = createEvent();

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const $userProfilePage = createStore<UserProfile>({
  id: 0,
  user_images: [],
  username: '',
});

const GetUserProfilePageFx = attach({
  source: gate.state.map(({ id }) => id),
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return userService.GetUserProfilePage(id);
  },
});

function toPage(user: User): UserProfile {
  return {
    id: user.id,
    user_images: user.images.map((img) => 'https://' + img.downloadURL),
    username: user.username,
  };
}

sample({
  clock: [gate.open, avatarChanged],
  target: GetUserProfilePageFx,
});

sample({
  clock: GetUserProfilePageFx.doneData.map((data) => data.user),
  fn: toPage,
  target: $userProfilePage,
});

sample({
  clock: GetUserProfilePageFx.doneData.map((data) => data.market_items),
  fn: toMarketItemCells,
  target: $marketItemCells,
});

sample({
  clock: GetUserProfilePageFx.doneData.map((data) => data.user_reviews),
  fn: toUserReviewCells,
  target: $userReviewCells,
});
