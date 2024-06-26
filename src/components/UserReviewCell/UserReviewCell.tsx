import './UserReviewCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import StarIcon from '../../assets/icons/star.svg?react';

interface UserReviewCellProps {
  id: number;
  reviewer_image: string;
  reviewer_username: string;
  message: string;
  rating: number;
  date: string;
}

const UserReviewCell = (props: UserReviewCellProps) => {
  const stars = [...Array(props.rating)].map((_, i) => (
    <StarIcon key={'star-' + i} width={15} />
  ));

  return (
    <div className="review dark:bg-dark">
      <div className="review_left">
        <div className="review--author">
          <img
            className="review--author_avatar"
            src={props.reviewer_image}
            alt=""
            onError={addDefaultSrc}
          />
          <p className="review--author_username">{props.reviewer_username}</p>
        </div>
        <p className="review--message">{props.message}</p>
      </div>
      <div className="review_right">
        <p className="review--rating">{stars}</p>
        <p>{props.date}</p>
      </div>
    </div>
  );
};

export default UserReviewCell;
