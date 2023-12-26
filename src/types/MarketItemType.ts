import { z } from 'zod';
import { LegoSetSchema } from './LegoSet.ts';
import { UserSchema } from './User.ts';
import { MarketItemImageSchema } from './MarketItemImage.ts';

export type MarketItem = z.infer<typeof MarketItemSchema>;

export const MarketItemSchema = z.object({
  id: z.number(),
  price: z.number(),
  location: z.string(),
  lego_set: LegoSetSchema,
  seller: UserSchema,
  status: z.string(),
  set_state: z.string(),
  description: z.string().min(1),
  images: z.array(MarketItemImageSchema).optional(),
});
