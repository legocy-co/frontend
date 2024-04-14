import { z } from 'zod';
import { LegoSeriesSchema } from './LegoSeriesType.ts';
import { LegoSetImageSchema } from './LegoSetImage.ts';

export type LegoSet = z.infer<typeof LegoSetSchema>;

export const LegoSetSchema = z.object({
  id: z.number(),
  images: z.array(LegoSetImageSchema).nullable(),
  nPieces: z.number(),
  name: z.string(),
  number: z.number(),
  series: LegoSeriesSchema,
});
