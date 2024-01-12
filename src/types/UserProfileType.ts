import { z } from 'zod';
import { UserSchema } from './UserType.ts';
import { UserReviewSchema } from './UserReviewType.ts';
import { MarketItemSchema } from './MarketItemType.ts';

export type UserProfile = z.infer<typeof UserProfileSchema>;
export const UserProfileSchema = z.object({
  user: UserSchema,
  user_reviews: z.array(UserReviewSchema),
  market_items: z.array(MarketItemSchema),
});
