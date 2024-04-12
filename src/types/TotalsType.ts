import { z } from 'zod';
import { ProfitsSchema } from './Profits.ts';

export type Totals = z.infer<typeof TotalsSchema>;

export const TotalsSchema = z.object({
  total: z.number(),
  totalSets: z.number(),
  setsValuated: z.number(),
  totalProfits: ProfitsSchema,
});
