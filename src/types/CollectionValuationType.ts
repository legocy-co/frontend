import { z } from 'zod';
import { UserSchema } from './UserType.ts';
import { ValuationSchema } from './ValuationType.ts';

export type CollectionValuation = z.infer<typeof CollectionValuationSchema>;

export const CollectionValuationSchema = z.object({
  total: z.number(),
  user: UserSchema,
  valuations: z.array(ValuationSchema),
});
