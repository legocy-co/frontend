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
  console.log(`User ID: ${userId}`);
  return {
    chat_user_id: 139585004,
    session_token:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdHlwZSI6InVzZXJfYWNjZXNzIiwiYXBwbGljYXRpb25faWQiOjEwMjg4NywiYXVkIjoicWJfY29yZSIsImV4cCI6MTcxMjE1OTM1NiwiaWF0IjoxNzEyMDcyOTU2LCJpc3MiOiJxYl9jb3JlIiwianRpIjoiNjMxOWVmMDEtYjlhMS00Y2M2LThiNDQtZjI5N2ZkMDNhNzY1IiwibmJmIjoxNzEyMDcyOTU1LCJzdWIiOjEzOTU4NTAwNCwidHlwIjoiYWNjZXNzIn0.G2pQIwTVJN8VAPSjLHyu-2YBE5N197KdfOcn2t8mRYYK9SIphogY5EG_KG9ZMsgExseYBtzg5zqNMdv65dZikQ',
  };
};

const GetDialogData = async (
  userId: number | string,
  sellerId: number | string
) => {
  console.log(`User ID: ${userId}, Seller ID: ${sellerId}`);
  return { chat_user_id: 139585004, chat_seller_id: 139585025 };
};

export const chatService: ChatService = {
  CreateChatSession: CreateChatSession,
  GetDialogData: GetDialogData,
};
