import { z } from 'zod';
import { UserSchema } from './UserType.ts';
import { LegoSetSchema } from './LegoSetType.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { setStates } from './MarketItemType.ts';
import { ValuationSchema } from './ValuationType.ts';
import { Form } from 'effector-forms';

export type Collection = z.infer<typeof CollectionSchema>;

export type CollectionSet = z.infer<typeof CollectionSetSchema>;

export type Totals = z.infer<typeof TotalsSchema>;

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

const ProfitsSchema = z.object({
  total_return_usd: z.number(),
  total_return_percentage: z.number(),
});

const CollectionSetSchema = z.object({
  id: z.number(),
  buy_price: z.number(),
  lego_set: LegoSetSchema,
  state: objectKeysToZodEnum(setStates),
  valuation: ValuationSchema.nullable(),
  set_profits: ProfitsSchema,
});

const TotalsSchema = z.object({
  total: z.number(),
  total_sets: z.number(),
  sets_valuated: z.number(),
  total_profits: ProfitsSchema,
});

export const CollectionSchema = z.object({
  collection_sets: z.array(CollectionSetSchema),
  user: UserSchema,
  totals: TotalsSchema,
});
