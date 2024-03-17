import { createGate } from 'effector-react';
import { createEffect, createStore, sample } from 'effector';
import { userService } from '../../services/UserService.ts';
import { authService } from '../../services/AuthService.ts';

export const gate = createGate();

export const $login = createStore<string>('');

const fetchUserFx = createEffect(() =>
  userService.GetUserProfilePage(authService.GetUserId())
);

sample({
  clock: gate.open,
  target: fetchUserFx,
});

sample({
  source: fetchUserFx.doneData.map((data) => data.user.username),
  target: $login,
});
