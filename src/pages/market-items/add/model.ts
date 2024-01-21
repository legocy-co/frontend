import { NavigateFunction } from 'react-router-dom';
import { createGate } from 'effector-react';
import { attach, createEvent, createStore, sample } from 'effector';
import { mif } from '../../../features/market-item/info';
import { umiif } from '../../../features/market-item/images';
import { marketItemService } from '../../../services/MarketItemService.ts';
import { and } from 'patronum';
import { sleep } from '../../../services/utils.ts';

export const submitTriggered = createEvent();

export const gate = createGate<{
  navigateFn: NavigateFunction;
}>();

const $marketItemId = createStore<number>(0);

const addMarketItemFx = attach({
  source: mif.$mappedValues,
  effect: marketItemService.CreateMarketItem,
});

const uploadImageFx = attach({
  source: {
    id: $marketItemId,
    images: umiif.$mappedValues,
  },
  effect: async ({ id, images }) => {
    for (let i = 0; i < images.files.length; i++) {
      const data = new FormData();
      data.append('file', images.files[i]);

      marketItemService.UploadMarketItemImage(data, String(id));
      await sleep(1001);
    }
  },
});

sample({
  clock: submitTriggered,
  target: [mif.form.submit, umiif.form.submit],
});

sample({
  clock: [mif.createFormInfo, umiif.createFormImages],
  filter: and(mif.form.$isValid, umiif.form.$isValid),
  target: addMarketItemFx,
});

sample({
  clock: addMarketItemFx.doneData.map((data) => data.id),
  target: $marketItemId,
});

sample({
  clock: $marketItemId,
  target: uploadImageFx,
});

sample({
  clock: gate.close,
  target: [mif.resetDomain, umiif.resetDomain],
});
