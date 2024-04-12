import { z } from 'zod';

export type User = z.infer<typeof UserSchema>;

export type UserImage = z.infer<typeof UserImageSchema>;

export const UserImageSchema = z.object({
  userID: z.number().optional(),
  filepath: z.string().optional(),
  downloadURL: z.string().optional(),
});

export const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  email: z.string().min(1).email().optional(),
  images: z.array(UserImageSchema),
  role: z.number().optional(),
});
