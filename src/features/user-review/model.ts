import { createForm } from 'effector-forms';
import { createRule } from '../../services/utils.ts';
import { z } from 'zod';
import { upp } from '../../pages/user-profile-pages/index.tsx';
import { attach, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { userReviewService } from '../../services/UserReviewService.ts';

export const gate = createGate();

export const form = createForm({
  fields: {
    rating: {
      init: 0,
      rules: [
        createRule({
          name: 'rating',
          schema: z.number().min(1, 'Please fill in rating'),
        }),
      ],
    },
    message: {
      init: '',
      rules: [
        createRule({
          name: 'setState',
          schema: z.string().min(1, 'Please fill in message'),
        }),
      ],
    },
  },
});

export const $username = createStore('');

const createReviewFX = attach({
  source: { uid: upp.$uid, data: form.$values },
  effect: ({ uid, data }) => {
    if (!uid) throw new Error('No id provided');
    return userReviewService.CreateUserReview({
      rating: data.rating,
      message: data.message,
      sellerID: Number(uid),
    });
  },
});

sample({
  source: upp.$user,
  fn: (user) => user.username,
  target: $username,
});

sample({
  clock: form.formValidated,
  target: createReviewFX,
});

sample({
  clock: createReviewFX.done,
  fn: () => 'reviews',
  target: [upp.$section, upp.GetUserProfilePageFx],
});

sample({
  clock: gate.close,
  target: form.reset,
});
