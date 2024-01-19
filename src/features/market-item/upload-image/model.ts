import { createEvent, sample, combine, StoreValue } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';

export const gate = createGate<{ id: string | null }>();

export const form = createForm({
  fields: {
    image: {
      init: '',
      rules: [
        createRule({
          name: 'image',
          schema: z.string().min(1, 'Missing image'),
        }),
      ],
    },
  },
});

export const uploadFormImage = createEvent();

export const resetDomain = createEvent();

export const $mappedValues = combine(form.$values, (values) => ({
  ...mapFormToRequestBody(values),
}));

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    file: values.image,
  };
}

sample({
  source: form.formValidated,
  target: uploadFormImage,
});

sample({
  clock: resetDomain,
  target: [form.reset],
});
