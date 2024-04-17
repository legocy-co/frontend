import { NavigateFunction } from 'react-router-dom';
import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';

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

export const tabs = ['primary', 'secondary', 'images'];

export const tabChanged = createEvent<string>();

export const $tab = createStore(tabs[2]);

sample({
  source: tabChanged,
  target: $tab,
});
