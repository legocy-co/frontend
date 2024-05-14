import { z } from 'zod';
import { LegoSetSchema } from './LegoSetType.ts';
import { UserSchema } from './UserType.ts';
import objectKeysToZodEnum from '../shared/lib/zod.ts';
import { Form } from 'effector-forms';
import { MarketItemImageSchema } from './MarketItemImage.ts';

export type MarketItem = z.infer<typeof MarketItemSchema>;

export type Like = z.infer<typeof LikeSchema>;

export type MarketItemData = {
  description: string;
  legoSetID: number;
  location: string;
  price: number;
  setState: keyof typeof setStates;
};

export type MarketItemForm = Form<{
  legoSetID: string;
  setState: keyof typeof setStates;
  description: string;
  price: number;
  country: string;
  city: string;
}>;

export const LikeSchema = z.object({
  marketItemID: z.number(),
  userID: z.number(),
});

export const setStates = {
  BRAND_NEW: 'Brand New',
  BOX_OPENED: 'Box Opened',
  BAGS_OPENED: 'Bags Opened',
  BUILT_WITH_BOX: 'Built With Box',
  BUILT_WITHOUT_BOX: 'Built Without Box',
  BUILT_PIECES_LOST: 'Built, Pieces Lost',
};

export const statuses = ['CHECK_REQUIRED', 'ACTIVE', 'SOLD'] as const;

export const MarketItemSchema = z.object({
  description: z.string(),
  id: z.number(),
  images: z.array(MarketItemImageSchema),
  isLiked: z.boolean(),
  legoSet: LegoSetSchema,
  location: z.string(),
  price: z.number(),
  seller: UserSchema,
  setState: objectKeysToZodEnum(setStates),
  status: z.enum(statuses),
});
