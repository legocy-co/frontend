import { createGate } from 'effector-react';
import { createEffect, createStore, sample } from 'effector';
import { userService } from '../../services/UserService.ts';
import { authService } from '../../services/AuthService.ts';
import { LoginData } from 'quickblox-react-ui-kit';

export const gate = createGate();

export const $currentUser = createStore<LoginData>({ login: '', password: '' });

const fetchUserFx = createEffect(() =>
  userService.GetUserProfilePage(authService.GetUserId())
);

function toLoginData(login: string): LoginData {
  return {
    login: login,
    password: import.meta.env.VITE_QB_REGISTERED_USER_PASSWORD,
  };
}

sample({
  clock: gate.open,
  target: fetchUserFx,
});

sample({
  source: fetchUserFx.doneData.map((data) => data.user.username),
  fn: toLoginData,
  target: $currentUser,
});
