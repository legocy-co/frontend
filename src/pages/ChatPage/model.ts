import { createGate } from 'effector-react';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { chatService } from '../../services/ChatService.ts';
import { ChatToken } from '../../types/ChatType.ts';
import { GetCredentials } from '../../storage/credentials.ts';

export const gate = createGate();

export const $username = createStore<string>('');

export const chatConnected = createEvent();

export const $isConnected = createStore<boolean>(false);

export const $authChatData = createStore<ChatToken>({
  qbID: 0,
  token: '',
});

export const sessionExpired = createEvent();

const fetchSessionFx = createEffect(() => chatService.GetSessionToken());

function toAuthChatData() {
  const creds = GetCredentials();
  return { qbID: creds.qbID, token: creds.chatToken };
}

sample({
  clock: [gate.open, fetchSessionFx.done],
  fn: toAuthChatData,
  target: $authChatData,
});

sample({
  clock: sessionExpired,
  target: fetchSessionFx,
});

sample({
  clock: chatConnected,
  fn: () => true,
  target: $isConnected,
});
