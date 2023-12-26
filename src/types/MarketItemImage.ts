import { z } from 'zod';

export const MarketItemImageSchema = z.object({
  id: z.number(),
  imageURL: z.string().url(),
  is_main: z.boolean(),
});
