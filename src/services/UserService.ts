import { UserProfile, UserProfileSchema } from '../types/UserProfileType';
import axios from 'axios';
import { handleIncorrectParse } from './ErrorHandlers.ts';
import { UserImage, UserImageSchema } from '../types/UserImageType.ts';
import toaster from '../shared/lib/react-toastify.ts';

interface UserService {
  GetUserProfilePage: (id: string) => Promise<UserProfile>;
  GetUserImages: (id: string) => Promise<UserImage[]>;
  UploadUserImage: (file: FormData, id: string) => Promise<boolean>;
}

type UserProfileResponse = {
  market_items: object[];
  user: object;
  user_reviews: object[];
};

const GetUserProfilePage = async (id: string): Promise<UserProfile> => {
  const response = await axios.get<UserProfileResponse>('/users/profile/' + id);
  const result = UserProfileSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserProfilePage',
      "Can't get user profile page"
    );

  return result.data;
};

const GetUserImages = async (id: string): Promise<UserImage[]> => {
  const response = await axios.get<object[]>('/users/images/' + id);
  const result = UserImageSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserImages',
      "Can't get user images"
    );

  return result.data;
};

const UploadUserImage = async (
  file: FormData,
  id: string
): Promise<boolean> => {
  try {
    await axios.post(`/users/images/${id}/avatar`, file);
    toaster.showToastSuccess('User image uploaded');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const userService: UserService = {
  GetUserProfilePage: GetUserProfilePage,
  GetUserImages: GetUserImages,
  UploadUserImage: UploadUserImage,
};
