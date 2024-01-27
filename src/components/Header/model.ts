import { createEffect, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { UserImage } from '../../types/UserImageType.ts';

export const gate = createGate();

export const $userImages = createStore<UserImage[]>([]);

const GetUserImagesFX = createEffect(() =>
  userService.GetUserImages(String(authService.GetUserId()))
);

sample({
  clock: gate.open,
  filter: () => authService.IsAuthorized(),
  target: GetUserImagesFX,
});

sample({
  clock: GetUserImagesFX.doneData,
  target: $userImages,
});

sample({
  clock: $userImages,
  target: gate.close,
});

sample({
  clock: gate.close,
  target: gate.open,
});
