import './UserReviewCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';

interface UserReviewCellProps {
  id: number;
  reviewer_image: string;
  reviewer_username: string;
  message: string;
  rating: number;
  date: string;
}

const UserReviewCell = (props: UserReviewCellProps) => {
  return (
    <div className="review">
      <div className="review--author">
        <img
          className="review--author_avatar"
          src={props.reviewer_image}
          alt=""
          onError={addDefaultSrc}
        />
        <p className="review--author_username">{props.reviewer_username}</p>
      </div>
      <p>Message: {props.message}</p>
      <p>Rating: {props.rating}</p>
      <p>{props.date}</p>
    </div>
  );
};

export default UserReviewCell;
