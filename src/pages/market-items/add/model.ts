import { NavigateFunction } from 'react-router-dom';
import { createGate } from 'effector-react';
import { attach, createEvent, createStore, sample } from 'effector';
import { mif } from '../../../features/market-item/info';
import { umiif } from '../../../features/market-item/images';
import { marketItemService } from '../../../services/MarketItemService.ts';
import { and } from 'patronum';
import { sleep } from '../../../services/utils.ts';
import { GetCredentials } from '../../../storage/credentials.ts';
import { jwtDecode } from 'jwt-decode';
import { TokenType } from '../../../services/AuthService.ts';
import { navigateFx } from '../../../shared/lib/react-router.ts';

const credentials = GetCredentials();
const decodedAccess = credentials.accessToken
  ? jwtDecode<TokenType>(credentials.accessToken)
  : '';

export const submitTriggered = createEvent();

export const gate = createGate<{
  navigateFn: NavigateFunction;
}>();

const $marketItemId = createStore<number>(0);

const addMarketItemFx = attach({
  source: mif.$mappedValues,
  effect: marketItemService.CreateMarketItem,
});

const uploadImagesFx = attach({
  source: {
    id: $marketItemId,
    images: umiif.$mappedValues,
  },
  effect: async ({ id, images }) => {
    for (let i = 0; i < images.files.length; i++) {
      const data = new FormData();
      data.append('file', images.files[i]);

      marketItemService.UploadMarketItemImage(data, String(id));
      await sleep(1010);

      const imgElem = document.getElementById(
        'preview-' + i
      ) as HTMLImageElement;

      imgElem.width = 0;
    }

    await navigateFx(decodedAccess && '/profile/' + decodedAccess.id);
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
  target: uploadImagesFx,
});

sample({
  clock: gate.close,
  target: [mif.resetDomain, umiif.resetDomain],
});
