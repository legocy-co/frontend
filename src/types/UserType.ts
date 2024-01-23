import { z } from 'zod';
import { UserImageSchema } from './UserImageType.ts';

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  email: z.string().min(1).email().optional(),
  images: z.array(UserImageSchema),
  role: z.number().optional(),
});
