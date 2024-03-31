import { AuthChatData, DialogData } from '../types/ChatType.ts';

// mock service
interface ChatService {
  CreateChatSession: (userId: number | string) => Promise<AuthChatData>;
  GetDialogData: (
    userId: number | string,
    sellerId: number | string
  ) => Promise<DialogData>;
}

const CreateChatSession = async (userId: number | string) => {
  return { chat_user_id: 1, session_token: 'token' };
};

const GetDialogData = async (
  userId: number | string,
  sellerId: number | string
) => {
  return { chat_user_id: 1, chat_seller_id: 1 };
};

export const chatService: ChatService = {
  CreateChatSession: CreateChatSession,
  GetDialogData: GetDialogData,
};
