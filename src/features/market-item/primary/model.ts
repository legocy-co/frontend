import { createForm } from 'effector-forms';
import { createRule } from '../../../services/utils.ts';
import { z } from 'zod';
import { setStates } from '../../../types/MarketItemType.ts';
import { createDomain, sample, StoreValue } from 'effector';
import {
  $legoSetOptions,
  GetLegoSetsFx,
  toOptions,
} from '../../lego-set/options/model.ts';
import { marketItemPage } from '../../../pages/market-items/add/index.tsx';

export const form = createForm({
  fields: {
    description: {
      init: '',
    },
    legoSetID: {
      init: '',
      rules: [
        createRule({
          name: 'legoSetID',
          schema: z.string().min(1, 'Please fill in set name'),
        }),
      ],
    },
    setState: {
      init: 'BUILT_WITHOUT_BOX' as keyof typeof setStates,
      rules: [
        createRule({
          name: 'setState',
          schema: z.string().min(1, 'Please fill in set state'),
        }),
      ],
    },
  },
});

const domain = createDomain();

export const resetDomain = domain.createEvent();

export const $mappedValues = form.$values.map(mapFormToRequestBody);

function mapFormToRequestBody(values: StoreValue<typeof form.$values>) {
  return {
    description: values.description,
    lego_set_id: Number(values.legoSetID),
    set_state: values.setState,
  };
}

domain.onCreateStore((store) => store.reset(resetDomain));

sample({
  clock: marketItemPage.gate.open,
  target: GetLegoSetsFx,
});

sample({
  clock: GetLegoSetsFx.doneData,
  fn: toOptions,
  target: $legoSetOptions,
});

sample({
  clock: form.formValidated,
  fn: () => 'secondary',
  target: marketItemPage.tabChanged,
});

sample({
  clock: resetDomain,
  target: form.reset,
});
