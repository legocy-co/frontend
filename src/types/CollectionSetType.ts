import { z } from 'zod';
import { LegoSetSchema } from './LegoSetType.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { setStates } from './MarketItemType.ts';
import { Form } from 'effector-forms';
import { ValuationSchema } from './ValuationType.ts';
import { ProfitsSchema } from './Profits.ts';

export type CollectionSetData = {
  buy_price: number;
  lego_set_id: number;
  state: keyof typeof setStates;
};

export type CollectionSetForm = Form<{
  buy_price: number;
  lego_set_id: string;
  state: keyof typeof setStates;
}>;

export type CollectionSet = z.infer<typeof CollectionSetSchema>;

export const CollectionSetSchema = z.object({
  id: z.number(),
  buy_price: z.number(),
  lego_set: LegoSetSchema,
  state: objectKeysToZodEnum(setStates),
  valuation: ValuationSchema.nullable(),
  set_profits: ProfitsSchema,
});
