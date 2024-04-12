import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { UserImage } from '../../types/UserImageType.ts';
import { auth } from '../../pages/auth/';
import { si } from '../../features/auth/sign-in/index.tsx';
import { up } from '../../pages/UserProfilePage/index.tsx';
import { $username } from '../../pages/ChatPage/model.ts';

export const gate = createGate();

export const $userImages = createStore<UserImage[]>([]);

const clearUserImagesFx = createEffect(() => []);

const fetchUserFx = createEffect(() => userService.GetCurrentUserProfileInfo());

sample({
  clock: [gate.open, si.signedIn, auth.tokenRefreshed, up.avatarChanged],
  filter: () => authService.IsAuthorized(),
  target: fetchUserFx,
});

sample({
  clock: auth.loggedOut,
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
