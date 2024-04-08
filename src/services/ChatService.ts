import {
  Chat,
  ChatData,
  ChatSchema,
  ChatToken,
  ChatTokenSchema,
  ChatUser,
  ChatUserSchema,
} from '../types/ChatType.ts';
import axios from 'axios';
import toaster from '../shared/lib/react-toastify.ts';
import { handleIncorrectParse } from './ErrorHandlers.ts';

interface ChatService {
  CreateChat: (chat: ChatData) => Promise<boolean>;
  GetChat: (marketItemId: number | string) => Promise<Chat>;
  GetUserChats: (id: number | string) => Promise<Chat[]>;
  GetLegocyUser: (qbId: number | string) => Promise<ChatUser>;
  GetSessionToken: () => Promise<ChatToken>;
  GetQbUser: (legocyId: number | string) => Promise<ChatUser>;
}

const chatAxios = axios.create({
  baseURL: import.meta.env.VITE_CHATS_API_ENDPOINT,
  headers: { 'X-API-Key': import.meta.env.VITE_X_API_KEY },
});

const CreateChat = async (chat: ChatData): Promise<boolean> => {
  try {
    await chatAxios.post('/chats/', chat);
    toaster.showToastSuccess('Chat created');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

const GetChat = async (marketItemId: number | string): Promise<Chat> => {
  const response = await chatAxios.get('/chats/market-item/' + marketItemId);
  const result = ChatSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetChat', "Can't get chat");

  return result.data;
};

const GetUserChats = async (id: number | string): Promise<Chat[]> => {
  const response = await chatAxios.get('/chats/user/' + id);
  const result = ChatSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserChats',
      "Can't get user chat"
    );

  return result.data;
};

const GetLegocyUser = async (qbID: number | string): Promise<ChatUser> => {
  const response = await chatAxios.get('/users/qb/' + qbID);
  const result = ChatUserSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetLegocyUser',
      "Can't get Legocy user"
    );

  return result.data;
};

const GetSessionToken = async (): Promise<ChatToken> => {
  const response = await chatAxios.get('/users/session');
  const result = ChatTokenSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetSessionToken',
      "Can't get session token"
    );

  return result.data;
};

const GetQbUser = async (legocyId: number | string): Promise<ChatUser> => {
  const response = await chatAxios.get('/users/' + legocyId);
  const result = ChatUserSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(result.error, 'GetQbUser', "Can't get QB user");

  return result.data;
};

export const chatService: ChatService = {
  CreateChat: CreateChat,
  GetChat: GetChat,
  GetUserChats: GetUserChats,
  GetLegocyUser: GetLegocyUser,
  GetSessionToken: GetSessionToken,
  GetQbUser: GetQbUser,
};
