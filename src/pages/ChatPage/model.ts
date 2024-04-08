import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { chatService } from '../../services/ChatService.ts';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { LoginData } from 'quickblox-react-ui-kit';
import { ChatToken } from '../../types/ChatType.ts';

export const gate = createGate();

export const $currentUser = createStore<LoginData>({ login: '', password: '' });

export const $authChatData = createStore<ChatToken>({
  qbID: 0,
  token: '',
});

export const tokenExpired = createEvent();

const fetchSessionFx = createEffect(() => chatService.GetSessionToken());

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
  target: [fetchSessionFx, fetchUserFx],
});

sample({
  clock: tokenExpired,
  target: fetchSessionFx,
});

sample({
  source: fetchSessionFx.doneData,
  target: $authChatData,
});

sample({
  source: fetchUserFx.doneData.map((data) => data.user.username),
  fn: toLoginData,
  target: $currentUser,
});
