import { z } from 'zod';
import { CollectionSetSchema } from './CollectionSetType.ts';
import { UserSchema } from './UserType.ts';
import { TotalsSchema } from './TotalsType.ts';

export type Collection = z.infer<typeof CollectionSchema>;

export const CollectionSchema = z.object({
  collectionSets: z.array(CollectionSetSchema),
  user: UserSchema,
  totals: TotalsSchema,
});
