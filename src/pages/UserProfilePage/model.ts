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
import { profileUpdated } from '../../features/user-profile/model.ts';

export const sectionSelected = createEvent<string>();

export const $section = createStore<string>('');

export const avatarChanged = createEvent();

export const marketItemDeleted = createEvent();

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const $user = createStore<User>({
  email: '',
  id: 0,
  images: [],
  reviewTotals: { avgRating: 0, totalReviews: 0 },
  role: 0,
  username: '',
});

const GetUserProfilePageFx = attach({
  source: gate.state.map(({ id }) => id),
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return userService.GetUserProfilePage(id === 'my' ? undefined : id);
  },
});

sample({
  clock: [gate.open, avatarChanged, marketItemDeleted, profileUpdated],
  target: GetUserProfilePageFx,
});

sample({
  source: sectionSelected,
  target: $section,
});

sample({
  source: GetUserProfilePageFx.doneData.map((data) => data.user),
  target: $user,
});

sample({
  clock: GetUserProfilePageFx.doneData.map((data) => data.marketItems),
  fn: toMarketItemCells,
  target: $marketItemCells,
});

sample({
  clock: GetUserProfilePageFx.doneData.map((data) => data.userReviews),
  fn: toUserReviewCells,
  target: $userReviewCells,
});

sample({
  clock: gate.close,
  target: $section.reinit!,
});
