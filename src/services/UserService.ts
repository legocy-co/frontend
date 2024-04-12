import {
  UserProfile,
  UserProfileData,
  UserProfileSchema,
} from '../types/UserProfileType';
import axios from 'axios';
import { handleIncorrectParse, handleUserError } from './ErrorHandlers.ts';
import { UserImage, UserImageSchema } from '../types/UserImageType.ts';
import toaster from '../shared/lib/react-toastify.ts';
import { upf } from '../features/user-profile/index.tsx';
import { User, UserSchema } from '../types/UserType.ts';

interface UserService {
  GetCurrentUserProfileInfo: () => Promise<User>;
  GetUserProfilePage: (userID: number | string) => Promise<UserProfile>;
  UpdateUserProfilePage: (
    userID: number | string,
    userProfileData: UserProfileData
  ) => Promise<boolean>;
  GetUserImagesList: (userID: number | string) => Promise<UserImage[]>;
  UploadUserImage: (
    file: FormData,
    userID: number | string
  ) => Promise<boolean>;
}

type UserProfileResponse = {
  market_items: object[];
  user: object;
  user_reviews: object[];
};

type ImagesResponse = {
  images: object[];
};

const GetCurrentUserProfileInfo = async (): Promise<User> => {
  const response = await axios.get<UserProfileResponse>('/users/profile/');
  const result = UserSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetCurrentUserProfileInfo',
      "Can't get current user profile info"
    );

  return result.data;
};

const GetUserProfilePage = async (
  userID: number | string
): Promise<UserProfile> => {
  const response = await axios.get<UserProfileResponse>(
    '/users/profile/' + userID
  );
  const result = UserProfileSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserProfilePage',
      "Can't get user profile page"
    );

  return result.data;
};

const UpdateUserProfilePage = async (
  userID: number | string,
  userProfileData: UserProfileData
): Promise<boolean> => {
  try {
    await axios.put('/users/profile/' + userID, userProfileData);
    toaster.showToastSuccess('User profile updated');

    return Promise.resolve(true);
  } catch (e) {
    return handleUserError(e, 'UserProfile', upf.form);
  }
};

const GetUserImagesList = async (
  userID: number | string
): Promise<UserImage[]> => {
  const response = await axios.get<ImagesResponse>('/users/images/' + userID);
  const result = UserImageSchema.array().safeParse(response.data.images);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserImagesList',
      "Can't get user images list"
    );

  return result.data;
};

const UploadUserImage = async (
  file: FormData,
  userID: number | string
): Promise<boolean> => {
  try {
    await axios.post(`/users/images/${userID}/avatar`, file);
    toaster.showToastSuccess('User image uploaded');

    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const userService: UserService = {
  GetCurrentUserProfileInfo: GetCurrentUserProfileInfo,
  GetUserProfilePage: GetUserProfilePage,
  UpdateUserProfilePage: UpdateUserProfilePage,
  GetUserImagesList: GetUserImagesList,
  UploadUserImage: UploadUserImage,
};
