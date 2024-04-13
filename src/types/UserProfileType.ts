import { z } from 'zod';
import { UserSchema } from './UserType.ts';
import { UserReviewSchema } from './UserReviewType.ts';
import { MarketItemSchema } from './MarketItemType.ts';
import { Form } from 'effector-forms';

export type UserProfile = z.infer<typeof UserProfileSchema>;

export type UserProfileForm = Form<UserProfileData>;

export type UserProfileData = {
  email: string;
  username: string;
};

export const UserProfileSchema = z.object({
  user: UserSchema,
  user_reviews: z.array(UserReviewSchema),
  market_items: z.array(MarketItemSchema),
});

// ask for JSON camelCase
