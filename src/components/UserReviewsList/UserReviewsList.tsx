import { useUnit } from 'effector-react';
import * as model from './model';
import UserReviewCell from '../UserReviewCell';
import { MenuButton } from '../../shared/ui/menu-button.tsx';

const UserReviewsList = () => {
  const userReviews = useUnit(model.$userReviewCells);
  const userReviewsElements = userReviews.map((userReview) => (
    <UserReviewCell
      key={userReview.id}
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
      <MenuButton> Sort by: Last Added </MenuButton>
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