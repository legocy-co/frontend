import { z } from 'zod';

export const LegoSetImageSchema = z.object({
  id: z.number(),
  imageURL: z.string(),
  isMain: z.boolean(),
  legoSetID: z.number(),
});
