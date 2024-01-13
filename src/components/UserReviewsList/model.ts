import { UserReview } from '../../types/UserReviewType.ts';
import { createStore } from 'effector';

export type UserReviewCell = {
  id: number;
  reviewer_image: string;
  reviewer_username: string;
  message: string;
  rating: number;
  date: string;
};

export const $userReviewCells = createStore<UserReviewCell[]>([]);
export function toUserReviewCells(userReviews: UserReview[]): UserReviewCell[] {
  return userReviews.map((userReview) => ({
    id: userReview.id,
    reviewer_image: 'https://' + userReview.reviewer.images[0]?.downloadURL,
    reviewer_username: userReview.reviewer.username,
    message: userReview.message,
    rating: userReview.rating,
    date: userReview.date,
  }));
}
