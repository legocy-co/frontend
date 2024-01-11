import { z } from 'zod';

export const UserImage = z.object({
  userID: z.number(),
  filepath: z.string().min(1),
  downloadURL: z.string().min(1),
});
