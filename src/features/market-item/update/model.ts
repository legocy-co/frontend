import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import {
  StoreValue,
  createDomain,
  sample,
  attach,
  EventPayload,
  createStore,
  createEffect,
} from 'effector';
import { MarketItem, setStates } from '../../../types/MarketItemType.ts';
import {
  $legoSetOptions,
  fetchLegoSetsFx,
  toOptions,
} from '../../lego-set/options/model.ts';
import { createGate } from 'effector-react';
import { NavigateFunction } from 'react-router-dom';
import { marketItemService } from '../../../services/MarketItemService.ts';

const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
];

type InitialImageData = {
  ID: number;
  index: number;
};

export const gate = createGate<{
  id: string | null;
  navigateFn: NavigateFunction;
}>();

export const form = createForm({
  fields: {
    legoSetID: {
      init: '',
      rules: [
        createRule({
          name: 'legoSetID',
          schema: z.string().min(1, 'Missing Lego set'),
        }),
      ],
    },
    setState: {
      init: '' as keyof typeof setStates,
      rules: [
        createRule({
          name: 'set_states',
          schema: z.string().min(1, 'Missing condition'),
        }),
      ],
    },
    description: {
      init: '',
    },
    price: {
      init: null as unknown as number,
      rules: [
        createRule({
          name: 'price',
          schema: z
            .number()
            .max(999999)
            .nonnegative()
            .nullable()
            .refine((value) => value !== null, 'Missing price'),
        }),
      ],
    },
    country: {
      init: '',
      rules: [
        createRule({
          name: 'country',
          schema: z.string().min(1, 'Missing country'),
        }),
      ],
    },
    city: {
      init: '',
      rules: [
        createRule({
          name: 'city',
          schema: z.string().min(1, 'Missing city'),
        }),
      ],
    },
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
                  return file.size <= 20000000;
                }, `Maximum image size is 20MB.`)
                .refine(
                  (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
                  'Only .jpg, .jpeg, .png, .heic and .webp formats are supported.'
                )
            )
            .min(1, 'Please add images')
            .max(6, 'Market item must contain no more than 6 images'),
        }),
      ],
    },
  },
});

const domain = createDomain();

const $itemId = gate.state.map(({ id }) => id);

const fetchMarketItemFx = attach({
  source: {
    id: $itemId,
  },
  effect: ({ id }) => {
    if (!id) throw new Error('Market item not found');
    return marketItemService.GetMarketItem(id!);
  },
});

export const resetDomain = domain.createEvent();

export const $mappedValues = form.$values.map(mapFormToRequestBody);

export const $initialValues = createStore<EventPayload<typeof form.setForm>>(
  {}
);

const updateMarketItemFx = attach({
  source: {
    id: $itemId,
    data: $mappedValues,
  },
  effect: ({ id, data }) => marketItemService.UpdateMarketItem(id!, data),
});

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    legoSetID: Number(values.legoSetID),
    location: `${values.city}, ${values.country}`,
    price: Math.floor(values.price * 100) / 100,
    setState: values.setState,
    description: values.description,
  };
}

const toFormFX = createEffect(
  async (values: MarketItem): Promise<EventPayload<typeof form.setForm>> => {
    const locationMap = values.location.split(', ');

    const imageIDs = values.images.map((img) => img.id);

    const files = await Promise.all(
      values.images
        .map((img) => img.imageURL)
        .map(async (url, i) => {
          const response = await fetch(url);
          return new File(
            [await response.blob()],
            JSON.stringify({ index: i, ID: imageIDs[i] }),
            {
              type: 'image/png',
            }
          );
        })
    );

    return {
      legoSetID: String(values.legoSet.id),
      country: locationMap[1],
      city: locationMap[0],
      price: values.price,
      setState: values.setState,
      description: values.description,
      images: files,
    };
  }
);

const updateImagesFX = attach({
  source: {
    itemID: $itemId,
    images: form.fields.images.$value,
    initialValues: $initialValues,
  },
  effect: async ({ itemID, images, initialValues }) => {
    const remained: InitialImageData[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.name) {
        const initialData: InitialImageData = JSON.parse(image.name);
        remained.push({ index: initialData.index, ID: initialData.ID });
        console.log(remained);
        if (initialData.index !== i) {
          await marketItemService.UpdateImage(initialData.ID, itemID!, {
            sortIndex: i,
          });
        }
      } else if (
        // TODO: Delete missing images/IDs
        !remained
          .map((rem) => rem.ID)
          .findIndex(JSON.parse(initialValues.images![i].name).ID)
      ) {
        await marketItemService.DeleteImage(
          JSON.parse(initialValues.images![i].name).ID
        );
      } else {
        await marketItemService.UploadImage(image, String(i), itemID!);
      }
    }
  },
});

const uploadsRedirectFX = attach({
  source: gate.state,
  effect: ({ navigateFn }) => navigateFn('/profile/my/uploads'),
});

domain.onCreateStore((store) => store.reset(resetDomain));

sample({
  clock: gate.open,
  target: fetchLegoSetsFx,
});

sample({
  clock: $itemId,
  target: fetchMarketItemFx,
});

sample({
  clock: fetchMarketItemFx.doneData,
  target: toFormFX,
});

sample({
  source: toFormFX.doneData,
  target: [form.setForm, $initialValues],
});

sample({
  clock: fetchLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

sample({
  clock: form.formValidated,
  target: updateMarketItemFx,
});

sample({
  clock: updateMarketItemFx.done,
  target: updateImagesFX,
});

sample({
  clock: updateImagesFX.done,
  target: uploadsRedirectFX,
});

sample({
  clock: form.fields.country.changed,
  target: form.fields.city.reset,
});

sample({
  clock: resetDomain,
  target: form.reset,
});
