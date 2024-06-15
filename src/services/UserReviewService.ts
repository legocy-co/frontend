import {
  UserReview,
  UserReviewData,
  UserReviewSchema,
} from '../types/UserReviewType.ts';
import axios from 'axios';
import { handleIncorrectParse, handleReviewError } from './ErrorHandlers.ts';
import { ur } from '../features/user-review/index.tsx';

interface UserReviewService {
  GetUserReviews: () => Promise<UserReview[]>;
  CreateUserReview: (data: UserReviewData) => Promise<boolean>;
  GetUserReview: (reviewID: number | string) => Promise<UserReview>;
  DeleteUserReview: (reviewId: number | string) => Promise<boolean>;
}

const GetUserReviews = async (): Promise<UserReview[]> => {
  const response = await axios.get<object[]>('/users/reviews/');
  const result = UserReviewSchema.array().safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserReviews',
      "Can't get user reviews"
    );

  return result.data;
};

const CreateUserReview = async (data: UserReviewData): Promise<boolean> => {
  try {
    await axios.post<object>('/users/reviews/', data);
    return Promise.resolve(true);
  } catch (e) {
    return handleReviewError(e, 'CreateUserReview', ur.form);
  }
};

const GetUserReview = async (
  reviewID: number | string
): Promise<UserReview> => {
  const response = await axios.get<object>('/users/reviews/' + reviewID);
  const result = UserReviewSchema.safeParse(response.data);
  if (!result.success)
    return handleIncorrectParse(
      result.error,
      'GetUserReview',
      "Can't get user review"
    );

  return result.data;
};

const DeleteUserReview = async (
  reviewId: number | string
): Promise<boolean> => {
  try {
    await axios.delete('/users/reviews/' + reviewId);
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const userReviewService: UserReviewService = {
  GetUserReviews: GetUserReviews,
  CreateUserReview: CreateUserReview,
  GetUserReview: GetUserReview,
  DeleteUserReview: DeleteUserReview,
};
