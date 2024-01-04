import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg';

interface CatalogCellProps {
  id: number;
  condition: string;
  images: string[];
  location: string;
  price: number;
  series: string;
  set: string;
  set_number: number;
}

const MarketItemCell = (props: CatalogCellProps) => {
  const navigate = useNavigate();

  return (
    <div className="cell" onClick={() => navigate(`/catalog/${props.id}`)}>
      <h1>{props.location}</h1>
      {props.images.map((image) => (
        <div className="cell--image-wrapper">
          <img
            className="cell--image"
            key={image}
            src={'https://' + image}
            onError={addDefaultSrc}
            alt=""
          ></img>
          <img
            className="cell--favorite"
            src={HeartIcon}
            onError={addDefaultSrc}
            alt=""
          />
        </div>
      ))}
      <div className="cell--heading">
        <h1>{props.set}</h1> <h1>{props.price}$</h1>
      </div>
      <p>
        Series: {props.series}&nbsp;&nbsp;&nbsp;&nbsp;Condition:{' '}
        {props.condition}
      </p>
      <p>
        <u>Set number: {props.set_number}</u>
      </p>
      <div className="cell--moreinfo">
        <h1>More Info</h1>
      </div>
    </div>
  );
};

export default MarketItemCell;
