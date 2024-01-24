import { z } from 'zod';

export type UserImage = z.infer<typeof UserImageSchema>;

export const UserImageSchema = z.object({
  userID: z.number(),
  filepath: z.string().min(1),
  downloadURL: z.string().min(1),
});
