import { useUnit } from 'effector-react';
import * as model from './model';
import UserReviewCell from '../UserReviewCell';

const UserReviewsList = () => {
  const userReviews = useUnit(model.$userReviewCells);
  const userReviewsElements = userReviews.map((userReview) => (
    <UserReviewCell
      id={userReview.id}
      reviewer_image={userReview.reviewer_image}
      reviewer_username={userReview.reviewer_username}
      message={userReview.message}
      rating={userReview.rating}
      date={userReview.date}
    />
  ));

  return (
    <>
      <div
        style={{ gridTemplate: 'auto auto / repeat(2, 1fr)' }}
        className="grid gap-6 mt-7"
      >
        {userReviewsElements}
      </div>
    </>
  );
};

export default UserReviewsList;
