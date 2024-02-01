import { z } from 'zod';
import { LegoSetSchema } from './LegoSetType.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { setStates } from './MarketItemType.ts';

export type Valuation = z.infer<typeof ValuationSchema>;

export const ValuationSchema = z.object({
  calculator: z.number(),
  id: z.number(),
  lego_set: z.array(LegoSetSchema),
  state: objectKeysToZodEnum(setStates),
});
