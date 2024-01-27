import { sample, combine, StoreValue, createDomain } from 'effector';
import { createGate } from 'effector-react';
import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const form = createForm({
  fields: {
    images: {
      init: [] as File[],
      rules: [
        createRule({
          name: 'image',
          schema: z
            .array(
              z
                .custom<File>((file) => file instanceof File)
                .refine((file) => {
                  return file.size <= 1048576;
                }, `Max image size is 1MB.`)
                .refine(
                  (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
                  'Only .jpg, .jpeg, .png and .webp formats are supported.'
                )
            )
            .min(1, 'Missing images')
            .max(6, 'Market item must contain no more than 6 images'),
        }),
      ],
    },
  },
});

export const gate = createGate<{ id: string | null }>();

const domain = createDomain();

export const createFormImages = domain.createEvent();

export const resetDomain = domain.createEvent();

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
  target: form.reset,
});
