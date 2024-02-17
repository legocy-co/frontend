import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import {
  attach,
  combine,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  EventPayload,
  sample,
} from 'effector';
import { UserProfileData } from '../../types/UserProfileType.ts';
import { userService } from '../../services/UserService.ts';
import { authService } from '../../services/AuthService.ts';

export const gate = createGate();

export const form = createForm({
  fields: {
    username: {
      init: '',
      rules: [
        createRule({
          name: 'username',
          schema: z.string().trim().min(1, 'Missing Username'),
        }),
      ],
    },
    email: {
      init: '',
      rules: [
        createRule({
          name: 'email',
          schema: z
            .string()
            .trim()
            .min(1, 'Missing email')
            .email('Invalid email'),
        }),
      ],
    },
  },
});

const domain = createDomain();

export const setForm = domain.createEvent<UserProfileData>();

export const profileUpdated = createEvent();

const $userId = createStore<number>(0);

const $email = createStore<string>('');

const $username = createStore<string>('');

const $userProfileData = combine($email, $username, toData);

const GetUserEmailFx = createEffect(() => authService.GetUserEmail());

const GetUserIdFx = createEffect(() => authService.GetUserId());

const GetUserProfilePageFx = attach({
  source: {
    id: $userId,
  },
  effect: ({ id }) => userService.GetUserProfilePage(id),
});

const updateUserProfilePageFx = attach({
  source: {
    id: $userId,
    data: form.$values,
  },
  effect: ({ id, data }) =>
    userService.UpdateUserProfilePage(id, {
      email: data.email,
      username: data.username,
    }),
});

const refreshTokenFx = createEffect(() => authService.RefreshToken());

function toData(email: string, username: string): UserProfileData {
  return {
    email: email,
    username: username,
  };
}

function toForm(values: UserProfileData): EventPayload<typeof form.setForm> {
  return {
    email: values.email,
    username: values.username,
  };
}

sample({
  clock: gate.open,
  target: [GetUserEmailFx, GetUserIdFx],
});

sample({
  clock: GetUserEmailFx.doneData,
  target: $email,
});

sample({
  clock: GetUserIdFx.doneData,
  target: $userId,
});

sample({
  clock: $userId,
  target: GetUserProfilePageFx,
});

sample({
  clock: GetUserProfilePageFx.doneData,
  fn: (data) => data.user.username,
  target: $username,
});

sample({
  clock: $userProfileData,
  target: setForm,
});

sample({
  clock: setForm,
  fn: toForm,
  target: form.setForm,
});

sample({
  source: form.formValidated,
  target: updateUserProfilePageFx,
});

sample({
  clock: updateUserProfilePageFx.done,
  target: [refreshTokenFx, profileUpdated],
});
