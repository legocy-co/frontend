import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router-dom';
import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import {
  combine,
  createDomain,
  createEffect,
  createStore,
  EventPayload,
  sample,
} from 'effector';
import { UserProfileData } from '../../types/UserProfileType.ts';
import { userService } from '../../services/UserService.ts';
import { authService } from '../../services/AuthService.ts';

export const gate = createGate<{
  navigateFn: NavigateFunction;
}>();

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

const $email = createStore<string>('');

const $username = createStore<string>('');

const $userProfileData = combine($email, $username, toData);

const GetUserEmailFx = createEffect(() => authService.GetUserEmail());

const GetUserProfilePageFx = createEffect(() =>
  userService.GetUserProfilePage(authService.GetUserId())
);

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
  target: [GetUserEmailFx, GetUserProfilePageFx],
});

sample({
  clock: GetUserEmailFx.doneData,
  target: $email,
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
