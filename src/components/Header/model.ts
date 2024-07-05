import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { upp } from '../../pages/user-profile-pages';
import { $username } from '../../pages/ChatPage/model.ts';
import { UserImage } from '../../types/UserImageType.ts';
import { auth } from '../../features/auth';
import { loggedOut, tokenRefreshed } from '../../features/auth/model.ts';

export const gate = createGate();

export const $userImages = createStore<UserImage[]>([]);

const clearUserImagesFx = createEffect(() => []);

const fetchUserFx = createEffect(() => userService.GetCurrentUserProfileInfo());

sample({
  clock: [gate.open, auth.signInFx.done, tokenRefreshed, upp.avatarChanged],
  filter: () => authService.IsAuthorized(),
  target: fetchUserFx,
});

sample({
  clock: loggedOut,
  target: clearUserImagesFx,
});

sample({
  source: fetchUserFx.doneData.map((data) => data.images),
  target: $userImages,
});

sample({
  source: fetchUserFx.doneData.map((data) => data.username),
  target: $username,
});

sample({
  clock: clearUserImagesFx.doneData,
  target: $userImages,
});
