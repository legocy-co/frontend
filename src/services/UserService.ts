import { UserProfile, UserProfileSchema } from '../types/UserProfileType';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';

interface UserService {
  GetUserProfilePage: (id: string) => Promise<UserProfile>;
}

type UserProfileResponse = {
  market_items: object | object[];
  user: object;
  user_reviews: object | object[];
};

const GetUserProfilePage = async (id: string): Promise<UserProfile> => {
  const response = await axios.get<UserProfileResponse>('/users/profile/' + id);
  const result = UserProfileSchema.safeParse(response);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserProfilePage',
      "Can't get user profile page"
    );

  return result.data;
};

export const userService: UserService = {
  GetUserProfilePage: GetUserProfilePage,
};
