import { z } from 'zod';
import { LegoSetSchema } from './LegoSet.ts';
import { UserSchema } from './User.ts';
import { MarketItemImageSchema } from './MarketItemImage.ts';

export type MarketItem = z.infer<typeof MarketItemSchema>;

const SetStates = [
  'BRAND_NEW',
  'BOX_OPENED',
  'BAGS_OPENED',
  'BUILT_WITH_BOX',
  'BUILT_WITHOUT_BOX',
  'BUILT_PIECES_LOST',
  '',
] as const;

export const MarketItemSchema = z.object({
  id: z.number().optional(),
  price: z.number(),
  location: z.string(),
  lego_set: LegoSetSchema,
  seller: UserSchema,
  status: z.string().optional(),
  set_state: z.enum(SetStates),
  description: z.string(),
  images: z.array(MarketItemImageSchema),
});
