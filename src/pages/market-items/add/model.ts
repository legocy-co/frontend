import { NavigateFunction } from 'react-router-dom';
import { createGate } from 'effector-react';
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';
import { setStates } from '../../../types/MarketItemType.ts';
import { miif } from '../../../features/market-item/images/index.tsx';
import {
  $marketItemCell,
  MarketItemCell,
} from '../../../components/MarketItemsList/model.ts';
import { mipf } from '../../../features/market-item/primary/index.tsx';
import { misf } from '../../../features/market-item/secondary/index.tsx';
import { legoSetService } from '../../../services/LegoSetService.ts';
import { LegoSet } from '../../../types/LegoSetType.ts';
import {
  $legoSetOptions,
  fetchLegoSetsFx,
  toOptions,
} from '../../../features/lego-set/options/model.ts';

// export const submitTriggered = createEvent();
//
// export const gate = createGate<{
//   navigateFn: NavigateFunction;
// }>();
//
// const $marketItemId = createStore<number>(0);
//
// const addMarketItemFx = attach({
//   source: mif.$mappedValues,
//   effect: marketItemService.CreateMarketItem,
// });
//
// const uploadImagesFx = attach({
//   source: {
//     id: $marketItemId,
//     images: umiif.$mappedValues,
//   },
//   effect: async ({ id, images }) => {
//     for (let i = 0; i < images.files.length; i++) {
//       const data = new FormData();
//       data.append('file', images.files[i]);
//
//       marketItemService.UploadImage(data, id);
//       await sleep(1010);
//
//       const imgElem = document.getElementById(
//         'preview-' + i
//       ) as HTMLImageElement;
//
//       imgElem.width = 0;
//     }
//   },
// });
//
// const profileRedirectFx = attach({
//   source: gate.state,
//   effect: ({ navigateFn }) => navigateFn('/profile/' + authService.GetUserId()),
// });
//
// sample({
//   clock: submitTriggered,
//   target: [mif.form.submit, umiif.form.submit],
// });
//
// sample({
//   clock: [mif.createFormInfo, umiif.createFormImages],
//   filter: and(mif.form.$isValid, umiif.form.$isValid),
//   target: addMarketItemFx,
// });
//
// sample({
//   clock: addMarketItemFx.doneData.map((data) => data.id),
//   target: $marketItemId,
// });
//
// sample({
//   clock: $marketItemId,
//   target: uploadImagesFx,
// });
//
// sample({
//   clock: uploadImagesFx.done,
//   target: profileRedirectFx,
// });
//
// sample({
//   clock: gate.close,
//   target: [mif.resetDomain, umiif.resetDomain],
// });

export const gate = createGate<{
  navigateFn: NavigateFunction;
}>();

const $legoSet = createStore<LegoSet>({
  id: 0,
  images: [],
  nPieces: 0,
  name: '',
  number: 0,
  series: { id: 0, name: '' },
});

export const tabs = ['primary', 'secondary', 'images', 'preview'];

export const tabChanged = createEvent<string>();

export const finish = createEvent();

export const $tab = createStore(tabs[0]);

const fetchLegoSet = createEffect(legoSetService.GetLegoSet);

const toCell = attach({
  source: {
    imagesMapped: miif.$mappedValues,
    legoSet: $legoSet,
    primaryMapped: mipf.$mappedValues,
    secondaryMapped: misf.$mappedValues,
  },
  effect: ({
    primaryMapped,
    secondaryMapped,
    imagesMapped,
    legoSet,
  }): MarketItemCell => {
    console.log(primaryMapped, secondaryMapped, imagesMapped, legoSet);
    return {
      condition: setStates[primaryMapped.setState as keyof typeof setStates],
      condition_icon: primaryMapped.setState,
      id: null as unknown as number,
      images: imagesMapped.files.map((file) => URL.createObjectURL(file)),
      is_liked: false,
      location: secondaryMapped.location,
      price: secondaryMapped.price,
      seller_id: null as unknown as number,
      series: legoSet.series.name,
      set: legoSet.name,
    };
  },
});

sample({
  clock: gate.open,
  target: fetchLegoSetsFx,
});

sample({
  source: fetchLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

sample({
  clock: [
    mipf.form.formValidated,
    misf.form.formValidated,
    miif.form.formValidated,
  ],
  source: $tab,
  fn: (tab) => tabs[tabs.findIndex((t) => t === tab) + 1],
  target: tabChanged,
});

sample({
  source: tabChanged,
  target: $tab,
});

sample({
  clock: miif.form.formValidated,
  source: mipf.form.fields.legoSetID.$value,
  target: fetchLegoSet,
});

sample({
  source: fetchLegoSet.doneData,
  target: $legoSet,
});

sample({
  clock: $legoSet,
  target: toCell,
});

sample({
  source: toCell.doneData,
  target: $marketItemCell,
});

sample({
  clock: tabChanged,
  target: $marketItemCell.reinit!,
});
