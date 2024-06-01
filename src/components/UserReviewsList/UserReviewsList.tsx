import { useUnit } from 'effector-react';
import * as model from './model';
import UserReviewCell from '../UserReviewCell';
import { Button } from '../../shared/ui/button.tsx';
import ChevronUpIcon from '../../assets/icons/chevron-up.svg?react';

const UserReviewsList = () => {
  const userReviews = useUnit(model.$userReviewCells);
  const userReviewsElements = userReviews.map((userReview) => (
    <UserReviewCell
      key={`review-${userReview.id}`}
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
      <Button className="!w-[188px] !h-9 flex items-center justify-center gap-2 text-[16px] relative bg-pagesize dark:bg-dark !text-[#201D1D] dark:!text-description">
        Sort by: Last Added
        <ChevronUpIcon className="rotate-180 iconstrokes" />
      </Button>
      <div className="grid gap-6 mt-7 grid-cols-1 lg:grid-cols-2">
        {userReviewsElements}
      </div>
    </>
  );
};

export default UserReviewsList;
