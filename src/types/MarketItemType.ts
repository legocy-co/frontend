import { z } from 'zod';
import { LegoSetSchema } from './LegoSetType.ts';
import { UserSchema } from './UserType.ts';
import { MarketItemImageSchema } from './MarketItemImage.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { Form } from 'effector-forms';

export type MarketItem = z.infer<typeof MarketItemSchema>;

export type MarketItemData = {
  legoSetID: number;
  setState: keyof typeof setStates;
  description: string;
  price: number;
  location: string;
};

export type MarketItemForm = Form<{
  lego_set_id: string;
  set_state: keyof typeof setStates;
  description: string;
  price: number;
  country: string;
  city: string;
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
  id: z.number(),
  price: z.number(),
  location: z.string(),
  legoSet: LegoSetSchema,
  legoSetID: z.number().optional(),
  seller: UserSchema,
  status: z.enum(listingStatus).optional(),
  setState: objectKeysToZodEnum(setStates),
  description: z.string(),
  images: z.array(MarketItemImageSchema),
});
