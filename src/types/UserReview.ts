import { z } from 'zod';
import { UserSchema } from './User.ts';

export const UserReviewSchema = z.object({
  id: z.number(),
  rating: z.coerce.number().min(1).max(5).int(),
  message: z.string().min(1),
  date: z.string().regex(/(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{2}/),
  seller: UserSchema,
  reviewer: UserSchema,
});
