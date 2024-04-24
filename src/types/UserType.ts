import { z } from 'zod';
import { UserImageSchema } from './UserImageType.ts';

export type User = z.infer<typeof UserSchema>;

const ReviewTotalsSchema = z
  .object({
    avgRating: z.number(),
    totalReviews: z.number(),
  })
  .nullable();

export const UserSchema = z.object({
  email: z.string().min(1).email().optional(),
  id: z.number(),
  images: z.array(UserImageSchema),
  reviewTotals: ReviewTotalsSchema,
  role: z.number().optional(),
  username: z.string().min(1),
});
