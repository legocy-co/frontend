import { z } from 'zod';

export type ChatData = z.infer<typeof ChatDataSchema>;

export type Chat = z.infer<typeof ChatSchema>;

export type ChatUser = z.infer<typeof ChatUserSchema>;

export type ChatToken = z.infer<typeof ChatTokenSchema>;

export const ChatDataSchema = z.object({
  client_id: z.number(),
  market_item_id: z.number(),
  name: z.string(),
  seller_id: z.number(),
});

export const ChatSchema = z.object({
  chat_quickblox_id: z.string(),
  id: z.string(),
  market_item_id: z.number(),
  user_id: z.number(),
});

export const ChatUserSchema = z.object({
  legocyID: z.number(),
  qbID: z.number(),
});

export const ChatTokenSchema = z.object({
  qbID: z.number(),
  token: z.string(),
});

// ask for JSON camelCase
