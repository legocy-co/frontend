import { z } from 'zod';
import { LegoSeriesSchema } from './LegoSeriesType.ts';

export type LegoSet = z.infer<typeof LegoSetSchema>;

const LegoSetImageSchema = z.object({
  id: z.number(),
  image_url: z.string(),
  is_main: z.boolean(),
  lego_set_id: z.number(),
});

export const LegoSetSchema = z.object({
  id: z.number(),
  images: z.array(LegoSetImageSchema).nullable(),
  name: z.string(),
  number: z.number(),
  n_pieces: z.number(),
  series: LegoSeriesSchema,
});
