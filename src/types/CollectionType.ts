import { z } from 'zod';
import { CollectionSetSchema } from './CollectionSet.ts';
import { UserSchema } from './UserType.ts';

export type CollectionType = z.infer<typeof CollectionSchema>;

export const CollectionSchema = z.object({
  collection_sets: z.array(CollectionSetSchema),
  user: UserSchema,
});
