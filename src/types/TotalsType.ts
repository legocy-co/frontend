import { z } from 'zod';
import { ProfitsSchema } from './Profits.ts';

export type Totals = z.infer<typeof TotalsSchema>;

export const TotalsSchema = z.object({
  total: z.number(),
  total_sets: z.number(),
  sets_valuated: z.number(),
  total_profits: ProfitsSchema,
});
