import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string().min(1),
  email: z.string().min(1).email(),
  role: z.number(),
});
