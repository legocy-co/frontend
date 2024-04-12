import { z } from 'zod';

export const ProfitsSchema = z.object({
  totalReturnUSD: z.number(),
  totalReturnPercentage: z.number(),
});
