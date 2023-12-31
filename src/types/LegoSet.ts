import { z } from 'zod';
import { LegoSeriesSchema } from './LegoSeries.ts';

export const LegoSetSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  number: z.number(),
  n_pieces: z.number(),
  series: LegoSeriesSchema,
});
