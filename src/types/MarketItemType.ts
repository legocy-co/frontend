import { z } from 'zod';
import { LegoSetSchema } from './LegoSetType.ts';
import { UserSchema } from './UserType.ts';
import { MarketItemImageSchema } from './MarketItemImage.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { Form } from 'effector-forms';

export type MarketItem = z.infer<typeof MarketItemSchema>;

export type MarketItemForm = Form<{
  lego_set_id: number | null;
  condition:
    | 'BRAND_NEW'
    | 'BOX_OPENED'
    | 'BAGS_OPENED'
    | 'BUILT_WITH_BOX'
    | 'BUILT_WITHOUT_BOX'
    | 'BUILT_PIECES_LOST';
  description: string;
  price: number | null;
  location: string;
}>;

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
  id: z.number().optional(),
  price: z.number().nullable(),
  location: z.string(),
  lego_set: LegoSetSchema.optional(),
  lego_set_id: z.number().nullable().optional(),
  seller: UserSchema.optional(),
  status: z.enum(listingStatus).optional(),
  set_state: objectKeysToZodEnum(setStates),
  description: z.string(),
  images: z.array(MarketItemImageSchema).optional(),
});
