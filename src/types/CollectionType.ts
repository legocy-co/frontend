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
  buyPrice: number;
  legoSetID: number;
  state: keyof typeof setStates;
};

export type CollectionSetForm = Form<{
  buy_price: number;
  lego_set_id: string;
  state: keyof typeof setStates;
}>;

const ProfitsSchema = z.object({
  totalReturnUSD: z.number(),
  totalReturnPercentage: z.number(),
});

const CollectionSetSchema = z.object({
  id: z.number(),
  buyPrice: z.number(),
  legoSet: LegoSetSchema,
  state: objectKeysToZodEnum(setStates),
  valuation: ValuationSchema.nullable(),
  setProfits: ProfitsSchema,
});

const TotalsSchema = z.object({
  setsValuated: z.number(),
  total: z.number(),
  totalProfits: ProfitsSchema,
  totalSets: z.number(),
});

export const CollectionSchema = z.object({
  collectionSets: z.array(CollectionSetSchema),
  user: UserSchema,
  totals: TotalsSchema,
});
