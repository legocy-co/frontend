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
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NfdHlwZSI6InVzZXJfYWNjZXNzIiwiYXBwbGljYXRpb25faWQiOjEwMjg4NywiYXVkIjoicWJfY29yZSIsImV4cCI6MTcxMTk5NzM5MywiaWF0IjoxNzExOTEwOTkzLCJpc3MiOiJxYl9jb3JlIiwianRpIjoiMTA0MGI1M2EtYmZjOC00ODMwLWFhNGMtOTJkZjY4YzA0Y2FjIiwibmJmIjoxNzExOTEwOTkyLCJzdWIiOjEzOTU4NTAwNCwidHlwIjoiYWNjZXNzIn0.SB0hOeFxkn2BpD2Vyz06TSjcfpB-kj8pDM-UlHxYGUl1fV1kF3ziVxEbzMd-mALPqXl5FOtmpDIXxq_k3T1xNw',
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
