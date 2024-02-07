import { z } from 'zod';
import { CollectionSetSchema } from './CollectionSetType.ts';
import { UserSchema } from './UserType.ts';

export type Collection = z.infer<typeof CollectionSchema>;

export const CollectionSchema = z.object({
  collection_sets: z.array(CollectionSetSchema),
  user: UserSchema,
});
