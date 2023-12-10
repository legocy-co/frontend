import { createForm } from 'effector-forms';

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