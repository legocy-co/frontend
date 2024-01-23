import { z } from 'zod';
import { UserImage } from './UserImageType.ts';

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  email: z.string().min(1).email().optional(),
  images: z.array(UserImage),
  role: z.number().optional(),
});
