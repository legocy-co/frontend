import { z } from 'zod';

export type UpdateImageData = {
  sortIndex: number;
};

export const MarketItemImageSchema = z.object({
  id: z.number(),
  imageURL: z.string(),
  sortIndex: z.number(),
});
