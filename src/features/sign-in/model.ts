import { createForm } from 'effector-forms';
import { attach, sample } from 'effector';

export const form = createForm({
  fields: {
    username: {
      init: '',
    },
    password: {
      init: '',
    },
  },
});

const signInFx = attach({
  source: form.$values,
  effect: (values) =>
    console.log({
      username: values.username,
      password: values.password,
    }),
});

sample({
  clock: form.formValidated,
  target: signInFx,
});
