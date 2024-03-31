import { z } from 'zod';

export type AuthChatData = z.infer<typeof AuthChatSchema>;

export type DialogData = z.infer<typeof DialogSchema>;
export const AuthChatSchema = z.object({
  chat_user_id: z.number(),
  session_token: z.string(),
});

export const DialogSchema = z.object({
  chat_user_id: z.number(),
  chat_seller_id: z.number(),
});
