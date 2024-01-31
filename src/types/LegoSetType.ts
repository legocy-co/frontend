import { z } from 'zod';
import { LegoSeriesSchema } from './LegoSeries.ts';
import { LegoSetImageSchema } from './LegoSetImage.ts';

export type LegoSet = z.infer<typeof LegoSetSchema>;
export const LegoSetSchema = z.object({
  id: z.number(),
  images: z.array(LegoSetImageSchema).nullable(),
  name: z.string().min(1),
  number: z.number(),
  n_pieces: z.number(),
  series: LegoSeriesSchema,
});
