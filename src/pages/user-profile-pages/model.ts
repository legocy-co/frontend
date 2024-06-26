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
  marketItemUnliked,
  toMarketItemCells,
} from '../../components/MarketItemsList/model.ts';
import { User } from '../../types/UserType.ts';
import {
  $userReviewCells,
  toUserReviewCells,
} from '../../components/UserReviewsList/model.ts';
import { marketItemService } from '../../services/MarketItemService.ts';
import { persist } from 'effector-storage/local';
import { toUnixTime } from '../../services/utils.ts';

export const gate = createGate<{
  id: string | null;
  navigate: NavigateFunction;
}>();

export const sectionSelected = createEvent<string>();

export const avatarChanged = createEvent();

export const profileUpdated = createEvent();

export const loadingStarted = createEvent();

export const userReviewsSortingChanged = createEvent<'Last' | 'First'>();

export const $section = createStore<string>('uploads');

export const $favorites = createStore<MarketItemCell[]>([]);

export const $favoritesLength = createStore<number>(0);

export const $isLoading = createStore<number>(0);

export const $userReviewsSorting = createStore<'Last' | 'First'>('Last');

export const $user = createStore<User>({
  email: '',
  id: 0,
  images: [],
  reviewTotals: { avgRating: 0, totalReviews: 0 },
  role: 0,
  username: '',
});

export const $uid = gate.state.map(({ id }) => id);

const $offset = createStore<number>(0);

export const GetUserProfilePageFx = attach({
  source: $uid,
  effect: (id) => {
    if (!id) throw new Error('No id provided');
    return userService.GetUserProfilePage(id === 'my' ? undefined : id);
  },
});

const GetFavoritesFX = createEffect(() =>
  marketItemService.GetFavoriteMarketItems(12, 0)
);

const loadMoreFX = attach({
  source: { marketItems: $favorites, offset: $offset },
  effect: async ({ marketItems, offset }) => {
    const loadedItems = await marketItemService.GetFavoriteMarketItems(
      12,
      offset
    );

    console.log(offset);

    const loadedCells = toMarketItemCells(loadedItems.data);

    return [...marketItems, ...loadedCells];
  },
});

sample({
  clock: [gate.open, avatarChanged, profileUpdated],
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
  source: gate.state,
  filter: (state: { id: string | null; navigate: NavigateFunction }) =>
    state.id === 'my',
  fn: () => '',
  target: [sectionSelected, GetFavoritesFX],
});

sample({
  source: GetFavoritesFX.doneData.map((data) => data.data),
  fn: toMarketItemCells,
  target: $favorites,
});

sample({
  source: GetFavoritesFX.doneData.map((data) => data.meta.total),
  target: $favoritesLength,
});

sample({
  clock: loadingStarted,
  source: { offset: $offset, isLoading: $isLoading },
  filter: ({ isLoading }) => isLoading === 0,
  fn: ({ offset }) => offset + 12,
  target: [$isLoading, $offset],
});

sample({
  clock: $offset,
  target: loadMoreFX,
});

sample({
  source: loadMoreFX.doneData,
  target: $favorites,
});

sample({
  clock: $favorites,
  source: gate.state,
  filter: (state: { id: string | null; navigate: NavigateFunction }) =>
    state.id === 'my',
  fn: (_, favorites) => favorites,
  target: $marketItemCells,
});

sample({
  clock: $marketItemCells,
  fn: () => 0,
  target: $isLoading,
});

sample({
  clock: marketItemUnliked,
  source: $favoritesLength,
  filter: (len) => len !== 0,
  fn: (len) => len - 1,
  target: $favoritesLength,
});

sample({
  clock: marketItemUnliked,
  source: $favorites,
  fn: (marketItems, id) => marketItems.filter((item) => item.id !== id),
  target: $favorites,
});

sample({
  source: GetUserProfilePageFx.doneData.map((data) => data.userReviews),
  fn: toUserReviewCells,
  target: $userReviewCells,
});

sample({
  clock: GetUserProfilePageFx.done,
  source: $userReviewsSorting,
  target: userReviewsSortingChanged,
});

sample({
  source: userReviewsSortingChanged,
  target: $userReviewsSorting,
});

sample({
  clock: userReviewsSortingChanged,
  source: $userReviewCells,
  fn: (cells, sorting) =>
    cells.sort((a, b) =>
      sorting === 'Last'
        ? toUnixTime(b.date) - toUnixTime(a.date)
        : toUnixTime(a.date) - toUnixTime(b.date)
    ),
  target: $userReviewCells,
});

sample({
  clock: GetUserProfilePageFx.doneData.map((data) => data.marketItems),
  source: gate.state,
  filter: (state: { id: string | null; navigate: NavigateFunction }) =>
    state.id !== 'my',
  fn: (_, items) => toMarketItemCells(items),
  target: $marketItemCells,
});

sample({
  clock: gate.close,
  target: [$section.reinit!, $offset.reinit!, $favoritesLength.reinit!],
});

persist({
  store: $userReviewsSorting,
  key: 'userReviewsSorting',
});
