import './MarketItemCell.scss';
import { addDefaultSrc } from '../../services/utils.ts';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '../../assets/icons/heart.svg';
import { useState } from 'react';

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
  const [imageSrc, setImageSrc] = useState(props.images[0]);

  const radioElements = props.images.map((image) => (
    <div key={image}>
      <input
        type="radio"
        id={image}
        onChange={() => setImageSrc(image)}
        checked={image === imageSrc}
      />
      <label htmlFor={image} />
    </div>
  ));

  return (
    <div className="cell">
      <h1>{props.location}</h1>
      <div className="cell--image-wrapper">
        <img
          className="cell--image"
          src={'https://' + imageSrc}
          onError={addDefaultSrc}
          alt=""
        ></img>
        <div className="cell--image-choice">{radioElements}</div>
        <img
          className="cell--favorite"
          src={HeartIcon}
          onError={addDefaultSrc}
          alt=""
        />
      </div>
      <div className="cell--props">
        <h1>{props.set}</h1> <h1>{props.price}$</h1>
      </div>
      <div className="cell--props">
        <p>Series: {props.series}</p>
        <p>Condition: {props.condition}</p>
      </div>
      <p>
        <u>Set number: {props.set_number}</u>
      </p>
      <div
        className="cell--link"
        onClick={() => navigate(`/catalog/${props.id}`)}
      >
        <h1>More Info</h1>
      </div>
    </div>
  );
};

export default MarketItemCell;
