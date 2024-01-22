import { createEvent, sample, combine, StoreValue } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';

export const form = createForm({
  fields: {
    images: {
      init: [] as File[],
      rules: [
        createRule({
          name: 'image',
          schema: z
            .array(z.custom<File>((file) => file instanceof File))
            .min(1, 'Missing images')
            .max(6, 'Market item must contain no more than 6 images'),
        }),
      ],
    },
  },
});

export const gate = createGate<{ id: string | null }>();

export const createFormImages = createEvent();

export const resetDomain = createEvent();

export const $mappedValues = combine(form.$values, (values) => ({
  ...mapFormToRequestBody(values),
}));

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    files: values.images,
  };
}

sample({
  source: form.formValidated,
  target: createFormImages,
});

sample({
  clock: resetDomain,
  target: [form.reset],
});
