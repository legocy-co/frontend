import { createGate } from 'effector-react';
import { createEffect, createStore, sample } from 'effector';
import { AuthChatData } from '../../types/ChatType.ts';
import { chatService } from '../../services/ChatService.ts';
import { authService } from '../../services/AuthService.ts';
import { userService } from '../../services/UserService.ts';
import { LoginData } from 'quickblox-react-ui-kit';

export const gate = createGate();

export const $currentUser = createStore<LoginData>({ login: '', password: '' });

export const $authChatData = createStore<AuthChatData>({
  chat_user_id: 0,
  session_token: '',
});

const createSessionFx = createEffect(() =>
  chatService.CreateChatSession(authService.GetUserId())
);

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
  target: [createSessionFx, fetchUserFx],
});

sample({
  source: createSessionFx.doneData,
  target: $authChatData,
});

sample({
  source: fetchUserFx.doneData.map((data) => data.user.username),
  fn: toLoginData,
  target: $currentUser,
});
