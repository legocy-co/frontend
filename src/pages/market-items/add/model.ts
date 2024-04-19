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
import { marketItemService } from '../../../services/MarketItemService.ts';
import { sleep } from '../../../services/utils.ts';
import { up } from '../../UserProfilePage/index.tsx';

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

export const tabs = [
  'primary',
  'secondary',
  'images',
  'preview',
  'loading',
  'final',
];

export const tabChanged = createEvent<string>();

export const finish = createEvent();

export const uploadsSelected = createEvent<boolean>();

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

const CreateMarketItemFx = attach({
  source: { primary: mipf.$mappedValues, secondary: misf.$mappedValues },
  effect: ({ primary, secondary }) => {
    const data = { ...primary, ...secondary };
    return marketItemService.CreateMarketItem(data);
  },
});

const $marketItemID = createStore<number>(0);

const uploadImagesFx = attach({
  source: {
    id: $marketItemID,
    images: miif.$mappedValues,
  },
  effect: async ({ id, images }) => {
    for (let i = 0; i < images.files.length; i++) {
      const data = new FormData();
      data.append('file', images.files[i]);

      marketItemService.UploadImage(data, id);
      await sleep(1010);

      const imgElem = document.getElementById(
        'preview-' + i
      ) as HTMLImageElement;

      imgElem.width = 0;
    }
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
    finish,
    miif.resetDomain,
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

sample({
  clock: finish,
  target: CreateMarketItemFx,
});

sample({
  clock: CreateMarketItemFx.doneData,
  fn: (data) => data.id,
  target: $marketItemID,
});

sample({
  clock: $marketItemID,
  target: uploadImagesFx,
});

sample({
  clock: uploadImagesFx.done,
  target: [mipf.resetDomain, misf.resetDomain, miif.resetDomain],
});

sample({
  source: uploadsSelected,
  target: up.$uploadsSelected,
});

sample({
  clock: gate.close,
  target: $tab.reinit!,
});
