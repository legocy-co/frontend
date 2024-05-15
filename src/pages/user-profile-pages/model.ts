import { createGate } from 'effector-react';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { NavigateFunction } from 'react-router-dom';
import { userService } from '../../services/UserService.ts';
import {
  $marketItemCells,
  MarketItemCell,
  toMarketItemCells,
} from '../../components/MarketItemsList/model.ts';
import { User } from '../../types/UserType.ts';
import {
  $userReviewCells,
  toUserReviewCells,
} from '../../components/UserReviewsList/model.ts';
import { profileUpdated } from '../../features/user-profile-page/model.ts';
import { marketItemService } from '../../services/MarketItemService.ts';

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const sectionSelected = createEvent<string>();

export const avatarChanged = createEvent();

export const marketItemUnliked = createEvent();

export const loadingStarted = createEvent();

export const $section = createStore<string>('');

export const $uploads = createStore<MarketItemCell[]>([]);

export const $favoritesLength = createStore<number>(0);

export const $user = createStore<User>({
  email: '',
  id: 0,
  images: [],
  reviewTotals: { avgRating: 0, totalReviews: 0 },
  role: 0,
  username: '',
});

const $offset = createStore<number>(0);

const GetUserProfilePageFx = attach({
  source: gate.state.map(({ id }) => id),
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return userService.GetUserProfilePage(id === 'my' ? undefined : id);
  },
});

const GetFavoritesFX = createEffect(() =>
  marketItemService.GetFavoriteMarketItems(5, 0)
);

const loadMoreFX = attach({
  source: { marketItems: $marketItemCells, offset: $offset },
  effect: async ({ marketItems, offset }) => {
    const loadedItems = await marketItemService.GetFavoriteMarketItems(
      5,
      offset
    );

    const loadedCells = toMarketItemCells(loadedItems.data);

    return [...marketItems, ...loadedCells];
  },
});

sample({
  clock: [gate.open, avatarChanged, profileUpdated],
  target: GetUserProfilePageFx,
});

sample({
  clock: $uploads,
  source: gate.state,
  filter: (state: { id: string | null; navigate: NavigateFunction }) =>
    state.id === 'my',
  target: GetFavoritesFX,
});

sample({
  clock: marketItemUnliked,
  target: GetFavoritesFX,
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
  source: GetUserProfilePageFx.doneData.map((data) => data.marketItems),
  fn: toMarketItemCells,
  target: [$uploads, $marketItemCells],
});

sample({
  source: GetUserProfilePageFx.doneData.map((data) => data.userReviews),
  fn: toUserReviewCells,
  target: $userReviewCells,
});

sample({
  source: GetFavoritesFX.doneData.map((data) => data.data),
  fn: toMarketItemCells,
  target: $marketItemCells,
});

sample({
  source: GetFavoritesFX.doneData.map((data) => data.meta.total),
  target: $favoritesLength,
});

sample({
  clock: loadingStarted,
  source: $offset,
  fn: (offset) => offset + 5,
  target: $offset,
});

sample({
  source: $offset,
  target: loadMoreFX,
});

sample({
  source: loadMoreFX.doneData,
  target: $marketItemCells,
});

sample({
  clock: gate.close,
  target: $section.reinit!,
});
