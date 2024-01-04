import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg';

interface MarketItemCellProps {
  id: number;
  condition: string;
  images: string[];
  location: string;
  price: number;
  series: string;
  set: string;
  set_number: number;
}

const MarketItemCell = (props: MarketItemCellProps) => {
  const navigate = useNavigate();

  const imagesElement = props.images.map((image) => (
    <img
      key={image}
      className="cell--image"
      src={'https://' + image}
      onError={addDefaultSrc}
      alt=""
    ></img>
  ));

  // const radiosElements = props.images.map((image) => (
  //   <div>
  //     <input type="radio" name="radio-btn" id={image} />
  //     <label htmlFor={image} className="navigation-btn" />
  //   </div>
  // ));

  return (
    <div className="cell">
      <h1>{props.location}</h1>
      <div className="cell--image-wrapper">
        {props.images.length === 0 && (
          <img
            className="cell--image"
            src=""
            onError={addDefaultSrc}
            alt=""
          ></img>
        )}
        {imagesElement}
        <img
          className="cell--favorite"
          src={HeartIcon}
          onError={addDefaultSrc}
          alt=""
        />
      </div>
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
      <div
        className="cell--moreinfo"
        onClick={() => navigate(`/catalog/${props.id}`)}
      >
        <h1>More Info</h1>
      </div>
    </div>
  );
};

export default MarketItemCell;
