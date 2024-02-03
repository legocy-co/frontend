import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { UserImage } from '../../types/UserImageType.ts';
import { loggedOut, signedIn, tokenRefreshed } from '../../pages/auth/model.ts';

export const gate = createGate();

export const $userImages = createStore<UserImage[]>([]);

const clearUserImagesFx = createEffect(() => []);

const GetUserImagesFx = createEffect(() =>
  userService.GetUserImages(authService.GetUserId())
);

sample({
  clock: [gate.open, signedIn, tokenRefreshed],
  filter: () => authService.IsAuthorized(),
  target: GetUserImagesFx,
});

sample({
  clock: loggedOut,
  target: clearUserImagesFx,
});

sample({
  clock: [GetUserImagesFx.doneData, clearUserImagesFx.doneData],
  target: $userImages,
});
