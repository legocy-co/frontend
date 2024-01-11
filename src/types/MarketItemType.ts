import { z } from 'zod';
import { LegoSetSchema } from './LegoSet.ts';
import { UserSchema } from './User.ts';
import { MarketItemImageSchema } from './MarketItemImage.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';

export type MarketItem = z.infer<typeof MarketItemSchema>;

export const setStates = {
  BRAND_NEW: 'Brand New',
  BOX_OPENED: 'Box Opened',
  BAGS_OPENED: 'Bags Opened',
  BUILT_WITH_BOX: 'Built With Box',
  BUILT_WITHOUT_BOX: 'Built Without Box',
  BUILT_PIECES_LOST: 'Built, Pieces Lost',
};

const listingStatus = ['CHECK_REQUIRED', 'ACTIVE', 'SOLD'] as const;
export const MarketItemSchema = z.object({
  id: z.number(),
  price: z.number(),
  location: z.string(),
  lego_set: LegoSetSchema,
  seller: UserSchema,
  status: z.enum(listingStatus).optional(),
  set_state: objectKeysToZodEnum(setStates),
  description: z.string(),
  images: z.array(MarketItemImageSchema),
});
