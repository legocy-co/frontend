import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { attach, createEffect, EventPayload, sample } from 'effector';
import { userService } from '../../services/UserService.ts';
import { authService } from '../../services/AuthService.ts';
import { upp } from '../../pages/user-profile-pages/index.tsx';
import { User } from '../../types/UserType.ts';

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

const updateUserProfilePageFx = attach({
  source: {
    user: upp.$user,
    data: form.$values,
  },
  effect: ({ user, data }) =>
    userService.UpdateUserProfilePage(user.id, {
      email: data.email,
      username: data.username,
    }),
});

const refreshTokenFx = createEffect(() => authService.RefreshToken());

function toForm(user: User): EventPayload<typeof form.setForm> {
  return {
    email: user.email,
    username: user.username,
  };
}

sample({
  source: upp.$user,
  fn: toForm,
  target: form.setForm,
});

sample({
  source: form.formValidated,
  target: [updateUserProfilePageFx, form.resetTouched],
});

sample({
  clock: updateUserProfilePageFx.done,
  target: [refreshTokenFx, upp.profileUpdated],
});
