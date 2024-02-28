import { z } from 'zod';

export const ProfitsSchema = z.object({
  total_return_usd: z.number(),
  total_return_percentage: z.number(),
});
