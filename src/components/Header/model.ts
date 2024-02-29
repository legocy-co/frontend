import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { UserImage } from '../../types/UserImageType.ts';
import { auth } from '../../pages/auth/';
import { si } from '../../features/auth/sign-in/index.tsx';
import { up } from '../../pages/UserProfilePage/index.tsx';

export const gate = createGate();

export const $userImages = createStore<UserImage[]>([]);

const clearUserImagesFx = createEffect(() => []);

const GetUserImagesFx = createEffect(() =>
  userService.GetUserImages(authService.GetUserId())
);

sample({
  clock: [gate.open, si.signedIn, auth.tokenRefreshed, up.avatarChanged],
  filter: () => authService.IsAuthorized(),
  target: GetUserImagesFx,
});

sample({
  clock: auth.loggedOut,
  target: clearUserImagesFx,
});

sample({
  clock: [GetUserImagesFx.doneData, clearUserImagesFx.doneData],
  target: $userImages,
});
