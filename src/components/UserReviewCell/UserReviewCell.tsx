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
      <div className="review_section">
        <div className="review--author">
          <img
            className="review--author_avatar"
            src={props.reviewer_image}
            alt=""
            onError={addDefaultSrc}
          />
          <p className="review--author_username">{props.reviewer_username}</p>
        </div>
        <p>{props.message}</p>
      </div>
      <div className="review_section">
        <p className="review--rating">{props.rating}</p>
        <p>{props.date}</p>
      </div>
    </div>
  );
};

export default UserReviewCell;
