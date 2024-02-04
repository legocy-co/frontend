import { z } from 'zod';
import { LegoSetSchema } from './LegoSetType.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { setStates } from './MarketItemType.ts';

export const CollectionSetSchema = z.object({
  id: z.number(),
  buy_price: z.number(),
  lego_set: LegoSetSchema,
  state: objectKeysToZodEnum(setStates),
});
