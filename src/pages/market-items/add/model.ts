import { NavigateFunction } from 'react-router-dom';
import { createGate } from 'effector-react';
import { attach, createEvent, createStore, sample } from 'effector';
import { mif } from '../../../features/market-item/details';
import { umiif } from '../../../features/market-item/upload-image';
import { marketItemService } from '../../../services/MarketItemService.ts';
import { and } from 'patronum';

export const gate = createGate<{
  navigateFn: NavigateFunction;
}>();

export const $marketItemId = createStore<number>(0);

export const submitTriggered = createEvent();

const addMarketItemFx = attach({
  source: mif.$mappedValues,
  effect: marketItemService.CreateMarketItem,
});

const uploadImageFx = attach({
  source: {
    id: $marketItemId,
    image: umiif.$mappedValues,
  },
  effect: ({ id, image }) =>
    marketItemService.UploadMarketItemImage(image.file, String(id)),
});

sample({
  clock: submitTriggered,
  target: [mif.form.submit, umiif.form.submit],
});

sample({
  clock: [mif.form.submit, umiif.form.submit],
  filter: and(mif.form.$isValid, umiif.form.$isValid),
  target: addMarketItemFx,
});

sample({
  clock: addMarketItemFx.doneData.map((data) => data.id),
  target: uploadImageFx,
});

sample({
  clock: gate.close,
  target: [mif.resetDomain, umiif.resetDomain],
});
